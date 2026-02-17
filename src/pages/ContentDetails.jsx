import { useParams, useNavigate } from 'react-router-dom';
import { DUMMY_MOVIES } from '../lib/dummyData';
import { MOCK_SERIES } from '../data/mockSeries';
import Navbar from '../components/Navbar';
import EpisodeSelector from '../components/EpisodeSelector';
import { Play, Plus, ThumbsUp, X, Star, Calendar, Clock, User, Share2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ContentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const { scrollY } = useScroll();

    // Backdrop parallax
    const backdropY = useTransform(scrollY, [0, 500], [0, 150]);
    const backdropOpacity = useTransform(scrollY, [0, 400], [0.4, 0.1]);

    // Check both movies and series
    const movie = DUMMY_MOVIES.find(m => m.id === id);
    const series = MOCK_SERIES.find(s => s.id === id);
    const content = movie || series;

    if (!content) return (
        <div className="bg-primary-900 text-white h-screen flex flex-col items-center justify-center p-10">
            <h1 className="text-4xl font-display font-black mb-4">Void Ahead</h1>
            <p className="text-gray-500 mb-8 text-center max-w-md">We couldn't find the content you're looking for. It may have drifted into another galaxy.</p>
            <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
        </div>
    );

    const isSeries = !!series;
    const firstEpisode = isSeries ? series.seasons[0]?.episodes[0] : null;

    return (
        <div className="bg-primary-900 min-h-screen text-white overflow-x-hidden">
            <Navbar />

            {/* Immersive Backdrop */}
            <motion.div
                style={{ y: backdropY, opacity: backdropOpacity }}
                className="absolute top-0 left-0 w-full h-[80vh] z-0 pointer-events-none"
            >
                <img
                    src={content.backdrop_url || content.thumbnail_url}
                    alt={content.title}
                    className="w-full h-full object-cover filter saturate-[1.2] brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-transparent to-transparent" />
            </motion.div>

            <div className="relative z-10 pt-32 pb-24 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {/* Left: Premium Poster */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className="w-full max-w-[400px] shrink-0 mx-auto lg:mx-0 group perspective-1000"
                    >
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform-style-3d group-hover:rotate-y-12 transition-transform duration-700">
                            <img
                                src={content.thumbnail_url}
                                alt={content.title}
                                className="w-full aspect-[2/3] object-cover"
                            />
                            {/* Poster Glow */}
                            <div className="absolute -inset-1 bg-gradient-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                        </div>
                    </motion.div>

                    {/* Right: Rich Information */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3 mb-4"
                            >
                                <span className="glass-subtle px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-accent">
                                    {isSeries ? 'Series' : 'Movie'}
                                </span>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                    <Star className="w-3 h-3 text-accent fill-accent" />
                                    <span>{content.match_percentage || 98}% Match</span>
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-none mb-6 text-white drop-shadow-glow"
                            >
                                {content.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap items-center gap-6 text-sm md:text-base text-gray-400 font-medium"
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{content.release_year}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="glass h-6 flex items-center px-2 rounded font-black text-xs border-white/10">
                                        {content.age_rating || content.rating || '16+'}
                                    </span>
                                </div>
                                {!isSeries ? (
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{content.duration}m</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <X className="w-4 h-4 rotate-45" />
                                        <span>{series.seasons.length} Seasons</span>
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Actions Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-4 py-4"
                        >
                            <button
                                onClick={() => navigate(isSeries ? `/watch/${firstEpisode.id}` : `/watch/${content.id}`)}
                                className="btn-primary flex items-center gap-3 px-10 py-4 text-xl group"
                            >
                                <Play className="fill-white w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span>{isSeries ? 'Start S1:E1' : 'Play Now'}</span>
                            </button>

                            <button className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                                <Plus className="w-6 h-6" />
                            </button>

                            <button className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                                <ThumbsUp className="w-6 h-6" />
                            </button>

                            <button className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110">
                                <Share2 className="w-6 h-6" />
                            </button>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-4xl text-balance"
                        >
                            {content.description}
                        </motion.p>

                        {/* Metadata Grid */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-10 border-t border-white/5"
                        >
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Genres</span>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {content.genre.map((g, i) => (
                                        <span key={i} className="glass-subtle px-3 py-1 rounded-full text-xs text-gray-400 group-hover:text-white transition-colors">{g}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Staring</span>
                                <p className="text-gray-300 font-medium">George Miller, Charlize Theron, Tom Hardy</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Directed By</span>
                                <p className="text-gray-300 font-medium">V 19+ Creative Lab</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Episode Selector Area */}
                <AnimatePresence>
                    {isSeries && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-24 pt-24 border-t border-white/5"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-3xl md:text-5xl font-display font-black">Episodes</h2>
                                <h3 className="text-xl text-gray-500 font-bold">{series.seasons.length} Seasons</h3>
                            </div>
                            <EpisodeSelector series={series} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* More Like This (Row) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32"
                >
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-5xl font-display font-black">Recommended</h2>
                        <p className="text-gray-500 mt-2 font-medium">Because you explored {content.title}</p>
                    </div>
                    {/* Placeholder for similar content row */}
                </motion.div>
            </div>

            {/* Ambient Background Glow */}
            <div className="fixed bottom-0 right-0 w-1/2 h-1/2 bg-accent/5 blur-[200px] pointer-events-none -z-10 rounded-full" />
            <div className="fixed top-0 left-0 w-1/3 h-1/3 bg-purple-600/5 blur-[150px] pointer-events-none -z-10 rounded-full" />
        </div>
    );
};

export default ContentDetails;
