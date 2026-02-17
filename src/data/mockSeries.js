// Mock TV Series Data
export const MOCK_SERIES = [
    {
        id: 'series-1',
        title: 'Stranger Things',
        type: 'series',
        description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments.',
        thumbnail_url: 'https://via.placeholder.com/400x225/1a1a1a/ff6a00?text=Stranger+Things',
        backdrop_url: 'https://via.placeholder.com/1920x1080/1a1a1a/ff6a00?text=Stranger+Things',
        genre: ['Sci-Fi', 'Horror', 'Drama'],
        release_year: 2016,
        rating: 8.7,
        age_rating: '16+',
        seasons: [
            {
                season_number: 1,
                title: 'Season 1',
                episodes: [
                    {
                        id: 'ep-1-1',
                        episode_number: 1,
                        title: 'Chapter One: The Vanishing of Will Byers',
                        description: 'On his way home from a friend\'s house, young Will sees something terrifying.',
                        duration: 2880, // 48 minutes
                        thumbnail_url: 'https://via.placeholder.com/400x225/1a1a1a/ff6a00?text=S1E1',
                        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                    },
                    {
                        id: 'ep-1-2',
                        episode_number: 2,
                        title: 'Chapter Two: The Weirdo on Maple Street',
                        description: 'Lucas, Mike and Dustin try to talk to the girl they found in the woods.',
                        duration: 3300, // 55 minutes
                        thumbnail_url: 'https://via.placeholder.com/400x225/1a1a1a/ff6a00?text=S1E2',
                        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
                    },
                    {
                        id: 'ep-1-3',
                        episode_number: 3,
                        title: 'Chapter Three: Holly, Jolly',
                        description: 'An increasingly concerned Nancy looks for Barb and finds out what Jonathan\'s been up to.',
                        duration: 3060, // 51 minutes
                        thumbnail_url: 'https://via.placeholder.com/400x225/1a1a1a/ff6a00?text=S1E3',
                        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
                    }
                ]
            },
            {
                season_number: 2,
                title: 'Season 2',
                episodes: [
                    {
                        id: 'ep-2-1',
                        episode_number: 1,
                        title: 'Chapter One: MADMAX',
                        description: 'As the town preps for Halloween, a high-scoring rival shakes things up at the arcade.',
                        duration: 2940, // 49 minutes
                        thumbnail_url: 'https://via.placeholder.com/400x225/1a1a1a/ff6a00?text=S2E1',
                        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                    },
                    {
                        id: 'ep-2-2',
                        episode_number: 2,
                        title: 'Chapter Two: Trick or Treat, Freak',
                        description: 'After Will sees something terrible on trick-or-treat night, Mike wonders whether Eleven\'s still out there.',
                        duration: 3240, // 54 minutes
                        thumbnail_url: 'https://via.placeholder.com/400x225/1a1a1a/ff6a00?text=S2E2',
                        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
                    }
                ]
            }
        ]
    },
    {
        id: 'series-2',
        title: 'The Crown',
        type: 'series',
        description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign.',
        thumbnail_url: 'https://via.placeholder.com/400x225/1a1a1a/ff6a00?text=The+Crown',
        backdrop_url: 'https://via.placeholder.com/1920x1080/1a1a1a/ff6a00?text=The+Crown',
        genre: ['Drama', 'Historical'],
        release_year: 2016,
        rating: 8.6,
        age_rating: '16+',
        seasons: [
            {
                season_number: 1,
                title: 'Season 1',
                episodes: [
                    {
                        id: 'crown-1-1',
                        episode_number: 1,
                        title: 'Wolferton Splash',
                        description: 'A young Princess Elizabeth marries Prince Philip.',
                        duration: 3480, // 58 minutes
                        thumbnail_url: 'https://via.placeholder.com/400x225/1a1a1a/ff6a00?text=Crown+S1E1',
                        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
                    }
                ]
            }
        ]
    }
];

// Helper function to get all episodes from a series
export const getAllEpisodes = (seriesId) => {
    const series = MOCK_SERIES.find(s => s.id === seriesId);
    if (!series) return [];

    return series.seasons.flatMap(season =>
        season.episodes.map(ep => ({
            ...ep,
            season_number: season.season_number,
            series_id: seriesId,
            series_title: series.title
        }))
    );
};

// Helper to get next episode
export const getNextEpisode = (currentEpisodeId) => {
    for (const series of MOCK_SERIES) {
        const allEpisodes = getAllEpisodes(series.id);
        const currentIndex = allEpisodes.findIndex(ep => ep.id === currentEpisodeId);

        if (currentIndex !== -1 && currentIndex < allEpisodes.length - 1) {
            return allEpisodes[currentIndex + 1];
        }
    }
    return null;
};
