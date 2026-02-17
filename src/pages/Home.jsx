import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import Row from '../components/Row';
import ContinueWatchingRow from '../components/ContinueWatchingRow';
import Top10Row from '../components/Top10Row';
import { DUMMY_MOVIES } from '../lib/dummyData';
import { MOCK_SERIES } from '../data/mockSeries';
import { getRecommendations, getRecentlyAdded, getTop10 } from '../lib/recommendations';
import { useWatchProgress } from '../context/WatchProgressContext';

const Home = () => {
    const featuredMovie = DUMMY_MOVIES[0];
    const { continueWatching } = useWatchProgress();

    // Get personalized recommendations
    const recommendations = getRecommendations(continueWatching, 10);
    const recentlyAdded = getRecentlyAdded(10);
    const top10 = getTop10();

    // Group content by genre
    const actionMovies = DUMMY_MOVIES.filter(m => m.genre?.includes('Action'));
    const sciFiMovies = DUMMY_MOVIES.filter(m => m.genre?.includes('Sci-Fi'));
    const dramaMovies = DUMMY_MOVIES.filter(m => m.genre?.includes('Drama'));

    return (
        <div className="min-h-screen bg-primary-900 overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <div className="relative z-0">
                <HeroBanner movie={featuredMovie} />
            </div>

            {/* Main Content - Negative margin to pull up over hero */}
            <div className="relative z-20 -mt-24 md:-mt-32 pb-20 space-y-2 bg-gradient-to-b from-transparent via-bg-primary/80 to-bg-primary">

                {/* Continue Watching (First Priority) */}
                <ContinueWatchingRow />

                {/* Top 10 Section */}
                <Top10Row movies={top10} />

                {/* Rows Area */}
                <div className="space-y-4">
                    <Row
                        title="Recommended For You"
                        subtitle="Because you watched similar content"
                        movies={recommendations}
                    />

                    <Row
                        title="Recently Added"
                        subtitle="Fresh content on V 19+"
                        movies={recentlyAdded}
                    />

                    <Row title="Trending Now" movies={DUMMY_MOVIES} />

                    <Row title="Binge-Worthy Series" movies={MOCK_SERIES} />

                    <Row title="Adrenaline Rush" movies={actionMovies} />

                    <Row title="Sci-Fi & Fantasy" movies={sciFiMovies} />

                    <Row title="Drama & Emotion" movies={dramaMovies} />
                </div>
            </div>
        </div>
    );
};

export default Home;
