import { DUMMY_MOVIES } from '../lib/dummyData';
import { MOCK_SERIES } from '../data/mockSeries';

// Simple recommendation engine based on genre matching
export const getRecommendations = (watchHistory, limit = 10) => {
    if (!watchHistory || watchHistory.length === 0) {
        // Return popular content if no history
        return [...DUMMY_MOVIES, ...MOCK_SERIES].slice(0, limit);
    }

    // Get genres from watched content
    const watchedGenres = new Set();
    const watchedIds = new Set();

    watchHistory.forEach(item => {
        if (item.content) {
            watchedIds.add(item.content.id);
            if (item.content.genre) {
                item.content.genre.forEach(g => watchedGenres.add(g));
            }
        }
    });

    // Score all content based on genre overlap
    const allContent = [...DUMMY_MOVIES, ...MOCK_SERIES];
    const scored = allContent
        .filter(content => !watchedIds.has(content.id)) // Exclude already watched
        .map(content => {
            let score = 0;
            if (content.genre) {
                content.genre.forEach(genre => {
                    if (watchedGenres.has(genre)) {
                        score += 1;
                    }
                });
            }
            return { content, score };
        })
        .filter(item => item.score > 0) // Only items with matching genres
        .sort((a, b) => b.score - a.score); // Sort by score

    // Return top recommendations
    return scored.slice(0, limit).map(item => item.content);
};

// Get "Because you watched X" recommendations
export const getBecauseYouWatched = (contentId) => {
    const allContent = [...DUMMY_MOVIES, ...MOCK_SERIES];
    const watchedContent = allContent.find(c => c.id === contentId);

    if (!watchedContent || !watchedContent.genre) {
        return [];
    }

    // Find content with similar genres
    return allContent
        .filter(content => {
            if (content.id === contentId) return false;
            if (!content.genre) return false;

            // Check for genre overlap
            return content.genre.some(g => watchedContent.genre.includes(g));
        })
        .slice(0, 10);
};

// Get recently added content (sorted by release year)
export const getRecentlyAdded = (limit = 10) => {
    const allContent = [...DUMMY_MOVIES, ...MOCK_SERIES];
    return allContent
        .sort((a, b) => (b.release_year || 0) - (a.release_year || 0))
        .slice(0, limit);
};

// Get top 10 trending (mock - based on rating)
export const getTop10 = () => {
    return DUMMY_MOVIES
        .sort((a, b) => (b.match_percentage || b.rating * 10) - (a.match_percentage || a.rating * 10))
        .slice(0, 10)
        .map((content, index) => ({
            ...content,
            rank: index + 1
        }));
};
