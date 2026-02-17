import { useState } from 'react';
import { Play, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EpisodeSelector = ({ series, currentEpisodeId }) => {
    const navigate = useNavigate();
    const [selectedSeason, setSelectedSeason] = useState(series.seasons[0]?.season_number || 1);

    const currentSeason = series.seasons.find(s => s.season_number === selectedSeason);

    const formatDuration = (seconds) => {
        const mins = Math.floor(seconds / 60);
        return `${mins}m`;
    };

    return (
        <div className="bg-zinc-900 rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>

            {/* Season Selector */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {series.seasons.map((season) => (
                    <button
                        key={season.season_number}
                        onClick={() => setSelectedSeason(season.season_number)}
                        className={`px-6 py-2 rounded-full font-semibold whitespace-nowrap transition ${selectedSeason === season.season_number
                                ? 'bg-accent text-white'
                                : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                            }`}
                    >
                        Season {season.season_number}
                    </button>
                ))}
            </div>

            {/* Episode List */}
            <div className="space-y-4">
                {currentSeason?.episodes.map((episode, index) => {
                    const isCurrentEpisode = episode.id === currentEpisodeId;

                    return (
                        <div
                            key={episode.id}
                            onClick={() => navigate(`/watch/${episode.id}`)}
                            className="flex gap-4 p-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer transition group"
                        >
                            {/* Episode Number */}
                            <div className="flex-shrink-0 w-8 text-center text-2xl font-bold text-gray-400 group-hover:text-white">
                                {episode.episode_number}
                            </div>

                            {/* Thumbnail */}
                            <div className="relative flex-shrink-0 w-32 h-18 rounded overflow-hidden bg-zinc-700">
                                <img
                                    src={episode.thumbnail_url}
                                    alt={episode.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                                {isCurrentEpisode && (
                                    <div className="absolute top-1 right-1 bg-accent rounded-full p-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Episode Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-white font-semibold group-hover:text-accent transition truncate">
                                        {episode.title}
                                    </h3>
                                    <span className="text-sm text-gray-400 flex-shrink-0">
                                        {formatDuration(episode.duration)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                    {episode.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EpisodeSelector;
