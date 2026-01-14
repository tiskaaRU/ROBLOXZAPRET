import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
const TURNSTILE_VERIFY_FILE = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get('x-forwarded-for') || 'unknown';
        const body = await req.json();
        const { name, email, type, message, token } = body;

        // 0. Validate Message Length
        if (!message || message.length > 400) {
            return NextResponse.json(
                { error: 'Сообщение слишком длинное (макс. 400 символов).' },
                { status: 400 }
            );
        }

        // 1. Rate Limiting
        const rateLimitKey = `ratelimit:support:${ip}`;
        const lastRequest = await kv.get<number>(rateLimitKey);

        if (lastRequest && Date.now() - lastRequest < RATE_LIMIT_WINDOW) {
            return NextResponse.json(
                { error: 'Вы уже отправляли сообщение сегодня. Пожалуйста, подождите.' },
                { status: 429 }
            );
        }

        // 2. Turnstile Verification
        const secretKey = process.env.TURNSTILE_SECRET_KEY;
        if (!secretKey) {
            console.error('TURNSTILE_SECRET_KEY is missing');
            // If key is missing in dev, maybe allow? Better to fail safe.
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const turnstileFormData = new FormData();
        turnstileFormData.append('secret', secretKey);
        turnstileFormData.append('response', token);
        turnstileFormData.append('remoteip', ip);

        const turnstileRes = await fetch(TURNSTILE_VERIFY_FILE, {
            method: 'POST',
            body: turnstileFormData,
        });

        const turnstileData = await turnstileRes.json();
        if (!turnstileData.success) {
            return NextResponse.json(
                { error: 'Ошибка проверки безопасности (Captch). Попробуйте снова.' },
                { status: 400 }
            );
        }

        // 3. Save to KV (Individual Keys with TTL for Auto-Delete)
        const ticketId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const ticket = {
            id: ticketId,
            name,
            email,
            type,
            message,
            ip,
            createdAt: new Date().toISOString(),
            status: 'new'
        };

        // Key format: ticket:TIMESTAMP:ID
        // This allows easy sorting and finding
        const key = `ticket:${Date.now()}:${ticketId}`;

        // Save with 7 days expiration (604800 seconds)
        // This ensures data automatically deletes itself after a week!
        await kv.set(key, ticket, { ex: 604800 });

        // Update rate limit
        await kv.set(rateLimitKey, Date.now(), { ex: 86400 });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Support API Error:', error);
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        );
    }
}
