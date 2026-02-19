import { useNavigate } from 'react-router-dom';
import { useWatchProgress } from '../context/WatchProgressContext';
import { DUMMY_MOVIES } from '../lib/dummyData';
import { MOCK_SERIES, getAllEpisodes } from '../data/mockSeries';
import { Play, X, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContinueWatchingRow = () => {
    const navigate = useNavigate();
    const { continueWatching, removeFromContinueWatching } = useWatchProgress();

    if (!continueWatching || continueWatching.length === 0) return null;

    const allContent = [...DUMMY_MOVIES, ...MOCK_SERIES];
    const allEpisodes = MOCK_SERIES.flatMap(s => getAllEpisodes(s.id));

    const items = continueWatching.map(item => {
        const content = item.content ||
            allContent.find(c => c.id === item.content_id) ||
            allEpisodes.find(e => e.id === item.content_id);
        return { ...item, content };
    }).filter(item => item.content);

    const handleRemove = (e, contentId) => {
        e.stopPropagation();
        removeFromContinueWatching(contentId);
    };

    return (
        <section className="mb-16 group/row">
            <div className="px-6 md:px-12 lg:px-20 mb-6">
                <div className="flex items-center space-x-2 mb-1">
                    <div className="w-1 h-1 rounded-full bg-accent-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary/60">Pick up where you left off</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-white leading-none tracking-tight">
                    Continue Watching
                </h2>
            </div>

            <div className="flex gap-6 overflow-x-auto no-scrollbar px-6 md:px-12 lg:px-20 pb-10 pt-2">
                <AnimatePresence>
                    {items.map((item, index) => {
                        const progressPercent = item.content?.duration
                            ? (item.progress_seconds / item.content.duration) * 100
                            : 0;
                        const timeLeft = item.content?.duration ? Math.round((item.content.duration - item.progress_seconds) / 60) : 0;

                        return (
                            <motion.div
                                key={item.content_id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ delay: index * 0.05 }}
                                className="relative flex-shrink-0 w-72 md:w-96 group cursor-pointer"
                                onClick={() => navigate(`/watch/${item.content_id}`)}
                            >
                                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-bg-tertiary ott-card-shadow border border-white/5 group-hover:border-white/20 transition-all duration-500">
                                    <img
                                        src={item.content?.thumbnail_url}
                                        alt={item.content?.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                    />

                                    {/* Action Overlays */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center scale-90 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                                            <Play className="w-7 h-7 fill-current ml-1" />
                                        </div>
                                    </div>

                                    {/* Top Metadata */}
                                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                        <div className="px-3 py-1 rounded-full glass-panel text-[8px] font-black uppercase tracking-widest text-white flex items-center space-x-2">
                                            <Clock className="w-3 h-3 text-accent-primary" />
                                            <span>{timeLeft}m Remaining</span>
                                        </div>
                                        <button
                                            onClick={(e) => handleRemove(e, item.content_id)}
                                            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-white/50 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Interactive Progress Bar */}
                                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progressPercent}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                                            className="h-full bg-accent-primary relative"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Bottom Info */}
                                <div className="mt-4 px-2">
                                    <h3 className="text-white font-display font-black text-xl tracking-tight truncate leading-tight mb-1">
                                        {item.content?.title}
                                    </h3>
                                    <div className="flex items-center space-x-3 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                                        <span className="text-accent-primary">{item.content?.type === 'series' ? 'S1 : E4' : 'Feature'}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                                        <span>Last watched yesterday</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                <div className="w-20 flex-shrink-0" />
            </div>
        </section>
    );
};

export default ContinueWatchingRow;
