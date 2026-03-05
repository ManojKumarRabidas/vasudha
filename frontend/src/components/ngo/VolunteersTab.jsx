import { useState, useMemo } from 'react'
import {
    Search, X, MapPin, Phone, Mail, Briefcase,
    Clock, Star, ChevronDown, User, Calendar,
    CheckCircle, AlertCircle, PauseCircle, XCircle, HelpCircle
} from 'lucide-react'

// ─── Mock volunteer data ──────────────────────────────────────────────────────
const MOCK_VOLUNTEERS = [
    {
        id: 'VOL001', name: 'Arjun Mehta', age: 26, gender: 'Male',
        email: 'arjun.mehta@email.com', phone: '+91 98765 43210',
        location: 'Mumbai, Maharashtra', skills: ['Teaching', 'Event Management'],
        experience: '3 years in community education programs',
        education: 'B.Ed, University of Mumbai',
        occupation: 'School Teacher', totalHours: 120,
        joinedDate: '2023-06-15', lastActive: '2024-02-18',
        status: 'active', rating: 4.8,
        bio: 'Passionate about rural education. Led 5 literacy drives in Dharavi.',
        availability: 'Weekends & Holidays',
        emergencyContact: 'Sunita Mehta (+91 98765 00001)',
    },
    {
        id: 'VOL002', name: 'Priya Nair', age: 24, gender: 'Female',
        email: 'priya.nair@email.com', phone: '+91 87654 32109',
        location: 'Pune, Maharashtra', skills: ['Medical Aid', 'First Aid', 'Counselling'],
        experience: '2 years as health volunteer',
        education: 'MBBS (Intern), Pune Medical College',
        occupation: 'Medical Intern', totalHours: 85,
        joinedDate: '2023-09-01', lastActive: '2024-02-20',
        status: 'pending', rating: null,
        bio: 'Eager to contribute medical knowledge to underserved communities.',
        availability: 'Sundays only',
        emergencyContact: 'Rajan Nair (+91 87654 00001)',
    },
    {
        id: 'VOL003', name: 'Karan Singh', age: 30, gender: 'Male',
        email: 'karan.s@email.com', phone: '+91 76543 21098',
        location: 'Delhi, NCR', skills: ['IT Support', 'Photography', 'Social Media'],
        experience: '5 years in digital communications',
        education: 'B.Tech IT, DTU Delhi',
        occupation: 'Software Engineer', totalHours: 200,
        joinedDate: '2022-11-10', lastActive: '2024-01-30',
        status: 'on_leave', rating: 4.5,
        bio: 'Tech volunteer helping NGOs build digital presence and manage data.',
        availability: 'Flexible — remote preferred',
        emergencyContact: 'Manpreet Singh (+91 76543 00001)',
    },
    {
        id: 'VOL004', name: 'Sneha Rao', age: 22, gender: 'Female',
        email: 'sneha.rao@email.com', phone: '+91 65432 10987',
        location: 'Bengaluru, Karnataka', skills: ['Art & Craft', 'Child Care'],
        experience: '1 year with anganwadi program',
        education: 'B.A. Psychology, Christ University',
        occupation: 'Student', totalHours: 40,
        joinedDate: '2024-01-05', lastActive: '2024-02-10',
        status: 'approved', rating: null,
        bio: 'Loves working with children. Completed child development certification.',
        availability: 'Mon, Wed, Fri afternoons',
        emergencyContact: 'Ramesh Rao (+91 65432 00001)',
    },
    {
        id: 'VOL005', name: 'Vikram Joshi', age: 35, gender: 'Male',
        email: 'vikram.j@email.com', phone: '+91 54321 09876',
        location: 'Ahmedabad, Gujarat', skills: ['Legal Aid', 'Documentation'],
        experience: '8 years legal practitioner',
        education: 'LLB, Gujarat National Law University',
        occupation: 'Advocate', totalHours: 300,
        joinedDate: '2021-03-22', lastActive: '2023-12-15',
        status: 'inactive', rating: 4.2,
        bio: 'Provided free legal aid to 200+ families. Now less available due to practice.',
        availability: 'Unavailable currently',
        emergencyContact: 'Kavita Joshi (+91 54321 00001)',
    },
]

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400', icon: HelpCircle },
    approved: { label: 'Approved', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400', icon: CheckCircle },
    active: { label: 'Active', color: 'bg-green-100 text-green-700', dot: 'bg-green-400', icon: CheckCircle },
    on_leave: { label: 'On Leave', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-400', icon: PauseCircle },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400', icon: XCircle },
}

const ALL_STATUSES = Object.keys(STATUS_CONFIG)

function StatusBadge({ status }) {
    const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
        </span>
    )
}

