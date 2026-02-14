'use client';

import React, { useState } from 'react';
import {
  Menu,
  Search,
  Flame,
  Clock,
  ThumbsUp,
  Home as HomeIcon,
  Film,
  Users,
  Star
} from 'lucide-react';

import VideoCard from '@/components/VideoCard';
import { MOCK_VIDEOS } from '@/utils/mockData';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import useUIStore from '@/store/uiStore';
import HeroSlider from '@/components/HeroSlider';

// ... (imports)

export default function Home() {
  const { isSidebarOpen, closeSidebar, toggleSidebar } = useUIStore();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const categoryFilter = searchParams.get('category');
  const tagFilter = searchParams.get('tag');

  const filteredVideos = MOCK_VIDEOS.filter(video => {
    // 1. Search Query Filter
    if (searchQuery) {
      const matchesTitle = video.title.toLowerCase().includes(searchQuery);
      const matchesDesc = video.description?.toLowerCase().includes(searchQuery);
      const matchesTags = video.tags?.some(t => t.toLowerCase().includes(searchQuery));
      if (!matchesTitle && !matchesDesc && !matchesTags) return false;
    }

    // 2. Category Filter
    if (categoryFilter && video.category !== categoryFilter) {
      return false;
    }

    // 3. Tag Filter
    if (tagFilter) {
      const matchesTag = video.tags?.some(t => t.toLowerCase() === tagFilter.toLowerCase());
      if (!matchesTag) return false;
    }

    return true;
  });

  return (
    <div className="flex min-h-screen bg-background text-foreground relative">

      {/* Sidebar - Desktop Only */}
      <aside
        className="hidden lg:block fixed top-16 left-0 bottom-0 z-40 w-64 bg-card/50 backdrop-blur-xl border-r border-border overflow-y-auto no-scrollbar shrink-0 h-[calc(100vh-4rem)]"
      >
        <div className="p-4 space-y-6">
          <div className="space-y-1">
            <Link href="/" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${!categoryFilter && !tagFilter ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:bg-white/5 hover:text-white'}`}>
              <HomeIcon className="w-5 h-5" /> Home
            </Link>
            <Link href="/videos" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white rounded-lg transition-all">
              <Film className="w-5 h-5" /> All Videos
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white rounded-lg transition-all">
              <Clock className="w-5 h-5" /> History
            </Link>
            <Link href="/categories" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-white rounded-lg transition-all">
              <ThumbsUp className="w-5 h-5" /> Top Rated
            </Link>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h3 className="px-4 text-xs font-bold text-muted-foreground/70 uppercase mb-3 tracking-wider">Categories</h3>
            <div className="space-y-1">
              {['Amateur', 'Couple', 'Threesome', 'Group', 'Milf', 'Teen', 'Hentai', 'Asian', 'Ebony', 'Latina', 'Lesbian', 'VR'].map(cat => (
                <Link
                  key={cat}
                  href={`/?category=${cat}`}
                  className={`block px-4 py-2 text-sm rounded-lg transition-all ${categoryFilter === cat ? 'bg-primary/20 text-primary font-bold' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h3 className="px-4 text-xs font-bold text-muted-foreground/70 uppercase mb-3 tracking-wider">Network</h3>
            <div className="space-y-1">
              <Link href="/community" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-all hover:bg-white/5 rounded-lg">
                <Users className="w-4 h-4" /> Community
              </Link>
              <Link href="/models" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-all hover:bg-white/5 rounded-lg">
                <Star className="w-4 h-4" /> Pornstars
              </Link>
              <Link href="/live" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-white transition-all hover:bg-white/5 rounded-lg">
                <Flame className="w-4 h-4 text-primary animate-pulse" /> Live Cams
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full p-4 md:p-6 lg:p-8 overflow-x-hidden pt-6 lg:ml-64">

        <div className="max-w-[1800px] mx-auto">

          {/* Hero Section with Slider */}
          {!searchQuery && !categoryFilter && !tagFilter && (
            <HeroSlider />
          )}

          {/* Top Filters / Tags */}
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
                        // Deterministic views based on id instead of index to correct hydration error
                        views: typeof video.views === 'number' ? video.views : 10000 + (video.id * 5432 % 500000)
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-muted-foreground bg-card/30 rounded-3xl border border-white/5">
                  <div className="bg-secondary p-6 rounded-full mb-6">
                    <Search className="w-10 h-10 opacity-50" />
                  </div>
                  <p className="text-lg font-medium">No videos found matching your criteria.</p>
                  <Link href="/" className="mt-6 text-primary hover:text-primary/80 font-bold hover:underline">Return Home</Link>
                </div>
              )}
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
