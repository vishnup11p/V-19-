
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-black text-zinc-900 tracking-tighter">404</h1>
            <div className="absolute">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Page Not Found</h2>
                <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 bg-accent hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105"
                >
                    <Home className="w-5 h-5" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
