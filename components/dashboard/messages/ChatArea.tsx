import React from 'react';
import { MoreVertical, Paperclip, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatAreaProps {
    currentChat: { name: string; avatar: string };
}

export default function ChatArea({ currentChat }: ChatAreaProps) {
    return (
        <div className="flex-1 flex flex-col bg-background/50 backdrop-blur-sm relative">
            <div className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-card/30">
                <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-primary/20">
                        <AvatarImage src={`https://avatar.vercel.sh/${currentChat.avatar}.png`} />
                        <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-bold text-sm">{currentChat.name}</h3>
                        <p className="text-xs text-green-500">Online</p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="hover:bg-white/10 rounded-full">
                    <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </Button>
            </div>

            {/* Messages List */}
            <ScrollArea className="flex-1 p-6">
                <div className="space-y-6 flex flex-col">
                    <div className="flex justify-center">
                        <span className="text-xs text-muted-foreground bg-card/50 px-3 py-1 rounded-full border border-white/5">Today, 2:45 PM</span>
                    </div>

                    <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="w-8 h-8 self-end">
                            <AvatarImage src={`https://avatar.vercel.sh/${currentChat.avatar}.png`} />
                            <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="bg-card/80 p-3 rounded-2xl rounded-bl-sm border border-white/5 text-sm">
                            Hey! Loved your new video.
                        </div>
                    </div>

                    <div className="flex gap-3 max-w-[80%] self-end flex-row-reverse">
                        <div className="bg-primary/20 text-primary-foreground p-3 rounded-2xl rounded-br-sm border border-primary/30 text-sm">
                            Thanks so much! Glad you liked it.
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 bg-card/30 border-t border-white/5 backdrop-blur-md">
                <div className="flex gap-2 bg-background/50 p-2 rounded-xl border border-white/10 group focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(255,0,0,0.1)] transition-all">
                    <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-white rounded-lg">
                        <Paperclip className="w-5 h-5" />
                    </Button>
                    <input
                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground px-2"
                        placeholder="Type a message..."
                    />
                    <Button size="icon" className="shrink-0 rounded-lg shadow-lg shadow-primary/25 hover:scale-105 transition-transform">
                        <Send className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
