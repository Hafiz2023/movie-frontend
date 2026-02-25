'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

interface Message {
    id: number;
    createdAt: string;
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function MessagesInbox() {
    const [messages, setMessages] = useState<Message[]>([]);

    const fetchMessages = useCallback(async (signal?: AbortSignal) => {
        try {
            const res = await axios.get('/api/contact', { signal });
            setMessages(res.data);
        } catch (error: unknown) {
            if (error instanceof Error && error.name === 'CanceledError') return;
            console.error(error);
            toast.error("Failed to fetch messages");
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const loadData = async () => {
            await fetchMessages(controller.signal);
        };
        loadData();
        return () => controller.abort();
    }, [fetchMessages]);

    return (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
                <h2 className="text-xl font-bold">Support Inbox</h2>
                <Button variant="outline" size="sm" onClick={() => fetchMessages()}>Refresh</Button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
                        <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Subject</th>
                            <th className="px-6 py-3">Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <tr key={msg.id} className="border-b border-border hover:bg-muted/50">
                                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                                        {new Date(msg.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium">{msg.name}</td>
                                    <td className="px-6 py-4">{msg.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs border border-primary/20">
                                            {msg.subject}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 max-w-md truncate" title={msg.message}>
                                        {msg.message}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                    No messages found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
