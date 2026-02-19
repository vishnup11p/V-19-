import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, Settings2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileSelection = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        if (profile) {
            setProfiles([
                {
                    id: profile.id,
                    name: profile.username || 'Visionary',
                    avatar: profile.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
                    type: 'Original'
                },
                {
                    id: 'kids',
                    name: 'V 19+ Junior',
                    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kids',
                    type: 'Junior'
                }
            ]);
        }
    }, [profile]);

    return (
        <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-accent-primary selection:text-white">
            {/* Cinematic Ambient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-accent-primary/10 via-transparent to-transparent opacity-50" />
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-primary/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#6366f1]/5 blur-[150px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-center mb-24"
            >
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <Sparkles className="w-4 h-4 text-accent-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent-primary/60">Select Your Experience</span>
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white tracking-tighter leading-none mb-4">
                    Who's Watching?
                </h1>
                <p className="text-gray-500 font-medium text-lg tracking-tight">Personalizing the vision for your arrival.</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-12 md:gap-20 relative z-10">
                <AnimatePresence>
                    {profiles.map((p, index) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group flex flex-col items-center cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            <div className="relative">
                                {/* Intense Hover Glow */}
                                <div className="absolute -inset-6 bg-accent-primary opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-700 rounded-full" />

                                <motion.div
                                    whileHover={{ y: -20, scale: 1.05 }}
                                    className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-[3rem] overflow-hidden border-2 border-white/5 group-hover:border-accent-primary/50 transition-all duration-700 ott-card-shadow"
                                >
                                    <img
                                        src={p.avatar}
                                        alt={p.name}
                                        className="w-full h-full object-cover filter grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />

                                    {/* Action Reveal */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-accent-primary/10 backdrop-blur-[2px]">
                                        <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                                            <Sparkles className="w-6 h-6" />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Tag */}
                                <div className="absolute -top-4 -right-4 px-4 py-1.5 glass-panel rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all delay-100 shadow-xl">
                                    <span className="text-[9px] font-black uppercase tracking-widest text-accent-primary">{p.type}</span>
                                </div>
                            </div>

                            <div className="mt-10 text-center">
                                <h3 className="text-2xl md:text-3xl font-display font-medium text-gray-500 group-hover:text-white transition-colors tracking-tight">
                                    {p.name}
                                </h3>
                                <div className="w-0 h-1 bg-accent-primary mx-auto mt-4 rounded-full group-hover:w-1/2 transition-all duration-700" />
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: profiles.length * 0.1, duration: 0.8 }}
                        className="group flex flex-col items-center cursor-pointer"
                    >
                        <motion.div
                            whileHover={{ y: -20, scale: 1.05 }}
                            className="relative w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-[3rem] border-2 border-dashed border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all duration-700"
                        >
                            <Plus className="w-12 h-12 text-gray-700 group-hover:text-white group-hover:rotate-90 transition-all duration-700" />
                        </motion.div>
                        <h3 className="mt-10 text-xl font-display font-medium text-gray-700 group-hover:text-gray-400 transition-colors">
                            Add Life
                        </h3>
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-32"
            >
                <button
                    onClick={() => navigate('/manage-profiles')}
                    className="flex items-center space-x-3 px-10 py-4 rounded-full border border-white/5 bg-white/5 text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] hover:border-white hover:text-white hover:bg-white/10 transition-all group"
                >
                    <Settings2 className="w-4 h-4 group-hover:rotate-180 transition-transform duration-1000" />
                    <span>Manage Visions</span>
                </button>
            </motion.div>

            {/* Premium Watermark */}
            <div className="absolute bottom-12 right-12 text-3xl font-display font-black opacity-[0.05] select-none tracking-tighter">
                V 19<span className="text-accent-primary">+</span> ULTRA
            </div>
        </div>
    );
};

export default ProfileSelection;
