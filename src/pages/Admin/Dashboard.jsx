import { Users, Film, Activity, DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, trend, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="glass-strong p-8 rounded-[2rem] border border-white/5 hover:border-white/10 transition-all group cursor-pointer relative overflow-hidden"
    >
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 blur-3xl rounded-full" />

        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10 transition-transform group-hover:scale-110 shadow-lg`}>
                <Icon className={`w-7 h-7 ${color.replace('bg-', 'text-')}`} />
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-[10px] font-black font-mono tracking-widest px-2 py-1 rounded bg-white/5 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trend > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(trend)}%
                </div>
            )}
        </div>

        <p className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-2">{title}</p>
        <h3 className="text-4xl font-display font-black text-white tracking-tighter">{value}</h3>
    </motion.div>
);

const AdminDashboard = () => {
    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 text-accent mb-2">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Insights Overview</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter">Command Center</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button className="glass px-6 py-2 rounded-xl text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-all">Export Grid</button>
                    <button className="gradient-accent shadow-glow px-6 py-2 rounded-xl text-xs font-bold tracking-widest uppercase text-white transition-all">Refresh Core</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard title="Identity Grid" value="8.4k" icon={Users} color="bg-blue-500" trend={12} index={0} />
                <StatCard title="Vortex Core" value="512" icon={Film} color="bg-accent" trend={5} index={1} />
                <StatCard title="Active Flux" value="2.9k" icon={Activity} color="bg-green-500" trend={-2} index={2} />
                <StatCard title="Energy Yield" value="₹4.8L" icon={DollarSign} color="bg-yellow-500" trend={24} index={3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Uplinks */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 glass-strong p-8 rounded-[3rem] border border-white/5"
                >
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-xl font-display font-black text-white flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                            Live Telemetry
                        </h3>
                        <span className="text-[10px] font-black text-gray-500 tracking-widest uppercase">Real-time Pulse</span>
                    </div>

                    <div className="space-y-6">
                        {[
                            { user: "User #8491", action: "Upgraded to Elite Vision", time: "just now", val: "₹199" },
                            { user: "User #2103", action: "Initialized 'Interstellar' flux", time: "4m ago", val: "4K HDR" },
                            { user: "User #9942", action: "Synchronized identity grid", time: "12m ago", val: "Mobile" },
                            { user: "User #1156", action: "Provisioned new profile", time: "18m ago", val: "Kids" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-black text-gray-500 group-hover:text-accent transition-colors">
                                        {item.user.split('#')[1]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-200">{item.user}</span>
                                        <span className="text-[10px] font-medium text-gray-500">{item.action}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-black text-gray-300">{item.val}</div>
                                    <div className="text-[10px] font-medium text-gray-600 font-mono">{item.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Heat Map Mock */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-strong p-8 rounded-[3rem] border border-white/5"
                >
                    <h3 className="text-xl font-display font-black text-white mb-10">Flux Performance</h3>
                    <div className="space-y-2">
                        {[
                            { title: "Trending Action", val: 85 },
                            { title: "Sci-Fi Flux", val: 92 },
                            { title: "Drama Synthesis", val: 64 },
                            { title: "Original Core", val: 41 },
                            { title: "Global Sync", val: 77 },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2 mb-6">
                                <div className="flex justify-between text-[10px] font-black tracking-widest uppercase">
                                    <span className="text-gray-500">{item.title}</span>
                                    <span className="text-accent">{item.val}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.val}%` }}
                                        transition={{ duration: 1, delay: 0.6 + (i * 0.1) }}
                                        className={`h-full ${item.val > 80 ? 'gradient-accent' : 'bg-white/20'} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 glass-subtle rounded-3xl border border-white/5 text-center">
                        <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Network Throughput</p>
                        <h4 className="text-2xl font-display font-black text-white">4.2 GB/s</h4>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
