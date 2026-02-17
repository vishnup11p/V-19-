import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

const RecommendationRow = ({ title, subtitle, movies }) => {
    const navigate = useNavigate();
    const rowRef = useRef(null);

    if (!movies || movies.length === 0) return null;

    const scroll = (direction) => {
        if (rowRef.current) {
            const { current } = rowRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth : current.offsetWidth;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-2 px-4 md:px-12 my-8">
            <div>
                <h2 className="text-white text-xl md:text-2xl font-bold hover:text-accent transition duration-300 cursor-pointer">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
                )}
            </div>

            <div className="group relative">
                <ChevronLeft
                    className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 bg-black/50 rounded-full p-1 text-white"
                    onClick={() => scroll('left')}
                />

                <div
                    ref={rowRef}
                    className="flex items-center space-x-4 overflow-x-scroll scrollbar-hide md:space-x-8 pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                <ChevronRight
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 bg-black/50 rounded-full p-1 text-white"
                    onClick={() => scroll('right')}
                />
            </div>
        </div>
    );
};

export default RecommendationRow;
