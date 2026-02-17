
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import AutoplayCountdown from '../components/AutoplayCountdown';
import { DUMMY_MOVIES } from '../lib/dummyData';
import { MOCK_SERIES, getAllEpisodes, getNextEpisode } from '../data/mockSeries';
import { useWatchProgress } from '../context/WatchProgressContext';

const Watch = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProgress, updateProgress } = useWatchProgress();
    const [showAutoplay, setShowAutoplay] = useState(false);

    // Check both movies and episodes
    const movie = DUMMY_MOVIES.find(m => m.id === id);
    const allEpisodes = MOCK_SERIES.flatMap(s => getAllEpisodes(s.id));
    const episode = allEpisodes.find(ep => ep.id === id);

    const content = movie || episode;
    const isEpisode = !!episode;
    const nextEpisode = isEpisode ? getNextEpisode(id) : null;

    if (!content) return <div className="text-white text-center mt-20">Content not found</div>;

    const savedProgress = getProgress(id);

    const handleBack = () => {
        navigate(-1);
    };

    const handleEnded = () => {
        // Mark as completed
        updateProgress(id, content.duration || 7200, content.duration || 7200);

        // Show autoplay countdown if there's a next episode
        if (nextEpisode) {
            setShowAutoplay(true);
        } else {
            console.log('Video ended - no next episode');
        }
    };

    const handleProgress = (currentTime) => {
        // Save progress every 10 seconds
        if (Math.floor(currentTime) % 10 === 0) {
            updateProgress(id, currentTime, content.duration || 7200);
        }
    };

    const handlePlayNext = () => {
        if (nextEpisode) {
            navigate(`/watch/${nextEpisode.id}`);
        }
    };

    const handleCancelAutoplay = () => {
        setShowAutoplay(false);
    };

    return (
        <>
            <VideoPlayer
                src={content.video_url}
                poster={content.thumbnail_url}
                onBack={handleBack}
                onEnded={handleEnded}
                onProgress={handleProgress}
                startTime={savedProgress}
            />

            {showAutoplay && nextEpisode && (
                <AutoplayCountdown
                    nextEpisode={nextEpisode}
                    onPlay={handlePlayNext}
                    onCancel={handleCancelAutoplay}
                    duration={10}
                />
            )}
        </>
    );
};

export default Watch;
