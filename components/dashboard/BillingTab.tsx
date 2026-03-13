'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import useAuthStore from '@/store/authStore';
import OrderDialog, { Order } from './billing/OrderDialog';
import { motion } from 'framer-motion';

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

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="border-white/5 bg-card/40 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-500" />
                    <CardHeader className="relative z-10 pb-4">
                        <CardTitle className="text-xl">Current Plan</CardTitle>
                        <CardDescription>You are currently on the <span className="font-bold text-primary">Premium Plan</span>.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10 pt-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-white/10 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors gap-4 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-foreground">Professional Plan</p>
                                    <p className="text-sm text-primary font-semibold">$12.00 <span className="text-muted-foreground font-normal">/ month</span></p>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full sm:w-auto border-white/10 hover:bg-white/10" onClick={() => toast.info('Billing portal coming soon!')}>Manage Subscription</Button>
                        </div>
                        <div className="text-sm text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/10 inline-block w-full text-center">
                            Next billing date is <span className="font-bold text-foreground mx-1">March 1, 2026</span>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="border-white/5 bg-card/40 backdrop-blur-md relative overflow-hidden group">
                    <CardHeader className="relative z-10 pb-4">
                        <CardTitle className="text-xl">Payment Method</CardTitle>
                        <CardDescription>Manage your payment details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10 pt-4">
                        <div className="flex items-center gap-4 p-4 border border-white/10 rounded-xl bg-secondary/10 hover:bg-secondary/30 transition-colors">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                <CreditCard className="w-6 h-6 text-foreground" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-foreground">Visa ending in <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded ml-1 tracking-wider">4242</span></p>
                                <p className="text-xs text-muted-foreground mt-0.5 font-medium">Expiry 12/2028</p>
                            </div>
                            <Button variant="ghost" size="sm" className="hover:bg-white/10 text-primary">Edit</Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="border-white/5 bg-card/40 backdrop-blur-md relative overflow-hidden group">
                    <CardHeader className="relative z-10 pb-4">
                        <CardTitle className="text-xl">Order History</CardTitle>
                        <CardDescription>Your recent transactions and subscriptions.</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10 pt-4">
                        <div className="space-y-4">
                            {orders.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No orders found.</p>
                            ) : (
                                <div className="border border-white/10 rounded-xl divide-y divide-white/5 overflow-hidden">
                                    {orders.map((order, idx) => (
                                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-white/5 transition-colors gap-4">
                                            <div className="flex-1">
                                                <p className="font-bold text-foreground">{order.plan} <span className="text-muted-foreground font-normal">({order.cycle})</span></p>
                                                <p className="text-xs text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-left sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                                                <div className="font-bold text-lg text-foreground">${order.price}</div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] uppercase font-bold bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full inline-block">
                                                        {order.status || 'Paid'}
                                                    </span>
                                                    <Button variant="ghost" size="sm" className="h-7 text-xs hover:bg-white/10" onClick={() => handleViewOrder(order)}>View Details</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Order Details Dialog */}
            <OrderDialog
                isOpen={isOrderDialogOpen}
                onOpenChange={setIsOrderDialogOpen}
                selectedOrder={selectedOrder}
            />
        </div>
    );
}
