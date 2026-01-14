import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export const dynamic = 'force-dynamic';

const ADMIN_USER = process.env.ADMIN_USER || 'IronSpectre';
const ADMIN_PASS = process.env.ADMIN_PASS || 'NeonHorizon2026!';

async function checkAuth(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return false;
    const b64auth = authHeader.split(' ')[1];
    const [user, pass] = Buffer.from(b64auth, 'base64').toString().split(':');
    return user === ADMIN_USER && pass === ADMIN_PASS;
}

export async function GET(req: NextRequest) {
    if (!await checkAuth(req)) {
        return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="System Core"' } });
    }

    try {
        // 1. Get all keys matching "ticket:*"
        let keys = await kv.keys('ticket:*');

        // Also check legacy list for transition (optional, but good practice)
        // const legacyList = await kv.lrange('support_tickets', 0, -1);

        if (keys.length === 0) {
            return NextResponse.json([]);
        }

        // 2. Sort keys to show newest first (based on timestamp in key)
        // Format: ticket:TIMESTAMP:ID. Timestamp is index 1.
        keys.sort((a, b) => {
            const timeA = Number(a.split(':')[1]);
            const timeB = Number(b.split(':')[1]);
            return timeB - timeA; // Descending
        });

        // 3. Fetch values (MGET is more efficient than loop)
        const tickets = await kv.mget(...keys);

        return NextResponse.json(tickets);
    } catch (error) {
        console.error('Admin API Error:', error);
        return NextResponse.json({ error: 'Database Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    if (!await checkAuth(req)) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        // Clear all tickets
        const keys = await kv.keys('ticket:*');

        if (keys.length > 0) {
            await kv.del(...keys);
        }

        // Also clear legacy list if exists
        await kv.del('support_tickets');

        return NextResponse.json({ success: true, count: keys.length });
    } catch (error) {
        console.error('Admin Delete Error:', error);
        return NextResponse.json({ error: 'Failed to clear' }, { status: 500 });
    }
}
