import { useState, useRef, useEffect } from 'react';
import { Subtitles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SubtitleSelector = ({ subtitles = [], currentSubtitle, onSubtitleChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (subtitle) => {
        onSubtitleChange(subtitle);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-accent transition flex items-center gap-2"
                title="Subtitles"
            >
                <Subtitles className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full right-0 mb-2 bg-zinc-900/95 backdrop-blur-md border border-zinc-700 rounded-lg overflow-hidden shadow-2xl min-w-[200px]"
                    >
                        <div className="p-2">
                            <div className="text-xs text-gray-400 px-3 py-2 font-semibold">
                                Subtitles
                            </div>

                            {/* Off option */}
                            <button
                                onClick={() => handleSelect(null)}
                                className={`w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition flex items-center justify-between ${!currentSubtitle ? 'text-accent' : 'text-white'
                                    }`}
                            >
                                <span>Off</span>
                                {!currentSubtitle && <Check className="w-4 h-4" />}
                            </button>

                            {/* Subtitle options */}
                            {subtitles.map((subtitle) => (
                                <button
                                    key={subtitle.lang}
                                    onClick={() => handleSelect(subtitle)}
                                    className={`w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition flex items-center justify-between ${currentSubtitle?.lang === subtitle.lang ? 'text-accent' : 'text-white'
                                        }`}
                                >
                                    <span>{subtitle.label}</span>
                                    {currentSubtitle?.lang === subtitle.lang && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SubtitleSelector;
