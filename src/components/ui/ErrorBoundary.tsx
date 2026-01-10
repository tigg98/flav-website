'use client'

import { Component, ReactNode } from 'react'
import { Button } from './Button'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
        // In production, you could send this to an error tracking service like Sentry
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
                    <p className="text-[var(--color-neutral-500)] mb-6 max-w-md">
                        We encountered an unexpected error. Please try refreshing the page.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => this.setState({ hasError: false, error: null })}
                        >
                            Try Again
                        </Button>
                        <Button onClick={() => window.location.reload()}>
                            Refresh Page
                        </Button>
                    </div>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details className="mt-6 text-left w-full max-w-xl">
                            <summary className="cursor-pointer text-sm text-[var(--color-neutral-500)]">
                                Error Details (Development Only)
                            </summary>
                            <pre className="mt-2 p-4 bg-[var(--color-neutral-100)] rounded-xl text-xs overflow-auto">
                                {this.state.error.message}
                                {'\n\n'}
                                {this.state.error.stack}
                            </pre>
                        </details>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}

// Wrapper for async components
export function AsyncBoundary({
    children,
    fallback,
    errorFallback,
}: {
    children: ReactNode
    fallback?: ReactNode
    errorFallback?: ReactNode
}) {
    return (
        <ErrorBoundary fallback={errorFallback}>
            {children}
        </ErrorBoundary>
    )
}
