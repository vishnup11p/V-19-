import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, ArrowLeft, PictureInPicture, Settings, FastForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SubtitleSelector from './SubtitleSelector';

const VideoPlayer = ({ src, poster, title, onBack, onEnded, onProgress, startTime = 0 }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [showSkipIntro, setShowSkipIntro] = useState(false);
    const [showSkipRecap, setShowSkipRecap] = useState(false);
    const [currentSubtitle, setCurrentSubtitle] = useState(null);
    const [isPiPSupported, setIsPiPSupported] = useState(false);
    const [isPiPActive, setIsPiPActive] = useState(false);
    const [volume, setVolume] = useState(1);
    const controlsTimeoutRef = useRef(null);

    const subtitles = [
        { lang: 'en', label: 'English', src: '' },
        { lang: 'es', label: 'Spanish', src: '' },
        { lang: 'fr', label: 'French', src: '' },
        { lang: 'de', label: 'German', src: '' },
    ];

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            setProgress((video.currentTime / video.duration) * 100);
            if (onProgress) onProgress(video.currentTime);
        };

        const updateDuration = () => {
            setDuration(video.duration);
            if (startTime > 0 && video.currentTime === 0) {
                video.currentTime = startTime;
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
            if (onEnded) onEnded();
        };

        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('loadedmetadata', updateDuration);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('loadedmetadata', updateDuration);
            video.removeEventListener('ended', handleEnded);
        };
    }, [onEnded, onProgress, startTime]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const checkSkipButtons = () => {
            const cur = video.currentTime;
            setShowSkipIntro(cur >= 5 && cur <= 90);
            setShowSkipRecap(cur >= 0 && cur <= 60);
        };

        video.addEventListener('timeupdate', checkSkipButtons);
        return () => video.removeEventListener('timeupdate', checkSkipButtons);
    }, []);

    useEffect(() => {
        if (document.pictureInPictureEnabled) setIsPiPSupported(true);
        const h = () => setIsPiPActive(document.pictureInPictureElement === videoRef.current);
        videoRef.current?.addEventListener('enterpictureinpicture', h);
        videoRef.current?.addEventListener('leavepictureinpicture', h);
        return () => {
            videoRef.current?.removeEventListener('enterpictureinpicture', h);
            videoRef.current?.removeEventListener('leavepictureinpicture', h);
        };
    }, []);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleSeek = (e) => {
        const time = (e.target.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = time;
        setProgress(e.target.value);
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    const skipTime = (s) => (videoRef.current.currentTime += s);

    const togglePiP = async () => {
        try {
            if (document.pictureInPictureElement) await document.exitPictureInPicture();
            else if (videoRef.current) await videoRef.current.requestPictureInPicture();
        } catch (e) { console.error(e); }
    };

    const formatTime = (t) => {
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div
            ref={playerRef}
            className="relative w-full h-screen bg-black overflow-hidden group select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-contain"
                onClick={togglePlay}
            />

            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex flex-col justify-between"
                    >
                        {/* Shadow Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

                        {/* Top Bar */}
                        <div className="relative p-6 md:p-10 flex items-center justify-between z-10">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onBack}
                                className="glass-subtle p-3 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6 text-white" />
                            </motion.button>

                            <div className="text-center">
                                <h2 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Now Streaming</h2>
                                <h1 className="text-white text-xl md:text-2xl font-display font-bold">{title || "V 19+ Original"}</h1>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="glass-subtle p-3 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <Settings className="w-6 h-6 text-white" />
                            </motion.button>
                        </div>

                        {/* Center Actions */}
                        <div className="relative flex items-center justify-center gap-12 z-10">
                            <motion.button
                                whileHover={{ scale: 1.2, rotate: -15 }}
                                onClick={() => skipTime(-10)}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <FastForward className="w-10 h-10 transform scale-x-[-1]" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={togglePlay}
                                className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all shadow-glow-strong"
                            >
                                {isPlaying ?
                                    <Pause className="w-10 h-10 text-white fill-white" /> :
                                    <Play className="w-10 h-10 text-white fill-white ml-2" />
                                }
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.2, rotate: 15 }}
                                onClick={() => skipTime(10)}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <FastForward className="w-10 h-10" />
                            </motion.button>
                        </div>

                        {/* Bottom Bar */}
                        <div className="relative p-6 md:p-10 md:pb-12 z-10 space-y-6">
                            {/* Advanced Progress Bar */}
                            <div className="group/progress relative h-1.5 w-full bg-white/10 rounded-full cursor-pointer">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-gradient-accent rounded-full shadow-glow z-10"
                                    style={{ width: `${progress}%` }}
                                />
                                <input
                                    type="range"
                                    min="0" max="100"
                                    value={progress}
                                    onChange={handleSeek}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                />
                                {/* Time Stamps */}
                                <div className="absolute -top-8 left-0 text-white/60 text-xs font-mono">
                                    {formatTime(videoRef.current?.currentTime || 0)}
                                </div>
                                <div className="absolute -top-8 right-0 text-white/60 text-xs font-mono">
                                    -{formatTime(duration - (videoRef.current?.currentTime || 0))}
                                </div>
                            </div>

                            {/* Controls Row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <button onClick={togglePlay} className="text-white hover:text-accent transition-colors">
                                        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                                    </button>

                                    <div className="flex items-center gap-3">
                                        <button onClick={toggleMute} className="text-white hover:text-accent transition-colors">
                                            {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                        </button>
                                        <div className="w-24 h-1 bg-white/10 rounded-full relative overflow-hidden group/vol">
                                            <div className="absolute inset-y-0 left-0 bg-white rounded-full" style={{ width: `${volume * 100}%` }} />
                                            <input
                                                type="range" min="0" max="1" step="0.1"
                                                value={volume} onChange={(e) => {
                                                    setVolume(e.target.value);
                                                    videoRef.current.volume = e.target.value;
                                                }}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    {showSkipRecap && (
                                        <button onClick={() => skipTime(60)} className="btn-glass py-1.5 px-4 text-xs tracking-wider font-bold">SKIP RECAP</button>
                                    )}
                                    {showSkipIntro && (
                                        <button onClick={() => skipTime(85)} className="btn-glass py-1.5 px-4 text-xs tracking-wider font-bold">SKIP INTRO</button>
                                    )}

                                    <SubtitleSelector subtitles={subtitles} currentSubtitle={currentSubtitle} onSubtitleChange={setCurrentSubtitle} />

                                    {isPiPSupported && (
                                        <button onClick={togglePiP} className="text-white hover:text-accent transition-colors">
                                            <PictureInPicture className="w-6 h-6" />
                                        </button>
                                    )}

                                    <button onClick={toggleFullscreen} className="text-white hover:text-accent transition-colors">
                                        {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VideoPlayer;
