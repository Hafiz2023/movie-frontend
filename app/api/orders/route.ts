
import { NextResponse } from 'next/server';
import { getOrders, saveOrder } from '@/lib/mockDb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const orders = getOrders();
        return NextResponse.json(orders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Allow basic order info. In a real app we'd validate more strictly.
        const { plan, price, cycle, paymentMethod, user: userInfo } = body;

        if (!plan || !price) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newOrder = saveOrder({
            plan,
            price,
            cycle,
            paymentMethod,
            user: userInfo,
            status: 'completed' // Mock successful payment
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save order' }, { status: 500 });
    }
}
