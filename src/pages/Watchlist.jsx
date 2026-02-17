
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { DUMMY_MOVIES } from '../lib/dummyData';
// In a real app, you'd fetch this from the 'watchlist' table

const Watchlist = () => {
    // Mock watchlist
    const watchlist = DUMMY_MOVIES.slice(0, 3);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="pt-24 px-4 md:px-12">
                <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>

                {watchlist.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {watchlist.map(movie => (
                            <div key={movie.id} className="flex justify-center">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-20">
                        <p>Your watchlist is empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;
