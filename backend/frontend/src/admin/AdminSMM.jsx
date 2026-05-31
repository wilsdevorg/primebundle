import { smmServices } from '../data/mockData';
import { Edit2, TrendingUp } from 'lucide-react';

const platformIcons = { YouTube: '🎬', Instagram: '📸', TikTok: '🎵', Twitter: '🐦', Facebook: '👥', Telegram: '✈️', Spotify: '🎧' };

export default function AdminSMM() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">SMM Services</h1>
                    <p className="text-sm text-navy-500 mt-1">Manage service pricing and availability</p>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-500 rounded-xl hover:bg-primary-600 transition-colors">+ Add Service</button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Service</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Platform</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Price/1K</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Min</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Max</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Delivery</th>
                                <th className="text-left text-xs font-semibold text-navy-400 uppercase tracking-wider px-5 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {smmServices.map(service => (
                                <tr key={service.id} className="hover:bg-gray-50">
                                    <td className="px-5 py-3 text-sm font-medium text-navy-900">{service.name}</td>
                                    <td className="px-5 py-3 text-sm text-navy-600">{platformIcons[service.category]} {service.category}</td>
                                    <td className="px-5 py-3 text-sm font-bold text-primary-600">₵{service.pricePer1k.toFixed(2)}</td>
                                    <td className="px-5 py-3 text-sm text-navy-600">{service.minOrder.toLocaleString()}</td>
                                    <td className="px-5 py-3 text-sm text-navy-600">{service.maxOrder.toLocaleString()}</td>
                                    <td className="px-5 py-3 text-sm text-navy-400">{service.deliveryTime}</td>
                                    <td className="px-5 py-3"><button className="p-1.5 hover:bg-gray-100 rounded-lg text-navy-400 hover:text-navy-600"><Edit2 className="w-4 h-4" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}