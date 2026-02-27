'use client';

import React from 'react';
import { Mail, MailOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Message } from './MessageRow';

interface MessageCardProps {
    msg: Message;
    index: number;
    isRead: boolean;
    isExpanded: boolean;
    onExpand: (id: number) => void;
}

export default function MessageCard({ msg, index, isRead, isExpanded, onExpand }: MessageCardProps) {
    return (
        <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-3 sm:p-4 space-y-2 cursor-pointer transition-all duration-200 active:bg-muted/30 ${isRead ? 'hover:bg-muted/20' : 'bg-primary/[0.02] hover:bg-primary/[0.05]'
                }`}
            onClick={() => onExpand(msg.id)}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                    {isRead ? (
                        <MailOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                        <Mail className="h-4 w-4 text-primary shrink-0" />
                    )}
                    <span className={`text-sm truncate ${isRead ? '' : 'font-semibold'}`}>{msg.name}</span>
                </div>
                <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
            </div>
            <div className="pl-6">
                <span className="inline-flex items-center bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-medium border border-primary/15 mb-1">
                    {msg.subject}
                </span>
                <p className="text-xs text-muted-foreground line-clamp-2">{msg.message}</p>
            </div>

            {/* Expanded on mobile */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="mt-3 pt-3 border-t border-border/30 pl-6">
                            <p className="text-xs text-muted-foreground mb-1">{msg.email}</p>
                            <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
