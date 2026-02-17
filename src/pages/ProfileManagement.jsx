import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Pencil, Plus, Trash2, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileManagement = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [profiles, setProfiles] = useState([
        { id: '1', name: 'User', avatar: '👤', is_kids: false, pin_code: null },
        { id: '2', name: 'Kids', avatar: '🧒', is_kids: true, pin_code: null },
    ]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingProfile, setEditingProfile] = useState(null);

    const avatarOptions = ['👤', '👨', '👩', '🧒', '👶', '🐶', '🐱', '🦊', '🐼', '🦁'];

    const handleCreateProfile = (profileData) => {
        const newProfile = {
            id: Date.now().toString(),
            ...profileData
        };
        setProfiles([...profiles, newProfile]);
        setShowCreateModal(false);
    };

    const handleDeleteProfile = (profileId) => {
        if (profiles.length <= 1) {
            alert('You must have at least one profile');
            return;
        }
        setProfiles(profiles.filter(p => p.id !== profileId));
    };

    const handleSelectProfile = (profile) => {
        // In production, this would set the active profile in context
        localStorage.setItem('activeProfile', JSON.stringify(profile));
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-5xl w-full">
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12">
                    Who's watching?
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    {profiles.map((profile) => (
                        <motion.div
                            key={profile.id}
                            whileHover={{ scale: 1.05 }}
                            className="group relative"
                        >
                            <div
                                onClick={() => handleSelectProfile(profile)}
                                className="aspect-square bg-zinc-800 hover:bg-zinc-700 rounded-lg flex items-center justify-center cursor-pointer border-4 border-transparent hover:border-accent transition relative overflow-hidden"
                            >
                                <span className="text-6xl">{profile.avatar}</span>

                                {profile.is_kids && (
                                    <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded">
                                        KIDS
                                    </div>
                                )}

                                {profile.pin_code && (
                                    <div className="absolute top-2 left-2">
                                        <Lock className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 text-center">
                                <p className="text-white font-semibold">{profile.name}</p>

                                <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingProfile(profile);
                                        }}
                                        className="text-gray-400 hover:text-white transition"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteProfile(profile.id);
                                        }}
                                        className="text-gray-400 hover:text-red-500 transition"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add Profile Button */}
                    {profiles.length < 5 && (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setShowCreateModal(true)}
                            className="aspect-square bg-zinc-800 hover:bg-zinc-700 rounded-lg flex flex-col items-center justify-center cursor-pointer border-4 border-transparent hover:border-accent transition"
                        >
                            <Plus className="w-12 h-12 text-gray-400" />
                            <p className="text-gray-400 mt-2">Add Profile</p>
                        </motion.div>
                    )}
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-400 hover:text-white text-lg border border-gray-600 hover:border-white px-6 py-2 rounded transition"
                    >
                        Manage Profiles
                    </button>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {(showCreateModal || editingProfile) && (
                <ProfileModal
                    profile={editingProfile}
                    avatarOptions={avatarOptions}
                    onSave={(data) => {
                        if (editingProfile) {
                            setProfiles(profiles.map(p =>
                                p.id === editingProfile.id ? { ...p, ...data } : p
                            ));
                            setEditingProfile(null);
                        } else {
                            handleCreateProfile(data);
                        }
                    }}
                    onClose={() => {
                        setShowCreateModal(false);
                        setEditingProfile(null);
                    }}
                />
            )}
        </div>
    );
};

const ProfileModal = ({ profile, avatarOptions, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: profile?.name || '',
        avatar: profile?.avatar || '👤',
        is_kids: profile?.is_kids || false,
        pin_code: profile?.pin_code || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            alert('Please enter a profile name');
            return;
        }
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-zinc-900 rounded-lg p-8 max-w-md w-full"
            >
                <h2 className="text-2xl font-bold text-white mb-6">
                    {profile ? 'Edit Profile' : 'Create Profile'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Avatar Selection */}
                    <div>
                        <label className="text-white text-sm font-semibold mb-2 block">
                            Choose Avatar
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                            {avatarOptions.map((avatar) => (
                                <button
                                    key={avatar}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, avatar })}
                                    className={`aspect-square bg-zinc-800 rounded-lg flex items-center justify-center text-3xl hover:bg-zinc-700 transition ${formData.avatar === avatar ? 'ring-2 ring-accent' : ''
                                        }`}
                                >
                                    {avatar}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="text-white text-sm font-semibold mb-2 block">
                            Profile Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 focus:border-accent focus:outline-none"
                            placeholder="Enter name"
                            maxLength={20}
                        />
                    </div>

                    {/* Kids Mode */}
                    <div className="flex items-center justify-between">
                        <label className="text-white text-sm font-semibold">
                            Kids Profile
                        </label>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, is_kids: !formData.is_kids })}
                            className={`w-12 h-6 rounded-full transition ${formData.is_kids ? 'bg-accent' : 'bg-zinc-700'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform ${formData.is_kids ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                        </button>
                    </div>

                    {/* PIN Code */}
                    <div>
                        <label className="text-white text-sm font-semibold mb-2 block">
                            PIN Code (Optional)
                        </label>
                        <input
                            type="password"
                            value={formData.pin_code}
                            onChange={(e) => setFormData({ ...formData, pin_code: e.target.value })}
                            className="w-full bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700 focus:border-accent focus:outline-none"
                            placeholder="4-digit PIN"
                            maxLength={4}
                            pattern="[0-9]*"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-accent hover:bg-orange-600 text-white py-2 rounded font-semibold transition"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white py-2 rounded font-semibold transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ProfileManagement;
