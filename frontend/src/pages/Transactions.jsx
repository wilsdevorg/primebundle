import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function Transactions() {
    const { state } = useApp();
    const { transactions } = state;
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');

    const filtered = transactions.filter(t => {
        const matchSearch = !search || t.description.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
        const matchType = typeFilter === 'all' || t.type === typeFilter;
        return matchSearch && matchType;
    });

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-navy-900">Transaction History</h1>
                <p className="text-sm text-navy-500 mt-1">View all your wallet transactions</p>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100" />
                </div>
                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-navy-600 focus:outline-none focus:border-primary-400">
                    <option value="all">All Types</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
            </div>

            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                        <h3 className="font-semibold text-navy-900 mb-1">No transactions found</h3>
                        <p className="text-sm text-navy-400">Try adjusting your search or filter</p>
                    </div>
                ) : (
                    filtered.map((t) => (
                        <div key={t.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
                                    {t.type === 'credit' ? <ArrowDownLeft className="w-5 h-5 text-green-600" /> : <ArrowUpRight className="w-5 h-5 text-red-500" />}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-navy-900">{t.description}</div>
                                    <div className="text-xs text-navy-400">{t.date} • {t.id}</div>
                                </div>
                            </div>
                            <span className={`text-sm font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                                {t.type === 'credit' ? '+' : '-'}₵{t.amount.toFixed(2)}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}