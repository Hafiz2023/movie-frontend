
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPost: (content: string, tags: string[]) => void;
}

export default function CreatePostModal({ isOpen, onClose, onPost }: CreatePostModalProps) {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPost(content, tags.split(',').map(t => t.trim()).filter(Boolean));
        setContent('');
        setTags('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <h3 className="font-bold text-foreground">Create New Post</h3>
                            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4">
                            <div className="flex gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground border border-primary">
                                    U
                                </div>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="What's on your mind?"
                                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground resize-none outline-none min-h-[120px]"
                                    autoFocus
                                />
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="Add tags (comma separated)..."
                                    className="w-full bg-secondary text-sm text-foreground px-3 py-2 rounded border border-border focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="flex justify-end pt-2 border-t border-border">
                                <button
                                    type="submit"
                                    disabled={!content.trim()}
                                    className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-bold px-6 py-2 rounded-full transition-colors"
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
