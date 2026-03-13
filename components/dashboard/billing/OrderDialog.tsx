import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface Order {
    plan: string;
    cycle: string;
    createdAt: string;
    price: number | string;
    status?: string;
    paymentMethod: string;
    user?: { cardNumber?: string; phone?: string; name?: string; email?: string };
    userInfo?: { cardNumber?: string; phone?: string; name?: string; email?: string };
}

interface OrderDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedOrder: Order | null;
}

export default function OrderDialog({ isOpen, onOpenChange, selectedOrder }: OrderDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-card border-border">
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
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
