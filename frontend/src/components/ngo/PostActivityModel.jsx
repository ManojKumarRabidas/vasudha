import { useState, useRef } from 'react'
import { X, Image, Tag, Calendar, ChevronDown, Upload } from 'lucide-react'

const POST_TYPES = [
    { value: 'ngo_activity', label: 'NGO Activity', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { value: 'ask_for_help', label: 'Ask for Help', color: 'bg-red-100 text-red-700 border-red-300' },
    { value: 'ask_for_volunteer', label: 'Ask for Volunteer', color: 'bg-green-100 text-green-700 border-green-300' },
    { value: 'fundraiser', label: 'Fundraiser / Donation Drive', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
]

const INITIAL_FORM = {
    type: '',
    caption: '',
    date: '',
    tags: '',
    image: null,
    imagePreview: null,
}

export default function PostActivityModal({ isOpen, onClose, onSubmit }) {
    const [form, setForm] = useState(INITIAL_FORM)
    const [tagInput, setTagInput] = useState('')
    const [tagList, setTagList] = useState([])
    const [errors, setErrors] = useState({})
    const fileRef = useRef()

    if (!isOpen) return null

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onloadend = () => {
            setForm((prev) => ({ ...prev, image: file, imagePreview: reader.result }))
        }
        reader.readAsDataURL(file)
    }

    const handleTagKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault()
            const tag = tagInput.trim().replace(/^#/, '')
            if (tag && !tagList.includes(tag)) {
                setTagList((prev) => [...prev, tag])
            }
            setTagInput('')
        }
    }

    const removeTag = (tag) => setTagList((prev) => prev.filter((t) => t !== tag))

    const validate = () => {
        const newErrors = {}
        if (!form.type) newErrors.type = 'Please select a post type.'
        if (!form.caption.trim()) newErrors.caption = 'Caption is required.'
        if (!form.date) newErrors.date = 'Date is required.'
        return newErrors
    }

    const handleSubmit = () => {
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        onSubmit && onSubmit({ ...form, tags: tagList })
        handleReset()
        onClose()
    }

    const handleReset = () => {
        setForm(INITIAL_FORM)
        setTagList([])
        setTagInput('')
        setErrors({})
    }

    const selectedType = POST_TYPES.find((t) => t.value === form.type)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Post an Activity</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Share what your NGO is doing</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 space-y-5">

                    {/* Post Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Post Type <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {POST_TYPES.map((type) => (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => {
                                        setForm((prev) => ({ ...prev, type: type.value }))
                                        if (errors.type) setErrors((prev) => ({ ...prev, type: '' }))
                                    }}
                                    className={`px-3 py-2 rounded-lg border text-sm font-medium transition text-left ${form.type === type.value
                                            ? type.color + ' border-2'
                                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                        {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <span className="flex items-center gap-1"><Image className="w-4 h-4" /> Image</span>
                        </label>
                        {form.imagePreview ? (
                            <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={form.imagePreview}
                                    alt="Preview"
                                    className="w-full h-40 object-cover"
                                />
                                <button
                                    onClick={() => setForm((prev) => ({ ...prev, image: null, imagePreview: null }))}
                                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black/80"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => fileRef.current.click()}
                                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition"
                            >
                                <Upload className="w-6 h-6" />
                                <span className="text-sm">Click to upload image</span>
                            </button>
                        )}
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Caption */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Caption <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="caption"
                            value={form.caption}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Describe the activity..."
                            className={`w-full px-4 py-2.5 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${errors.caption ? 'border-red-400' : 'border-gray-300'
                                }`}
                        />
                        {errors.caption && <p className="text-xs text-red-500 mt-1">{errors.caption}</p>}
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Activity Date <span className="text-red-500">*</span></span>
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${errors.date ? 'border-red-400' : 'border-gray-300'
                                }`}
                        />
                        {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> Tags</span>
                        </label>
                        <div className={`flex flex-wrap gap-2 px-3 py-2.5 border rounded-lg min-h-[44px] focus-within:ring-2 focus-within:ring-primary/30 transition ${tagList.length > 0 ? 'border-gray-300' : 'border-gray-300'
                            }`}>
                            {tagList.map((tag) => (
                                <span
                                    key={tag}
                                    className="flex items-center gap-1 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
                                >
                                    #{tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-red-500">
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown}
                                placeholder={tagList.length === 0 ? 'Type a tag and press Enter...' : ''}
                                className="flex-1 min-w-[120px] text-sm outline-none bg-transparent"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Press Enter or comma to add a tag</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={handleReset}
                        className="px-5 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                    >
                        Post Activity
                    </button>
                </div>
            </div>
        </div>
    )
}