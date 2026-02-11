'use client';

import React, { useState } from 'react';
import { MOCK_MOVIES } from '@/utils/mockData';
import MovieCard from '@/components/MovieCard';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MoviesPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMovies = MOCK_MOVIES.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col gap-8 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Explore Movies
                </h1>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search movies by title, genre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-secondary-foreground"
                    />
                </div>
            </div>

            <AnimatePresence>
                {filteredMovies.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredMovies.map((movie, index) => (
                            <motion.div
                                key={movie.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                                <MovieCard movie={movie} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center p-12 text-muted-foreground"
                    >
                        <p className="text-lg">No movies found matching "{searchTerm}"</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
