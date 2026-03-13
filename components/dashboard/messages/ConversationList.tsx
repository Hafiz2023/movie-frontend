import React from 'react';
import { Mail, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface ChatPreview {
    id: number;
    name: string;
    active: boolean;
    unread: number;
    avatar: string;
    msg: string;
}

interface ConversationListProps {
    chats: ChatPreview[];
}

export default function ConversationList({ chats }: ConversationListProps) {
    return (
        <div className="w-1/3 border-r border-white/10 bg-card/80 flex flex-col backdrop-blur-md">
            <div className="p-4 border-b border-white/5 space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" /> Inbox
                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full ml-auto">3 New</span>
                </h2>
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-9 bg-background/50 border-white/10" placeholder="Search messages..." />
                </div>
            </div>

            <ScrollArea className="flex-1">
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className={`flex gap-3 p-4 cursor-pointer hover:bg-white/5 transition-colors border-l-2 ${chat.active ? 'border-primary bg-primary/5' : 'border-transparent'}`}
                    >
                        <div className="relative">
                            <Avatar className="w-12 h-12 border-2 border-background shadow-md">
                                <AvatarImage src={`https://avatar.vercel.sh/${chat.avatar}.png`} />
                                <AvatarFallback>{chat.name[0]}</AvatarFallback>
                            </Avatar>
                            {chat.unread > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white rounded-full border-2 border-card animation-bounce">
                                    {chat.unread}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className={`text-sm font-bold truncate ${chat.unread ? 'text-white' : 'text-muted-foreground'}`}>{chat.name}</h4>
                                <span className="text-xs text-muted-foreground">12m</span>
                            </div>
                            <p className={`text-xs truncate ${chat.unread ? 'text-primary/80 font-medium' : 'text-muted-foreground/60'}`}>
                                {chat.msg}
                            </p>
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
}
