import { useState, useRef } from 'react'
import {
  TrendingUp, Users, Heart, Plus, CheckCircle, Shield,
  MapPin, Calendar, Upload, FileText, Edit2, Trash2,
  ChevronDown, ChevronUp, Image as ImageIcon, X, Download,
  IndianRupee, Eye, BadgeCheck, Clock, Target
} from 'lucide-react'

// ─── Mock Data ────────────────────────────────────────────────────────────────
const ngo = {
  name: 'Aasha Foundation',
  registrationNumber: 'MH/2018/0042376',
  location: 'Mumbai, Maharashtra',
  description: 'Dedicated to empowering underprivileged children and street animals through education, nutrition, and medical support.',
  website: 'https://aashafoundation.org',
  phone: '+91 98200 12345',
  email: 'contact@aashafoundation.org',
  foundedYear: '2018',
  panNumber: 'AABCA1234F',
  certificate80G: 'CIT(E)/80G/2019/001',
  fcraNumber: '094780042',
  bankName: 'State Bank of India',
  accountNumber: '3892740012345',
  ifscCode: 'SBIN0001234',
  accountHolderName: 'Aasha Foundation Trust',
  legalDocRef: 'Trust Deed Ref: BOM/TR/2018/042',
  totalDonations: 2450000,
  volunteerCount: 48,
  rating: 4.8,
  verified: true,
  category: 'Child Welfare & Animal Care',
  activities: [
    { title: 'Winter Blanket Drive', date: '15 Dec 2024' },
    { title: 'Free Medical Camp – Dharavi', date: '3 Jan 2025' },
    { title: 'Street Dog Vaccination Drive', date: '20 Jan 2025' },
  ],
}

const initialDonors = [
  { id: 1, name: 'Rajesh Kumar', amount: 50000, date: '2025-01-15', receipt: 'receipt_RK_50K.pdf' },
  { id: 2, name: 'Priya Sharma', amount: 25000, date: '2025-01-10', receipt: 'receipt_PS_25K.pdf' },
  { id: 3, name: 'Tata Trusts', amount: 100000, date: '2024-12-28', receipt: 'receipt_TT_1L.pdf' },
  { id: 4, name: 'Meena Patel', amount: 10000, date: '2024-12-20', receipt: 'receipt_MP_10K.pdf' },
]

const initialCampaigns = [
  {
    id: 1,
    title: 'Winter Blanket Drive 2025',
    description: 'Providing warm blankets to 500+ homeless people across Mumbai this winter.',
    goalAmount: 250000,
    raisedAmount: 178000,
    location: 'Mumbai, Maharashtra',
    startDate: '2025-01-01',
    endDate: '2025-02-28',
    status: 'active',
    images: ['blanket1.jpg', 'blanket2.jpg'],
    proofDoc: 'blanket_drive_proof.pdf',
    donations: [
      { id: 1, name: 'Rajesh Kumar', amount: 50000, date: '2025-01-15', receipt: 'rcpt_1.pdf' },
      { id: 2, name: 'Priya Sharma', amount: 25000, date: '2025-01-10', receipt: 'rcpt_2.pdf' },
      { id: 3, name: 'Anonymous', amount: 15000, date: '2025-01-08', receipt: 'rcpt_3.pdf' },
    ],
  },
  {
    id: 2,
    title: 'Free Medical Camp – Dharavi',
    description: 'Organizing free health checkups, medicines, and consultations for 1000+ slum residents.',
    goalAmount: 500000,
    raisedAmount: 320000,
    location: 'Dharavi, Mumbai',
    startDate: '2025-01-20',
    endDate: '2025-03-31',
    status: 'active',
    images: ['medcamp1.jpg'],
    proofDoc: 'medcamp_authorization.pdf',
    donations: [
      { id: 1, name: 'Tata Trusts', amount: 200000, date: '2025-01-18', receipt: 'rcpt_tt.pdf' },
      { id: 2, name: 'Meena Patel', amount: 10000, date: '2025-01-20', receipt: 'rcpt_mp.pdf' },
    ],
  },
]

