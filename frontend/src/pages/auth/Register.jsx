import { useState, useRef } from 'react'
import {
    Heart, ArrowLeft, ArrowRight, Check, Eye, EyeOff,
    User, Building2, Upload, X, ChevronRight,
    Phone, MapPin, Calendar, Globe, FileText, Tag,
    Clock, BookOpen, Camera, Home, LogIn
} from 'lucide-react'

// ─── Constants ────────────────────────────────────────────────────────────────
const ROLES = [
    {
        id: 'donor',
        icon: Heart,
        title: 'Donor',
        subtitle: 'Support causes that matter',
        description: 'Make a difference by funding NGOs and humanitarian projects across India.',
        gradient: 'from-rose-500 to-orange-400',
        light: 'bg-rose-50 border-rose-200 text-rose-600',
        accent: 'text-rose-500',
        check: 'bg-rose-500',
        ring: 'ring-rose-300',
    },
    {
        id: 'ngo',
        icon: Building2,
        title: 'NGO',
        subtitle: 'Register your organisation',
        description: 'List your NGO, post activities, manage volunteers and receive donations.',
        gradient: 'from-primary to-primary-light',
        light: 'bg-green-50 border-green-200 text-green-700',
        accent: 'text-primary',
        check: 'bg-primary',
        ring: 'ring-primary/40',
    },
    {
        id: 'volunteer',
        icon: User,
        title: 'Volunteer',
        subtitle: 'Lend your time & skills',
        description: 'Join NGO campaigns, contribute your expertise and track your impact.',
        gradient: 'from-blue-500 to-teal-400',
        light: 'bg-blue-50 border-blue-200 text-blue-600',
        accent: 'text-blue-500',
        check: 'bg-blue-500',
        ring: 'ring-blue-300',
    },
]

const NGO_CATEGORIES = [
    'Education', 'Healthcare', 'Environment', 'Women Empowerment',
    'Child Welfare', 'Elderly Care', 'Disaster Relief', 'Animal Welfare',
    'Rural Development', 'Arts & Culture',
]

const SKILLS = [
    'Teaching', 'Medical Aid', 'IT Support', 'Legal Aid',
    'Event Management', 'Photography', 'Social Media', 'Counselling',
    'Construction', 'Cooking', 'Driving', 'Translation', 'Art & Craft', 'Finance',
]

const AVAILABILITY = ['Weekdays', 'Weekends', 'Evenings Only', 'Full Time', 'Flexible']

