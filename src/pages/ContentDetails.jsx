import { useParams, useNavigate } from 'react-router-dom';
import { DUMMY_MOVIES } from '../lib/dummyData';
import { MOCK_SERIES } from '../data/mockSeries';
import Navbar from '../components/Navbar';
import EpisodeSelector from '../components/EpisodeSelector';
import Row from '../components/Row';
import { Play, Plus, ThumbsUp, X, Star, Calendar, Clock, User, Share2, Info, ChevronRight, Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

const ContentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    // Reset scroll on ID change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Immersive Parallax
    const backdropY = useTransform(scrollY, [0, 800], [0, 300]);
    const backdropOpacity = useTransform(scrollY, [0, 500], [0.6, 0.1]);
    const contentY = useTransform(scrollY, [0, 500], [0, -50]);

    // Lookup Logic
    const movie = DUMMY_MOVIES.find(m => m.id === id);
    const series = MOCK_SERIES.find(s => s.id === id);
    const content = movie || series;

    if (!content) return (
        <div className="bg-bg-primary text-white h-screen flex flex-col items-center justify-center p-10 text-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-panel p-12 rounded-[3rem] max-w-lg"
            >
                <Info className="w-16 h-16 text-accent-primary mx-auto mb-6" />
                <h1 className="text-4xl font-display font-black mb-4 tracking-tighter">Content Missing</h1>
                <p className="text-gray-400 mb-8 font-medium">The content you're looking for has either been removed or moved to another dimension. Let's get you back on track.</p>
                <button onClick={() => navigate('/')} className="btn-premium py-4 px-12">Return Home</button>
            </motion.div>
        </div>
    );

    const isSeries = !!series;
    const firstEpisode = isSeries ? series.seasons[0]?.episodes[0] : null;

    return (
        <div className="bg-bg-primary min-h-screen text-white overflow-hidden" ref={containerRef}>
            <Navbar />

            {/* Ultra-Immersive Cinematic Backdrop */}
            <motion.div
                style={{ y: backdropY, opacity: backdropOpacity }}
                className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none"
            >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src={content.backdrop_url || content.thumbnail_url}
                    alt={content.title}
                    className="w-full h-full object-cover scale-110 blur-[2px] opacity-70"
                />
                <div className="absolute inset-0 hero-gradient-overlay z-20" />
                <div className="absolute inset-x-0 bottom-0 h-[70vh] bg-gradient-to-t from-bg-primary via-bg-primary/80 to-transparent z-20" />
            </motion.div>

            <div className="relative z-30 pt-[25vh] lg:pt-[35vh]">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
                    <motion.div
                        style={{ y: contentY }}
                        className="flex flex-col lg:flex-row gap-12 lg:gap-24"
                    >
                        {/* Poster Column */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-[340px] shrink-0 mx-auto lg:mx-0"
                        >
                            <div className="relative rounded-[2.5rem] overflow-hidden ott-card-shadow border border-white/10 group aspect-[2.3/3.5]">
                                <img
                                    src={content.thumbnail_url}
                                    alt={content.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                                    <button
                                        onClick={() => navigate(isSeries ? `/watch/${firstEpisode.id}` : `/watch/${content.id}`)}
                                        className="w-20 h-20 rounded-full glass-panel flex items-center justify-center border border-white/20 hover:bg-accent-primary hover:border-accent-primary transition-all shadow-2xl"
                                    >
                                        <Play className="w-8 h-8 fill-white ml-1" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Content Info Column */}
                        <div className="flex-1">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="flex flex-wrap items-center gap-4">
                                    <span className="px-5 py-1.5 rounded-full bg-accent-primary/20 text-accent-primary border border-accent-primary/20 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                                        {isSeries ? 'Series' : 'Feature Film'}
                                    </span>
                                    <div className="flex items-center space-x-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                                        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                        <span>9.2/10 Rating</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-white/50 text-xs font-bold uppercase tracking-widest">
                                        <Check className="w-4 h-4 text-green-500" />
                                        <span>4K Ultra HD</span>
                                    </div>
                                </div>

                                <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tight text-white leading-[0.8]">
                                    {content.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-bold text-gray-400">
                                    <span>{content.release_year}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                                    <span className="px-2 py-0.5 rounded border border-white/10 uppercase text-xs">{content.age_rating || '18+'}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                                    <span>{isSeries ? `${series.seasons.length} Seasons` : `${content.duration}m`}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                                    <div className="flex gap-2">
                                        {content.genre.slice(0, 2).map((g, i) => (
                                            <span key={i} className="text-accent-primary/80">{g}</span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl font-medium tracking-tight">
                                    {content.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-5 pt-4">
                                    <button
                                        onClick={() => navigate(isSeries ? `/watch/${firstEpisode.id}` : `/watch/${content.id}`)}
                                        className="btn-premium group flex items-center space-x-4 py-4.5 px-12"
                                    >
                                        <Play className="w-6 h-6 fill-white" />
                                        <span className="font-black tracking-widest uppercase text-sm">Watch Now</span>
                                    </button>

                                    <button className="w-16 h-16 rounded-full glass-panel border border-white/10 hover:border-white/30 flex items-center justify-center transition-all hover:scale-110 group/btn">
                                        <Plus className="w-7 h-7 text-white group-hover/btn:text-accent-primary transition-colors" />
                                    </button>

                                    <button className="w-16 h-16 rounded-full glass-panel border border-white/10 hover:border-white/30 flex items-center justify-center transition-all hover:scale-110 group/btn">
                                        <ThumbsUp className="w-7 h-7 text-white group-hover/btn:scale-110" />
                                    </button>

                                    <button className="w-16 h-16 rounded-full glass-panel border border-white/10 hover:border-white/30 flex items-center justify-center transition-all hover:scale-110 group/btn">
                                        <Share2 className="w-7 h-7 text-white group-hover/btn:scale-110" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Meta Deep Dive */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32 pt-16 border-t border-white/5">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary">The Vision</h4>
                            <p className="text-gray-400 font-medium">George Miller, Charlize Theron, Tom Hardy lead a cinematic masterpiece that redefined the genre with stunning visuals and sound design.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary">Creative Lab</h4>
                            <p className="text-gray-400 font-medium">Directed by V 19+ Studios. Produced in association with High Octane Media Group. Special thanks to the XR design team.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-primary">Awards</h4>
                            <p className="text-gray-400 font-medium font-display italic">Winner of 6 Academy Awards including Best Production Design & Sound Editing.</p>
                        </div>
                    </div>

                    {/* Series Content */}
                    {isSeries && (
                        <div className="mt-40">
                            <div className="flex items-center justify-between mb-16 px-4">
                                <div>
                                    <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight mb-2">Dive into Seasons</h2>
                                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{series.seasons.length} Seasons available in 4K</p>
                                </div>
                                <div className="glass-panel px-6 py-4 rounded-[2rem] border-white/5 flex items-center space-x-6">
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-accent-primary leading-none mb-1">EPISODES</p>
                                        <p className="text-xl font-display font-black">{series.seasons.reduce((acc, s) => acc + s.episodes.length, 0)}</p>
                                    </div>
                                    <div className="w-px h-8 bg-white/10" />
                                    <div className="text-center">
                                        <p className="text-[10px] font-black text-accent-primary leading-none mb-1">REGION</p>
                                        <p className="text-xl font-display font-black">GLOBAL</p>
                                    </div>
                                </div>
                            </div>
                            <EpisodeSelector series={series} />
                        </div>
                    )}

                    {/* More Recommended */}
                    <div className="mt-40 pb-40">
                        <Row
                            title="Because you watched this"
                            subtitle="Deeper matches based on your interest"
                            movies={DUMMY_MOVIES.slice(0, 10)}
                        />
                    </div>
                </div>
            </div>

            {/* Ambient Background Audio Visualizers / Elements */}
            <div className="fixed top-0 right-0 w-[80vw] h-[80vw] bg-accent-primary/5 blur-[250px] rounded-full -z-10 pointer-events-none" />
            <div className="fixed -bottom-[50vh] -left-[20vw] w-[100vw] h-[100vw] bg-accent-primary/3 blur-[300px] rounded-full -z-10 pointer-events-none" />
        </div>
    );
};

export default ContentDetails;
