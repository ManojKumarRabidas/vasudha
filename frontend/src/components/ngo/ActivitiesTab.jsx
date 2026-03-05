import { useState, useRef } from 'react'
import {
    Heart, MessageCircle, Tag, Calendar, Edit2, Trash2,
    X, Upload, Image, Video, Plus, Eye, Clock
} from 'lucide-react'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const POST_TYPE_CONFIG = {
    ngo_activity: { label: 'NGO Activity', color: 'bg-blue-100 text-blue-700' },
    ask_for_help: { label: 'Ask for Help', color: 'bg-red-100 text-red-700' },
    ask_for_volunteer: { label: 'Ask for Volunteer', color: 'bg-green-100 text-green-700' },
    fundraiser: { label: 'Fundraiser', color: 'bg-yellow-100 text-yellow-700' },
}

const MOCK_ACTIVITIES = [
    {
        id: 'ACT001',
        type: 'ngo_activity',
        title: 'Annual Health Camp 2024',
        caption: 'We conducted a free health camp for over 300 residents in Dharavi. Medical checkups, blood tests, and free medicines were distributed. A huge thanks to all our volunteers!',
        date: '2024-02-18',
        tags: ['health', 'community', 'freeCamp', 'Dharavi'],
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=600&q=80',
        likes: 142,
        comments: [
            { id: 1, author: 'Ravi Kumar', text: 'Amazing work! Keep it up 🙌', time: '2h ago' },
            { id: 2, author: 'Sunita Devi', text: 'My family benefited from this camp. Thank you!', time: '5h ago' },
            { id: 3, author: 'Anil Sharma', text: 'Great initiative. When is the next one?', time: '1d ago' },
        ],
        postedAt: '2024-02-18T10:30:00',
    },
    {
        id: 'ACT002',
        type: 'ask_for_volunteer',
        title: 'Volunteers Needed — Tree Plantation Drive',
        caption: 'Join us this Sunday for our city-wide tree plantation drive. We need 50+ volunteers. All equipment will be provided. Help us plant 1000 trees!',
        date: '2024-02-22',
        tags: ['volunteer', 'environment', 'treePlantation', 'greenCity'],
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80',
        likes: 89,
        comments: [
            { id: 1, author: 'Deepa Menon', text: 'I will be there with 5 friends!', time: '3h ago' },
            { id: 2, author: 'Harsh Patel', text: 'Registered. Looking forward to it.', time: '6h ago' },
        ],
        postedAt: '2024-02-20T09:00:00',
    },
    {
        id: 'ACT003',
        type: 'fundraiser',
        title: 'Fundraiser: Build a Library for Tribal School',
        caption: 'Help us raise ₹5,00,000 to build a library for 400 tribal children in Palghar. Every rupee counts. Donate now and share!',
        date: '2024-02-10',
        tags: ['fundraiser', 'education', 'tribalSchool', 'library'],
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80',
        likes: 310,
        comments: [
            { id: 1, author: 'Meera Iyer', text: 'Donated ₹2000. Best of luck!', time: '1d ago' },
            { id: 2, author: 'Vikram Nair', text: 'Shared with my network.', time: '2d ago' },
            { id: 3, author: 'Pooja Rao', text: 'Such a wonderful cause ❤️', time: '2d ago' },
            { id: 4, author: 'Ankit Gupta', text: 'Keep going!', time: '3d ago' },
        ],
        postedAt: '2024-02-10T14:00:00',
    },
    {
        id: 'ACT004',
        type: 'ask_for_help',
        title: 'Urgent: Food Supplies Needed for Flood Relief',
        caption: 'Families in Kolhapur are affected by flooding. We urgently need dry food packets, water bottles, and blankets. Drop donations at our Pune center.',
        date: '2024-02-05',
        tags: ['urgent', 'floodRelief', 'donate', 'Kolhapur'],
        mediaType: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80',
        likes: 205,
        comments: [
            { id: 1, author: 'Rahul Desai', text: 'On my way with supplies!', time: '4h ago' },
        ],
        postedAt: '2024-02-05T08:00:00',
    },
]

