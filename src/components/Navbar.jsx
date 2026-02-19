import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Series', path: '/series' },
        { name: 'Movies', path: '/movies' },
        { name: 'Popular', path: '/popular' },
        { name: 'My List', path: '/list' },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 container-none lg:container mx-auto mt-0 lg:mt-4 px-4 
                    ${isScrolled ? 'lg:max-w-6xl' : 'lg:max-w-full'}`}
            >
                <div className={`flex items-center justify-between px-6 py-3 transition-all duration-700 
                    ${isScrolled
                        ? 'glass-panel rounded-full lg:px-8 mt-2'
                        : 'bg-transparent py-6'}`}
                >
                    {/* Brand */}
                    <Link to="/" className="relative flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-2xl md:text-3xl font-display font-black tracking-tighter flex items-center"
                        >
                            <span className="text-white">V</span>
                            <span className="gradient-text">19</span>
                            <span className="text-white ml-0.5">+</span>
                        </motion.div>
                        <motion.div
                            className="absolute -inset-x-4 -inset-y-2 bg-accent-primary/0 group-hover:bg-accent-primary/5 blur-xl rounded-full transition-all duration-500"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1 lg:space-x-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="relative px-3 py-2 group"
                                >
                                    <span className={`text-sm font-semibold tracking-wide transition-all duration-300 
                                        ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                        {link.name}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute -bottom-1 left-3 right-3 h-1 bg-gradient-accent rounded-full"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Action Area */}
                    <div className="flex items-center space-x-3 md:space-x-5">
                        {/* Instant Search Bar */}
                        <div className="hidden sm:flex items-center">
                            <motion.div
                                initial={false}
                                animate={{ width: searchOpen ? (window.innerWidth < 640 ? 150 : 220) : 42 }}
                                className="relative flex items-center glass-panel rounded-full overflow-hidden"
                            >
                                <button
                                    onClick={() => setSearchOpen(!searchOpen)}
                                    className="flex items-center justify-center min-w-[42px] h-[42px] hover:bg-white/5 transition-colors"
                                >
                                    <Search className="w-5 h-5 text-gray-300" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-transparent border-none outline-none text-sm text-white w-full pr-4"
                                    onBlur={() => !searchOpen && setSearchOpen(false)}
                                    onChange={(e) => e.target.value.length > 2 && navigate(`/search?q=${e.target.value}`)}
                                />
                            </motion.div>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex items-center space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <Bell className="w-5 h-5 text-gray-300" />
                            </motion.button>

                            {/* User Profile */}
                            <div className="relative group">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center space-x-1 p-1 pr-2 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-accent-primary/30">
                                        <img
                                            src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform duration-300" />
                                </motion.button>

                                {/* Dropdown */}
                                <div className="absolute right-0 top-full pt-4 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 origin-top-right">
                                    <div className="w-64 glass-panel rounded-3xl overflow-hidden shadow-2xl">
                                        <div className="p-5 border-b border-white/5">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Signed in as</p>
                                            <p className="font-display font-medium text-white truncate">{profile?.name || user?.email}</p>
                                        </div>
                                        <div className="p-2">
                                            {[
                                                { icon: User, label: 'Profiles', to: '/manage-profiles' },
                                                { icon: Bell, label: 'Notifications', to: '#' },
                                                { icon: Search, label: 'History', to: '/history' },
                                            ].map((item, i) => (
                                                <Link
                                                    key={i}
                                                    to={item.to}
                                                    className="flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-white/5 transition-colors group/item"
                                                >
                                                    <item.icon className="w-5 h-5 text-gray-400 group-hover/item:text-accent-primary transition-colors" />
                                                    <span className="text-sm font-medium text-gray-300 group-hover/item:text-white">{item.label}</span>
                                                </Link>
                                            ))}
                                            <div className="h-px bg-white/5 my-2 mx-2" />
                                            <button
                                                onClick={signOut}
                                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl hover:bg-red-500/10 transition-colors group/item"
                                            >
                                                <LogOut className="w-5 h-5 text-red-400/70 group-hover/item:text-red-400" />
                                                <span className="text-sm font-medium text-red-400/80 group-hover/item:text-red-400">Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Hamburger */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                            >
                                <Menu className="w-6 h-6 text-white" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Sidebar Navigation */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm glass-panel z-[70] shadow-2xl p-8"
                        >
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-12">
                                    <div className="text-2xl font-display font-black tracking-tighter">
                                        <span className="text-white">V</span>
                                        <span className="gradient-text">19</span>
                                        <span className="text-white">+</span>
                                    </div>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-10 h-10 rounded-full glass-panel flex items-center justify-center"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                <nav className="flex-1 space-y-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-6 py-4 rounded-2xl text-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="pt-8 border-t border-white/5 space-y-4">
                                    <div className="flex items-center space-x-4 px-6">
                                        <div className="w-12 h-12 rounded-full ring-2 ring-accent-primary overflow-hidden">
                                            <img src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white leading-tight">{profile?.name || 'User'}</p>
                                            <p className="text-xs text-gray-500 tracking-wider uppercase font-bold">Premium Member</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { signOut(); setMobileMenuOpen(false); }}
                                        className="w-full flex items-center justify-center space-x-3 p-4 rounded-2xl bg-red-500/10 text-red-500 font-bold"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
