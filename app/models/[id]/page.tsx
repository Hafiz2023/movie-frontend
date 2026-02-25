'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useModelProfile from '@/hooks/useModelProfile';
import {
    ProfileCoverBanner,
    ProfileHeader,
    ProfileTabs,
    ProfileVideosTab,
    ProfilePhotosTab,
    ProfileAboutTab,
    ProfileActivityTab,
    ProfileNotFound,
} from '@/components/models/profile';

export default function ModelProfilePage() {
    const { profileData, activeTab, setActiveTab, isNotFound } = useModelProfile();

    if (isNotFound || !profileData) {
        return <ProfileNotFound />;
    }

    const { model, displayVideos, stats, interests, bio } = profileData;

    return (
        <div className="min-h-screen bg-black text-white pb-16 sm:pb-20">
            {/* Cover Banner */}
            <ProfileCoverBanner />

            {/* Profile Content */}
            <div className="container mx-auto px-3 sm:px-4 -mt-12 sm:-mt-16 relative z-10">
                {/* Header — Avatar + Stats + Actions */}
                <ProfileHeader model={model} />

                {/* Tab Navigation */}
                <ProfileTabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    videosCount={displayVideos.length}
                />

                {/* Tab Content */}
                <div className="min-h-[300px] sm:min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'videos' && (
                                <ProfileVideosTab videos={displayVideos} />
                            )}

                            {activeTab === 'photos' && (
                                <ProfilePhotosTab
                                    modelId={model.id}
                                    modelName={model.name}
                                />
                            )}

                            {activeTab === 'about' && (
                                <ProfileAboutTab
                                    modelName={model.name}
                                    bio={bio}
                                    interests={interests}
                                    stats={stats}
                                />
                            )}

                            {activeTab === 'activity' && (
                                <ProfileActivityTab model={model} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
