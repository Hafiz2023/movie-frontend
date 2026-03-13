import React from 'react';
import { ConversationList, ChatPreview, ChatArea } from './messages';
import { motion } from 'framer-motion';

export default function MessagesTab() {
    const chats: ChatPreview[] = [
        { id: 1, name: 'Jessica Stars', active: true, unread: 2, avatar: '1', msg: 'Hey! Loved your new video.' },
        { id: 2, name: 'Admin Team', active: false, unread: 0, avatar: '2', msg: 'Your payout has been processed.' },
        { id: 3, name: 'Creator Support', active: false, unread: 0, avatar: '3', msg: 'Welcome to the premium program!' },
        { id: 4, name: 'Mike Johnson', active: false, unread: 1, avatar: '4', msg: 'Can we do a collab next week?' },
    ];

    const currentChat = { name: 'Jessica Stars', avatar: '1' };

    return (
        <div className="space-y-8 pb-10">
            {/* Same layout as Contact form without duplicate header to save vertical space if wanted, but lets use full UI */}
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden h-[700px] shadow-2xl relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Sidebar / Conversation List */}
                <div className="w-[320px] shrink-0 border-r border-white/10 relative z-10 bg-background/50">
                    <ConversationList chats={chats} />
                </div>

                {/* Main Chat Area */}
                <div className="flex-1 relative z-10 bg-background/20">
                    <ChatArea currentChat={currentChat} />
                </div>
            </motion.div>
        </div>
    );
}
