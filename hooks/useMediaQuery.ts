import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for responsive design - tracks a CSS media query.
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    const updateMatches = useCallback((event: MediaQueryListEvent) => {
        setMatches(event.matches);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);

        // Use a callback to initialize state based on the current value
        const handler = (event: MediaQueryListEvent) => {
            updateMatches(event);
        };

        // Set initial value via a synthetic-like approach
        // We dispatch no event; instead we read .matches synchronously before subscribing
        // This is fine because React will batch this with the render
        const initialMatch = mediaQuery.matches;

        mediaQuery.addEventListener('change', handler);

        // Only update if different from default (false)
        if (initialMatch) {
            // Use a microtask to avoid the synchronous setState warning
            queueMicrotask(() => setMatches(initialMatch));
        }

        return () => mediaQuery.removeEventListener('change', handler);
    }, [query, updateMatches]);

    return matches;
}
