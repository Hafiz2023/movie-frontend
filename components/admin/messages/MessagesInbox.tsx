'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Inbox, Loader2, Clock, User, AtSign, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminSearchInput, AdminSectionHeader } from '../common';
import MessageRow, { type Message } from './MessageRow';
import MessageCard from './MessageCard';
import MessageExpandedView from './MessageExpandedView';

const ITEMS_PER_PAGE = 8;

export default function MessagesInbox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [readIds, setReadIds] = useState<Set<number>>(new Set());

    const fetchMessages = useCallback(async (signal?: AbortSignal) => {
        try {
            setIsLoading(true);
            const res = await axios.get('/api/contact', { signal });
            setMessages(res.data);
        } catch (error: unknown) {
            if (error instanceof Error && error.name === 'CanceledError') return;
            console.error(error);
            toast.error('Failed to fetch messages');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        fetchMessages(controller.signal);
        return () => controller.abort();
    }, [fetchMessages]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await fetchMessages();
        setIsRefreshing(false);
        toast.success('Messages refreshed');
    };

    const handleToggleRead = (id: number) => {
        setReadIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleExpandMessage = (id: number) => {
        setExpandedId(prev => (prev === id ? null : id));
        if (!readIds.has(id)) {
            setReadIds(prev => new Set(prev).add(id));
        }
    };

    const filteredMessages = useMemo(() => {
        if (!searchQuery) return messages;
        const q = searchQuery.toLowerCase();
        return messages.filter(
            msg =>
                msg.name.toLowerCase().includes(q) ||
                msg.email.toLowerCase().includes(q) ||
                msg.subject.toLowerCase().includes(q) ||
                msg.message.toLowerCase().includes(q)
        );
    }, [messages, searchQuery]);

    const totalPages = Math.max(1, Math.ceil(filteredMessages.length / ITEMS_PER_PAGE));
    const paginatedMessages = filteredMessages.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => { setCurrentPage(1); }, [searchQuery]);

    const unreadCount = messages.filter(m => !readIds.has(m.id)).length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden"
        >
            <AdminSectionHeader
                icon={Inbox}
                title="Support Inbox"
                subtitle={`${filteredMessages.length} message${filteredMessages.length !== 1 ? 's' : ''}`}
                badge={unreadCount}
            >
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="gap-2 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200"
                >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                </Button>
            </AdminSectionHeader>

            {/* Search */}
            <div className="px-5 sm:px-6 py-4 border-b border-border/50">
                <AdminSearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search messages..."
                />
            </div>

            {/* Loading */}
            {isLoading && messages.length === 0 && (
                <div className="p-12 flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-sm text-muted-foreground">Loading messages...</p>
                </div>
            )}

            {/* Desktop Table (lg+) */}
            {!isLoading && (
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
                            <tr>
                                <th className="px-5 py-3.5 font-semibold w-8"></th>
                                <th className="px-5 py-3.5 font-semibold"><span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Date</span></th>
                                <th className="px-5 py-3.5 font-semibold"><span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Name</span></th>
                                <th className="px-5 py-3.5 font-semibold"><span className="flex items-center gap-1.5"><AtSign className="h-3.5 w-3.5" /> Email</span></th>
                                <th className="px-5 py-3.5 font-semibold"><span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> Subject</span></th>
                                <th className="px-5 py-3.5 font-semibold">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {paginatedMessages.length > 0 ? (
                                    paginatedMessages.map((msg, idx) => (
                                        <MessageRow
                                            key={msg.id}
                                            msg={msg}
                                            index={idx}
                                            isRead={readIds.has(msg.id)}
                                            onToggleRead={handleToggleRead}
                                            onExpand={handleExpandMessage}
                                        />
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                                                    <Inbox className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <p className="font-medium text-foreground">No messages found</p>
                                                <p className="text-sm text-muted-foreground">Your inbox is empty</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>

                    <MessageExpandedView expandedId={expandedId} messages={messages} />
                </div>
            )}

            {/* Mobile Card Layout (< lg) */}
            {!isLoading && (
                <div className="lg:hidden divide-y divide-border/30">
                    <AnimatePresence mode="popLayout">
                        {paginatedMessages.length > 0 ? (
                            paginatedMessages.map((msg, idx) => (
                                <MessageCard
                                    key={msg.id}
                                    msg={msg}
                                    index={idx}
                                    isRead={readIds.has(msg.id)}
                                    isExpanded={expandedId === msg.id}
                                    onExpand={handleExpandMessage}
                                />
                            ))
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 text-center">
                                <Inbox className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                                <p className="font-medium text-foreground">No messages</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground order-2 sm:order-1">
                        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredMessages.length)} of{' '}
                        {filteredMessages.length}
                    </p>
                    <div className="flex items-center gap-1.5 order-1 sm:order-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                            <ChevronLeft className="h-3.5 w-3.5" />
                        </Button>
                        <span className="text-xs text-muted-foreground px-2">{currentPage} / {totalPages}</span>
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
