import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Film, Users, LogOut, ArrowLeft, Terminal, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const AdminLayout = () => {
    const { signOut } = useAuth();
    const location = useLocation();

    const menuItems = [
        { path: '/admin', label: 'Command Center', icon: LayoutDashboard },
        { path: '/admin/upload', label: 'Vortex Engine', icon: Film },
        { path: '/admin/users', label: 'Identity Grid', icon: Users },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-primary-900 flex overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full" />
            </div>

            {/* Premium Sidebar */}
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-72 glass-strong border-r border-white/5 flex flex-col fixed h-full z-40"
            >
                <div className="p-8 mb-8">
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center shadow-glow">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-display font-black text-white leading-none tracking-tighter">
                                V 19<span className="text-accent">+</span>
                            </h1>
                            <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Operations</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-3">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`relative group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold overflow-hidden ${isActive(item.path)
                                    ? 'shadow-glow-strong bg-white/5'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {isActive(item.path) && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-y-0 left-0 w-1 bg-accent rounded-full"
                                />
                            )}
                            <item.icon className={`w-5 h-5 transition-colors ${isActive(item.path) ? 'text-accent' : 'group-hover:text-white'}`} />
                            <span className="text-sm tracking-wide">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 space-y-4">
                    <Link to="/" className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-bold">
                        <ArrowLeft className="w-4 h-4" />
                        Return to Front
                    </Link>
                    <button
                        onClick={signOut}
                        className="flex items-center gap-3 px-5 py-3 rounded-xl text-red-500/60 hover:text-red-500 hover:bg-red-500/5 w-full transition-all text-sm font-bold"
                    >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                    </button>

                    <div className="mt-6 flex items-center gap-2 px-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair">
                        <Terminal className="w-3 h-3 text-accent" />
                        <span className="text-[8px] font-black uppercase tracking-[0.3em] font-mono">Build 2.4.9-Stable</span>
                    </div>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1 ml-72">
                <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 glass-subtle sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Engine Status: Nominal</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col text-right">
                            <span className="text-xs font-bold text-white">Administrator</span>
                            <span className="text-[10px] font-bold text-gray-500">Root Access</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl glass border border-white/10 overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Admin" />
                        </div>
                    </div>
                </header>

                <main className="p-10 max-w-7xl mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
