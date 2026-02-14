
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { findUserByEmail } from '@/lib/mockDb';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);

        if (!body) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { email, password } = body;
        console.log("Login attempt for:", email);

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Use Mock DB instead of Prisma
        const user = findUserByEmail(email);

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = signToken({ userId: user.id, role: user.role });

        return NextResponse.json({
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
            token
        });

    } catch (error: any) {
        console.error("Login critical error:", error);
        return NextResponse.json({
            error: 'Internal server error',
            details: error.message
        }, { status: 500 });
    }
}
