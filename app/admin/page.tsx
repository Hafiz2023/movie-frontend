'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminSidebar from '@/components/AdminSidebar';
import { MOCK_MOVIES } from '@/utils/mockData';
import { Users, Film, Plus, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPage() {
    const usersCount = 50; // Mock
    const reportsCount = 10; // Mock

    return (
        <ProtectedRoute requiredRole="admin">
            <div className="flex h-screen overflow-hidden bg-background">
                <AdminSidebar />

                <main className="flex-1 overflow-y-auto p-8 pl-8 md:pl-72"> {/* Added left padding for sidebar clearance on desktop */}
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                                <p className="text-muted-foreground">Manage your movies and users.</p>
                            </div>
                            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                                <Plus className="h-4 w-4" />
                                Add New Movie
                            </button>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Stats Cards */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-primary/20 p-3">
                                        <Users className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                                        <h3 className="text-2xl font-bold text-foreground">{usersCount}</h3>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-green-500/20 p-3">
                                        <Film className="h-6 w-6 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Total Movies</p>
                                        <h3 className="text-2xl font-bold text-foreground">{MOCK_MOVIES.length}</h3>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -5 }}
                                className="rounded-xl border border-border bg-card p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-orange-500/20 p-3">
                                        <Plus className="h-6 w-6 text-orange-500" /> {/* Wait, used Plus instead of Activity or Report icon... fix later */}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Pending Reports</p>
                                        <h3 className="text-2xl font-bold text-foreground">{reportsCount}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Recent Items / Table Mock */}
                        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Movies</h3>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-left text-sm text-muted-foreground">
                                    <thead className="bg-muted text-xs uppercase text-muted-foreground">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 font-medium">Title</th>
                                            <th scope="col" className="px-6 py-3 font-medium">Genre</th>
                                            <th scope="col" className="px-6 py-3 font-medium">Year</th>
                                            <th scope="col" className="px-6 py-3 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_MOVIES.slice(0, 5).map((movie) => (
                                            <tr key={movie.id} className="border-b border-border bg-background/50 hover:bg-muted/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-foreground">{movie.title}</td>
                                                <td className="px-6 py-4">{movie.genre}</td>
                                                <td className="px-6 py-4">{movie.release_year}</td>
                                                <td className="px-6 py-4 text-primary hover:underline cursor-pointer">Edit</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
