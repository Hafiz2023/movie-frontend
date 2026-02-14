
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useCommunityStore } from '@/store/communityStore';

export default function CommunityManager() {
    const { posts, deletePost } = useCommunityStore();

    const handleDeletePost = (id: number) => {
        if (confirm("Are you sure you want to delete this post?")) {
            deletePost(id);
            toast.success("Post deleted from Community.");
        }
    };

    return (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold">Community Posts Manager</h2>
            </div>
            <div className="divide-y divide-border">
                {posts.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                        No posts found.
                    </div>
                ) : (
                    posts.map(post => (
                        <div key={post.id} className="p-4 flex items-start justify-between hover:bg-muted/50 transition-colors">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                    {post.avatar}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-sm">{post.user}</span>
                                        <span className="text-xs text-muted-foreground">{post.time}</span>
                                    </div>
                                    <p className="text-sm text-foreground/80 mb-2">{post.content}</p>
                                    <div className="flex gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground">#{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeletePost(post.id)}
                                className="shrink-0"
                            >
                                <Trash2 className="w-4 h-4 mr-1" /> Delete
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
