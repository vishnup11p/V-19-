
import { useState } from 'react';
import { Upload as UploadIcon, X } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const AdminUpload = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        release_year: new Date().getFullYear(),
        duration: '',
        genre: '',
        rating: '',
        thumbnail_url: '',
        video_url: '',
        type: 'movie'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Mock submission to Supabase
            // const { error } = await supabase.from('content').insert([{
            //     ...formData,
            //     genre: formData.genre.split(',').map(g => g.trim())
            // }]);

            // if (error) throw error;

            await new Promise(resolve => setTimeout(resolve, 1500)); // Mock delay
            alert('Content uploaded successfully!');
            setFormData({
                title: '', description: '', release_year: new Date().getFullYear(),
                duration: '', genre: '', rating: '', thumbnail_url: '', video_url: '', type: 'movie'
            });
        } catch (error) {
            alert('Error uploading content: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-8">Upload New Content</h1>

            <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2">Title</label>
                        <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-accent outline-none" placeholder="Movie Title" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-accent outline-none">
                            <option value="movie">Movie</option>
                            <option value="series">Series</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-accent outline-none h-32" placeholder="Synopsis..." />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-gray-400 mb-2">Release Year</label>
                        <input type="number" name="release_year" value={formData.release_year} onChange={handleChange} className="w-full bg-black border border-zinc-700 rounded p-3 text-white outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Duration (mins)</label>
                        <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-black border border-zinc-700 rounded p-3 text-white outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Rating</label>
                        <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="w-full bg-black border border-zinc-700 rounded p-3 text-white outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Genre (comma separated)</label>
                        <input type="text" name="genre" value={formData.genre} onChange={handleChange} className="w-full bg-black border border-zinc-700 rounded p-3 text-white outline-none" placeholder="Action, Drama" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2">Thumbnail URL</label>
                        <input type="url" name="thumbnail_url" value={formData.thumbnail_url} onChange={handleChange} required className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-accent outline-none" placeholder="https://..." />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Video Source URL</label>
                        <input type="url" name="video_url" value={formData.video_url} onChange={handleChange} required className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-accent outline-none" placeholder="https://..." />
                        <p className="text-xs text-gray-500 mt-1">Direct link to mp4/m3u8 from Cloudinary or Supabase Storage</p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                    {loading ? 'Uploading...' : <><UploadIcon className="w-5 h-5" /> Publish Content</>}
                </button>
            </form>
        </div>
    );
};

export default AdminUpload;
