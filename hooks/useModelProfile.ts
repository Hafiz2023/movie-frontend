'use client';

import { useState, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_MODELS, MOCK_VIDEOS } from '@/utils/mockData';
import { Model, MockVideo } from '@/types';

export type ProfileTab = 'videos' | 'photos' | 'about' | 'activity';

export interface ModelStats {
    [key: string]: string;
    age: string;
    height: string;
    location: string;
    joined: string;
    relationship: string;
}

export interface ModelProfileData {
    model: Model;
    displayVideos: MockVideo[];
    stats: ModelStats;
    interests: string[];
    bio: string;
}

interface UseModelProfileReturn {
    profileData: ModelProfileData | null;
    activeTab: ProfileTab;
    setActiveTab: (tab: ProfileTab) => void;
    isNotFound: boolean;
}

const DEFAULT_STATS: ModelStats = {
    age: '24',
    height: '5\'7"',
    location: 'Los Angeles, CA',
    joined: 'Oct 2023',
    relationship: 'Single',
};

const DEFAULT_INTERESTS = [
    'Travel', 'Fitness', 'Gaming', 'Cosplay', 'Fashion', 'Beach', 'Photography',
];

const DEFAULT_BIO = `Hi loves! Welcome to my official page. I love creating content that captures my wild adventures and intimate moments.
Make sure to subscribe to see exclusive behind-the-scenes footage and daily updates.
I try to reply to all my DMs so don't be shy!

Posting new videos every Tuesday and Friday! ✨`;

export default function useModelProfile(): UseModelProfileReturn {
    const params = useParams();
    const id = Number(params.id);
    const [activeTab, setActiveTab] = useState<ProfileTab>('videos');

    const model = useMemo(
        () => MOCK_MODELS.find((m) => m.id === id) || null,
        [id]
    );

    const displayVideos = useMemo(() => {
        if (!model) return [];
        const modelVideos = MOCK_VIDEOS.filter((v) => v.author === model.name);
        return modelVideos.length > 0 ? modelVideos : MOCK_VIDEOS.slice(0, 4);
    }, [model]);

    const handleSetActiveTab = useCallback((tab: ProfileTab) => {
        setActiveTab(tab);
    }, []);

    const profileData: ModelProfileData | null = useMemo(() => {
        if (!model) return null;
        return {
            model,
            displayVideos,
            stats: DEFAULT_STATS,
            interests: DEFAULT_INTERESTS,
            bio: DEFAULT_BIO,
        };
    }, [model, displayVideos]);

    return {
        profileData,
        activeTab,
        setActiveTab: handleSetActiveTab,
        isNotFound: !model,
    };
}
