'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('App error:', error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
            <div className="text-8xl mb-6">⚠️</div>
            <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
            <p className="text-[var(--color-neutral-500)] text-lg mb-8 max-w-md">
                We encountered an unexpected error. Our team has been notified.
            </p>
            <div className="flex gap-4">
                <Button variant="outline" onClick={() => window.location.href = '/'}>
                    Go Home
                </Button>
                <Button onClick={reset}>
                    Try Again
                </Button>
            </div>
            {process.env.NODE_ENV === 'development' && (
                <details className="mt-8 text-left w-full max-w-xl">
                    <summary className="cursor-pointer text-sm text-[var(--color-neutral-500)]">
                        Error Details (Development Only)
                    </summary>
                    <pre className="mt-2 p-4 bg-[var(--color-neutral-100)] rounded-xl text-xs overflow-auto">
                        {error.message}
                        {error.digest && `\n\nDigest: ${error.digest}`}
                        {'\n\n'}
                        {error.stack}
                    </pre>
                </details>
            )}
        </div>
    )
}
