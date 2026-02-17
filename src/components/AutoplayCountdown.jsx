import { useState, useEffect } from 'react';
import { X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AutoplayCountdown = ({ nextEpisode, onPlay, onCancel, duration = 10 }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onPlay();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onPlay]);

    const progressPercent = ((duration - timeLeft) / duration) * 100;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed bottom-20 right-8 z-50 bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-lg p-6 max-w-md shadow-2xl"
            >
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white transition"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-32 h-18 rounded overflow-hidden flex-shrink-0 bg-zinc-800">
                        <img
                            src={nextEpisode.thumbnail_url}
                            alt={nextEpisode.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-1">Next Episode</p>
                        <h3 className="text-white font-semibold text-sm truncate mb-1">
                            {nextEpisode.title}
                        </h3>
                        <p className="text-xs text-gray-400">
                            S{nextEpisode.season_number}:E{nextEpisode.episode_number}
                        </p>
                    </div>
                </div>

                {/* Countdown */}
                <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">
                            Playing in {timeLeft}s
                        </span>
                        <button
                            onClick={onPlay}
                            className="text-sm text-accent hover:text-orange-400 font-semibold transition"
                        >
                            Play Now
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-zinc-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-accent"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AutoplayCountdown;
