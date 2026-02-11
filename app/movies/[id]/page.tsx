'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Play, Share2, Heart } from 'lucide-react';
import { MOCK_MOVIES } from '@/utils/mockData';
import { Movie } from '@/types';
import Loader from '@/components/Loader';
import { motion } from 'framer-motion';

export default function MovieDetailsPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const fetchMovie = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
            const foundMovie = MOCK_MOVIES.find(m => m.id === Number(id));
            setMovie(foundMovie || null);
            setLoading(false);
        };

        if (id) {
            fetchMovie();
        }
    }, [id]);

    if (loading) return <Loader />;

    if (!movie) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-bold">Movie not found</h2>
                <Link href="/movies" className="text-primary hover:underline">
                    Back to Movies
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Link href="/movies" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Movies
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] gap-8">
                {/* Movie Poster */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-2xl"
                >
                    <Image
                        src={movie.image_url || '/placeholder.jpg'}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Movie Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">{movie.title}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <span>{movie.release_year}</span>
                            <span>•</span>
                            <span className="capitalize">{movie.genre}</span>
                            <span>•</span>
                            <div className="flex items-center text-yellow-500">
                                <Star className="h-5 w-5 fill-current mr-1" />
                                <span className="text-foreground font-medium">{movie.rating}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-lg leading-relaxed text-muted-foreground">
                        {movie.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <button className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5">
                            <Play className="fill-current w-5 h-5" />
                            Watch Now
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors">
                            <Heart className="w-5 h-5" />
                            Add to List
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-colors">
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>
                    </div>

                    {/* Cast Wrapper (Mock) */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4 text-foreground">Top Cast</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex flex-col items-center gap-2 min-w-[100px]">
                                    <div className="w-20 h-20 rounded-full bg-gray-700 overflow-hidden relative">
                                        {/* Avatar placeholder */}
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">Actor {i}</div>
                                    </div>
                                    <span className="text-sm font-medium text-center">Actor Name</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
