
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Video, MessageSquare, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminStatsProps {
    usersCount: number;
    videosCount: number;
    postsCount: number;
    messagesCount: number;
}

export default function AdminStats({ usersCount, videosCount, postsCount, messagesCount }: AdminStatsProps) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div whileHover={{ y: -5 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{usersCount}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
                        <Video className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{videosCount}</div>
                        <p className="text-xs text-muted-foreground">Updated just now</p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Posts</CardTitle>
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{postsCount}</div>
                        <p className="text-xs text-muted-foreground">+5 today</p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Messages</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{messagesCount}</div>
                        <p className="text-xs text-muted-foreground">Inbox</p>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