// ─── Helpers ──────────────────────────────────────────────────────────────────
function InputField({ label, name, type = 'text', value, onChange, placeholder, error, icon: Icon, required }) {
    const [show, setShow] = useState(false)
    const isPassword = type === 'password'
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
                {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />}
                <input
                    type={isPassword ? (show ? 'text' : 'password') : type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-4'} ${isPassword ? 'pr-10' : 'pr-4'} py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition bg-white
            ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary/50'}`}
                />
                {isPassword && (
                    <button type="button" onClick={() => setShow(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                )}
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    )
}

function TextareaField({ label, name, value, onChange, placeholder, rows = 3, required }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <textarea
                name={name} value={value} onChange={onChange}
                placeholder={placeholder} rows={rows}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 resize-none transition bg-white"
            />
        </div>
    )
}

function PhotoUpload({ label, value, onChange }) {
    const ref = useRef()
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
            {value ? (
                <div className="relative w-20 h-20">
                    <img src={value} alt="preview" className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-200" />
                    <button onClick={() => onChange(null)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                        <X className="w-3 h-3" />
                    </button>
                </div>
            ) : (
                <button type="button" onClick={() => ref.current.click()}
                    className="w-20 h-20 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-primary hover:text-primary transition">
                    <Camera className="w-5 h-5" />
                    <span className="text-[10px] font-medium">Upload</span>
                </button>
            )}
            <input ref={ref} type="file" accept="image/*" className="hidden"
                onChange={e => {
                    const f = e.target.files[0]; if (!f) return
                    const r = new FileReader(); r.onloadend = () => onChange(r.result); r.readAsDataURL(f)
                }} />
        </div>
    )
}

function MultiSelect({ label, options, selected, onToggle, color = 'primary' }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{label}</label>
            <div className="flex flex-wrap gap-2">
                {options.map(opt => {
                    const active = selected.includes(opt)
                    return (
                        <button key={opt} type="button" onClick={() => onToggle(opt)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${active
                                ? color === 'primary' ? 'bg-primary text-white border-primary' : 'bg-blue-500 text-white border-blue-500'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                }`}>
                            {active && <Check className="w-3 h-3 inline mr-1" />}{opt}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

// ─── Step 1: Role Picker ──────────────────────────────────────────────────────
function RolePicker({ selected, onSelect }) {
    return (
        <div className="space-y-4">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Join Vasudha</h2>
                <p className="text-sm text-gray-500 mt-1">Choose how you'd like to make an impact</p>
            </div>
            {ROLES.map(role => {
                const Icon = role.icon
                const isSelected = selected === role.id
                return (
                    <button key={role.id} type="button" onClick={() => onSelect(role.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${isSelected
                            ? `border-current ${role.light} ring-4 ${role.ring}`
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                            }`}>
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                            <Icon className="w-6 h-6 text-white" />
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-gray-900 text-sm">{role.title}</p>
                                <span className={`text-xs font-medium ${role.accent}`}>{role.subtitle}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{role.description}</p>
                        </div>
                        {/* Check */}
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? `${role.check} border-transparent` : 'border-gray-300 bg-white'
                            }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                    </button>
                )
            })}
        </div>
    )
}

// ─── Step 2 Forms ─────────────────────────────────────────────────────────────
function DonorForm({ form, onChange, onPhotoChange, errors }) {
    return (
        <div className="space-y-4">
            <div className="flex items-start gap-4">
                <PhotoUpload label="Photo" value={form.photo} onChange={onPhotoChange} />
                <div className="flex-1 space-y-4">
                    <InputField label="Full Name" name="name" value={form.name} onChange={onChange}
                        placeholder="e.g. Rajesh Kumar" icon={User} required error={errors.name} />
                    <InputField label="Email Address" name="email" type="email" value={form.email} onChange={onChange}
                        placeholder="you@email.com" required error={errors.email} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Password" name="password" type="password" value={form.password} onChange={onChange}
                    placeholder="Min 8 characters" required error={errors.password} />
                <InputField label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword}
                    onChange={onChange} placeholder="Repeat password" required error={errors.confirmPassword} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange}
                    placeholder="+91 98765 43210" icon={Phone} />
                <InputField label="City / Location" name="location" value={form.location} onChange={onChange}
                    placeholder="e.g. Mumbai" icon={MapPin} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={onChange} icon={Calendar} />
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Gender</label>
                    <select name="gender" value={form.gender} onChange={onChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition bg-white text-gray-700">
                        <option value="">Select...</option>
                        {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => <option key={g}>{g}</option>)}
                    </select>
                </div>
            </div>
            <TextareaField label="Why do you want to donate?" name="motivation" value={form.motivation}
                onChange={onChange} placeholder="Tell us what drives you to contribute..." rows={2} />
        </div>
    )
}

