import { NextRequest, NextResponse } from 'next/server';

// Force dynamic to prevent caching issues
export const dynamic = 'force-dynamic';

const READ_ONLY_TOKEN = process.env.KV_REST_API_READ_ONLY_TOKEN || process.env.KV_REST_API_TOKEN;
const API_URL = process.env.KV_REST_API_URL;

async function redisCommand(command: string, ...args: (string | number)[]) {
    if (!API_URL || !READ_ONLY_TOKEN) {
        throw new Error('Missing KV_REST_API_URL or KV_REST_API_TOKEN');
    }

    const res = await fetch(`${API_URL}/${command}/${args.join('/')}`, {
        headers: {
            Authorization: `Bearer ${READ_ONLY_TOKEN}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Upstash Error: ${res.status} ${text}`);
    }

    const data = await res.json();
    return data.result;
}

export async function GET() {
    try {
        if (!API_URL || !READ_ONLY_TOKEN) {
            return NextResponse.json({
                error: 'Configuration Error',
                details: 'Missing Environment Variables',
                hasUrl: !!process.env.KV_REST_API_URL,
                hasToken: !!process.env.KV_REST_API_TOKEN
            }, { status: 500 });
        }

        const yes = await redisCommand('get', 'votes:yes');
        const no = await redisCommand('get', 'votes:no');

        return NextResponse.json({
            yes: Number(yes) || 0,
            no: Number(no) || 0
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            yes: 0,
            no: 0,
            error: String(error)
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        // Use full token for writes
        const WRITE_TOKEN = process.env.KV_REST_API_TOKEN;

        if (!API_URL || !WRITE_TOKEN) {
            return NextResponse.json({ error: 'Missing Write Configuration' }, { status: 500 });
        }

        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        const ip = forwardedFor ? forwardedFor.split(',')[0] : (realIp || 'unknown');
        const body = await request.json();
        const { type } = body;

        if (type !== 'yes' && type !== 'no') {
            return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
        }

        // Rate limit check
        // Check if rate limit key exists
        const rateLimitKey = `ratelimit:${ip}`;
        const limitRes = await fetch(`${API_URL}/get/${rateLimitKey}`, {
            headers: { Authorization: `Bearer ${WRITE_TOKEN}` },
            cache: 'no-store'
        });
        const limitData = await limitRes.json();

        if (limitData.result) {
            return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }

        // Increment vote
        await fetch(`${API_URL}/incr/votes:${type}`, {
            headers: { Authorization: `Bearer ${WRITE_TOKEN}` },
            cache: 'no-store'
        });

        // Set rate limit (24h)
        await fetch(`${API_URL}/set/${rateLimitKey}/${Date.now()}?ex=86400`, {
            headers: { Authorization: `Bearer ${WRITE_TOKEN}` },
            cache: 'no-store'
        });

        // Get new values
        const yes = await redisCommand('get', 'votes:yes');
        const no = await redisCommand('get', 'votes:no');

        return NextResponse.json({ yes: Number(yes) || 0, no: Number(no) || 0 });

    } catch (error) {
        console.error('Vote Error:', error);
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
