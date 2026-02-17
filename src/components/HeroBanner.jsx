import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Info, Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = ({ movie }) => {
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const { scrollY } = useScroll();

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

    if (!movie) return null;

    return (
        <div ref={heroRef} className="relative h-[100vh] w-full overflow-hidden bg-primary-900">
            {/* Background with Parallax */}
            <motion.div
                style={{ y: y1, opacity, scale }}
                className="absolute inset-0"
            >
                <img
                    src={movie.thumbnail_url}
                    alt={movie.title}
                    className="w-full h-full object-cover filter brightness-[0.7] saturate-[1.2]"
                />

                {/* Advanced Multi-layered Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/40 to-transparent" />

                {/* Accent Glow Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-radial from-accent-glow to-transparent opacity-30" />
            </motion.div>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col justify-end pb-24 md:pb-32 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto z-10 pointer-events-none">
                <div className="space-y-6 pointer-events-auto">
                    {/* Metadata Badges */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-wrap items-center gap-3"
                    >
                        <span className="glass-subtle px-3 py-1 rounded-full text-xs font-bold text-accent tracking-tighter uppercase">
                            Premium Choice
                        </span>
                        <div className="flex items-center gap-1.5 glass-subtle px-3 py-1 rounded-full">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <span className="text-xs font-bold">9.8/10</span>
                        </div>
                        <span className="text-gray-400 text-xs font-medium">
                            {movie.release_year} • {movie.duration}m • {movie.age_rating || '16+'}
                        </span>
                    </motion.div>

                    {/* Title with Gradient and Glow */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight leading-none drop-shadow-2xl">
                            {movie.title.split(' ').map((word, i) => (
                                <span key={i} className={i === movie.title.split(' ').length - 1 ? "gradient-text" : "text-white"}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                    </motion.div>

                    {/* Description with Balance */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="max-w-xl text-lg md:text-xl text-gray-300 font-light leading-relaxed line-clamp-3 text-balance drop-shadow-lg"
                    >
                        {movie.description}
                    </motion.p>

                    {/* Genres */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap gap-2"
                    >
                        {movie.genre?.map((g, i) => (
                            <span key={i} className="text-xs font-medium text-gray-400 flex items-center">
                                {i > 0 && <span className="w-1 h-1 bg-gray-600 rounded-full mx-2" />}
                                {g}
                            </span>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-wrap items-center gap-4 pt-4"
                    >
                        <button
                            onClick={() => navigate(`/watch/${movie.id}`)}
                            className="btn-primary flex items-center gap-3 px-8 py-4 text-lg animate-pulse-glow"
                        >
                            <Play className="fill-white w-6 h-6" />
                            <span>Watch Preview</span>
                        </button>

                        <button className="btn-glass flex items-center gap-3 px-8 py-4 text-lg hover:scale-105 transition-transform">
                            <Info className="w-6 h-6" />
                            <span>Explore More</span>
                        </button>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-14 h-14 glass-subtle rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <Plus className="w-7 h-7" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
            >
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-50">Scroll</span>
                <ChevronDown className="w-4 h-4" />
            </motion.div>
        </div>
    );
};

export default HeroBanner;
