import { useNavigate } from 'react-router-dom';
import { useWatchProgress } from '../context/WatchProgressContext';
import { DUMMY_MOVIES } from '../lib/dummyData';
import { MOCK_SERIES, getAllEpisodes } from '../data/mockSeries';
import { Play, X } from 'lucide-react';

const ContinueWatchingRow = () => {
    const navigate = useNavigate();
    const { continueWatching, removeFromContinueWatching } = useWatchProgress();

    if (!continueWatching || continueWatching.length === 0) {
        return null;
    }

    const allContent = [...DUMMY_MOVIES, ...MOCK_SERIES];
    const allEpisodes = MOCK_SERIES.flatMap(s => getAllEpisodes(s.id));

    const items = continueWatching.map(item => {
        const content = item.content ||
            allContent.find(c => c.id === item.content_id) ||
            allEpisodes.find(e => e.id === item.content_id);
        return {
            ...item,
            content
        };
    }).filter(item => item.content);

    const formatProgress = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleRemove = (e, contentId) => {
        e.stopPropagation();
        removeFromContinueWatching(contentId);
    };

    return (
        <div className="mb-10 text-white group/row">
            <div className="px-4 md:px-12 mb-4">
                <h2 className="text-xl md:text-2xl font-bold hover:text-accent transition duration-300 cursor-pointer font-display inline-flex items-center gap-2">
                    Continue Watching
                </h2>
            </div>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-8 pt-2">
                {items.map((item) => {
                    const progressPercent = item.content?.duration
                        ? (item.progress_seconds / item.content.duration) * 100
                        : 0;

                    return (
                        <div
                            key={item.content_id}
                            className="relative flex-shrink-0 w-64 md:w-80 group cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20"
                            onClick={() => navigate(`/watch/${item.content_id}`)}
                        >
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-800 shadow-neu">
                                <img
                                    src={item.content?.thumbnail_url || 'https://via.placeholder.com/400x225/1a1a1a/ff6a00?text=No+Image'}
                                    alt={item.content?.title}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                />

                                {/* Progress bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-zinc-800/80">
                                    <div
                                        className="h-full bg-gradient-accent shadow-glow"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>

                                {/* Play overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="w-14 h-14 rounded-full bg-accent-primary flex items-center justify-center shadow-glow-strong transform scale-90 group-hover:scale-100 transition-transform">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>

                                {/* Remove button */}
                                <button
                                    onClick={(e) => handleRemove(e, item.content_id)}
                                    className="absolute top-2 right-2 p-2 rounded-full glass hover:bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-110"
                                    title="Remove from Continue Watching"
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                {/* Time remaining badge */}
                                <div className="absolute bottom-3 right-2 px-2 py-0.5 rounded bg-black/60 text-[10px] font-medium text-white/90 backdrop-blur-md">
                                    {item.content?.duration ? Math.round((item.content.duration - item.progress_seconds) / 60) + 'm left' : ''}
                                </div>
                            </div>

                            <div className="mt-3 px-1">
                                <h3 className="text-white font-bold text-lg truncate font-display tracking-tight">{item.content?.title}</h3>
                                <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                                    <span className="text-accent">{formatProgress(item.progress_seconds)}</span>
                                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                    <span>{item.content?.type === 'series' ? 'S1 E1' : 'Movie'}</span>
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div className="w-8 flex-shrink-0" />
            </div>
        </div>
    );
};

export default ContinueWatchingRow;
