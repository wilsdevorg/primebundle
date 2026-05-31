import { Search, ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import { useState } from 'react';

const transactions = [
    { id: 'TXN-3045', user: 'kwame@email.com', type: 'credit', method: 'MTN MoMo', amount: 50.00, status: 'successful', date: '2025-05-20 14:30' },
    { id: 'TXN-3044', user: 'adwoa@email.com', type: 'debit', method: 'SMM Order', amount: 8.00, status: 'successful', date: '2025-05-20 14:25' },
    { id: 'TXN-3043', user: 'kofi@email.com', type: 'debit', method: 'Data Purchase', amount: 40.00, status: 'successful', date: '2025-05-20 14:18' },
    { id: 'TXN-3042', user: 'ama@email.com', type: 'credit', method: 'Vodafone Cash', amount: 100.00, status: 'successful', date: '2025-05-20 14:12' },
    { id: 'TXN-3041', user: 'yaw@email.com', type: 'debit', method: 'SMM Order', amount: 15.00, status: 'successful', date: '2025-05-20 14:05' },
    { id: 'TXN-3040', user: 'esi@email.com', type: 'credit', method: 'AirtelTigo Cash', amount: 30.00, status: 'pending', date: '2025-05-20 13:55' },
    { id: 'TXN-3039', user: 'kwesi@email.com', type: 'debit', method: 'Data Purchase', amount: 35.00, status: 'failed', date: '2025-05-20 13:40' },
];

export default function AdminTransactions() {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filtered = transactions.filter(t => {
        const matchSearch = !search || t.id.toLowerCase().includes(search.toLowerCase()) || t.user.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || t.type === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-navy-900">Transactions</h1>
                <p className="text-sm text-navy-500 mt-1">All wallet top-ups and purchase history</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <CreditCard className="w-5 h-5 text-primary-500 mb-2" />
                    <div className="text-xl font-bold text-navy-900">₵1,245.00</div>
                    <div className="text-xs text-navy-400">Total Credits</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <ArrowUpRight className="w-5 h-5 text-emerald-500 mb-2" />
                    <div className="text-xl font-bold text-navy-900">₵180.00</div>
                    <div className="text-xs text-navy-400">Total Debits</div>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <CreditCard className="w-5 h-5 text-amber-500 mb-2" />
                    <div className="text-xl font-bold text-navy-900">₵30.00</div>
                    <div className="text-xs text-navy-400">Pending</div>
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400" />
                </div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-navy-600 focus:outline-none focus:border-primary-400">
                    <option value="all">All Types</option>
                    <option value="credit">Credits</option>
                    <option value="debit">Debits</option>
                </select>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">ID</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">User</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Type</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Method</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Amount</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Status</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map(txn => (
                                <tr key={txn.id} className="hover:bg-gray-50">
                                    <td className="px-5 py-3 text-sm font-mono font-medium text-navy-900">{txn.id}</td>
                                    <td className="px-5 py-3 text-sm text-navy-600">{txn.user}</td>
                                    <td className="px-5 py-3">
                                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${txn.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {txn.type === 'credit' ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                                            {txn.type}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-sm text-navy-600">{txn.method}</td>
                                    <td className="px-5 py-3 text-sm font-bold text-navy-900">₵{txn.amount.toFixed(2)}</td>
                                    <td className="px-5 py-3">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${txn.status === 'successful' ? 'bg-emerald-50 text-emerald-600' : txn.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-xs text-navy-400">{txn.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}