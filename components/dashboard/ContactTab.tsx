
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send, Search, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'react-toastify';
import useAuthStore from '@/store/authStore';

interface Ticket {
    id?: number;
    subject: string;
    message: string;
    phone?: string;
    createdAt?: string;
    date?: string;
}

export default function ContactTab() {
    const { user } = useAuthStore();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [ticketForm, setTicketForm] = useState({ subject: 'General Inquiry', message: '', phone: '' });
    const [sendingTicket, setSendingTicket] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);

    useEffect(() => {
        const fetchTickets = async () => {
            if (!user) return;
            try {
                const res = await fetch('/api/contact');
                if (res.ok) {
                    const data = await res.json();
                    setTickets(data);
                }
            } catch (error) {
                console.error("Failed to fetch tickets", error);
                toast.error("Failed to fetch tickets");
            }
        };
        fetchTickets();
    }, [user]);


    const handleSendTicket = async (e: React.FormEvent) => {
        e.preventDefault();
        setSendingTicket(true);
        try {
            const payload = {
                name: user?.name || 'User',
                email: user?.email || 'user@example.com',
                subject: ticketForm.subject,
                message: ticketForm.message,
                phone: ticketForm.phone,
                date: new Date().toISOString()
            };

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const newTicket = await res.json();
                setTickets(prev => [newTicket, ...prev]);
                toast.success("Message sent successfully!");
                setTicketForm(prev => ({ ...prev, message: '', phone: '' }));
            } else {
                toast.error("Failed to send message.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error sending message.");
        } finally {
            setSendingTicket(false);
        }
    };

    const handleViewTicket = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setIsTicketDialogOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-12">
                {/* Contact Form */}
                <Card className="md:col-span-5 lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Contact</CardTitle>
                        <CardDescription>Send us a message or report an issue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSendTicket} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <select
                                    id="subject"
                                    value={ticketForm.subject}
                                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Technical Issue">Technical Issue</option>
                                    <option value="Billing Support">Billing Support</option>
                                    <option value="Feature Request">Feature Request</option>
                                </select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={ticketForm.phone}
                                    onChange={(e) => setTicketForm({ ...ticketForm, phone: e.target.value })}
                                    placeholder="+1 (555) 000-0000"
                                    className="bg-background border-input"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                    id="message"
                                    value={ticketForm.message}
                                    onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                                    className="flex  w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Describe your issue or question..."
                                    required
                                />
                            </div>
                            <Button type="submit" disabled={sendingTicket || !ticketForm.message} className="w-full gap-2">
                                {sendingTicket ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Ticket History */}
                <Card className="md:col-span-7 lg:col-span-8">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Contact History</CardTitle>
                            <CardDescription>Your previous messages and their status.</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Search className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon"><Filter className="w-4 h-4" /></Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tickets.length === 0 ? (
                                <p className="text-center text-muted-foreground py-12">No contact history available.</p>
                            ) : (
                                tickets.map((ticket, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-semibold text-primary">ID #{ticket.id || (1000 + idx)}</span>
                                                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase">
                                                    SENT
                                                </span>
                                                {(ticket.createdAt || ticket.date) && <span className="text-xs text-muted-foreground ml-auto sm:ml-0">{new Date(ticket.createdAt || ticket.date!).toLocaleString()}</span>}
                                            </div>
                                            <h4 className="font-bold text-sm mb-1">{ticket.subject}</h4>
                                            <p className="text-sm text-muted-foreground line-clamp-2">{ticket.message}</p>
                                        </div>
                                        <div className="flex items-center sm:flex-col justify-between sm:justify-center gap-2 border-t sm:border-t-0 sm:border-l border-border pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0">
                                            <div className="text-xs text-center">
                                                <div className="font-medium">Status</div>
                                                <div className="text-muted-foreground">Open</div>
                                            </div>
                                            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleViewTicket(ticket)}>View</Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Ticket Details Dialog */}
            <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
                <DialogContent className=" bg-card border-border">
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
                                <p className="text-sm text-foreground">{(selectedTicket.createdAt || selectedTicket.date) ? new Date(selectedTicket.createdAt || selectedTicket.date!).toLocaleString() : 'Just now'}</p>
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
                        <Button variant="outline" onClick={() => setIsTicketDialogOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

