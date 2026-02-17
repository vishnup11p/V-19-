import { useNavigate } from 'react-router-dom';
import { useWatchProgress } from '../context/WatchProgressContext';
import { DUMMY_MOVIES } from '../lib/dummyData';
import { MOCK_SERIES, getAllEpisodes } from '../data/mockSeries';
import Navbar from '../components/Navbar';
import { Play, Trash2 } from 'lucide-react';

const ViewingHistory = () => {
    const navigate = useNavigate();
    const { continueWatching, removeFromContinueWatching } = useWatchProgress();

    // Merge with actual content
    const allContent = [...DUMMY_MOVIES, ...MOCK_SERIES];
    const allEpisodes = MOCK_SERIES.flatMap(s => getAllEpisodes(s.id));

    const historyItems = continueWatching.map(item => {
        const content = item.content ||
            allContent.find(c => c.id === item.content_id) ||
            allEpisodes.find(e => e.id === item.content_id);
        return {
            ...item,
            content
        };
    }).filter(item => item.content);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    };

    const formatProgress = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-black min-h-screen text-white">
            <Navbar />

            <div className="pt-24 pb-12 px-4 md:px-12 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Viewing History</h1>

                {historyItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No viewing history yet</p>
                        <p className="text-gray-500 text-sm mt-2">Start watching to see your history here</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {historyItems.map((item) => {
                            const progressPercent = item.content?.duration
                                ? (item.progress_seconds / item.content.duration) * 100
                                : 0;

                            return (
                                <div
                                    key={item.content_id}
                                    className="flex gap-4 p-4 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition group"
                                >
                                    {/* Thumbnail */}
                                    <div
                                        onClick={() => navigate(`/watch/${item.content_id}`)}
                                        className="relative flex-shrink-0 w-48 h-28 rounded overflow-hidden bg-zinc-800 cursor-pointer"
                                    >
                                        <img
                                            src={item.content.thumbnail_url}
                                            alt={item.content.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                        />

                                        {/* Progress bar */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-700">
                                            <div
                                                className="h-full bg-accent"
                                                style={{ width: `${progressPercent}%` }}
                                            />
                                        </div>

                                        {/* Play overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Play className="w-10 h-10 text-white fill-white" />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-semibold text-lg truncate">
                                            {item.content.title}
                                        </h3>

                                        {item.content.series_title && (
                                            <p className="text-sm text-gray-400">
                                                {item.content.series_title} - S{item.content.season_number}:E{item.content.episode_number}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                            <span>{formatProgress(item.progress_seconds)} watched</span>
                                            <span>•</span>
                                            <span>{formatDate(item.updated_at)}</span>
                                            {item.completed && (
                                                <>
                                                    <span>•</span>
                                                    <span className="text-green-500">✓ Completed</span>
                                                </>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mt-3">
                                            <button
                                                onClick={() => navigate(`/watch/${item.content_id}`)}
                                                className="bg-accent hover:bg-orange-600 text-white px-4 py-1.5 rounded text-sm font-semibold transition flex items-center gap-2"
                                            >
                                                <Play className="w-4 h-4 fill-white" />
                                                {item.completed ? 'Watch Again' : 'Continue Watching'}
                                            </button>

                                            <button
                                                onClick={() => removeFromContinueWatching(item.content_id)}
                                                className="text-gray-400 hover:text-white transition px-3 py-1.5"
                                                title="Remove from history"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewingHistory;
