import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const videos = await prisma.video.findMany({
            include: {
                category: true,
                user: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // Map Prisma video model to AdminVideo attributes expectations
        const formattedVideos = videos.map((v) => ({
            id: v.id,
            title: v.title,
            description: v.description,
            video_url: v.video_url,
            thumbnail_url: v.thumbnail_url,
            category: v.category?.name || 'Uncategorized',
            views: v.views,
            likes: '0',
            author: v.user?.name || 'Admin',
            author_avatar: v.user?.avatar || 'https://github.com/shadcn.png',
            date: v.createdAt.toLocaleDateString(),
            duration: v.duration,
            tags: [],
        }));

        return NextResponse.json(formattedVideos, { status: 200 });
    } catch (error) {
        console.error('Error fetching admin videos:', error);
        return NextResponse.json({ error: 'Failed to yield videos' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, description, video_url, thumbnail_url, categoryName } = body;

        if (!title || !video_url || !thumbnail_url) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Ensure a user exists (Since we don't have proper auth session setup to rely on here, lets use first user)
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: { email: 'admin@demo.com', password: '123', name: 'Admin User', role: 'admin' }
            });
        }

        // 2. Safely find or create category
        let category = await prisma.category.findUnique({
            where: { name: categoryName || 'Misc' }
        });
        if (!category) {
            category = await prisma.category.create({
                data: { name: categoryName || 'Misc' }
            });
        }

        const newVideo = await prisma.video.create({
            data: {
                title,
                description: description || 'Uploaded via Admin Panel',
                video_url,
                thumbnail_url,
                duration: '10:00',
                userId: user.id,
                categoryId: category.id,
            },
            include: {
                user: true,
                category: true
            }
        });

        // Format similarly to GET
        const formattedVideo = {
            id: newVideo.id,
            title: newVideo.title,
            description: newVideo.description,
            video_url: newVideo.video_url,
            thumbnail_url: newVideo.thumbnail_url,
            category: newVideo.category.name,
            views: newVideo.views,
            likes: '0',
            author: newVideo.user.name,
            author_avatar: newVideo.user.avatar || 'https://github.com/shadcn.png',
            date: newVideo.createdAt.toLocaleDateString(),
            duration: newVideo.duration,
            tags: [],
        };

        return NextResponse.json(formattedVideo, { status: 201 });
    } catch (error) {
        console.error('Error creating video:', error);
        return NextResponse.json({ error: 'Failed to create video', details: error }, { status: 500 });
    }
}