function NGOForm({ form, onChange, onPhotoChange, errors, onToggleCategory }) {
    return (
        <div className="space-y-4">
            <div className="flex items-start gap-4">
                <PhotoUpload label="Logo" value={form.photo} onChange={onPhotoChange} />
                <div className="flex-1 space-y-4">
                    <InputField label="Organisation Name" name="name" value={form.name} onChange={onChange}
                        placeholder="e.g. Helping Hands Foundation" icon={Building2} required error={errors.name} />
                    <InputField label="Email Address" name="email" type="email" value={form.email} onChange={onChange}
                        placeholder="ngo@organisation.org" required error={errors.email} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Password" name="password" type="password" value={form.password} onChange={onChange}
                    placeholder="Min 8 characters" required error={errors.password} />
                <InputField label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword}
                    onChange={onChange} placeholder="Repeat password" required error={errors.confirmPassword} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange}
                    placeholder="+91 98765 43210" icon={Phone} />
                <InputField label="City / Location" name="location" value={form.location} onChange={onChange}
                    placeholder="e.g. Pune, Maharashtra" icon={MapPin} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Registration Number" name="registrationNumber" value={form.registrationNumber}
                    onChange={onChange} placeholder="e.g. MH/2019/0012345" icon={FileText} />
                <InputField label="Founded Year" name="foundedYear" type="number" value={form.foundedYear}
                    onChange={onChange} placeholder="e.g. 2015" icon={Calendar} />
            </div>
            <InputField label="Website URL" name="website" type="url" value={form.website} onChange={onChange}
                placeholder="https://yourorganisation.org" icon={Globe} />
            <MultiSelect
                label="Category / Focus Area (select all that apply)"
                options={NGO_CATEGORIES}
                selected={form.categories || []}
                onToggle={onToggleCategory}
            />
            <TextareaField label="Brief Description / Mission" name="description" value={form.description}
                onChange={onChange} placeholder="Describe your NGO's mission, vision and key activities..." rows={3} required />
        </div>
    )
}

