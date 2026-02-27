'use client';

import React from 'react';
import { Mail, MailOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Message {
    id: number;
    createdAt: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    isRead?: boolean;
}

interface MessageRowProps {
    msg: Message;
    index: number;
    isRead: boolean;
    onToggleRead: (id: number) => void;
    onExpand: (id: number) => void;
}

export default function MessageRow({ msg, index, isRead, onToggleRead, onExpand }: MessageRowProps) {
    return (
        <motion.tr
            key={msg.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * 0.04 }}
            className={`border-b border-border/30 cursor-pointer transition-all duration-200 group ${isRead ? 'hover:bg-muted/20' : 'bg-primary/[0.02] hover:bg-primary/[0.05]'
                }`}
            onClick={() => onExpand(msg.id)}
        >
            <td className="px-5 py-4">
                <button
                    onClick={e => { e.stopPropagation(); onToggleRead(msg.id); }}
                    className="hover:scale-110 transition-transform"
                    title={isRead ? 'Mark as unread' : 'Mark as read'}
                >
                    {isRead ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                </button>
            </td>
            <td className="px-5 py-4 whitespace-nowrap text-muted-foreground text-xs">
                {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </td>
            <td className={`px-5 py-4 ${isRead ? '' : 'font-semibold text-foreground'}`}>{msg.name}</td>
            <td className="px-5 py-4 text-muted-foreground">{msg.email}</td>
            <td className="px-5 py-4">
                <span className="inline-flex items-center bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium border border-primary/15">
                    {msg.subject}
                </span>
            </td>
            <td className="px-5 py-4 max-w-xs truncate text-muted-foreground" title={msg.message}>{msg.message}</td>
        </motion.tr>
    );
}
