import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface Ticket {
    id?: number;
    subject: string;
    message: string;
    phone?: string;
    createdAt?: string;
    date?: string;
}

export interface TicketDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedTicket: Ticket | null;
}

export default function TicketDialog({ isOpen, onOpenChange, selectedTicket }: TicketDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-card border-border">
                <DialogHeader>
                    <DialogTitle>Message Details</DialogTitle>
                    <DialogDescription>
                        View the details of your submitted message.
                    </DialogDescription>
                </DialogHeader>
                {selectedTicket && (
                    <div className="space-y-4 py-4">
                        <div className="grid gap-1">
                            <span className="text-sm font-semibold text-muted-foreground">Subject</span>
                            <p className="font-medium text-foreground text-lg">{selectedTicket.subject}</p>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-sm font-semibold text-muted-foreground">Date Sent</span>
                            <p className="text-sm text-foreground">
                                {(selectedTicket.createdAt || selectedTicket.date)
                                    ? new Date(selectedTicket.createdAt || selectedTicket.date!).toLocaleString()
                                    : 'Just now'}
                            </p>
                        </div>
                        {selectedTicket.phone && (
                            <div className="grid gap-1">
                                <span className="text-sm font-semibold text-muted-foreground">Phone Number</span>
                                <p className="text-sm text-foreground">{selectedTicket.phone}</p>
                            </div>
                        )}
                        <div className="grid gap-1">
                            <span className="text-sm font-semibold text-muted-foreground">Message Body</span>
                            <div className="p-4 bg-secondary/20 rounded-lg text-sm leading-relaxed border border-border/50 overflow-y-auto">
                                {selectedTicket.message}
                            </div>
                        </div>
                        <div className="pt-4 border-t border-border/50 flex flex-col gap-2">
                            <span className="text-sm font-semibold text-muted-foreground">Admin Response</span>
                            <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                                <p className="text-sm text-foreground italic">Thank you for contacting us. Your message has been received and is being reviewed by our support team.</p>
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
