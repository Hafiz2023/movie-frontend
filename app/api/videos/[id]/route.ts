
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';


export const dynamic = 'force-dynamic';

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    // Mock response for build/demo
    return NextResponse.json({ message: 'Video deleted (Mock)' });
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    // Mock response for build/demo
    return NextResponse.json({ id: params.id, updated: true });
}

