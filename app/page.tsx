'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import { MOCK_MOVIES } from '@/utils/mockData';

export default function Home() {
  const featuredMovie = MOCK_MOVIES[0]; // Just picking the first one for hero

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden rounded-xl">
        <Image
          src={featuredMovie.image_url || '/placeholder.jpg'}
          alt={featuredMovie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl flex flex-col gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2"
          >
            {featuredMovie.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-200 line-clamp-3 md:line-clamp-none max-w-2xl"
          >
            {featuredMovie.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <Link
              href={`/movies/${featuredMovie.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Play className="fill-current w-5 h-5" />
              Watch Now
            </Link>
            <Link
              href={`/movies/${featuredMovie.id}`}
              className="flex items-center gap-2 px-8 py-3 bg-secondary/80 text-secondary-foreground font-semibold rounded-lg hover:bg-secondary transition-colors backdrop-blur-sm"
            >
              <Info className="w-5 h-5" />
              More Info
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Featured Movies
          </h2>
          <Link href="/movies" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            View All &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {MOCK_MOVIES.slice(0, 5).map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Trending Now
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {MOCK_MOVIES.slice(0, 5).reverse().map((movie, index) => ( // Just reversing to make it look different
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
