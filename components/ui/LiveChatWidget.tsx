'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can we help you today?", isBot: true }
    ]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMsg = message;
        setMessages(prev => [...prev, { id: Date.now(), text: userMsg, isBot: false }]);
        setMessage('');

        // Simulate Dynamic Support Agent Reply
        setTimeout(() => {
            let botReply = "Thanks for reaching out! A support agent will be with you shortly.";
            const lowerMsg = userMsg.toLowerCase();

            if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
                botReply = "Hi there! How can I assist you today?";
            } else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("subscription")) {
                botReply = "Our premium subscriptions start at $9.99/mo. Would you like a link to our billing page?";
            } else if (lowerMsg.includes("cancel")) {
                botReply = "You can cancel your subscription from your Dashboard settings anytime. Need a direct link?";
            } else if (lowerMsg.includes("video") || lowerMsg.includes("play") || lowerMsg.includes("watch")) {
                botReply = "Are you having issues playing videos? Try clearing your browser cache or switching to the HD option on the player.";
            } else if (lowerMsg.includes("affiliate") || lowerMsg.includes("earn")) {
                botReply = "Awesome! Check out our Affiliate Program link in the footer to start earning today!";
            } else if (lowerMsg.includes("thank")) {
                botReply = "You're very welcome! Have a great day!";
            }

            setMessages(prev => [...prev, { id: Date.now(), text: botReply, isBot: true }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col pointer-events-none">
            {/* The chat window */}
            <div className="pointer-events-auto">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="mb-4 w-[320px] sm:w-[380px] bg-card border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[450px]"
                        >
                            {/* Header */}
                            <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground shrink-0 cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-primary"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm tracking-wide">Live Support</h3>
                                        <p className="text-xs text-primary-foreground/80">Typically replies in a few minutes</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-primary-foreground/80 hover:text-white hover:bg-white/10 rounded-full transition-colors p-1"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50 flex flex-col no-scrollbar">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                        <div className={`max-w-[85%] p-3 text-sm rounded-2xl leading-relaxed ${msg.isBot
                                            ? 'bg-muted text-foreground rounded-tl-none border border-border/50 shadow-sm'
                                            : 'bg-primary text-primary-foreground rounded-br-none shadow-md shadow-primary/20'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-card border-t border-border shrink-0">
                                <form onSubmit={handleSend} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-background border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!message.trim()}
                                        className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground p-2.5 rounded-full transition-colors shrink-0 flex items-center justify-center"
                                    >
                                        <Send className="w-4 h-4 ml-0.5" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bubble Button */}
            <div className="pointer-events-auto mt-auto flex justify-end w-full">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 border border-white/10 ${isOpen
                        ? 'bg-card text-foreground hover:bg-muted'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/50'
                        }`}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
                </motion.button>
            </div>
        </div>
    );
};

export default LiveChatWidget;
