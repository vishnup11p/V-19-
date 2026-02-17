import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('A vision link has been sent to your inbox.');
        }
        setLoading(false);
    };

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) console.error('Error logging in with Google:', error.message);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-900 relative overflow-hidden p-4">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative z-10 w-full max-w-lg"
            >
                <div className="glass-strong rounded-[3rem] p-10 md:p-14 shadow-2xl border-2 border-white/5 relative overflow-hidden group">
                    {/* Interior Glow */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 text-center mb-12">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Next Gen Streaming</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white mb-4 drop-shadow-glow">
                            V 19<span className="gradient-text">+</span> Vision
                        </h1>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Sign in to explore the most cinematic collection of movies and series in the universe.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="relative group/input">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-accent transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                placeholder="Universal Identity (Email)"
                                className="w-full glass-subtle border-2 border-white/5 rounded-2xl pl-14 pr-6 py-5 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:bg-white/5 transition-all outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full gradient-accent hover:shadow-glow-strong text-white font-black tracking-widest uppercase text-xs py-5 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                    💥
                                </motion.div>
                            ) : (
                                <>
                                    <span>Enter the Vision</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-10">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 text-[10px] font-black tracking-widest uppercase text-gray-600 bg-transparent backdrop-blur-3xl">Collaborative Login</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full glass-subtle hover:bg-white/5 text-gray-300 font-black tracking-widest uppercase text-[10px] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all border border-white/5 hover:border-white/10"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" />
                        Sync with Google
                    </button>

                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-8 p-4 glass-subtle border border-accent/30 rounded-2xl text-center text-xs font-bold text-accent shadow-glow"
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-10 flex items-center justify-center gap-2 opacity-30">
                    <ShieldCheck className="w-4 h-4 text-gray-500" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Encrypted Vision Access</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
