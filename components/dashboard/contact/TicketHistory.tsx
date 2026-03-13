import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Ticket } from './TicketDialog';

interface TicketHistoryProps {
    tickets: Ticket[];
    handleViewTicket: (ticket: Ticket) => void;
}

export default function TicketHistory({ tickets, handleViewTicket }: TicketHistoryProps) {
    return (
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
    );
}
