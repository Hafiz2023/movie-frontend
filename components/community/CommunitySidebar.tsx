
import React from 'react';
import { TrendingUp, Clock, Star } from 'lucide-react';

interface CommunitySidebarProps {
    filter: string;
    setFilter: (filter: string) => void;
}

export default function CommunitySidebar({ filter, setFilter }: CommunitySidebarProps) {
    return (
        <div className="hidden lg:block space-y-6">
            <div className="bg-card rounded-xl p-4 border border-border sticky top-28">
                <h3 className="font-bold text-muted-foreground mb-4 px-2 uppercase text-xs tracking-wider">Feeds</h3>
                <div className="space-y-1">
                    {[
                        { name: 'Trending', icon: TrendingUp },
                        { name: 'Newest', icon: Clock },
                        { name: 'Top Rated', icon: Star },
                    ].map((item) => (
                        <button
                            key={item.name}
                            onClick={() => setFilter(item.name)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${filter === item.name
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </button>
                    ))}
                </div>

                <h3 className="font-bold text-muted-foreground mt-8 mb-4 px-2 uppercase text-xs tracking-wider">Popular Tags</h3>
                <div className="flex flex-wrap gap-2 px-2">
                    {['#Teen', '#Milf', '#Amateur', '#Asian', '#Hentai', '#Hardcore'].map(tag => (
                        <span key={tag} className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded hover:text-primary cursor-pointer transition-colors border border-border">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
