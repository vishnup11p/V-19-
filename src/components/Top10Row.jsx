import { useNavigate } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Top10Row = ({ movies }) => {
    const navigate = useNavigate();
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
            handleScroll();
            return () => row.removeEventListener('scroll', handleScroll);
        }
    }, [movies]);

    if (!movies || movies.length === 0) return null;

    return (
        <section className="mb-20 group/row relative">
            {/* Premium Header */}
            <div className="px-6 md:px-12 lg:px-20 mb-8">
                <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-accent-primary" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary/60">Most Popular Today</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-white leading-none tracking-tight">
                    Top 10 in Your Country
                </h2>
            </div>

            {/* Scroll Container */}
            <div className="relative group px-0 md:px-4 lg:px-8">
                <AnimatePresence>
                    {showLeftArrow && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-y-0 left-0 z-30 w-32 bg-gradient-to-r from-bg-primary to-transparent pointer-events-none flex items-center justify-start pl-8"
                        >
                            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full glass-panel border border-white/10 hover:border-accent-primary flex items-center justify-center pointer-events-auto transition-all hover:scale-110 active:scale-90">
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showRightArrow && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-y-0 right-0 z-30 w-32 bg-gradient-to-l from-bg-primary to-transparent pointer-events-none flex items-center justify-end pr-8"
                        >
                            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full glass-panel border border-white/10 hover:border-accent-primary flex items-center justify-center pointer-events-auto transition-all hover:scale-110 active:scale-90">
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    ref={rowRef}
                    className="flex gap-12 md:gap-20 overflow-x-auto no-scrollbar px-6 md:px-12 lg:px-12 py-10 scroll-smooth"
                >
                    {movies.slice(0, 10).map((movie, index) => (
                        <motion.div
                            key={movie.id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex-shrink-0 flex items-end group/card"
                        >
                            {/* Rank Stylized Number */}
                            <div className="text-[14rem] md:text-[20rem] font-display font-black leading-none select-none pointer-events-none
                                text-transparent -mb-8 -ml-4 md:-ml-8 z-0 transition-all duration-700
                                group-hover/card:scale-110 group-hover/card:text-accent-primary/20"
                                style={{
                                    WebkitTextStroke: '2px rgba(255,255,255,0.15)',
                                    textShadow: '0 0 40px rgba(0,0,0,0.5)'
                                }}
                            >
                                {index + 1}
                            </div>

                            {/* Cinema Card */}
                            <motion.div
                                whileHover={{ y: -20, scale: 1.05 }}
                                className="relative w-40 md:w-56 lg:w-64 aspect-[2/3] rounded-[2rem] overflow-hidden ott-card-shadow border border-white/10 z-10 -ml-12 md:-ml-16 cursor-pointer"
                                onClick={() => navigate(`/details/${movie.id}`)}
                            >
                                <img
                                    src={movie.thumbnail_url}
                                    alt={movie.title}
                                    className="w-full h-full object-cover grayscale-[0.2] group-hover/card:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover/card:opacity-30 transition-opacity" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all scale-90 group-hover/card:scale-100">
                                    <div className="w-16 h-16 rounded-full bg-accent-primary flex items-center justify-center shadow-2xl">
                                        <Play className="w-6 h-6 fill-white ml-1" />
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                    <div className="w-24 md:w-40 flex-shrink-0" />
                </div>
            </div>
        </section>
    );
};

export default Top10Row;
