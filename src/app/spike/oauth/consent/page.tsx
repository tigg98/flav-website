'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient, type Session } from '@supabase/supabase-js'

// The throwaway test project. The publishable key is public by design.
const TEST_URL = 'https://lczqgsomwftgwpscufrg.supabase.co'
const TEST_PUBLISHABLE_KEY = 'sb_publishable_LD3BnySL0HICyA1wafmMoQ_H2iDylWW'

// Its own storage key, so it never touches the site's real sign-in cookies.
const supabase = createClient(TEST_URL, TEST_PUBLISHABLE_KEY, {
    auth: { storageKey: 'flav-spike-auth', persistSession: true, autoRefreshToken: true },
})

type Details = Record<string, unknown>

function show(value: unknown): string {
    try {
        return JSON.stringify(value, null, 2)
    } catch {
        return String(value)
    }
}

export default function SpikeConsentPage() {
    const [authorizationId, setAuthorizationId] = useState<string | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [ready, setReady] = useState(false)
    const [details, setDetails] = useState<Details | null>(null)
    const [log, setLog] = useState<string[]>([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [busy, setBusy] = useState(false)

    const note = useCallback((line: string) => {
        setLog((lines) => [...lines, `${new Date().toISOString()}  ${line}`])
    }, [])

    useEffect(() => {
        setAuthorizationId(new URLSearchParams(window.location.search).get('authorization_id'))
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session)
            setReady(true)
        })
        const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
        return () => sub.subscription.unsubscribe()
    }, [])

    // The step the bug report is about: load the authorization as a signed-in user.
    useEffect(() => {
        if (!session || !authorizationId) return
        let cancelled = false
        note(`getAuthorizationDetails(${authorizationId})`)
        supabase.auth.oauth.getAuthorizationDetails(authorizationId).then(({ data, error }) => {
            if (cancelled) return
            if (error) {
                note(`FAILED: ${error.name} ${error.status ?? ''} ${error.message}`)
                return
            }
            const d = data as unknown as Details
            note('OK')
            // No authorization_id in the answer means consent was already given.
            if (typeof d.redirect_url === 'string' && !d.authorization_id) {
                note('Already approved, redirecting')
                window.location.assign(d.redirect_url)
                return
            }
            setDetails(d)
        })
        return () => {
            cancelled = true
        }
    }, [session, authorizationId, note])

    async function signIn(create: boolean) {
        setBusy(true)
        const call = create
            ? supabase.auth.signUp({ email, password })
            : supabase.auth.signInWithPassword({ email, password })
        const { error } = await call
        note(error ? `${create ? 'signUp' : 'signIn'} FAILED: ${error.message}` : `${create ? 'signUp' : 'signIn'} OK`)
        setPassword('')
        setBusy(false)
    }

    async function decide(approve: boolean) {
        if (!authorizationId) return
        setBusy(true)
        const { data, error } = approve
            ? await supabase.auth.oauth.approveAuthorization(authorizationId)
            : await supabase.auth.oauth.denyAuthorization(authorizationId)
        if (error) {
            note(`${approve ? 'approve' : 'deny'} FAILED: ${error.name} ${error.status ?? ''} ${error.message}`)
            setBusy(false)
            return
        }
        const d = data as unknown as Details
        note(`${approve ? 'approve' : 'deny'} OK`)
        if (typeof d.redirect_url === 'string') window.location.assign(d.redirect_url)
        else setBusy(false)
    }

    const box = { maxWidth: 520, margin: '48px auto', padding: 24, fontFamily: 'system-ui, sans-serif', color: '#0A0A0A' }
    const field = { display: 'block', width: '100%', height: 44, padding: '0 12px', margin: '6px 0 14px', border: '1px solid #C9C9CE', borderRadius: 10, fontSize: 16 }
    const primary = { height: 48, padding: '0 20px', border: 0, borderRadius: 12, background: '#0A0A0A', color: '#FFFFFF', fontSize: 16, fontWeight: 700, marginRight: 8 }
    const secondary = { ...primary, background: '#F2F2F5', color: '#0A0A0A' }

    return (
        <main style={box}>
            <h1 style={{ fontSize: 22, margin: '0 0 8px' }}>ChatGPT connection test</h1>
            <p style={{ margin: '0 0 20px', color: '#3A3A3F' }}>
                Test page for a throwaway project. It is not connected to any real Flav account.
            </p>

            {!ready && <p>Loading.</p>}

            {ready && !session && (
                <form onSubmit={(e) => { e.preventDefault(); void signIn(false) }}>
                    <label htmlFor="spike-email">Test email</label>
                    <input id="spike-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} style={field} />
                    <label htmlFor="spike-password">Test password</label>
                    <input id="spike-password" type="password" autoComplete="current-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} style={field} />
                    <button type="submit" disabled={busy} style={primary}>Sign in</button>
                    <button type="button" disabled={busy} style={secondary} onClick={() => void signIn(true)}>Create test account</button>
                </form>
            )}

            {ready && session && (
                <p style={{ margin: '0 0 16px' }}>
                    Signed in as {session.user.email}.{' '}
                    <button type="button" style={{ border: 0, background: 'none', textDecoration: 'underline', padding: 0, fontSize: 'inherit' }} onClick={() => void supabase.auth.signOut()}>Sign out</button>
                </p>
            )}

            {ready && session && !authorizationId && (
                <p>No authorization_id in the address. Start the connection from ChatGPT and you will land back here.</p>
            )}

            {details && (
                <section>
                    <h2 style={{ fontSize: 17, margin: '0 0 8px' }}>An app is asking to connect</h2>
                    <pre style={{ background: '#F5F5F7', padding: 12, borderRadius: 10, overflowX: 'auto', fontSize: 12 }}>{show(details)}</pre>
                    <button type="button" disabled={busy} style={primary} onClick={() => void decide(true)}>Allow</button>
                    <button type="button" disabled={busy} style={secondary} onClick={() => void decide(false)}>Cancel</button>
                </section>
            )}

            {log.length > 0 && (
                <section style={{ marginTop: 24 }}>
                    <h2 style={{ fontSize: 14, margin: '0 0 6px' }}>Log</h2>
                    <pre style={{ background: '#F5F5F7', padding: 12, borderRadius: 10, overflowX: 'auto', fontSize: 12, whiteSpace: 'pre-wrap' }}>{log.join('\n')}</pre>
                </section>
            )}
        </main>
    )
}
