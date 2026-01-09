'use client'

import React, { useActionState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { login, signup } from '@/app/auth/actions'

interface AuthFormProps {
    type: 'login' | 'signup'
}

const initialState = {
    error: '',
}

export function AuthForm({ type }: AuthFormProps) {
    const isLogin = type === 'login'
    const action = isLogin ? login : signup
    const [state, formAction, isPending] = useActionState(async (state: any, payload: FormData) => {
        const result = await action(payload);
        if (result?.error) {
            return { error: result.error }
        }
        return { error: '' }
    }, initialState)

    return (
        <form action={formAction} className="flex flex-col gap-4 w-full">
            {!isLogin && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="text-sm font-medium text-[var(--foreground)]">Full Name</label>
                    <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        required
                    />
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-[var(--foreground)]">Email</label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-[var(--foreground)]">Password</label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                />
            </div>

            {state?.error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
                    {state.error}
                </div>
            )}

            <Button type="submit" className="w-full mt-2" disabled={isPending}>
                {isPending ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>
        </form>
    )
}
