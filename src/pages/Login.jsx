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
        <div className="min-h-screen flex items-center justify-center bg-bg-primary relative overflow-hidden p-6 selection:bg-accent-primary selection:text-white">
            {/* Cinematic Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-bg-primary/80 z-10 backdrop-blur-3xl" />
                <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] rotate-12 opacity-30 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-primary/20 blur-[180px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#6366f1]/10 blur-[150px] rounded-full" />
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-xl"
            >
                <div className="glass-panel p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                    <div className="relative z-10 text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-accent-primary/10 border border-accent-primary/30 mb-8"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-primary">The Future of Content</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-display font-black tracking-tighter text-white mb-6 leading-none">
                            V 19<span className="gradient-text">+</span>
                        </h1>
                        <p className="text-gray-400 font-medium text-lg max-w-sm mx-auto leading-relaxed">
                            Welcome back. Secure your access to the next generation of digital masterpieces.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="group relative">
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent-primary transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                placeholder="Universal Access ID"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-16 pr-6 py-5 text-white placeholder-gray-600 focus:outline-none focus:border-accent-primary focus:bg-white/10 transition-all text-lg"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-premium py-5 rounded-2xl flex items-center justify-center space-x-3 group/btn shadow-[0_20px_40px_-15px_rgba(255,106,0,0.4)]"
                        >
                            {loading ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                            ) : (
                                <>
                                    <span className="font-black uppercase tracking-widest text-xs">Unlock Exclusive Access</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-12 flex items-center">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="px-6 text-[10px] font-black uppercase tracking-[0.4em] text-gray-600">Secure Federation</span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center space-x-4 py-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group/google"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        <span className="font-black uppercase tracking-widest text-[10px] text-white">Identity with Google</span>
                    </button>

                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-8 p-5 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 text-center text-xs font-bold text-accent-primary shadow-[0_0_30px_rgba(255,106,0,0.1)]"
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-12 flex flex-col items-center space-y-4 opacity-30">
                    <div className="flex items-center space-x-3">
                        <ShieldCheck className="w-4 h-4 text-gray-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Quantum Encrypted Access</span>
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Powered by V 19+ Core</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
