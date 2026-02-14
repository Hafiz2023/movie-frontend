import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';


export async function GET() {
    // Mock data for build
    return NextResponse.json([
        { id: 1, name: 'Amateur' },
        { id: 2, name: 'Milf' },
        { id: 3, name: 'Teen' },
        { id: 4, name: 'Hentai' }
    ]);
}

export async function POST(req: Request) {
    return NextResponse.json({ id: 99, name: 'New Category' }, { status: 201 });
}
