import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import MovieCard from './MovieCard';
import { motion, AnimatePresence } from 'framer-motion';

const Row = ({ title, subtitle, movies = [], type = 'standard' }) => {
    const rowRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = () => {
        if (rowRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
            setShowLeftArrow(scrollLeft > 10);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction) => {
        if (rowRef.current) {
            const { current } = rowRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth * 0.8 : current.offsetWidth * 0.8;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const row = rowRef.current;
        if (row) {
            row.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check
            return () => row.removeEventListener('scroll', handleScroll);
        }
    }, [movies]);

    if (!movies || movies.length === 0) return null;

    return (
        <section className="mb-16 group/row relative overflow-visible">
            {/* Header with Premium Flair */}
            <div className="px-6 md:px-12 lg:px-20 mb-6 flex items-end justify-between">
                <div>
                    <div className="flex items-center space-x-2 mb-1">
                        {type === 'trending' && <Sparkles className="w-4 h-4 text-accent-primary" />}
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary/60">
                            {subtitle || 'Handpicked for you'}
                        </span>
                    </div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-white leading-none tracking-tight"
                    >
                        {title}
                    </motion.h2>
                </div>

                <button className="hidden md:flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors group/more">
                    <span>View all</span>
                    <ChevronRight className="w-4 h-4 group-hover/more:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Carousel System */}
            <div className="relative group px-0 md:px-4 lg:px-8">
                {/* Left Shadow & Button */}
                <AnimatePresence>
                    {showLeftArrow && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-y-0 left-0 z-30 w-24 bg-gradient-to-r from-bg-primary to-transparent pointer-events-none flex items-center justify-start pl-8"
                        >
                            <button
                                onClick={() => scroll('left')}
                                className="w-12 h-12 rounded-full glass-panel border border-white/10 hover:border-accent-primary flex items-center justify-center pointer-events-auto transition-all hover:scale-110 active:scale-90"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Right Shadow & Button */}
                <AnimatePresence>
                    {showRightArrow && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-y-0 right-0 z-30 w-24 bg-gradient-to-l from-bg-primary to-transparent pointer-events-none flex items-center justify-end pr-8"
                        >
                            <button
                                onClick={() => scroll('right')}
                                className="w-12 h-12 rounded-full glass-panel border border-white/10 hover:border-accent-primary flex items-center justify-center pointer-events-auto transition-all hover:scale-110 active:scale-90"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Scrolling Row */}
                <div
                    ref={rowRef}
                    className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto no-scrollbar px-6 md:px-12 lg:px-12 py-4 scroll-smooth"
                >
                    {movies.map((movie, index) => (
                        <div key={`${movie.id}-${index}`} className="flex-shrink-0 w-[160px] md:w-[220px] lg:w-[280px]">
                            <MovieCard movie={movie} index={index} />
                        </div>
                    ))}
                    {/* Spacer */}
                    <div className="flex-shrink-0 w-12 md:w-24 lg:w-32 h-1" />
                </div>
            </div>
        </section>
    );
};

export default Row;
