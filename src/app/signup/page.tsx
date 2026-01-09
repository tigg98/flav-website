import Link from 'next/link'
import { AuthForm } from '@/components/auth/AuthForm'

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-neutral-50)] p-4">
            <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
                        Create an account
                    </h1>
                    <p className="mt-2 text-sm text-[var(--color-neutral-500)]">
                        Get started with Flav Ads today
                    </p>
                </div>

                <AuthForm type="signup" />

                <div className="text-center text-sm">
                    <p className="text-[var(--color-neutral-500)]">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-[var(--color-primary-600)] hover:text-[var(--color-primary-500)]">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
