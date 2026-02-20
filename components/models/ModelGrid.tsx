import React from 'react';
import { ModelCard } from './ModelCard';
import { Model } from '@/types';

interface ModelGridProps {
    models: Model[];
}

export function ModelGrid({ models }: ModelGridProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {models.map((model) => (
                <ModelCard key={model.id} model={model} />
            ))}
        </div>
    );
}
