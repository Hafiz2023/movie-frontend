'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '@/store/authStore';
import TicketDialog, { Ticket } from './contact/TicketDialog';
import ContactForm from './contact/ContactForm';
import TicketHistory from './contact/TicketHistory';
import { motion } from 'framer-motion';
import { MessageSquareText } from 'lucide-react';

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
                // Remove or implement true fetching if needed
                const res = await fetch('/api/contact');
                if (res.ok) {
                    const data = await res.json();
                    setTickets(data);
                }
            } catch (error) {
                console.error("Failed to fetch tickets", error);
                // toast.error("Failed to fetch tickets");
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
        <div className="space-y-8 pb-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/40 p-6 rounded-2xl border border-border/50 backdrop-blur-md relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 flex items-center gap-4 w-full">
                    <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-500/30 shrink-0">
                        <MessageSquareText className="w-8 h-8 text-orange-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-orange-500/70">Support</h2>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            Help Center
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                            Create a support ticket and check your contact history.
                        </p>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid gap-6 lg:gap-8 lg:grid-cols-12 relative z-10">
                <ContactForm
                    ticketForm={ticketForm}
                    setTicketForm={setTicketForm}
                    handleSendTicket={handleSendTicket}
                    sendingTicket={sendingTicket}
                />

                <TicketHistory
                    tickets={tickets}
                    handleViewTicket={handleViewTicket}
                />
            </motion.div>

            {/* Ticket Details Dialog */}
            <TicketDialog
                isOpen={isTicketDialogOpen}
                onOpenChange={setIsTicketDialogOpen}
                selectedTicket={selectedTicket}
            />
        </div>
    );
}
