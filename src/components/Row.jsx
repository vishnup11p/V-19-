import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { motion } from 'framer-motion';

const Row = ({ title, subtitle, movies = [], type = 'standard' }) => {
    const rowRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { current } = rowRef;
            const scrollAmount = direction === 'left'
                ? -current.offsetWidth * 0.8
                : current.offsetWidth * 0.8;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - rowRef.current.offsetLeft);
        setScrollLeft(rowRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - rowRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        rowRef.current.scrollLeft = scrollLeft - walk;
    };

    if (!movies || movies.length === 0) return null;

    return (
        <div className="mb-12 group/row relative z-10">
            {/* Header */}
            <div className="px-4 md:px-12 mb-4">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-white text-xl md:text-2xl font-display font-black hover:text-accent transition duration-300 cursor-pointer inline-flex items-center gap-2 group/title"
                >
                    {title}
                    <ChevronRight className="w-5 h-5 opacity-0 group-hover/row:opacity-100 transition-all text-accent transform group-hover/row:translate-x-1" />
                </motion.h2>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>

            {/* Carousel Container */}
            <div className="group relative">
                {/* Left Control */}
                <div className="absolute top-0 bottom-0 left-0 z-40 w-[4%] bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                    <button
                        className="p-3 rounded-full glass hover:bg-white/10 transition-all transform hover:scale-110 active:scale-95"
                        onClick={() => scroll('left')}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                </div>

                {/* Scroll Area */}
                <div
                    ref={rowRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className={`flex gap-5 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-10 pt-4 scroll-smooth ${isDragging ? 'cursor-grabbing select-none' : 'cursor-default'}`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map((movie, index) => (
                        <div key={`${movie.id}-${index}`} className="flex-shrink-0 w-44 md:w-56 lg:w-64">
                            <MovieCard movie={movie} index={index} />
                        </div>
                    ))}

                    {/* Padding for end of list */}
                    <div className="w-12 flex-shrink-0" />
                </div>

                {/* Right Control */}
                <div className="absolute top-0 bottom-0 right-0 z-40 w-[4%] bg-gradient-to-l from-bg-primary via-bg-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                    <button
                        className="p-3 rounded-full glass hover:bg-white/10 transition-all transform hover:scale-110 active:scale-95"
                        onClick={() => scroll('right')}
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Row;