// ─── Utility ─────────────────────────────────────────────────────────────────
const fmtINR = (n) => `₹${Number(n).toLocaleString('en-IN')}`
const pct = (raised, goal) => Math.min(100, Math.round((raised / goal) * 100))

// ─── Verified Badge ───────────────────────────────────────────────────────────
function VerifiedBadge({ size = 'md' }) {
  const sizes = { sm: 'text-xs px-2 py-0.5 gap-1', md: 'text-sm px-3 py-1 gap-1.5', lg: 'text-base px-4 py-1.5 gap-2' }
  const iconSizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' }
  return (
    <span className={`inline-flex items-center ${sizes[size]} bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-semibold`}>
      <BadgeCheck className={`${iconSizes[size]} text-blue-500`} />
      Govt. Verified
    </span>
  )
}

// ─── Create / Edit Campaign Modal ─────────────────────────────────────────────
function CampaignModal({ isOpen, onClose, onSubmit, initial }) {
  const fileRef = useRef()
  const pdfRef = useRef()
  const [form, setForm] = useState(initial || {
    title: '', description: '', goalAmount: '', location: '',
    startDate: '', endDate: '', images: [], proofDoc: null,
  })
  const [imgPreviews, setImgPreviews] = useState(initial?.images || [])

  if (!isOpen) return null

  const change = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleImages = (e) => {
    const files = Array.from(e.target.files)
    const names = files.map(f => f.name)
    setImgPreviews(p => [...p, ...names])
    setForm(p => ({ ...p, images: [...(p.images || []), ...names] }))
  }

  const removeImg = (idx) => {
    setImgPreviews(p => p.filter((_, i) => i !== idx))
    setForm(p => ({ ...p, images: p.images.filter((_, i) => i !== idx) }))
  }

  const handlePdf = (e) => {
    const f = e.target.files[0]
    if (f) setForm(p => ({ ...p, proofDoc: f.name }))
  }

  const submit = () => {
    if (!form.title || !form.goalAmount || !form.location) return alert('Please fill required fields.')
    onSubmit({ ...form, goalAmount: Number(form.goalAmount), raisedAmount: initial?.raisedAmount || 0, donations: initial?.donations || [], status: 'active', id: initial?.id || Date.now() })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">{initial ? 'Edit Campaign' : 'Create Campaign'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition"><X className="w-5 h-5 text-gray-500" /></button>
        </div>
        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Campaign Title *</label>
            <input name="title" value={form.title} onChange={change} placeholder="e.g. Winter Blanket Drive 2025"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
          </div>
          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={change} rows={3} placeholder="What is this campaign about?"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
          </div>
          {/* Goal + Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Goal Amount (₹) *</label>
              <input name="goalAmount" type="number" value={form.goalAmount} onChange={change} placeholder="e.g. 250000"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Location *</label>
              <input name="location" value={form.location} onChange={change} placeholder="City, State"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
            </div>
          </div>
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date</label>
              <input name="startDate" type="date" value={form.startDate} onChange={change}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">End Date</label>
              <input name="endDate" type="date" value={form.endDate} onChange={change}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
            </div>
          </div>
          {/* Images */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Campaign Images</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {imgPreviews.map((img, i) => (
                <div key={i} className="relative flex items-center gap-1 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs text-blue-700 max-w-[120px] truncate">{img}</span>
                  <button onClick={() => removeImg(i)} className="ml-1 text-blue-400 hover:text-red-500 transition"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
            <button onClick={() => fileRef.current.click()}
              className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition w-full justify-center">
              <Upload className="w-4 h-4" /> Upload Images
            </button>
          </div>
          {/* PDF Proof */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Proof / Authorization Document (PDF)</label>
            {form.proofDoc && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-2">
                <FileText className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-700 font-medium">{form.proofDoc}</span>
              </div>
            )}
            <input ref={pdfRef} type="file" accept=".pdf" className="hidden" onChange={handlePdf} />
            <button onClick={() => pdfRef.current.click()}
              className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-green-400 hover:text-green-600 transition w-full justify-center">
              <FileText className="w-4 h-4" /> Upload PDF Proof
            </button>
          </div>
        </div>
        <div className="flex gap-3 p-6 pt-0 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm font-medium">Cancel</button>
          <button onClick={submit} className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold shadow-sm">
            {initial ? 'Save Changes' : 'Create Campaign'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Campaign Card ────────────────────────────────────────────────────────────
function CampaignCard({ campaign, onEdit, onDelete, verified }) {
  const [expanded, setExpanded] = useState(false)
  const progress = pct(campaign.raisedAmount, campaign.goalAmount)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-bold text-gray-900 text-base">{campaign.title}</h3>
              {verified && <VerifiedBadge size="sm" />}
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {campaign.status === 'active' ? '● Active' : 'Closed'}
              </span>
            </div>
            <p className="text-sm text-gray-500 line-clamp-2">{campaign.description}</p>
          </div>
          <div className="flex gap-1 shrink-0">
            <button onClick={onEdit} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit2 className="w-4 h-4" /></button>
            <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{campaign.location}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{campaign.startDate} → {campaign.endDate}</span>
          {campaign.images?.length > 0 && <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" />{campaign.images.length} image{campaign.images.length > 1 ? 's' : ''}</span>}
          {campaign.proofDoc && (
            <button className="flex items-center gap-1 text-blue-600 hover:underline font-medium">
              <FileText className="w-3.5 h-3.5" /> View PDF Proof
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-semibold text-gray-900">{fmtINR(campaign.raisedAmount)} raised</span>
            <span className="text-gray-400">Goal: {fmtINR(campaign.goalAmount)}</span>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-blue-600 font-bold">{progress}% funded</span>
            <span className="text-xs text-gray-400">{campaign.donations.length} donor{campaign.donations.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Donation Records Toggle */}
      <div className="border-t border-gray-100">
        <button onClick={() => setExpanded(p => !p)}
          className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
          <span className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-blue-500" /> Donation Records ({campaign.donations.length})</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {expanded && (
          <div className="px-5 pb-4 space-y-2">
            {campaign.donations.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-3">No donations yet.</p>
            ) : (
              campaign.donations.map(d => (
                <div key={d.id} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{d.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" />{d.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="font-bold text-blue-600 text-sm">{fmtINR(d.amount)}</p>
                    {d.receipt && (
                      <button className="flex items-center gap-1 text-xs text-green-600 hover:underline bg-green-50 px-2 py-1 rounded-md font-medium">
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Campaigns Tab ────────────────────────────────────────────────────────────
function CampaignsTab({ verified }) {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState(null)

  const handleCreate = (data) => {
    setCampaigns(p => [data, ...p])
  }

  const handleEdit = (data) => {
    setCampaigns(p => p.map(c => c.id === data.id ? data : c))
    setEditTarget(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this campaign?')) setCampaigns(p => p.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">Campaigns</h3>
          <p className="text-sm text-gray-500 mt-0.5">{campaigns.length} total · {campaigns.filter(c => c.status === 'active').length} active</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold shadow-sm">
          <Plus className="w-4 h-4" /> Create Campaign
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <Target className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No campaigns yet</p>
          <p className="text-sm text-gray-400 mt-1">Create your first fundraising campaign</p>
        </div>
      ) : (
        <div className="space-y-4">
          {campaigns.map(c => (
            <CampaignCard key={c.id} campaign={c} verified={verified}
              onEdit={() => setEditTarget(c)}
              onDelete={() => handleDelete(c.id)} />
          ))}
        </div>
      )}

      <CampaignModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreate} />
      {editTarget && (
        <CampaignModal isOpen={true} onClose={() => setEditTarget(null)} onSubmit={handleEdit} initial={editTarget} />
      )}
    </div>
  )
}

// ─── Transactions Tab (inline, same style) ────────────────────────────────────
function TransactionsTab() {
  const [donors] = useState(initialDonors)
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-bold text-gray-900 mb-5">All Transactions</h3>
      <div className="space-y-3">
        {donors.map(d => (
          <div key={d.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div>
              <p className="font-medium text-gray-900 text-sm">{d.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Clock className="w-3 h-3" />{d.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-bold text-blue-600">{fmtINR(d.amount)}</p>
              <button className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded font-medium hover:underline">
                <Download className="w-3 h-3" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Volunteers Tab ───────────────────────────────────────────────────────────
function VolunteersTab() {
  const vols = [
    { name: 'Ananya Rao', role: 'Field Coordinator', joined: '2024-03-01', status: 'active' },
    { name: 'Karan Mehta', role: 'Medical Support', joined: '2024-05-15', status: 'active' },
    { name: 'Sunita Bose', role: 'Logistics', joined: '2024-08-20', status: 'inactive' },
  ]
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-bold text-gray-900 mb-5">Volunteers ({vols.length})</h3>
      <div className="space-y-3">
        {vols.map((v, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">{v.name[0]}</div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{v.name}</p>
                <p className="text-xs text-gray-400">{v.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">{v.joined}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${v.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{v.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Activities Tab ───────────────────────────────────────────────────────────
function ActivitiesTab() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-bold text-gray-900 mb-5">All Activities</h3>
      <div className="space-y-3">
        {ngo.activities.map((a, i) => (
          <div key={i} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
            <div>
              <p className="font-medium text-gray-900 text-sm">{a.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [profileForm, setProfileForm] = useState({
    name: ngo.name, registrationNumber: ngo.registrationNumber, location: ngo.location,
    description: ngo.description, website: ngo.website, phone: ngo.phone, email: ngo.email,
    foundedYear: ngo.foundedYear, panNumber: ngo.panNumber, certificate80G: ngo.certificate80G,
    fcraNumber: ngo.fcraNumber, bankName: ngo.bankName, accountNumber: ngo.accountNumber,
    ifscCode: ngo.ifscCode, accountHolderName: ngo.accountHolderName, legalDocRef: ngo.legalDocRef,
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm(p => ({ ...p, [name]: value }))
  }

  const stats = [
    { label: 'Total Donations', value: `₹${(ngo.totalDonations / 100000).toFixed(1)}L`, icon: Heart, bg: 'bg-red-50', iconColor: 'text-red-400', textColor: 'text-red-600' },
    { label: 'Active Donors', value: '320', icon: Users, bg: 'bg-blue-50', iconColor: 'text-blue-400', textColor: 'text-blue-600' },
    { label: 'Volunteers', value: ngo.volunteerCount, icon: Users, bg: 'bg-green-50', iconColor: 'text-green-400', textColor: 'text-green-600' },
    { label: 'Rating', value: `${ngo.rating} ⭐`, icon: TrendingUp, bg: 'bg-yellow-50', iconColor: 'text-yellow-400', textColor: 'text-yellow-600' },
  ]

  const TABS = ['overview', 'campaigns', 'transactions', 'volunteers', 'activities', 'profile']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Aasha NGO Portal</span>
          </div>
          <div className="flex items-center gap-3">
            {ngo.verified && <VerifiedBadge size="sm" />}
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">A</div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-gray-900">{ngo.name}</h1>
              {ngo.verified && <VerifiedBadge size="md" />}
            </div>
            <p className="text-gray-500 text-sm mt-1">NGO Management Dashboard</p>
          </div>
          <button onClick={() => setActiveTab('campaigns')}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm text-sm">
            <Plus className="w-5 h-5" /> New Campaign
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className={`p-6 rounded-xl border border-gray-200 ${stat.bg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${stat.textColor}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 font-medium border-b-2 transition text-sm whitespace-nowrap ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6 lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Donations</h3>
                    <div className="space-y-4">
                      {initialDonors.slice(0, 3).map(d => (
                        <div key={d.id} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{d.name}</p>
                            <p className="text-xs text-gray-400">{d.date}</p>
                          </div>
                          <p className="text-lg font-bold text-blue-600">{fmtINR(d.amount)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                      {ngo.activities.map((a, i) => (
                        <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                          <p className="font-medium text-gray-900">{a.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{a.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-20">
                    <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Category</p>
                        <p className="font-semibold text-gray-800 mt-0.5">{ngo.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Verification Status</p>
                        <div className="mt-1">{ngo.verified ? <VerifiedBadge size="sm" /> : <span className="text-red-500 font-semibold text-sm">✗ Not Verified</span>}</div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Registration No.</p>
                        <p className="font-semibold text-gray-800 mt-0.5">{ngo.registrationNumber}</p>
                      </div>
                      <div className="pt-4 border-t border-gray-100 space-y-2">
                        <button onClick={() => setActiveTab('profile')}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                          Edit Profile
                        </button>
                        <button onClick={() => setActiveTab('campaigns')}
                          className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition text-sm font-medium">
                          View Campaigns
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'campaigns' && <CampaignsTab verified={ngo.verified} />}
            {activeTab === 'transactions' && <TransactionsTab />}
            {activeTab === 'volunteers' && <VolunteersTab />}
            {activeTab === 'activities' && <ActivitiesTab />}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-lg">NGO Profile</h3>
                  {ngo.verified && <VerifiedBadge size="md" />}
                </div>

                <section>
                  <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Organization Name', name: 'name', type: 'text' },
                      { label: 'Registration Number', name: 'registrationNumber', type: 'text' },
                      { label: 'Location / City', name: 'location', type: 'text' },
                      { label: 'Founded Year', name: 'foundedYear', type: 'number' },
                      { label: 'Email Address', name: 'email', type: 'email' },
                      { label: 'Phone Number', name: 'phone', type: 'tel' },
                      { label: 'Website', name: 'website', type: 'url' },
                    ].map(f => (
                      <div key={f.name} className={f.name === 'name' ? 'md:col-span-2' : ''}>
                        <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
                        <input type={f.type} name={f.name} value={profileForm[f.name]} onChange={handleProfileChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Description / Mission</label>
                      <textarea name="description" value={profileForm.description} onChange={handleProfileChange} rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Legal & Compliance</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'PAN / Tax ID', name: 'panNumber', placeholder: 'ABCDE1234F' },
                      { label: '80G Certificate Number', name: 'certificate80G', placeholder: 'CIT(E)/80G/...' },
                      { label: 'FCRA Registration Number', name: 'fcraNumber', placeholder: '094780001' },
                      { label: 'Legal Document Reference', name: 'legalDocRef', placeholder: 'Trust deed / Society reg.' },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
                        <input type="text" name={f.name} value={profileForm[f.name]} onChange={handleProfileChange} placeholder={f.placeholder}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">Bank Account Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Bank Name', name: 'bankName', placeholder: 'State Bank of India' },
                      { label: 'Account Holder Name', name: 'accountHolderName', placeholder: 'As per bank records' },
                      { label: 'Account Number', name: 'accountNumber', placeholder: 'xxxxxxxxxxxxxxxx' },
                      { label: 'IFSC Code', name: 'ifscCode', placeholder: 'SBIN0001234' },
                    ].map(f => (
                      <div key={f.name}>
                        <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
                        <input type="text" name={f.name} value={profileForm[f.name]} onChange={handleProfileChange} placeholder={f.placeholder}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition" />
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex gap-4 justify-end">
                  <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm shadow-sm">Save Changes</button>
                  <button className="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold text-sm shadow-sm">Reset</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}