
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SplashScreen = ({ onFinish }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 3000); // 3 seconds splash
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="relative"
            >
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
                    V 19<span className="text-accent drop-shadow-[0_0_20px_rgba(255,106,0,0.8)]">+</span>
                </h1>
                {/* Glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent opacity-20 blur-[80px] rounded-full"></div>
            </motion.div>
        </div>
    );
};

export default SplashScreen;
