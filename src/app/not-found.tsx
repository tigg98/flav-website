import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
            <div className="text-8xl mb-6">🍳</div>
            <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
            <p className="text-[var(--color-neutral-500)] text-lg mb-8 max-w-md">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex gap-4">
                <Link href="/">
                    <Button variant="outline">Go Home</Button>
                </Link>
                <Link href="/support">
                    <Button>Contact Support</Button>
                </Link>
            </div>
        </div>
    )
}
