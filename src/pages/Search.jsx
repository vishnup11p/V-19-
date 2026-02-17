import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { DUMMY_MOVIES } from '../lib/dummyData';

const BentoGrid = ({ onSelectCategory }) => {
    const collections = [
        { id: 'trending', title: 'Trending Now', size: 'col-span-2 row-span-2', bg: 'bg-gradient-accent', icon: '🔥' },
        { id: 'originals', title: 'Originals', size: 'col-span-1 row-span-1', bg: 'bg-gradient-purple', icon: '✨' },
        { id: 'Action', title: 'Action', size: 'col-span-1 row-span-1', bg: 'bg-blue-600/20', icon: '💥' },
        { id: 'Sci-Fi', title: 'Sci-Fi', size: 'col-span-1 row-span-1', bg: 'bg-indigo-600/20', icon: '🛸' },
        { id: 'Drama', title: 'Drama', size: 'col-span-1 row-span-2', bg: 'bg-red-600/20', icon: '🎭' },
        { id: 'Thriller', title: 'Thriller', size: 'col-span-1 row-span-1', bg: 'bg-zinc-800', icon: '🌑' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 h-[600px] mb-12">
            {collections.map((item, idx) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onSelectCategory(item.id)}
                    className={`${item.size} ${item.bg} glass-subtle rounded-3xl p-6 cursor-pointer relative overflow-hidden group border border-white/5 hover:border-white/20 transition-all`}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <span className="text-4xl">{item.icon}</span>
                        <h3 className="text-xl font-bold font-display">{item.title}</h3>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const Search = () => {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [isFocused, setIsFocused] = useState(false);

    const categories = ['All', 'Movies', 'Series', 'Action', 'Sci-Fi', 'Drama', 'Thriller'];

    const filteredMovies = useMemo(() => {
        return DUMMY_MOVIES.filter(movie => {
            const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = activeCategory === 'All' ||
                (activeCategory === 'Movies' && movie.type === 'movie') ||
                (activeCategory === 'Series' && movie.type === 'series') ||
                movie.genre.includes(activeCategory);

            return matchesQuery && matchesCategory;
        });
    }, [query, activeCategory]);

    return (
        <div className="min-h-screen bg-primary-900 text-white overflow-hidden">
            <Navbar />

            <div className="pt-32 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto">
                {/* Premium Search Header */}
                <div className="relative mb-16">
                    <motion.div
                        animate={{
                            scale: isFocused ? 1.02 : 1,
                            boxShadow: isFocused ? '0 0 50px rgba(255, 106, 0, 0.15)' : 'none'
                        }}
                        className={`relative max-w-2xl mx-auto glass rounded-full p-1 border-2 transition-colors duration-500 ${isFocused ? 'border-accent' : 'border-white/10'}`}
                    >
                        <div className="flex items-center px-6 py-3">
                            <SearchIcon className={`w-6 h-6 mr-4 transition-colors ${isFocused ? 'text-accent' : 'text-gray-500'}`} />
                            <input
                                type="text"
                                placeholder="Search with V 19+ AI..."
                                className="w-full bg-transparent border-none text-xl outline-none placeholder:text-gray-600"
                                value={query}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                                <button onClick={() => setQuery('')} className="p-1 hover:bg-white/10 rounded-full">
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mt-8">
                        {categories.map((cat, idx) => (
                            <motion.button
                                key={cat}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                        ? 'gradient-accent text-white shadow-glow'
                                        : 'glass-subtle text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {!query && activeCategory === 'All' ? (
                        <motion.div
                            key="bento"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <Sparkles className="text-accent" />
                                <h2 className="text-3xl font-display font-bold">Discover Collections</h2>
                            </div>
                            <BentoGrid onSelectCategory={setActiveCategory} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-display font-bold">
                                    {query ? `Search results for "${query}"` : activeCategory}
                                    <span className="text-gray-500 text-lg ml-3">({filteredMovies.length})</span>
                                </h2>
                                <button className="glass-subtle p-2 rounded-xl">
                                    <SlidersHorizontal className="w-5 h-5" />
                                </button>
                            </div>

                            {filteredMovies.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pb-20">
                                    {filteredMovies.map((movie, idx) => (
                                        <MovieCard key={movie.id} movie={movie} index={idx} />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-32 glass-subtle rounded-[3rem]"
                                >
                                    <h3 className="text-2xl font-bold mb-2">No luck today!</h3>
                                    <p className="text-gray-500">We couldn't find anything matching your search. Try another word?</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Background Decorations */}
            <div className="fixed top-0 right-0 -z-10 w-1/2 h-1/2 bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 -z-10 w-1/3 h-1/3 bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
        </div>
    );
};

export default Search;
