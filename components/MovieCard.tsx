'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Link href={`/movies/${movie.id}`}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden rounded-lg bg-card shadow-lg transition-all hover:shadow-xl"
            >
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                    <Image
                        src={movie.image_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop'}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        <p className="text-white line-clamp-3 text-sm">{movie.description}</p>
                    </div>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="line-clamp-1 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                            {movie.title}
                        </h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">{movie.rating}</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{movie.release_year}</span>
                        <span className="capitalize">{movie.genre}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default MovieCard;
