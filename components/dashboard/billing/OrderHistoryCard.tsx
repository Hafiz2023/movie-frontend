import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Order } from './OrderDialog';

interface OrderHistoryCardProps {
    orders: Order[];
    onViewOrder: (order: Order) => void;
}

export default function OrderHistoryCard({ orders, onViewOrder }: OrderHistoryCardProps) {
    return (
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
                                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-white/5 transition-colors gap-4 group/row">
                                        <div className="flex-1">
                                            <p className="font-bold text-foreground">{order.plan} <span className="text-muted-foreground font-normal">({order.cycle})</span></p>
                                            <p className="text-xs text-muted-foreground mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-left sm:text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                                            <div className="font-bold text-lg text-foreground">${order.price}</div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] uppercase font-bold bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full inline-block group-hover/row:scale-105 transition-transform">
                                                    {order.status || 'Paid'}
                                                </span>
                                                <Button variant="ghost" size="sm" className="h-7 text-xs hover:bg-white/10 hover:-translate-y-0.5 transition-all" onClick={() => onViewOrder(order)}>View Details</Button>
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
    );
}
