'use client';

import React from 'react';
import { Flame } from 'lucide-react';
import VideoCard from '@/components/video/VideoCard';
import EmptyState from '@/components/ui/EmptyState';
import { MOCK_VIDEOS } from '@/utils/mockData';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import HeroSlider from '@/components/home/HeroSlider';
import Sidebar from '@/components/layout/Sidebar';

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const categoryFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');

  const filteredVideos = MOCK_VIDEOS.filter(video => {
    if (searchQuery) {
      const matchesTitle = video.title.toLowerCase().includes(searchQuery);
      const matchesDesc = video.description?.toLowerCase().includes(searchQuery);
      const matchesTags = video.tags?.some(t => t.toLowerCase().includes(searchQuery));
      if (!matchesTitle && !matchesDesc && !matchesTags) return false;
    }
    if (categoryFilter && video.category !== categoryFilter) return false;
    if (tagFilter) {
      const matchesTag = video.tags?.some(t => t.toLowerCase() === tagFilter.toLowerCase());
      if (!matchesTag) return false;
    }
    return true;
  });

  return (
    <div className="flex min-h-screen bg-background text-foreground relative">
      <Sidebar />

      <main className="flex-1 w-full p-4 md:p-6 lg:p-8 overflow-x-hidden pt-6 lg:ml-64">
        <div className="max-w-[1800px] mx-auto">

          {/* Hero Section */}
          {!searchQuery && !categoryFilter && !tagFilter && (
            <HeroSlider />
          )}

          {/* Popular Tags */}
          <div className="mb-8 flex flex-wrap gap-2 items-center">
            <span className="px-4 py-1.5 rounded-full bg-secondary/50 backdrop-blur text-xs font-bold text-muted-foreground uppercase tracking-widest border border-white/5">Popular Tags:</span>
            {['Japanese', 'Massage', 'POV', 'Hentai', 'Big Tits', 'Anal', 'Lesbian'].map(tag => (
              <Link
                key={tag}
                href={`/?tag=${tag}`}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${tagFilter === tag ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105' : 'bg-card hover:bg-white/10 hover:text-white border-white/10 hover:border-white/20'}`}
              >
                {tag}
              </Link>
            ))}
            {tagFilter && (
              <Link href="/" className="px-4 py-1.5 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs font-bold transition-all border border-destructive/20 ml-2">
                Clear Filter
              </Link>
            )}
          </div>

          {/* Content Grid */}
          <div className="space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-white">
                  <Flame className="w-6 h-6 text-primary filled-current" />
                  {tagFilter ? `Tagged: ${tagFilter}` : categoryFilter ? `Category: ${categoryFilter}` : 'Recommended for You'}
                </h1>
              </div>

              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                  {filteredVideos.map((video, idx) => (
                    <VideoCard
                      key={`${video.id}-${idx}`}
                      video={{
                        ...video,
                        views: typeof video.views === 'number' ? video.views : 10000 + (video.id * 5432 % 500000)
                      }}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No videos found matching your criteria."
                  actionLabel="Return Home"
                  actionHref="/"
                  className="bg-card/30 rounded-3xl border border-white/5"
                />
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary-foreground font-bold">Loading Experience...</div>}>
      <HomeContent />
    </React.Suspense>
  );
}