// ─── Volunteer Detail Modal ───────────────────────────────────────────────────
function VolunteerDetailModal({ volunteer, onClose, onUpdateStatus }) {
    const [status, setStatus] = useState(volunteer?.status || 'pending')
    const [saving, setSaving] = useState(false)

    if (!volunteer) return null

    const v = volunteer

    const handleSave = () => {
        setSaving(true)
        setTimeout(() => {
            onUpdateStatus(v.id, status)
            setSaving(false)
            onClose()
        }, 400)
    }

    const infoRows = [
        { icon: User, label: 'Age / Gender', value: `${v.age} yrs · ${v.gender}` },
        { icon: MapPin, label: 'Location', value: v.location },
        { icon: Phone, label: 'Phone', value: v.phone },
        { icon: Mail, label: 'Email', value: v.email },
        { icon: Briefcase, label: 'Occupation', value: v.occupation },
        { icon: Star, label: 'Education', value: v.education },
        { icon: Clock, label: 'Experience', value: v.experience },
        { icon: Calendar, label: 'Availability', value: v.availability },
        { icon: Calendar, label: 'Joined', value: v.joinedDate },
        { icon: Calendar, label: 'Last Active', value: v.lastActive },
        { icon: AlertCircle, label: 'Emergency Contact', value: v.emergencyContact },
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Volunteer Profile</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
                </div>

                {/* Hero */}
                <div className="px-6 pt-5 pb-4 flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary flex-shrink-0">
                        {v.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{v.name}</h3>
                                <p className="text-sm text-gray-500 mt-0.5">{v.id}</p>
                            </div>
                            <StatusBadge status={v.status} />
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                                <Clock className="w-3.5 h-3.5" /> {v.totalHours}h logged
                            </span>
                            {v.rating && (
                                <span className="flex items-center gap-1 text-xs text-yellow-600 font-medium">
                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {v.rating}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bio */}
                {v.bio && (
                    <div className="mx-6 mb-4 bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-sm text-gray-600 italic">"{v.bio}"</p>
                    </div>
                )}

                {/* Skills */}
                <div className="px-6 mb-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                        {v.skills.map(s => (
                            <span key={s} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{s}</span>
                        ))}
                    </div>
                </div>

                {/* Info rows */}
                <div className="px-6 border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Details</p>
                    <div className="space-y-0">
                        {infoRows.map((r, i) => (
                            <div key={i} className={`flex items-start gap-3 py-2.5 ${i < infoRows.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                <r.icon className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />
                                <div className="flex-1 flex justify-between gap-4">
                                    <span className="text-xs text-gray-400 w-32 flex-shrink-0">{r.label}</span>
                                    <span className="text-sm font-medium text-gray-800 text-right">{r.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Update Status */}
                <div className="px-6 py-4 border-t border-gray-100 mt-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Update Status</p>
                    <div className="grid grid-cols-5 gap-2">
                        {ALL_STATUSES.map(s => {
                            const cfg = STATUS_CONFIG[s]
                            return (
                                <button key={s} onClick={() => setStatus(s)}
                                    className={`flex flex-col items-center gap-1.5 px-2 py-2.5 rounded-xl border-2 transition text-xs font-semibold ${status === s ? `${cfg.color} border-current` : 'border-gray-200 text-gray-400 hover:border-gray-300'
                                        }`}>
                                    <cfg.icon className="w-4 h-4" />
                                    {cfg.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <button onClick={onClose} className="px-5 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                    <button onClick={handleSave} disabled={saving}
                        className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold disabled:opacity-60">
                        {saving ? 'Saving...' : 'Update Status'}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VolunteersTab() {
    const [volunteers, setVolunteers] = useState(MOCK_VOLUNTEERS)
    const [selected, setSelected] = useState(null)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const filtered = useMemo(() => {
        return volunteers.filter(v => {
            if (statusFilter !== 'all' && v.status !== statusFilter) return false
            if (search && !v.name.toLowerCase().includes(search.toLowerCase()) &&
                !v.location.toLowerCase().includes(search.toLowerCase()) &&
                !v.skills.join(' ').toLowerCase().includes(search.toLowerCase())) return false
            return true
        })
    }, [volunteers, search, statusFilter])

    const counts = useMemo(() => {
        const c = { all: volunteers.length }
        ALL_STATUSES.forEach(s => { c[s] = volunteers.filter(v => v.status === s).length })
        return c
    }, [volunteers])

    const handleUpdateStatus = (id, newStatus) => {
        setVolunteers(p => p.map(v => v.id === id ? { ...v, status: newStatus } : v))
    }

    return (
        <div className="space-y-5">
            {/* Status summary pills */}
            <div className="flex flex-wrap gap-2">
                <button onClick={() => setStatusFilter('all')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${statusFilter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                        }`}>
                    All ({counts.all})
                </button>
                {ALL_STATUSES.map(s => {
                    const cfg = STATUS_CONFIG[s]
                    return (
                        <button key={s} onClick={() => setStatusFilter(s)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${statusFilter === s ? `${cfg.color} border-current` : 'border-gray-200 text-gray-500 hover:border-gray-400'
                                }`}>
                            {cfg.label} ({counts[s]})
                        </button>
                    )
                })}
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 bg-white shadow-sm">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by name, location or skill..."
                    className="bg-transparent text-sm outline-none w-full text-gray-700" />
                {search && (
                    <button onClick={() => setSearch('')} className="text-gray-300 hover:text-gray-500">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Volunteer Cards */}
            {filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 py-16 text-center text-gray-400 text-sm">
                    No volunteers found matching the filters.
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map(v => (
                        <button key={v.id} onClick={() => setSelected(v)}
                            className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:border-primary/30 hover:shadow-md transition text-left group">
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary flex-shrink-0">
                                    {v.name.charAt(0)}
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">{v.name}</p>
                                            <StatusBadge status={v.status} />
                                        </div>
                                        <span className="text-xs text-gray-400 group-hover:text-primary transition">View profile →</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                                        <span className="flex items-center gap-1 text-xs text-gray-400">
                                            <MapPin className="w-3 h-3" /> {v.location}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-gray-400">
                                            <Clock className="w-3 h-3" /> {v.totalHours}h
                                        </span>
                                        {v.rating && (
                                            <span className="flex items-center gap-1 text-xs text-yellow-600">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {v.rating}
                                            </span>
                                        )}
                                    </div>
                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {v.skills.slice(0, 3).map(s => (
                                            <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                                        ))}
                                        {v.skills.length > 3 && (
                                            <span className="text-xs text-gray-400">+{v.skills.length - 3} more</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            <VolunteerDetailModal
                volunteer={selected}
                onClose={() => setSelected(null)}
                onUpdateStatus={handleUpdateStatus}
            />
        </div>
    )
}