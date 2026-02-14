
import { NextResponse } from 'next/server';
import { getMessages, saveMessage } from '@/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const messages = getMessages();
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}

// ... (imports)

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, subject, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newMessage = saveMessage({ name, email, phone, subject, message });

        return NextResponse.json(newMessage, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }
}
