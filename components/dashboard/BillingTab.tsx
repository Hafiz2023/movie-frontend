
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, CreditCard } from 'lucide-react';
import { toast } from 'react-toastify';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useAuthStore from '@/store/authStore';

interface Order {
    plan: string;
    cycle: string;
    createdAt: string;
    price: number | string;
    status?: string;
    paymentMethod: string;
    user?: { cardNumber?: string; phone?: string; name?: string; email?: string };
    userInfo?: { cardNumber?: string; phone?: string; name?: string; email?: string };
}

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
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>You are currently on the <span className="font-bold text-primary">Premium Plan</span>.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/10">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-primary/20 rounded-full text-primary">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-semibold">Professional Plan</p>
                                <p className="text-sm text-muted-foreground">$12.00 / month</p>
                            </div>
                        </div>
                        <Button variant="outline" onClick={() => toast.info('Billing portal coming soon!')}>Manage Subscription</Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        <p>Next billing date is <span className="font-medium text-foreground">March 1, 2026</span>.</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Manage your payment details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border rounded-lg">
                        <CreditCard className="w-6 h-6 text-muted-foreground" />
                        <div className="flex-1">
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-xs text-muted-foreground">Expiry 12/2028</p>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>Your recent transactions and subscriptions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {orders.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">No orders found.</p>
                        ) : (
                            <div className="border rounded-md divide-y divide-border">
                                {orders.map((order, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                                        <div className="flex-1">
                                            <p className="font-medium">{order.plan} ({order.cycle})</p>
                                            <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${order.price}</p>
                                            <span className="text-[10px] uppercase font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full block w-fit ml-auto mb-1">
                                                {order.status || 'Paid'}
                                            </span>
                                            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => handleViewOrder(order)}>View Details</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Order Details Dialog */}
            <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
                <DialogContent className=" bg-card border-border">
                    <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                            Transaction details for your subscription.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1">
                                    <span className="text-sm font-semibold text-muted-foreground">Plan</span>
                                    <p className="font-medium text-foreground">{selectedOrder.plan} <span className="text-xs text-muted-foreground capitalize">({selectedOrder.cycle})</span></p>
                                </div>
                                <div className="grid gap-1">
                                    <span className="text-sm font-semibold text-muted-foreground">Amount</span>
                                    <p className="font-medium text-foreground">${selectedOrder.price}</p>
                                </div>
                                <div className="grid gap-1">
                                    <span className="text-sm font-semibold text-muted-foreground">Date</span>
                                    <p className="text-sm text-foreground">{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="grid gap-1">
                                    <span className="text-sm font-semibold text-muted-foreground">Status</span>
                                    <span className="text-xs uppercase font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded w-fit">
                                        {selectedOrder.status || 'Paid'}
                                    </span>
                                </div>
                            </div>
                            <div className="border-t border-border/50 pt-4 space-y-3">
                                <h4 className="font-semibold text-sm text-foreground">Payment Information</h4>
                                <div className="grid gap-1">
                                    <span className="text-sm font-semibold text-muted-foreground">Method</span>
                                    <p className="text-sm text-foreground capitalize">{selectedOrder.paymentMethod === 'card' ? 'Credit Card' : selectedOrder.paymentMethod}</p>
                                </div>
                                {selectedOrder.paymentMethod === 'card' && (selectedOrder.user?.cardNumber || selectedOrder.userInfo?.cardNumber) && (
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Card Number</span>
                                        <p className="text-sm text-foreground font-mono">**** **** **** {(selectedOrder.user?.cardNumber || selectedOrder.userInfo?.cardNumber)!.slice(-4) || '****'}</p>
                                    </div>
                                )}
                                {(selectedOrder.paymentMethod === 'easypaisa' || selectedOrder.paymentMethod === 'jazzcash') && (selectedOrder.user?.phone || selectedOrder.userInfo?.phone) && (
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Account Number</span>
                                        <p className="text-sm text-foreground font-mono">{selectedOrder.user?.phone || selectedOrder.userInfo?.phone}</p>
                                    </div>
                                )}
                            </div>
                            <div className="border-t border-border/50 pt-4 space-y-3">
                                <h4 className="font-semibold text-sm text-foreground">Billing Contact</h4>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Name</span>
                                        <p className="text-sm text-foreground">{selectedOrder.user?.name || selectedOrder.userInfo?.name || 'N/A'}</p>
                                    </div>
                                    <div className="grid gap-1">
                                        <span className="text-sm font-semibold text-muted-foreground">Email</span>
                                        <p className="text-sm text-foreground">{selectedOrder.user?.email || selectedOrder.userInfo?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