function VolunteerForm({ form, onChange, onPhotoChange, errors, onToggleSkill, onToggleAvailability }) {
    return (
        <div className="space-y-4">
            <div className="flex items-start gap-4">
                <PhotoUpload label="Photo" value={form.photo} onChange={onPhotoChange} />
                <div className="flex-1 space-y-4">
                    <InputField label="Full Name" name="name" value={form.name} onChange={onChange}
                        placeholder="e.g. Priya Sharma" icon={User} required error={errors.name} />
                    <InputField label="Email Address" name="email" type="email" value={form.email} onChange={onChange}
                        placeholder="you@email.com" required error={errors.email} />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Password" name="password" type="password" value={form.password} onChange={onChange}
                    placeholder="Min 8 characters" required error={errors.password} />
                <InputField label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword}
                    onChange={onChange} placeholder="Repeat password" required error={errors.confirmPassword} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={onChange}
                    placeholder="+91 98765 43210" icon={Phone} />
                <InputField label="City / Location" name="location" value={form.location} onChange={onChange}
                    placeholder="e.g. Bengaluru" icon={MapPin} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <InputField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={onChange} icon={Calendar} />
                <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Gender</label>
                    <select name="gender" value={form.gender} onChange={onChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition bg-white text-gray-700">
                        <option value="">Select...</option>
                        {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map(g => <option key={g}>{g}</option>)}
                    </select>
                </div>
            </div>
            <InputField label="Education / Qualification" name="education" value={form.education}
                onChange={onChange} placeholder="e.g. B.Tech, IIT Delhi" icon={BookOpen} />
            <InputField label="Current Occupation" name="occupation" value={form.occupation}
                onChange={onChange} placeholder="e.g. Software Engineer, Student" icon={Tag} />
            <MultiSelect
                label="Skills (select all that apply)"
                options={SKILLS}
                selected={form.skills || []}
                onToggle={onToggleSkill}
                color="blue"
            />
            <MultiSelect
                label="Availability"
                options={AVAILABILITY}
                selected={form.availability || []}
                onToggle={onToggleAvailability}
                color="blue"
            />
            <TextareaField label="Brief Bio / Why volunteer?" name="bio" value={form.bio}
                onChange={onChange} placeholder="Tell NGOs about yourself and what drives you to volunteer..." rows={3} />
        </div>
    )
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ role, onGoLogin }) {
    const cfg = ROLES.find(r => r.id === role)
    const Icon = cfg?.icon || Check
    return (
        <div className="text-center py-8 space-y-5">
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${cfg?.gradient} flex items-center justify-center mx-auto shadow-xl`}>
                <Check className="w-10 h-10 text-white" />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900">You're registered!</h2>
                <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
                    Your {cfg?.title} account has been created. Welcome to the Vasudha community.
                </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 text-left border border-gray-100 max-w-xs mx-auto">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2">What's next?</p>
                {role === 'ngo' && (
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-primary" /> Complete your NGO profile</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-primary" /> Upload verification documents</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-primary" /> Post your first activity</li>
                    </ul>
                )}
                {role === 'donor' && (
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-rose-500" /> Browse verified NGOs</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-rose-500" /> Make your first donation</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-rose-500" /> Track your impact</li>
                    </ul>
                )}
                {role === 'volunteer' && (
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-blue-500" /> Explore NGO opportunities</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-blue-500" /> Apply to campaigns</li>
                        <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-blue-500" /> Log your volunteer hours</li>
                    </ul>
                )}
            </div>
            <button onClick={onGoLogin}
                className="flex items-center gap-2 mx-auto px-8 py-3 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition shadow-md">
                <LogIn className="w-4 h-4" /> Go to Login
            </button>
        </div>
    )
}

// ─── Main Register Page ───────────────────────────────────────────────────────
const EMPTY_FORM = {
    name: '', email: '', password: '', confirmPassword: '',
    phone: '', location: '', dob: '', gender: '', photo: null,
    // donor
    motivation: '',
    // ngo
    registrationNumber: '', foundedYear: '', website: '', description: '', categories: [],
    // volunteer
    education: '', occupation: '', bio: '', skills: [], availability: [],
}

export default function Register() {
    const [step, setStep] = useState(1)       // 1 = role pick, 2 = form, 3 = success
    const [role, setRole] = useState('')
    const [form, setForm] = useState(EMPTY_FORM)
    const [errors, setErrors] = useState({})

    const roleCfg = ROLES.find(r => r.id === role)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(p => ({ ...p, [name]: value }))
        if (errors[name]) setErrors(p => ({ ...p, [name]: '' }))
    }

    const toggleMulti = (field, val) =>
        setForm(p => ({
            ...p,
            [field]: p[field].includes(val) ? p[field].filter(v => v !== val) : [...p[field], val]
        }))

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.password) e.password = 'Password is required'
        else if (form.password.length < 8) e.password = 'Minimum 8 characters'
        if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
        if (role === 'ngo' && !form.description.trim()) e.description = 'Description is required'
        return e
    }

    const handleNext = () => {
        if (step === 1) {
            if (!role) return
            setStep(2)
            return
        }
        if (step === 2) {
            const e = validate()
            if (Object.keys(e).length) { setErrors(e); return }
            setStep(3)
        }
    }

    const handleBack = () => {
        if (step === 2) { setStep(1); setErrors({}) }
    }

    // Step indicator config
    const steps = [
        { n: 1, label: 'Choose Role' },
        { n: 2, label: role ? ROLES.find(r => r.id === role)?.title + ' Details' : 'Your Details' },
        { n: 3, label: 'Done!' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary/5 flex flex-col">

            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                        <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-primary">VASUDHA</span>
                </div>
                <div className="flex items-center gap-3">
                    <a href="/"
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition font-medium">
                        <Home className="w-4 h-4" /> Home
                    </a>
                    <a href="/auth/login"
                        className="flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary/30 px-4 py-1.5 rounded-lg hover:bg-primary hover:text-white transition">
                        <LogIn className="w-4 h-4" /> Login
                    </a>
                </div>
            </div>

            {/* Main card */}
            <div className="flex-1 flex items-start justify-center px-4 pb-12 pt-4">
                <div className="w-full max-w-lg">

                    {/* Step indicator — hide on success */}
                    {step < 3 && (
                        <div className="flex items-center justify-center gap-0 mb-8">
                            {steps.slice(0, 2).map((s, i) => (
                                <div key={s.n} className="flex items-center gap-0">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step > s.n
                                            ? 'bg-primary border-primary text-white'
                                            : step === s.n
                                                ? `border-primary text-primary bg-white ${roleCfg ? '' : ''}`
                                                : 'border-gray-200 text-gray-400 bg-white'
                                            }`}>
                                            {step > s.n ? <Check className="w-4 h-4" /> : s.n}
                                        </div>
                                        <span className={`text-xs mt-1 font-medium whitespace-nowrap ${step === s.n ? 'text-primary' : 'text-gray-400'}`}>
                                            {s.label}
                                        </span>
                                    </div>
                                    {i < 1 && (
                                        <div className={`w-20 h-0.5 mb-5 mx-2 transition-all ${step > 1 ? 'bg-primary' : 'bg-gray-200'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                        {/* Role color accent bar */}
                        {roleCfg && step >= 2 && (
                            <div className={`h-1.5 bg-gradient-to-r ${roleCfg.gradient}`} />
                        )}
                        {(!roleCfg || step < 2) && <div className="h-1.5 bg-gradient-to-r from-primary to-primary-light" />}

                        <div className="px-6 py-8">
                            {/* Step 1 — Role Picker */}
                            {step === 1 && (
                                <RolePicker selected={role} onSelect={setRole} />
                            )}

                            {/* Step 2 — Form */}
                            {step === 2 && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        {roleCfg && (
                                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleCfg.gradient} flex items-center justify-center flex-shrink-0 shadow`}>
                                                <roleCfg.icon className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{roleCfg?.title} Registration</h2>
                                            <p className="text-xs text-gray-400">Fill in your details to create your account</p>
                                        </div>
                                    </div>

                                    <div className="max-h-[60vh] overflow-y-auto pr-1 space-y-1">
                                        {role === 'donor' && (
                                            <DonorForm form={form} onChange={handleChange}
                                                onPhotoChange={v => setForm(p => ({ ...p, photo: v }))}
                                                errors={errors} />
                                        )}
                                        {role === 'ngo' && (
                                            <NGOForm form={form} onChange={handleChange}
                                                onPhotoChange={v => setForm(p => ({ ...p, photo: v }))}
                                                errors={errors}
                                                onToggleCategory={val => toggleMulti('categories', val)} />
                                        )}
                                        {role === 'volunteer' && (
                                            <VolunteerForm form={form} onChange={handleChange}
                                                onPhotoChange={v => setForm(p => ({ ...p, photo: v }))}
                                                errors={errors}
                                                onToggleSkill={val => toggleMulti('skills', val)}
                                                onToggleAvailability={val => toggleMulti('availability', val)} />
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 3 — Success */}
                            {step === 3 && (
                                <SuccessScreen role={role} onGoLogin={() => window.location.href = '/login'} />
                            )}
                        </div>

                        {/* Footer actions */}
                        {step < 3 && (
                            <div className="px-6 pb-6 flex items-center justify-between gap-3">
                                {step === 2 ? (
                                    <button onClick={handleBack}
                                        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition">
                                        <ArrowLeft className="w-4 h-4" /> Back
                                    </button>
                                ) : (
                                    <div />
                                )}
                                <button
                                    onClick={handleNext}
                                    disabled={step === 1 && !role}
                                    className={`flex items-center gap-2 px-7 py-3 rounded-xl text-white text-sm font-bold transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed
                    ${roleCfg
                                            ? `bg-gradient-to-r ${roleCfg.gradient} hover:opacity-90`
                                            : 'bg-gradient-to-r from-primary to-primary-light hover:opacity-90'
                                        }`}>
                                    {step === 1 ? 'Continue' : 'Create Account'}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Login link */}
                    {step < 3 && (
                        <p className="text-center text-sm text-gray-500 mt-5">
                            Already have an account?{' '}
                            <a href="/auth/login" className="text-primary font-semibold hover:text-primary-dark transition">
                                Sign in here
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}