
import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(req: Request) {
    // Mock data for build
    return NextResponse.json([
        {
            id: 1,
            title: 'Mock Video',
            thumbnail_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
            views: 100,
            user: { name: 'Mock User', avatar: '' },
            category: { name: 'Mock Category' }
        }
    ]);
}

export async function POST(req: Request) {
    return NextResponse.json({ id: 100, title: 'New Mock Video' }, { status: 201 });
}
