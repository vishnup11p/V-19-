import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileSelection = () => {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (profile) {
            setProfiles([
                {
                    id: profile.id,
                    name: profile.username || 'User',
                    avatar: profile.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
                    type: 'Regular'
                },
                {
                    id: 'kids',
                    name: 'V 19+ Kids',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kids',
                    type: 'Junior'
                }
            ]);
            setTimeout(() => setIsLoaded(true), 100);
        }
    }, [profile]);

    const handleSelectProfile = (id) => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-primary-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center mb-16"
            >
                <div className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-4 animate-pulse">Experience Awaits</div>
                <h1 className="text-4xl md:text-6xl text-white font-display font-black tracking-tight drop-shadow-glow">
                    Who's Watching?
                </h1>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-10 md:gap-16 relative z-10">
                <AnimatePresence>
                    {profiles.map((p, index) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: index * 0.15
                            }}
                            className="group flex flex-col items-center cursor-pointer"
                            onClick={() => handleSelectProfile(p.id)}
                        >
                            <div className="relative">
                                {/* Ambient Glow */}
                                <div className="absolute -inset-4 bg-gradient-accent opacity-0 group-hover:opacity-40 blur-3xl transition-opacity duration-500 rounded-full" />

                                <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-[2.5rem] overflow-hidden border-2 border-white/5 group-hover:border-accent transition-all duration-500 shadow-2xl group-hover:scale-110 group-hover:-rotate-3">
                                    <img
                                        src={p.avatar}
                                        alt={p.name}
                                        className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-500"
                                    />
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>

                                {/* Type Badge */}
                                <div className="absolute -top-3 -right-3 px-4 py-1.5 glass rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-glow">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">{p.type}</span>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <span className="block text-gray-500 group-hover:text-white text-2xl font-display font-medium transition-all group-hover:scale-110 tracking-tight">
                                    {p.name}
                                </span>
                                <div className="w-0 h-1 bg-accent mx-auto mt-2 rounded-full group-hover:w-full transition-all duration-500 shadow-glow" />
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            delay: profiles.length * 0.15
                        }}
                        className="group flex flex-col items-center cursor-pointer"
                    >
                        <div className="w-36 h-36 md:w-52 md:h-52 flex items-center justify-center glass-subtle border-2 border-white/5 hover:border-white/20 rounded-[2.5rem] transition-all duration-500 hover:scale-110 shadow-xl group-hover:rotate-3">
                            <Plus className="w-16 h-16 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="mt-8 text-gray-500 group-hover:text-white text-2xl font-display font-medium transition-colors">
                            New Life
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-24 relative z-10"
            >
                <button
                    onClick={() => navigate('/manage-profiles')}
                    className="flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 text-gray-500 font-bold tracking-widest uppercase text-xs hover:border-white hover:text-white hover:bg-white/5 transition-all glass-subtle group"
                >
                    <Settings2 className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                    Manage Profiles
                </button>
            </motion.div>

            {/* Logo Watermark */}
            <div className="absolute bottom-10 left-10 text-2xl font-display font-black opacity-10 select-none">
                V 19<span className="text-accent">+</span>
            </div>
        </div>
    );
};

export default ProfileSelection;
