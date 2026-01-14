import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

const ADMIN_USER = process.env.ADMIN_USER || 'IronSpectre';
const ADMIN_PASS = process.env.ADMIN_PASS || 'NeonHorizon2026!';

export async function GET(req: NextRequest) {
    // Basic Auth Check
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
        return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="System Core"' } });
    }

    const b64auth = authHeader.split(' ')[1];
    const [user, pass] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    try {
        // Fetch all tickets from Redis List
        // lrange support_tickets 0 -1 returns all elements
        const tickets = await kv.lrange('support_tickets', 0, -1);

        return NextResponse.json(tickets);
    } catch (error) {
        console.error('Admin API Error:', error);
        return NextResponse.json({ error: 'Database Error' }, { status: 500 });
    }
}
