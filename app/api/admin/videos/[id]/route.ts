import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

        const body = await req.json();
        const { title, description, video_url, thumbnail_url, categoryName } = body;

        let categoryId: number | undefined;

        if (categoryName) {
            let category = await prisma.category.findUnique({
                where: { name: categoryName }
            });
            if (!category) {
                category = await prisma.category.create({
                    data: { name: categoryName }
                });
            }
            categoryId = category.id;
        }

        const dataToUpdate = {
            title,
            description,
            video_url,
            thumbnail_url,
            categoryId
        };

        // Remove undefined fields cleanly
        const cleanedData = Object.fromEntries(
            Object.entries(dataToUpdate).filter(([, v]) => v !== undefined)
        );

        const updatedVideo = await prisma.video.update({
            where: { id },
            data: cleanedData,
            include: {
                user: true,
                category: true
            }
        });

        const formattedVideo = {
            id: updatedVideo.id,
            title: updatedVideo.title,
            description: updatedVideo.description,
            video_url: updatedVideo.video_url,
            thumbnail_url: updatedVideo.thumbnail_url,
            category: updatedVideo.category.name,
            views: updatedVideo.views,
            likes: '0',
            author: updatedVideo.user.name,
            author_avatar: updatedVideo.user.avatar || 'https://github.com/shadcn.png',
            date: updatedVideo.createdAt.toLocaleDateString(),
            duration: updatedVideo.duration,
            tags: [],
        };

        return NextResponse.json(formattedVideo, { status: 200 });

    } catch (error) {
        console.error('Error updating video:', error);
        return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        if (isNaN(id)) return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });

        await prisma.video.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Video deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting video:', error);
        return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
    }
}
