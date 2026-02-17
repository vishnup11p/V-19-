import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';

const WatchProgressContext = createContext();

export const useWatchProgress = () => {
    const context = useContext(WatchProgressContext);
    if (!context) {
        throw new Error('useWatchProgress must be used within WatchProgressProvider');
    }
    return context;
};

export const WatchProgressProvider = ({ children }) => {
    const { user } = useAuth();
    const [continueWatching, setContinueWatching] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load continue watching items
    useEffect(() => {
        if (user) {
            loadContinueWatching();
        } else {
            // Demo mode - load from localStorage
            const saved = localStorage.getItem('continueWatching');
            if (saved) {
                setContinueWatching(JSON.parse(saved));
            }
            setLoading(false);
        }
    }, [user]);

    const loadContinueWatching = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('watch_history')
                .select('*, content(*)')
                .eq('user_id', user.id)
                .eq('completed', false)
                .order('updated_at', { ascending: false })
                .limit(10);

            if (error) throw error;
            setContinueWatching(data || []);
        } catch (error) {
            console.error('Error loading continue watching:', error);
            // Fallback to localStorage in demo mode
            const saved = localStorage.getItem('continueWatching');
            if (saved) {
                setContinueWatching(JSON.parse(saved));
            }
        } finally {
            setLoading(false);
        }
    };

    const updateProgress = async (contentId, progressSeconds, duration) => {
        const progressPercent = (progressSeconds / duration) * 100;
        const completed = progressPercent >= 90; // Mark as completed if 90% watched

        if (user) {
            // Save to Supabase
            try {
                const { error } = await supabase
                    .from('watch_history')
                    .upsert({
                        user_id: user.id,
                        content_id: contentId,
                        progress_seconds: Math.floor(progressSeconds),
                        completed,
                        updated_at: new Date().toISOString()
                    }, {
                        onConflict: 'user_id,content_id'
                    });

                if (error) throw error;
                await loadContinueWatching();
            } catch (error) {
                console.error('Error updating progress:', error);
            }
        } else {
            // Demo mode - save to localStorage
            const existing = JSON.parse(localStorage.getItem('continueWatching') || '[]');
            const index = existing.findIndex(item => item.content_id === contentId);

            const progressItem = {
                content_id: contentId,
                progress_seconds: Math.floor(progressSeconds),
                completed,
                updated_at: new Date().toISOString()
            };

            if (index >= 0) {
                existing[index] = progressItem;
            } else {
                existing.unshift(progressItem);
            }

            // Keep only last 10 items
            const trimmed = existing.slice(0, 10);
            localStorage.setItem('continueWatching', JSON.stringify(trimmed));
            setContinueWatching(trimmed);
        }
    };

    const getProgress = (contentId) => {
        const item = continueWatching.find(w =>
            w.content_id === contentId || w.content?.id === contentId
        );
        return item?.progress_seconds || 0;
    };

    const removeFromContinueWatching = async (contentId) => {
        if (user) {
            try {
                await supabase
                    .from('watch_history')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('content_id', contentId);

                await loadContinueWatching();
            } catch (error) {
                console.error('Error removing from continue watching:', error);
            }
        } else {
            // Demo mode
            const filtered = continueWatching.filter(item => item.content_id !== contentId);
            localStorage.setItem('continueWatching', JSON.stringify(filtered));
            setContinueWatching(filtered);
        }
    };

    return (
        <WatchProgressContext.Provider value={{
            continueWatching,
            loading,
            updateProgress,
            getProgress,
            removeFromContinueWatching,
            refreshContinueWatching: loadContinueWatching
        }}>
            {children}
        </WatchProgressContext.Provider>
    );
};
