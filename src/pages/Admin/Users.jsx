
import { Users as UsersIcon, MoreVertical, Trash2, Ban } from 'lucide-react';
import { useState } from 'react';

const AdminUsers = () => {
    // Mock Users Data
    const [users, setUsers] = useState([
        { id: 1, email: 'user@example.com', name: 'John Doe', plan: 'Free', status: 'Active', joined: '2023-01-15' },
        { id: 2, email: 'jane@example.com', name: 'Jane Smith', plan: 'Premium', status: 'Active', joined: '2023-02-20' },
        { id: 3, email: 'bob@test.com', name: 'Bob Wilson', plan: 'Free', status: 'Inactive', joined: '2023-03-10' },
    ]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">User Management</h1>

            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <table className="w-full text-left text-gray-400">
                    <thead className="bg-black/50 text-xs uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-zinc-800/50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${user.plan === 'Premium' ? 'bg-accent/20 text-accent' : 'bg-gray-700 text-gray-300'}`}>
                                        {user.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center space-x-1 text-xs ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                                        <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                        <span>{user.status}</span>
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {user.joined}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-gray-500 hover:text-red-500 transition p-2 rounded-full hover:bg-zinc-800"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
