import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Plus, Info, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, index = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const cardRef = useRef(null);

    // 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative group perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.05, z: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Image */}
                <img
                    src={movie.thumbnail_url}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

                {/* Glow Effect on Hover */}
                <motion.div
                    className="absolute -inset-1 bg-gradient-accent opacity-0 blur-xl -z-10"
                    animate={{ opacity: isHovered ? 0.4 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    {/* Title - Always Visible */}
                    <motion.h3
                        className="text-white font-bold text-lg mb-2 line-clamp-2"
                        style={{ transform: "translateZ(20px)" }}
                    >
                        {movie.title}
                    </motion.h3>

                    {/* Metadata - Always Visible */}
                    <div className="flex items-center space-x-2 text-xs text-gray-300 mb-3">
                        {movie.match_percentage && (
                            <span className="text-green-400 font-semibold">{movie.match_percentage}% Match</span>
                        )}
                        {movie.age_rating && (
                            <span className="px-1.5 py-0.5 border border-gray-500 rounded text-[10px]">
                                {movie.age_rating}
                            </span>
                        )}
                        {movie.release_year && (
                            <span>{movie.release_year}</span>
                        )}
                    </div>

                    {/* Hover Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                        style={{ transform: "translateZ(30px)" }}
                    >
                        {/* Action Buttons */}
                        <div className="flex items-center space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(`/watch/${movie.id}`)}
                                className="flex items-center space-x-1 px-4 py-2 bg-white text-black rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors"
                            >
                                <Play className="w-4 h-4 fill-black" />
                                <span>Play</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <Plus className="w-5 h-5 text-white" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(`/details/${movie.id}`)}
                                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <Info className="w-5 h-5 text-white" />
                            </motion.button>
                        </div>

                        {/* Genres */}
                        {movie.genre && (
                            <div className="flex flex-wrap gap-1">
                                {movie.genre.slice(0, 3).map((g, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 text-[10px] glass-subtle rounded-full text-gray-300"
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Rating */}
                        {movie.rating && (
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-semibold text-white">{movie.rating}</span>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Shimmer Effect on Load */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, delay: index * 0.1 }}
                />
            </motion.div>
        </motion.div>
    );
};

export default MovieCard;
