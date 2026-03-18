import { X, MapPin, Star, Users, Heart, CheckCircle, Tag } from 'lucide-react'

export default function PublicProfileModal({ isOpen, onClose, ngo }) {
    if (!isOpen || !ngo) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header Banner */}
                <div className="h-12 bg-gradient-to-r from-primary to-primary-dark rounded-t-2xl relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/20 hover:bg-white/40 transition text-white"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Avatar */}
                <div className="px-6 pb-6 pt-12">
                    <div className="-mt-10 mb-4 flex items-end justify-between">
                        <div className="w-10 h-15 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-primary bg-primary/10">
                            {ngo.name?.charAt(0) || 'N'}
                        </div>
                        {ngo.verified && (
                            <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                <CheckCircle className="w-3.5 h-3.5" /> Verified NGO
                            </span>
                        )}
                    </div>

                    {/* Name & Category */}
                    <h2 className="text-2xl font-bold text-gray-900">{ngo.name}</h2>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                            <Tag className="w-3.5 h-3.5" /> {ngo.category}
                        </span>
                        {ngo.location && (
                            <span className="inline-flex items-center gap-1 text-sm text-gray-500">
                                <MapPin className="w-3.5 h-3.5" /> {ngo.location}
                            </span>
                        )}
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-3 mt-5">
                        {[
                            { icon: Heart, label: 'Total Donations', value: `₹${(ngo.totalDonations / 100000).toFixed(1)}L`, color: 'text-red-500' },
                            { icon: Users, label: 'Volunteers', value: ngo.volunteerCount, color: 'text-blue-500' },
                            { icon: Star, label: 'Rating', value: `${ngo.rating} / 5`, color: 'text-yellow-500' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                                <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
                                <p className="text-base font-bold text-gray-900">{stat.value}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* About / Description */}
                    {ngo.description && (
                        <div className="mt-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-1">About</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{ngo.description}</p>
                        </div>
                    )}

                    {/* Details Table */}
                    <div className="mt-5 border border-gray-100 rounded-xl overflow-hidden">
                        {[
                            { label: 'Registration No.', value: ngo.registrationNumber },
                            { label: 'Founded', value: ngo.foundedYear || 'N/A' },
                            { label: 'PAN / Tax ID', value: ngo.panNumber || 'N/A' },
                            { label: '80G Certificate', value: ngo.certificate80G || 'N/A' },
                            { label: 'FCRA Status', value: ngo.fcraNumber ? `Registered (${ngo.fcraNumber})` : 'Not Registered' },
                        ].map((row, i) => (
                            <div
                                key={i}
                                className={`flex justify-between items-center px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    }`}
                            >
                                <span className="text-gray-500 font-medium">{row.label}</span>
                                <span className="text-gray-800 font-semibold">{row.value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activities */}
                    {ngo.activities?.length > 0 && (
                        <div className="mt-5">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Activities</h3>
                            <div className="space-y-2">
                                {ngo.activities.slice(0, 3).map((activity, i) => (
                                    <div key={i} className="flex justify-between items-center text-sm bg-gray-50 px-3 py-2.5 rounded-lg border border-gray-100">
                                        <span className="text-gray-800 font-medium">{activity.title}</span>
                                        <span className="text-gray-400 text-xs">{activity.date}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}