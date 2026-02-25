
import { NextResponse } from 'next/server';


export const dynamic = 'force-dynamic';

export async function DELETE(_req: Request, _props: { params: Promise<{ id: string }> }) {
    // Mock response for build/demo
    return NextResponse.json({ message: 'Video deleted (Mock)' });
}

export async function PUT(_req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    // Mock response for build/demo
    return NextResponse.json({ id: params.id, updated: true });
}

