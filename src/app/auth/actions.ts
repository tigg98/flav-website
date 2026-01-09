'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    // If there's an error, we might want to return it to the client. 
    // For simplicity MVP: we can just throw or return
    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/ads/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string


    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            }
        }
    })

    if (error) {
        return { error: error.message }
    }

    // Assuming email confirmation is enabled by default or logic needs check
    // For now redirect or show message
    revalidatePath('/', 'layout')
    redirect('/ads/dashboard?message=Check your email to verify your account')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}