const POST_TYPES = [
    { value: 'ngo_activity', label: 'NGO Activity' },
    { value: 'ask_for_help', label: 'Ask for Help' },
    { value: 'ask_for_volunteer', label: 'Ask for Volunteer' },
    { value: 'fundraiser', label: 'Fundraiser / Donation Drive' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtDate(d) {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
function fmtTime(iso) {
    if (!iso) return ''
    return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteConfirmModal({ activity, onConfirm, onCancel }) {
    if (!activity) return null
    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Post?</h3>
                <p className="text-sm text-gray-500 mb-6">
                    "{activity.title}" will be permanently deleted. This cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button onClick={onCancel}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                        Cancel
                    </button>
                    <button onClick={() => onConfirm(activity.id)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Edit Activity Modal ──────────────────────────────────────────────────────
function EditActivityModal({ activity, onClose, onSave }) {
    const [form, setForm] = useState(activity ? { ...activity } : {})
    const [tagInput, setTagInput] = useState('')
    const fileRef = useRef()

    if (!activity) return null

    const ch = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

    const handleTagKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault()
            const tag = tagInput.trim().replace(/^#/, '')
            if (tag && !form.tags.includes(tag)) {
                setForm(p => ({ ...p, tags: [...p.tags, tag] }))
            }
            setTagInput('')
        }
    }
    const removeTag = (tag) => setForm(p => ({ ...p, tags: p.tags.filter(t => t !== tag) }))

    const handleMediaChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const isVideo = file.type.startsWith('video/')
        const reader = new FileReader()
        reader.onloadend = () => setForm(p => ({ ...p, mediaUrl: reader.result, mediaType: isVideo ? 'video' : 'image' }))
        reader.readAsDataURL(file)
    }

    const handleSave = () => {
        if (!form.caption?.trim() || !form.date) return
        onSave(form)
        onClose()
    }

    const typeCfg = POST_TYPE_CONFIG[form.type] || {}

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[92vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Edit2 className="w-4 h-4 text-primary" /> Edit Activity Post
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">ID: {activity.id} · Posted {fmtTime(activity.postedAt)}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
                </div>

                <div className="px-6 py-5 grid grid-cols-2 gap-5">

                    {/* Post Type */}
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Post Type</label>
                        <div className="grid grid-cols-4 gap-2">
                            {POST_TYPES.map(t => {
                                const cfg = POST_TYPE_CONFIG[t.value]
                                return (
                                    <button key={t.value} type="button"
                                        onClick={() => setForm(p => ({ ...p, type: t.value }))}
                                        className={`px-3 py-2 rounded-lg border text-xs font-semibold transition text-center ${form.type === t.value ? `${cfg.color} border-current border-2` : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                            }`}>
                                        {t.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Media */}
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Media (Image / Video)</label>
                        {form.mediaUrl ? (
                            <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black">
                                {form.mediaType === 'video'
                                    ? <video src={form.mediaUrl} controls className="w-full max-h-56 object-contain" />
                                    : <img src={form.mediaUrl} alt="preview" className="w-full max-h-56 object-cover" />
                                }
                                <button
                                    onClick={() => setForm(p => ({ ...p, mediaUrl: null, mediaType: null }))}
                                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => fileRef.current.click()}
                                    className="absolute bottom-2 right-2 bg-white/90 text-gray-700 rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-white flex items-center gap-1 shadow">
                                    <Upload className="w-3 h-3" /> Replace
                                </button>
                            </div>
                        ) : (
                            <button type="button" onClick={() => fileRef.current.click()}
                                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition">
                                <div className="flex gap-3">
                                    <Image className="w-5 h-5" />
                                    <Video className="w-5 h-5" />
                                </div>
                                <span className="text-sm">Click to upload image or video</span>
                            </button>
                        )}
                        <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaChange} />
                    </div>

                    {/* Title */}
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Title</label>
                        <input type="text" name="title" value={form.title || ''} onChange={ch}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>

                    {/* Caption */}
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Caption</label>
                        <textarea name="caption" value={form.caption || ''} onChange={ch} rows={4}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Activity Date</label>
                        <input type="date" name="date" value={form.date || ''} onChange={ch}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>

                    {/* Engagement (read-only) */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Engagement</label>
                        <div className="flex gap-4 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                            <span className="flex items-center gap-1.5 text-sm text-red-500 font-semibold">
                                <Heart className="w-4 h-4 fill-red-400" /> {form.likes} likes
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-blue-500 font-semibold">
                                <MessageCircle className="w-4 h-4" /> {form.comments?.length || 0} comments
                            </span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tags</label>
                        <div className="flex flex-wrap gap-2 px-3 py-2.5 border border-gray-300 rounded-lg min-h-[44px] focus-within:ring-2 focus-within:ring-primary/30">
                            {(form.tags || []).map(tag => (
                                <span key={tag} className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium">
                                    #{tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                            <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown}
                                placeholder={!form.tags?.length ? 'Type tag + Enter...' : ''}
                                className="flex-1 min-w-[120px] text-sm outline-none bg-transparent" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Press Enter or comma to add a tag</p>
                    </div>

                    {/* Comments preview */}
                    {form.comments?.length > 0 && (
                        <div className="col-span-2">
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Recent Comments ({form.comments.length})
                            </label>
                            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                {form.comments.map(c => (
                                    <div key={c.id} className="flex items-start gap-3 bg-gray-50 rounded-lg px-3 py-2.5 border border-gray-100">
                                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                                            {c.author.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-xs font-semibold text-gray-800">{c.author}</p>
                                                <p className="text-xs text-gray-400 flex-shrink-0">{c.time}</p>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-0.5">{c.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl sticky bottom-0">
                    <button onClick={onClose} className="px-5 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Activity Card ────────────────────────────────────────────────────────────
function ActivityCard({ activity, onEdit, onDelete }) {
    const typeCfg = POST_TYPE_CONFIG[activity.type] || {}

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition group">
            {/* Media */}
            <div className="relative bg-gray-100 h-48 overflow-hidden">
                {activity.mediaUrl ? (
                    activity.mediaType === 'video'
                        ? <video src={activity.mediaUrl} className="w-full h-full object-cover" muted />
                        : <img src={activity.mediaUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Image className="w-12 h-12" />
                    </div>
                )}
                {/* Type badge overlay */}
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${typeCfg.color}`}>
                    {typeCfg.label}
                </span>
                {/* Media type indicator */}
                {activity.mediaType === 'video' && (
                    <span className="absolute top-3 right-3 bg-black/60 text-white rounded-full px-2 py-1 text-xs flex items-center gap-1">
                        <Video className="w-3 h-3" /> Video
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-snug">{activity.title}</h3>
                <p className="text-sm text-gray-500 mt-1.5 line-clamp-2">{activity.caption}</p>

                {/* Tags */}
                {activity.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {activity.tags.map(tag => (
                            <span key={tag} className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Meta row */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3.5 h-3.5" /> {fmtDate(activity.date)}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-red-400 font-medium">
                            <Heart className="w-3.5 h-3.5 fill-red-300" /> {activity.likes}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-blue-400 font-medium">
                            <MessageCircle className="w-3.5 h-3.5" /> {activity.comments?.length || 0}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                    <button onClick={() => onEdit(activity)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => onDelete(activity)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ActivitiesTab() {
    const [activities, setActivities] = useState(MOCK_ACTIVITIES)
    const [editingActivity, setEditingActivity] = useState(null)
    const [deletingActivity, setDeletingActivity] = useState(null)
    const [typeFilter, setTypeFilter] = useState('all')

    const filtered = activities.filter(a => typeFilter === 'all' || a.type === typeFilter)

    const handleSave = (updated) => {
        setActivities(p => p.map(a => a.id === updated.id ? updated : a))
    }

    const handleDelete = (id) => {
        setActivities(p => p.filter(a => a.id !== id))
        setDeletingActivity(null)
    }

    return (
        <div className="space-y-5">
            {/* Filter bar */}
            <div className="flex flex-wrap gap-2 items-center">
                <button onClick={() => setTypeFilter('all')}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${typeFilter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                        }`}>
                    All ({activities.length})
                </button>
                {Object.entries(POST_TYPE_CONFIG).map(([key, cfg]) => (
                    <button key={key} onClick={() => setTypeFilter(key)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${typeFilter === key ? `${cfg.color} border-current` : 'border-gray-200 text-gray-500 hover:border-gray-400'
                            }`}>
                        {cfg.label} ({activities.filter(a => a.type === key).length})
                    </button>
                ))}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 py-16 text-center text-gray-400 text-sm">
                    No activity posts found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            onEdit={setEditingActivity}
                            onDelete={setDeletingActivity}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            <EditActivityModal
                activity={editingActivity}
                onClose={() => setEditingActivity(null)}
                onSave={handleSave}
            />
            <DeleteConfirmModal
                activity={deletingActivity}
                onConfirm={handleDelete}
                onCancel={() => setDeletingActivity(null)}
            />
        </div>
    )
}