import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

export interface TicketFormData {
    subject: string;
    message: string;
    phone: string;
}

interface ContactFormProps {
    ticketForm: TicketFormData;
    setTicketForm: React.Dispatch<React.SetStateAction<TicketFormData>>;
    handleSendTicket: (e: React.FormEvent) => Promise<void>;
    sendingTicket: boolean;
}

export default function ContactForm({
    ticketForm,
    setTicketForm,
    handleSendTicket,
    sendingTicket
}: ContactFormProps) {
    return (
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
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
    );
}
