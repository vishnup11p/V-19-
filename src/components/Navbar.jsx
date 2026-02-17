import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                        ? 'glass-strong shadow-lg'
                        : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
                    {/* Logo with Glow */}
                    <Link
                        to="/"
                        className="relative group"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-3xl md:text-4xl font-display font-bold tracking-tighter"
                        >
                            <span className="text-white">V 19</span>
                            <span className="gradient-text text-glow">+</span>
                        </motion.div>
                        <div className="absolute -inset-2 bg-gradient-accent opacity-0 group-hover:opacity-20 blur-xl transition-opacity rounded-full" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {['Home', 'Series', 'Movies', 'New & Popular', 'My List'].map((item, index) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                                className="relative group"
                            >
                                <motion.span
                                    whileHover={{ y: -2 }}
                                    className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors"
                                >
                                    {item}
                                </motion.span>
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-accent origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4 md:space-x-6">
                        {/* Search */}
                        <motion.div
                            className="relative"
                            initial={false}
                            animate={{ width: searchOpen ? 240 : 40 }}
                        >
                            {searchOpen ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center glass rounded-full px-4 py-2"
                                >
                                    <Search className="w-5 h-5 text-gray-400 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        autoFocus
                                        className="bg-transparent text-white text-sm outline-none w-full"
                                        onBlur={() => setSearchOpen(false)}
                                    />
                                </motion.div>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setSearchOpen(true)}
                                    className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center hover:glass transition-all"
                                >
                                    <Search className="w-5 h-5 text-white" />
                                </motion.button>
                            )}
                        </motion.div>

                        {/* Notifications */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative w-10 h-10 rounded-full glass-subtle flex items-center justify-center hover:glass transition-all"
                        >
                            <Bell className="w-5 h-5 text-white" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-accent rounded-full animate-pulse-glow" />
                        </motion.button>

                        {/* Profile Dropdown */}
                        <div className="hidden md:block relative group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-primary-500 transition-all">
                                    <img
                                        src={profile?.avatar_url || "https://ui-avatars.com/api/?name=User&background=ff6a00&color=fff"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    className="absolute right-0 top-full mt-3 w-56 glass-strong rounded-2xl shadow-glass opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 overflow-hidden"
                                >
                                    <div className="p-3 space-y-1">
                                        <Link
                                            to="/manage-profiles"
                                            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group/item"
                                        >
                                            <User className="w-5 h-5 text-gray-400 group-hover/item:text-white transition-colors" />
                                            <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors">Manage Profiles</span>
                                        </Link>
                                        <Link
                                            to="/history"
                                            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group/item"
                                        >
                                            <svg className="w-5 h-5 text-gray-400 group-hover/item:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm text-gray-300 group-hover/item:text-white transition-colors">Watch History</span>
                                        </Link>
                                        <div className="h-px bg-white/10 my-2" />
                                        <button
                                            onClick={signOut}
                                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-colors group/item"
                                        >
                                            <LogOut className="w-5 h-5 text-red-400 group-hover/item:text-red-300 transition-colors" />
                                            <span className="text-sm text-red-400 group-hover/item:text-red-300 transition-colors">Sign Out</span>
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden w-10 h-10 rounded-full glass-subtle flex items-center justify-center"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-white" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
                        <motion.div
                            className="absolute right-0 top-0 bottom-0 w-80 glass-strong shadow-2xl p-6"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-bold gradient-text">Menu</h2>
                                    <button onClick={() => setMobileMenuOpen(false)}>
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>

                                <nav className="flex-1 space-y-2">
                                    {['Home', 'Series', 'Movies', 'New & Popular', 'My List'].map((item) => (
                                        <Link
                                            key={item}
                                            to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="space-y-2 pt-6 border-t border-white/10">
                                    <Link
                                        to="/manage-profiles"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors"
                                    >
                                        <User className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm text-gray-300">Manage Profiles</span>
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/20 transition-colors"
                                    >
                                        <LogOut className="w-5 h-5 text-red-400" />
                                        <span className="text-sm text-red-400">Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
