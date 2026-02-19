import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, ArrowLeft, PictureInPicture, Settings, FastForward, RotateCcw, RotateCw } from 'lucide-react';
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
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const controlsTimeoutRef = useRef(null);

    const subtitles = [
        { lang: 'en', label: 'English', src: '' },
        { lang: 'es', label: 'Spanish', src: '' },
    ];

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const current = video.currentTime;
            const duration = video.duration;
            setCurrentTime(current);
            setProgress((current / duration) * 100);
            if (onProgress) onProgress(current);
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            if (startTime > 0) video.currentTime = startTime;
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', onEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', onEnded);
        };
    }, [onEnded, onProgress, startTime]);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    const skip = (amount) => {
        if (videoRef.current) videoRef.current.currentTime += amount;
    };

    const formatTime = (t) => {
        const h = Math.floor(t / 3600);
        const m = Math.floor((t % 3600) / 60);
        const s = Math.floor(t % 60);
        if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div
            ref={playerRef}
            className="relative w-full h-screen bg-black overflow-hidden group select-none cursor-none"
            style={{ cursor: showControls ? 'default' : 'none' }}
            onMouseMove={handleMouseMove}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-contain"
                onClick={togglePlay}
                onDoubleClick={() => {
                    if (!document.fullscreenElement) playerRef.current.requestFullscreen();
                    else document.exitFullscreen();
                }}
            />

            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex flex-col justify-between"
                    >
                        {/* Immersive Cinematic Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

                        {/* Top Navigation */}
                        <div className="relative p-8 md:p-12 flex items-center justify-between z-10">
                            <button
                                onClick={onBack}
                                className="w-14 h-14 rounded-full glass-panel border border-white/10 hover:border-white/30 flex items-center justify-center transition-all hover:scale-110 active:scale-90"
                            >
                                <ArrowLeft className="w-6 h-6 text-white" />
                            </button>

                            <div className="text-center">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary block mb-2">Streaming Now</span>
                                <h1 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight">{title || 'Cinematic Experience'}</h1>
                            </div>

                            <button className="w-14 h-14 rounded-full glass-panel border border-white/10 flex items-center justify-center">
                                <Settings className="w-6 h-6 text-white/50" />
                            </button>
                        </div>

                        {/* Ultra Center Controls */}
                        <div className="relative flex items-center justify-center gap-16 z-10">
                            <button onClick={() => skip(-10)} className="group/btn relative">
                                <RotateCcw className="w-10 h-10 text-white/40 group-hover/btn:text-white transition-colors" />
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white/40 group-hover/btn:text-white pt-1">10</span>
                            </button>

                            <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={togglePlay}
                                className="w-28 h-28 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                            >
                                {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-2" />}
                            </motion.button>

                            <button onClick={() => skip(10)} className="group/btn relative">
                                <RotateCw className="w-10 h-10 text-white/40 group-hover/btn:text-white transition-colors" />
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white/40 group-hover/btn:text-white pt-1">10</span>
                            </button>
                        </div>

                        {/* Premium Bottom Interaction Zone */}
                        <div className="relative px-8 md:px-16 pb-12 z-10">
                            <div className="space-y-8">
                                {/* Next-Gen Scrub Bar */}
                                <div className="group/scrub relative h-2 w-full">
                                    <div className="absolute inset-y-0 left-0 right-0 bg-white/10 rounded-full" />
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-accent-primary rounded-full z-10"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-2xl scale-0 group-hover/scrub:scale-100 transition-transform" />
                                    </motion.div>
                                    <input
                                        type="range" min="0" max="100" value={progress}
                                        onChange={(e) => {
                                            const time = (e.target.value / 100) * videoRef.current.duration;
                                            videoRef.current.currentTime = time;
                                        }}
                                        className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
                                    />
                                    <div className="absolute -top-10 left-0 right-0 flex justify-between text-[10px] font-mono font-black tracking-widest text-white/40 uppercase">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>-{formatTime(duration - currentTime)}</span>
                                    </div>
                                </div>

                                {/* Controls Infrastructure */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-10">
                                        <div className="flex items-center gap-4 group/vol relative">
                                            <button onClick={() => {
                                                setIsMuted(!isMuted);
                                                videoRef.current.muted = !isMuted;
                                            }}>
                                                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                                            </button>
                                            <div className="w-24 h-1 bg-white/10 rounded-full relative overflow-hidden">
                                                <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${volume * 100}%` }} />
                                                <input
                                                    type="range" min="0" max="1" step="0.1" value={volume}
                                                    onChange={(e) => {
                                                        const v = parseFloat(e.target.value);
                                                        setVolume(v);
                                                        videoRef.current.volume = v;
                                                        setIsMuted(v === 0);
                                                    }}
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                />
                                            </div>
                                        </div>

                                        <SubtitleSelector subtitles={subtitles} onSubtitleChange={() => { }} />
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <button className="text-white/60 hover:text-white transition-colors">
                                            <PictureInPicture className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (!document.fullscreenElement) playerRef.current.requestFullscreen();
                                                else document.exitFullscreen();
                                            }}
                                            className="text-white/60 hover:text-white transition-colors"
                                        >
                                            <Maximize className="w-6 h-6" />
                                        </button>
                                    </div>
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
