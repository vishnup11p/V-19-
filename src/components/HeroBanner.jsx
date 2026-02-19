import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Info, Star, Plus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = ({ movie }) => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const { scrollY } = useScroll();

    // Enhanced Parallax & Scale
    const yBg = useTransform(scrollY, [0, 800], [0, 250]);
    const opacityBg = useTransform(scrollY, [0, 600], [1, 0.4]);
    const scaleBg = useTransform(scrollY, [0, 800], [1, 1.2]);
    const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const textY = useTransform(scrollY, [0, 400], [0, 50]);

    if (!movie) return null;

    return (
        <section ref={heroRef} className="relative h-[95vh] w-full overflow-hidden bg-bg-primary">
            {/* Immersive Background */}
            <motion.div
                style={{ y: yBg, opacity: opacityBg, scale: scaleBg }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/30 z-10" />
                <img
                    src={movie.thumbnail_url}
                    alt={movie.title}
                    className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]"
                />

                {/* Dynamic Overlays */}
                <div className="absolute inset-0 hero-gradient-overlay z-20" />
                <div className="absolute inset-y-0 left-0 w-1/2 hero-side-overlay z-20" />
            </motion.div>

            {/* Cinematic Content */}
            <div className="relative h-full container mx-auto px-6 md:px-12 lg:px-20 z-30 flex flex-col justify-end pb-24 lg:pb-32">
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="max-w-3xl"
                >
                    {/* Premiere Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-3 mb-6"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-accent-primary/20 border border-accent-primary/30 text-accent-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-accent-primary/10">
                            Now Streaming
                        </span>
                        <div className="flex items-center space-x-2 text-white/60 text-xs font-bold">
                            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                            <span>4.9 Rating</span>
                        </div>
                    </motion.div>

                    {/* Movie Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tight text-white mb-6 leading-[0.9]"
                    >
                        {movie.title.split(' ').map((word, i) => (
                            <span key={i} className={i % 2 !== 0 ? 'inline-block' : 'inline-block gradient-text'}>
                                {word}{' '}
                            </span>
                        ))}
                    </motion.h1>

                    {/* Meta Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center space-x-4 mb-8 text-sm font-bold text-gray-400"
                    >
                        <span>{movie.release_year}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                        <span className="px-2 py-0.5 rounded border border-gray-700">{movie.age_rating || '18+'}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                        <span>{movie.duration}m</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                        <span className="text-gray-300">4K Ultra HD</span>
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-gray-300/90 leading-relaxed mb-10 max-w-2xl line-clamp-3 font-medium"
                    >
                        {movie.description}
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap items-center gap-5"
                    >
                        <button
                            onClick={() => navigate(`/watch/${movie.id}`)}
                            className="btn-premium group flex items-center space-x-4 py-4 px-10"
                        >
                            <Play className="w-6 h-6 fill-white" />
                            <span className="text-sm font-black tracking-widest">Start Watching</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>

                        <button
                            onClick={() => navigate(`/title/${movie.id}`)}
                            className="btn-secondary flex items-center space-x-4 py-4 px-10 border border-white/20"
                        >
                            <Info className="w-6 h-6" />
                            <span className="text-sm font-black tracking-widest">More Info</span>
                        </button>

                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 rounded-full glass-panel flex items-center justify-center border border-white/10 hover:border-accent-primary transition-colors"
                        >
                            <Plus className="w-6 h-6 text-white" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent z-40" />
        </section>
    );
};

export default HeroBanner;
