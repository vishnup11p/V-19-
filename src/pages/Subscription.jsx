import { Check, Star, Sparkles, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import { handlePayment } from '../lib/razorpay';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Subscription = () => {
    const { user } = useAuth();

    const plans = [
        {
            name: 'Basic',
            price: 0,
            displayPrice: '₹0',
            subtitle: 'Start your journey',
            features: ['Limited Content', '480p SD Quality', 'Ads Support', 'Single Stream', 'Mobile Only'],
            active: false,
            gradient: 'from-zinc-800 to-zinc-900',
            buttonLabel: 'Current Vision'
        },
        {
            name: 'Premium',
            price: 199,
            displayPrice: '₹199',
            subtitle: 'The Ultimate Vision',
            features: ['Unlimited Content', '4K Ultra HD + HDR10+', 'Full Ad-Free Experience', '4 Simultaneous Streams', 'Spatial Audio Support', 'Offline Downloads'],
            active: true,
            popular: true,
            gradient: 'var(--accent-gradient)',
            buttonLabel: 'Awaken Premium'
        }
    ];

    const handleSubscribe = (plan) => {
        if (plan.price === 0) return;

        handlePayment(
            plan.price,
            plan.name,
            user?.email,
            (response) => {
                alert("Vision Upgrade Successful! Welcome to the Future.");
            },
            (error) => {
                console.error("Payment failed", error);
            }
        );
    };

    return (
        <div className="min-h-screen bg-primary-900 text-white overflow-hidden">
            <Navbar />

            {/* Ambient Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">Expand Your Horizons</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl font-display font-black tracking-tighter mb-4 drop-shadow-glow">
                        Choose Your Vision
                    </h1>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Elevate your streaming experience with next-generation quality and zero interruptions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className={`relative rounded-[3rem] p-10 border-2 transition-all duration-500 group overflow-hidden ${plan.popular
                                    ? 'bg-zinc-900 border-accent shadow-glow-strong scale-105 z-10'
                                    : 'glass-subtle border-white/5 hover:border-white/10'
                                }`}
                        >
                            {plan.popular && (
                                <>
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 blur-[50px] rounded-full" />
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-accent text-white px-6 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-glow animate-pulse">
                                        Elite Choice
                                    </div>
                                </>
                            )}

                            <div className="text-left mb-10">
                                <h2 className="text-3xl font-display font-black mb-1">{plan.name}</h2>
                                <p className="text-gray-500 text-sm font-medium">{plan.subtitle}</p>
                            </div>

                            <div className="flex items-end gap-1 mb-10">
                                <span className="text-6xl font-display font-black">{plan.displayPrice}</span>
                                <span className="text-gray-400 font-bold mb-2">/ month</span>
                            </div>

                            <div className="space-y-5 mb-12">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-4 group/item">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${plan.popular ? 'bg-accent/20 text-accent' : 'bg-white/5 text-gray-500'}`}>
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className={`text-sm font-medium transition-colors ${plan.popular ? 'text-gray-100' : 'text-gray-400 group-hover/item:text-gray-200'}`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => handleSubscribe(plan)}
                                className={`w-full py-5 rounded-2xl font-black tracking-widest uppercase text-xs transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${plan.active
                                        ? 'gradient-accent text-white shadow-glow hover:shadow-glow-strong'
                                        : 'glass cursor-default text-gray-400 opacity-50'
                                    }`}
                            >
                                {plan.buttonLabel}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 flex flex-wrap justify-center gap-8 opacity-40 grayscale"
                >
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-xs font-bold tracking-widest uppercase">Secured by Razorpay</span>
                    </div>
                </motion.div>

                <p className="mt-12 text-gray-600 text-xs font-medium max-w-md mx-auto">
                    Pricing applies to residents of India. Terms and conditions of the V 19+ Vision Agreement apply. Vision requires compatible hardware.
                </p>
            </div>
        </div>
    );
};

export default Subscription;
