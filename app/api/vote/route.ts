import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

// Rate limiting: Track IPs to prevent abuse
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

export async function GET() {
    try {
        const yes = await kv.get<number>('votes:yes') || 0;
        const no = await kv.get<number>('votes:no') || 0;

        return NextResponse.json({ yes, no });
    } catch (error) {
        // If KV is not connected, return real starting values
        console.error('KV Error:', error);
        return NextResponse.json({ yes: 0, no: 0 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Check rate limit
        const rateLimitKey = `ratelimit:${ip}`;
        const lastVote = await kv.get<number>(rateLimitKey);

        if (lastVote && Date.now() - lastVote < RATE_LIMIT_WINDOW) {
            return NextResponse.json(
                { error: 'Too many requests' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { type } = body;

        if (type !== 'yes' && type !== 'no') {
            return NextResponse.json(
                { error: 'Invalid vote type' },
                { status: 400 }
            );
        }

        // Increment vote count
        const key = `votes:${type}`;
        await kv.incr(key);

        // Set rate limit
        await kv.set(rateLimitKey, Date.now(), { ex: 86400 }); // 24h expiry

        // Get updated counts
        const yes = await kv.get<number>('votes:yes') || 0;
        const no = await kv.get<number>('votes:no') || 0;

        return NextResponse.json({ yes, no });
    } catch (error) {
        console.error('Vote Error:', error);
        // Fallback for when KV is not connected
        return NextResponse.json({ yes: 0, no: 0 });
    }
}
