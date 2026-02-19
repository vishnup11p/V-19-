import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import Row from '../components/Row';
import ContinueWatchingRow from '../components/ContinueWatchingRow';
import Top10Row from '../components/Top10Row';
import { DUMMY_MOVIES } from '../lib/dummyData';
import { MOCK_SERIES } from '../data/mockSeries';
import { getRecommendations, getRecentlyAdded, getTop10 } from '../lib/recommendations';
import { useWatchProgress } from '../context/WatchProgressContext';
import { motion } from 'framer-motion';

const Home = () => {
    const featuredMovie = DUMMY_MOVIES[0];
    const { continueWatching } = useWatchProgress();

    // Grouping content
    const actionMovies = DUMMY_MOVIES.filter(m => m.genre?.includes('Action'));
    const sciFiMovies = DUMMY_MOVIES.filter(m => m.genre?.includes('Sci-Fi'));
    const dramaMovies = DUMMY_MOVIES.filter(m => m.genre?.includes('Drama'));

    return (
        <div className="min-h-screen bg-bg-primary overflow-x-hidden selection:bg-accent-primary selection:text-white">
            <Navbar />

            {/* Cinematic Hero */}
            <div className="relative h-[95vh] lg:h-screen w-full overflow-hidden">
                <HeroBanner movie={featuredMovie} />
            </div>

            {/* Dynamic Content Layers */}
            <div className="relative z-20 pb-40">
                {/* Visual Transition Shield */}
                <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-transparent via-bg-primary/90 to-bg-primary pointer-events-none -translate-y-full" />

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative -mt-40 md:-mt-60 lg:-mt-80 px-0 md:px-4 lg:px-8"
                >
                    {/* Personalized Feed */}
                    <div className="space-y-20">
                        {/* Priority Sections */}
                        <div className="space-y-12">
                            <ContinueWatchingRow />
                            <Top10Row movies={getTop10()} />
                        </div>

                        {/* Semantic Browsing */}
                        <div className="space-y-4">
                            <Row
                                title="Curated For You"
                                subtitle="Based on your recent interests"
                                type="trending"
                                movies={getRecommendations(continueWatching, 10)}
                            />

                            <Row
                                title="Global Arrivals"
                                subtitle="Freshly added masterpieces"
                                movies={getRecentlyAdded(12)}
                            />

                            <div className="relative group/ambient">
                                {/* Ambient Glow Background for specific sections */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent-primary/5 blur-[120px] rounded-full group-hover/ambient:bg-accent-primary/8 transition-all duration-1000" />

                                <Row
                                    title="Most Anticipated Series"
                                    subtitle="Trending binge-worthy shows"
                                    movies={MOCK_SERIES}
                                />
                            </div>

                            <Row
                                title="Visual Spectacles"
                                subtitle="Adrenaline-pumping action"
                                movies={actionMovies}
                            />

                            <Row
                                title="Cosmic Journeys"
                                subtitle="The best of sci-fi & fantasy"
                                movies={sciFiMovies}
                            />

                            <Row
                                title="Human Stories"
                                subtitle="Deeply emotional dramas"
                                movies={dramaMovies}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Premium Page Footer Ambient */}
            <div className="h-[20vh] bg-gradient-to-t from-accent-primary/5 to-transparent flex items-center justify-center">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-700">
                    V 19+ Ultra Premium Streaming
                </div>
            </div>
        </div>
    );
};

export default Home;
