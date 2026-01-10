import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 100 // requests per window

function getRateLimitKey(request: NextRequest): string {
    // Use IP address or forwarded IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'anonymous'
    return ip
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
    const now = Date.now()
    const record = rateLimit.get(key)

    if (!record || now > record.resetTime) {
        rateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
        return { allowed: true, remaining: MAX_REQUESTS - 1 }
    }

    if (record.count >= MAX_REQUESTS) {
        return { allowed: false, remaining: 0 }
    }

    record.count++
    return { allowed: true, remaining: MAX_REQUESTS - record.count }
}

// Clean up old entries periodically
setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimit.entries()) {
        if (now > record.resetTime) {
            rateLimit.delete(key)
        }
    }
}, RATE_LIMIT_WINDOW)

export function rateLimitMiddleware(request: NextRequest): NextResponse | null {
    // Only rate limit API routes
    if (!request.nextUrl.pathname.startsWith('/api/')) {
        return null
    }

    const key = getRateLimitKey(request)
    const { allowed, remaining } = checkRateLimit(key)

    if (!allowed) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            {
                status: 429,
                headers: {
                    'Retry-After': '60',
                    'X-RateLimit-Limit': MAX_REQUESTS.toString(),
                    'X-RateLimit-Remaining': '0',
                },
            }
        )
    }

    // Add rate limit headers to the response
    const response = NextResponse.next()
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())

    return null // Continue to the route handler
}

// Input sanitization utilities
export function sanitizeString(input: string): string {
    if (typeof input !== 'string') return ''

    // Remove null bytes and control characters
    return input
        .replace(/\0/g, '')
        .replace(/[\x00-\x1F\x7F]/g, '')
        .trim()
        .slice(0, 10000) // Limit length
}

export function sanitizeEmail(email: string): string {
    const sanitized = sanitizeString(email).toLowerCase()
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(sanitized) ? sanitized : ''
}

export function sanitizeUrl(url: string): string {
    const sanitized = sanitizeString(url)
    try {
        const parsed = new URL(sanitized)
        // Only allow http and https protocols
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            return parsed.href
        }
        return ''
    } catch {
        return ''
    }
}

export function sanitizeNumber(input: unknown, min?: number, max?: number): number | null {
    const num = Number(input)
    if (isNaN(num)) return null
    if (min !== undefined && num < min) return null
    if (max !== undefined && num > max) return null
    return num
}
