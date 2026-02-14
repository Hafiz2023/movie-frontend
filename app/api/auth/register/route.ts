
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';
import { findUserByEmail, saveUser, getUsers } from '@/lib/mockDb';

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);

        if (!body) {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { name, email, password } = body;

        console.log("Register attempt for:", email);

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Use Mock DB
        const existingUser = findUserByEmail(email);

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a new ID (Mock Auto Increment)
        const users = getUsers();
        const newId = users.length > 0 ? Math.max(...users.map((u: any) => u.id)) + 1 : 1;

        const user = {
            id: newId,
            name,
            email,
            password: hashedPassword,
            role: 'user',
            avatar: '',
            createdAt: new Date().toISOString()
        };

        saveUser(user);

        const token = signToken({ userId: user.id, role: user.role });

        return NextResponse.json({
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
            token
        }, { status: 201 });

    } catch (error: any) {
        console.error("Registration critical error:", error);
        return NextResponse.json({
            error: 'Internal server error',
            details: error.message
        }, { status: 500 });
    }
}
