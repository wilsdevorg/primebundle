import { Search, UserPlus, Wallet } from 'lucide-react';
import { useState } from 'react';

const users = [
    { id: 1, name: 'Kwame Asante', email: 'kwame@email.com', wallet: 125.50, orders: 23, joined: '2025-01-15', status: 'active' },
    { id: 2, name: 'Adwoa Mensah', email: 'adwoa@email.com', wallet: 80.00, orders: 15, joined: '2025-02-10', status: 'active' },
    { id: 3, name: 'Kofi Boateng', email: 'kofi@email.com', wallet: 250.00, orders: 42, joined: '2024-12-01', status: 'active' },
    { id: 4, name: 'Ama Darko', email: 'ama@email.com', wallet: 50.00, orders: 8, joined: '2025-03-22', status: 'active' },
    { id: 5, name: 'Yaw Osei', email: 'yaw@email.com', wallet: 15.00, orders: 3, joined: '2025-04-18', status: 'suspended' },
    { id: 6, name: 'Esi Appiah', email: 'esi@email.com', wallet: 200.00, orders: 31, joined: '2024-11-05', status: 'active' },
];

export default function AdminUsers() {
    const [search, setSearch] = useState('');

    const filtered = users.filter(u =>
        !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Users</h1>
                    <p className="text-sm text-navy-500 mt-1">Manage registered users and wallets</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-colors flex items-center gap-1">
                    <UserPlus className="w-4 h-4" /> Add User
                </button>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">User</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Email</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Wallet</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Orders</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Joined</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="text-sm font-medium text-navy-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-navy-600">{user.email}</td>
                                    <td className="px-5 py-3">
                                        <span className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600">
                                            <Wallet className="w-3.5 h-3.5" /> ₵{user.wallet.toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-navy-600">{user.orders}</td>
                                    <td className="px-5 py-3 text-xs text-navy-400">{user.joined}</td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${user.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}