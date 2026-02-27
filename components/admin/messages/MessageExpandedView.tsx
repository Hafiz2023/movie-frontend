'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type Message } from './MessageRow';

interface MessageExpandedViewProps {
    expandedId: number | null;
    messages: Message[];
}

export default function MessageExpandedView({ expandedId, messages }: MessageExpandedViewProps) {
    return (
        <AnimatePresence>
            {expandedId && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border/50 overflow-hidden"
                >
                    {(() => {
                        const msg = messages.find(m => m.id === expandedId);
                        if (!msg) return null;
                        return (
                            <div className="p-6 bg-muted/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center font-bold text-primary text-sm border border-primary/20">
                                        {msg.name[0]?.toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground">{msg.name}</p>
                                        <p className="text-xs text-muted-foreground">{msg.email}</p>
                                    </div>
                                    <span className="ml-auto text-xs text-muted-foreground">
                                        {new Date(msg.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <div className="bg-card rounded-lg border border-border/50 p-4">
                                    <p className="text-sm font-medium text-foreground mb-2">{msg.subject}</p>
                                    <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                </div>
                            </div>
                        );
                    })()}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
