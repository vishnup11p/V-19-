import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Plus, Info, Star, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie, index = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const cardRef = useRef(null);

    // Dynamic 3D Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03, duration: 0.5 }}
            className="relative group perspective-[1500px]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative w-full aspect-[2/3] rounded-3xl overflow-hidden cursor-pointer bg-bg-tertiary ott-card-shadow"
            >
                {/* Media Layer */}
                <motion.div
                    className="absolute inset-0 z-0"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                >
                    <img
                        src={movie.thumbnail_url}
                        alt={movie.title}
                        className="w-full h-full object-cover brightness-90 group-hover:brightness-75 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-black/20" />
                </motion.div>

                {/* Overlays & Content */}
                <div className="absolute inset-0 z-10 p-5 flex flex-col justify-end">
                    {/* Premiere Tag */}
                    <div className="absolute top-4 left-4 flex space-x-2 translate-z-20">
                        {index < 3 && (
                            <div className="px-2 py-1 rounded bg-accent-primary text-[8px] font-black uppercase tracking-widest text-white shadow-lg">
                                TOP 10
                            </div>
                        )}
                        <div className="px-2 py-1 rounded glass-panel text-[8px] font-black uppercase tracking-widest text-white">
                            4K
                        </div>
                    </div>

                    {/* Metadata Detail */}
                    <motion.div
                        className="translate-z-50"
                        animate={{ y: isHovered ? -10 : 0 }}
                    >
                        <h3 className="text-white font-display font-black text-xl mb-1 truncate leading-tight">
                            {movie.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-tighter">
                            <span className="text-accent-primary">98% Match</span>
                            <span className="w-1 h-1 rounded-full bg-gray-600" />
                            <span>{movie.release_year}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-600" />
                            <span>{movie.age_rating || '18+'}</span>
                        </div>
                    </motion.div>

                    {/* Expandable Actions */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex flex-col space-y-4 translate-z-40 overflow-hidden"
                            >
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => navigate(`/watch/${movie.id}`)}
                                        className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-wider hover:bg-accent-primary hover:text-white transition-all duration-300"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-current" />
                                        <span>Play now</span>
                                    </button>
                                    <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center border border-white/10 hover:border-accent-primary transition-colors">
                                        <Plus className="w-4 h-4 text-white" />
                                    </button>
                                </div>

                                <button
                                    onClick={() => navigate(`/title/${movie.id}`)}
                                    className="flex items-center justify-between px-4 py-2 rounded-2xl glass-panel group/btn"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">View Details</span>
                                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover/btn:text-white transition-colors" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Border Glow Effect */}
                <motion.div
                    className="absolute inset-0 pointer-events-none border-2 border-accent-primary/0 rounded-3xl"
                    animate={{ borderColor: isHovered ? 'rgba(255, 106, 0, 0.4)' : 'rgba(255, 106, 0, 0)' }}
                />
            </motion.div>
        </motion.div>
    );
};

export default MovieCard;
