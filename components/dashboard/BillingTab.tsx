'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '@/store/authStore';
import { CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { CurrentPlanCard, PaymentMethodCard, OrderHistoryCard, OrderDialog, Order } from './billing';

export default function BillingTab() {
    const { user } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const res = await fetch('/api/orders');
                if (res.ok) {
                    const data = await res.json();
                    setOrders(data);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
                toast.error("Failed to fetch orders");
            }
        };

        fetchOrders();
    }, [user]);

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order);
        setIsOrderDialogOpen(true);
    };

    return (
        <div className="space-y-6 pb-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/40 p-6 rounded-2xl border border-border/50 backdrop-blur-md relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4 w-full">
                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 shrink-0">
                        <CreditCard className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-blue-500/70">Billing & Plans</h2>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            Subscription
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                            Manage your premium membership and payment methods.
                        </p>
                    </div>
                </div>
            </motion.div>

            <CurrentPlanCard />
            <PaymentMethodCard />
            <OrderHistoryCard orders={orders} onViewOrder={handleViewOrder} />

            {/* Order Details Dialog */}
            <OrderDialog
                isOpen={isOrderDialogOpen}
                onOpenChange={setIsOrderDialogOpen}
                selectedOrder={selectedOrder}
            />
        </div>
    );
}
