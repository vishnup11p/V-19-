import { useNavigate } from 'react-router-dom';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { motion } from 'framer-motion';

const Top10Badge = ({ rank }) => {
    return (
        <div className="absolute top-0 left-0 w-24 h-full flex items-end justify-center pb-2 z-10 pointer-events-none transform -translate-x-4 scale-125">
            <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-lg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#555" />
                        <stop offset="100%" stopColor="#222" />
                    </linearGradient>
                </defs>
                <text
                    x="50"
                    y="130"
                    fontSize="130"
                    fontWeight="900"
                    fill="none"
                    stroke="#888"
                    strokeWidth="2"
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                    className="drop-shadow-md"
                >
                    {rank}
                </text>
                <text
                    x="50"
                    y="130"
                    fontSize="130"
                    fontWeight="900"
                    fill="url(#gradient)"
                    textAnchor="middle"
                    fontFamily="Inter, sans-serif"
                >
                    {rank}
                </text>
            </svg>
        </div>
    );
};

const Top10Row = ({ movies }) => {
    const navigate = useNavigate();
    const rowRef = useRef(null);

    if (!movies || movies.length === 0) return null;

    const scroll = (direction) => {
        if (rowRef.current) {
            const { current } = rowRef;
            const scrollAmount = direction === 'left'
                ? -current.offsetWidth * 0.8
                : current.offsetWidth * 0.8;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="mb-12 group/row relative z-10">
            <div className="px-4 md:px-12 mb-4">
                <h2 className="text-white text-xl md:text-2xl font-bold font-display inline-flex items-center gap-2">
                    <span className="text-2xl">🔥</span> Top 10 in Your Country
                </h2>
            </div>

            <div className="group relative">
                {/* Scroll Controls */}
                <div className="absolute top-0 bottom-0 left-0 z-40 w-[4%] bg-gradient-to-r from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                    <button
                        className="p-2 rounded-full glass hover:bg-white/20 transition-all transform hover:scale-110 active:scale-95"
                        onClick={() => scroll('left')}
                    >
                        <ChevronLeft className="h-6 w-6 text-white" />
                    </button>
                </div>

                <div
                    ref={rowRef}
                    className="flex gap-8 overflow-x-auto scrollbar-hide px-4 md:px-12 pb-8 pt-4 scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map((movie, index) => (
                        <div key={movie.id} className="relative flex-shrink-0 w-48 md:w-64">
                            <motion.div
                                className="flex relative"
                                whileHover={{ scale: 1.05, zIndex: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {/* Rank Number */}
                                <div className="flex-shrink-0 w-16 md:w-24 text-8xl md:text-[10rem] font-black text-stroke text-right leading-none self-end text-zinc-800"
                                    style={{
                                        WebkitTextStroke: '2px #666',
                                        textShadow: '0 0 20px rgba(0,0,0,0.5)'
                                    }}
                                >
                                    {index + 1}
                                </div>

                                {/* Movie Card */}
                                <div
                                    className="relative aspect-[2/3] w-32 md:w-40 rounded-lg overflow-hidden cursor-pointer shadow-xl -ml-4"
                                    onClick={() => navigate(`/details/${movie.id}`)}
                                >
                                    <img
                                        src={movie.thumbnail_url}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Play className="w-10 h-10 text-white fill-white drop-shadow-lg" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                    <div className="w-8 flex-shrink-0" />
                </div>

                <div className="absolute top-0 bottom-0 right-0 z-40 w-[4%] bg-gradient-to-l from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
                    <button
                        className="p-2 rounded-full glass hover:bg-white/20 transition-all transform hover:scale-110 active:scale-95"
                        onClick={() => scroll('right')}
                    >
                        <ChevronRight className="h-6 w-6 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Top10Row;
