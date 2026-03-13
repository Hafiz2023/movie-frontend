'use client';

/**
 * PAGE OVERVIEW: 
 * This page component handles the rendering and functionality for the "Home" section.
 * It connects the necessary data stores and components to provide a smooth user experience.
 */


import React from 'react';
import { Flame } from 'lucide-react';
import VideoCard from '@/components/video/VideoCard';
import EmptyState from '@/components/ui/EmptyState';
import { MOCK_VIDEOS } from '@/utils/mockData';

import { useSearchParams } from 'next/navigation';
import HeroSlider from '@/components/home/HeroSlider';
import Sidebar from '@/components/layout/Sidebar';
import PopularTags from '@/components/home/PopularTags';

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

      <main className="flex-1 w-full p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden pt-4 sm:pt-6 lg:ml-64">
        <div className="max-w-[1800px] mx-auto">

          {/* Hero Section */}
          {!searchQuery && !categoryFilter && !tagFilter && (
            <HeroSlider />
          )}

          {/* Popular Tags */}
          <PopularTags tagFilter={tagFilter} />

          {/* Content Grid */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10">
            <section>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold flex items-center gap-2 sm:gap-3 text-white">
                  <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-primary filled-current" />
                  {tagFilter ? `Tagged: ${tagFilter}` : categoryFilter ? `Category: ${categoryFilter}` : 'Recommended for You'}
                </h1>
              </div>

              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
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
                  className="bg-card/30 rounded-2xl sm:rounded-3xl border border-white/5"
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
