import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { mockData } from '../../data/data'
import {
  CheckCircle, X, TrendingUp, Users, Building, DollarSign,
  LogOut, Heart, FileText, Eye, ShieldCheck, ShieldX,
  AlertCircle, Clock, Download, ChevronDown, ChevronUp,
  Badge, Search, Filter, BadgeCheck, XCircle, Info,
  Stamp, ThumbsUp, ThumbsDown, FileBadge, Landmark,
  BookOpen, Scale, Globe
} from 'lucide-react'

// ─── Extended Mock Data for NGO Documents ────────────────────────────────────
const MOCK_PENDING_NGOS = [
  {
    _id: 'NGO001',
    name: 'Bal Shakti Foundation',
    email: 'contact@balshakti.org',
    phone: '+91 98200 11111',
    location: 'Pune, Maharashtra',
    registrationNumber: 'MH/2022/0056789',
    category: 'Child Welfare',
    submittedOn: '2025-01-18',
    documents: [
      {
        id: 'D1', name: 'Registration Certificate', filename: 'registration_cert.pdf',
        type: 'registration', size: '1.2 MB', status: 'pending',
        icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50',
        description: 'Certificate of Registration from Charity Commissioner',
        required: true,
      },
      {
        id: 'D2', name: '80G Certificate', filename: '80G_certificate.pdf',
        type: 'tax', size: '0.8 MB', status: 'pending',
        icon: FileBadge, color: 'text-purple-600', bg: 'bg-purple-50',
        description: 'Income Tax 80G exemption certificate',
        required: true,
      },
      {
        id: 'D3', name: 'PAN Card', filename: 'pan_card.pdf',
        type: 'identity', size: '0.3 MB', status: 'pending',
        icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50',
        description: 'Organization PAN card issued by Income Tax Department',
        required: true,
      },
      {
        id: 'D4', name: 'Trust Deed / MoA', filename: 'trust_deed.pdf',
        type: 'legal', size: '2.4 MB', status: 'pending',
        icon: Scale, color: 'text-green-600', bg: 'bg-green-50',
        description: 'Memorandum of Association or Trust Deed',
        required: true,
      },
      {
        id: 'D5', name: 'Bank Account Proof', filename: 'bank_statement.pdf',
        type: 'financial', size: '1.1 MB', status: 'pending',
        icon: Landmark, color: 'text-teal-600', bg: 'bg-teal-50',
        description: 'Cancelled cheque or bank statement for verification',
        required: false,
      },
    ],
  },
  {
    _id: 'NGO002',
    name: 'Prani Mitra Animal Trust',
    email: 'hello@pranimitra.org',
    phone: '+91 98200 22222',
    location: 'Chennai, Tamil Nadu',
    registrationNumber: 'TN/2021/0078321',
    category: 'Animal Welfare',
    submittedOn: '2025-01-20',
    documents: [
      {
        id: 'D6', name: 'Registration Certificate', filename: 'reg_cert_prani.pdf',
        type: 'registration', size: '1.5 MB', status: 'pending',
        icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50',
        description: 'Certificate of Registration from Charity Commissioner',
        required: true,
      },
      {
        id: 'D7', name: '12A Certificate', filename: '12A_cert.pdf',
        type: 'tax', size: '0.9 MB', status: 'pending',
        icon: FileBadge, color: 'text-purple-600', bg: 'bg-purple-50',
        description: '12A tax exemption certificate from Income Tax',
        required: true,
      },
      {
        id: 'D8', name: 'FCRA Certificate', filename: 'fcra_cert.pdf',
        type: 'legal', size: '1.8 MB', status: 'pending',
        icon: Globe, color: 'text-indigo-600', bg: 'bg-indigo-50',
        description: 'Foreign Contribution Regulation Act registration',
        required: false,
      },
      {
        id: 'D9', name: 'Trust Deed', filename: 'trust_deed_prani.pdf',
        type: 'legal', size: '3.1 MB', status: 'pending',
        icon: Scale, color: 'text-green-600', bg: 'bg-green-50',
        description: 'Original Trust Deed with all amendments',
        required: true,
      },
    ],
  },
  {
    _id: 'NGO003',
    name: 'Nari Shakti Women Empowerment',
    email: 'info@narishakti.org',
    phone: '+91 98200 33333',
    location: 'Jaipur, Rajasthan',
    registrationNumber: 'RJ/2023/0012456',
    category: 'Women Empowerment',
    submittedOn: '2025-01-22',
    documents: [
      {
        id: 'D10', name: 'Society Registration', filename: 'society_reg.pdf',
        type: 'registration', size: '1.0 MB', status: 'pending',
        icon: Landmark, color: 'text-blue-600', bg: 'bg-blue-50',
        description: 'Society Registration Certificate under Societies Act',
        required: true,
      },
      {
        id: 'D11', name: 'PAN Card', filename: 'pan_nari.pdf',
        type: 'identity', size: '0.2 MB', status: 'pending',
        icon: BookOpen, color: 'text-orange-600', bg: 'bg-orange-50',
        description: 'Organization PAN card',
        required: true,
      },
      {
        id: 'D12', name: 'Annual Report 2023-24', filename: 'annual_report.pdf',
        type: 'financial', size: '4.2 MB', status: 'pending',
        icon: FileText, color: 'text-gray-600', bg: 'bg-gray-50',
        description: 'Audited annual report for the last financial year',
        required: false,
      },
    ],
  },
]

// ─── Document Verification Modal ─────────────────────────────────────────────
function DocumentVerificationModal({ ngo, onClose, onVerdict }) {
  const [docStatuses, setDocStatuses] = useState(
    Object.fromEntries(ngo.documents.map(d => [d.id, 'pending']))
  )
  const [remarks, setRemarks] = useState(
    Object.fromEntries(ngo.documents.map(d => [d.id, '']))
  )
  const [finalRemark, setFinalRemark] = useState('')
  const [activeDoc, setActiveDoc] = useState(ngo.documents[0].id)
  const [submitting, setSubmitting] = useState(false)

  const setDocStatus = (docId, status) => {
    setDocStatuses(p => ({ ...p, [docId]: status }))
  }

  const allRequired = ngo.documents.filter(d => d.required)
  const allRequiredVerified = allRequired.every(d => docStatuses[d.id] === 'verified')
  const anyRejected = ngo.documents.some(d => docStatuses[d.id] === 'rejected')

  const pendingCount  = ngo.documents.filter(d => docStatuses[d.id] === 'pending').length
  const verifiedCount = ngo.documents.filter(d => docStatuses[d.id] === 'verified').length
  const rejectedCount = ngo.documents.filter(d => docStatuses[d.id] === 'rejected').length

  const handleFinalVerdict = (verdict) => {
    setSubmitting(true)
    setTimeout(() => {
      onVerdict(ngo._id, verdict, finalRemark)
      setSubmitting(false)
      onClose()
    }, 1000)
  }

  const activeDocument = ngo.documents.find(d => d.id === activeDoc)

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-6">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-900 to-gray-800 rounded-t-2xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{ngo.name}</h2>
              <p className="text-gray-400 text-sm">Document Verification — {ngo.registrationNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Progress pills */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs bg-yellow-500/20 text-yellow-300 px-2.5 py-1 rounded-full font-semibold">
                <Clock className="w-3 h-3" /> {pendingCount} Pending
              </span>
              <span className="flex items-center gap-1 text-xs bg-green-500/20 text-green-300 px-2.5 py-1 rounded-full font-semibold">
                <CheckCircle className="w-3 h-3" /> {verifiedCount} Verified
              </span>
              {rejectedCount > 0 && (
                <span className="flex items-center gap-1 text-xs bg-red-500/20 text-red-300 px-2.5 py-1 rounded-full font-semibold">
                  <X className="w-3 h-3" /> {rejectedCount} Rejected
                </span>
              )}
            </div>
            <button onClick={onClose} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">

          {/* Left: Document List */}
          <div className="lg:w-72 border-b lg:border-b-0 lg:border-r border-gray-100 p-4 space-y-2 flex-shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-3">
              Documents ({ngo.documents.length})
            </p>
            {ngo.documents.map(doc => {
              const Icon = doc.icon
              const status = docStatuses[doc.id]
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveDoc(doc.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${
                    activeDoc === doc.id ? 'bg-gray-900 text-white' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activeDoc === doc.id ? 'bg-white/10' : doc.bg
                  }`}>
                    <Icon className={`w-4 h-4 ${activeDoc === doc.id ? 'text-white' : doc.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{doc.name}</p>
                    <p className="text-xs opacity-60 truncate">{doc.size}</p>
                  </div>
                  {/* Status dot */}
                  <div className="flex-shrink-0">
                    {status === 'verified' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {status === 'rejected' && <XCircle className="w-4 h-4 text-red-500" />}
                    {status === 'pending'  && (
                      <div className="w-4 h-4 rounded-full border-2 border-yellow-400 bg-yellow-100" />
                    )}
                  </div>
                </button>
              )
            })}

            {/* Overall progress */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-2">Overall progress</p>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${(verifiedCount / ngo.documents.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{verifiedCount} of {ngo.documents.length} verified</p>
            </div>
          </div>

          {/* Right: Document Detail + Verdict */}
          <div className="flex-1 p-6 flex flex-col gap-5">
            {activeDocument && (
              <>
                {/* Document info */}
                <div className={`${activeDocument.bg} border border-gray-200 rounded-xl p-5`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${activeDocument.bg} border border-gray-200 flex items-center justify-center flex-shrink-0`}>
                      <activeDocument.icon className={`w-6 h-6 ${activeDocument.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-gray-900">{activeDocument.name}</h3>
                        {activeDocument.required && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">Required</span>
                        )}
                        {!activeDocument.required && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">Optional</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{activeDocument.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{activeDocument.filename}</span>
                        <span>{activeDocument.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* View / Download buttons */}
                  <div className="flex gap-2 mt-4">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition text-xs font-semibold">
                      <Eye className="w-3.5 h-3.5" /> View Document
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition text-xs font-semibold">
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
                  </div>
                </div>

                {/* Admin remarks for this doc */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Admin Remarks for this document
                  </label>
                  <textarea
                    value={remarks[activeDocument.id]}
                    onChange={e => setRemarks(p => ({ ...p, [activeDocument.id]: e.target.value }))}
                    rows={2}
                    placeholder="Add any notes about this document (e.g. certificate number verified, dates match, etc.)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition"
                  />
                </div>

                {/* Verify / Reject this document */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Document Status
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDocStatus(activeDocument.id, 'verified')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 transition ${
                        docStatuses[activeDocument.id] === 'verified'
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" /> Mark Verified
                    </button>
                    <button
                      onClick={() => setDocStatus(activeDocument.id, 'rejected')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold border-2 transition ${
                        docStatuses[activeDocument.id] === 'rejected'
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" /> Mark Rejected
                    </button>
                    <button
                      onClick={() => setDocStatus(activeDocument.id, 'pending')}
                      className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition ${
                        docStatuses[activeDocument.id] === 'pending'
                          ? 'bg-yellow-400 border-yellow-400 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-100" />

                {/* Final Verdict */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Final Verdict for NGO
                  </p>

                  {/* Warning if not all required docs verified */}
                  {!allRequiredVerified && !anyRejected && (
                    <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-3">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-700">
                        Verify all <strong>required</strong> documents before approving. Optional documents can be skipped.
                      </p>
                    </div>
                  )}
                  {anyRejected && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700">
                        One or more documents are rejected. NGO will be notified to resubmit.
                      </p>
                    </div>
                  )}
                  {allRequiredVerified && !anyRejected && (
                    <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl p-3 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-green-700">
                        All required documents verified! You can approve this NGO.
                      </p>
                    </div>
                  )}

                  <textarea
                    value={finalRemark}
                    onChange={e => setFinalRemark(e.target.value)}
                    rows={2}
                    placeholder="Add a final remark for the NGO (will be sent in the notification email)"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-300 transition mb-3"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleFinalVerdict('approved')}
                      disabled={!allRequiredVerified || anyRejected || submitting}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      {submitting ? 'Processing…' : 'Approve NGO'}
                    </button>
                    <button
                      onClick={() => handleFinalVerdict('rejected')}
                      disabled={submitting}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition text-sm disabled:opacity-40"
                    >
                      <ShieldX className="w-4 h-4" />
                      {submitting ? 'Processing…' : 'Reject NGO'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── NGO Document Card (in pending list) ─────────────────────────────────────
function NGOPendingCard({ ngo, onVerify, onQuickApprove, onQuickReject }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition">
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-sm flex-shrink-0">
              {ngo.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <h3 className="font-bold text-gray-900 text-sm">{ngo.name}</h3>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">
                  ⏳ Pending Review
                </span>
              </div>
              <p className="text-xs text-gray-500">{ngo.email} · {ngo.location}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                <span>Reg: {ngo.registrationNumber}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Submitted {ngo.submittedOn}</span>
              </div>
            </div>
          </div>

          {/* Verify button */}
          <button
            onClick={() => onVerify(ngo)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition text-xs font-semibold flex-shrink-0"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Review Docs
          </button>
        </div>

        {/* Document chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {ngo.documents.map(doc => {
            const Icon = doc.icon
            return (
              <span key={doc.id} className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${doc.bg} ${doc.color}`}>
                <Icon className="w-3 h-3" />
                {doc.name}
                {doc.required && <span className="text-red-500">*</span>}
              </span>
            )
          })}
        </div>
      </div>

      {/* Expandable quick actions */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setExpanded(p => !p)}
          className="w-full flex items-center justify-between px-5 py-2.5 text-xs font-medium text-gray-500 hover:bg-gray-50 transition"
        >
          <span>Quick Actions</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {expanded && (
          <div className="px-5 pb-4 flex gap-2">
            <button
              onClick={() => onQuickApprove(ngo._id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs font-semibold"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Quick Approve
            </button>
            <button
              onClick={() => onQuickReject(ngo._id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs font-semibold"
            >
              <X className="w-3.5 h-3.5" /> Quick Reject
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab]       = useState('overview')
  const [pendingNGOs, setPendingNGOs]   = useState(MOCK_PENDING_NGOS)
  const [verifyTarget, setVerifyTarget] = useState(null)
  const [toastMsg, setToastMsg]         = useState(null)

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
  }

  const showToast = (msg, type = 'success') => {
    setToastMsg({ msg, type })
    setTimeout(() => setToastMsg(null), 3500)
  }

  const handleVerdict = (ngoId, verdict, remark) => {
    setPendingNGOs(p => p.filter(n => n._id !== ngoId))
    showToast(
      verdict === 'approved'
        ? '✅ NGO approved and notified successfully!'
        : '❌ NGO rejected. Notification sent with reason.',
      verdict === 'approved' ? 'success' : 'error'
    )
  }

  const quickApprove = (id) => {
    setPendingNGOs(p => p.filter(n => n._id !== id))
    showToast('✅ NGO approved quickly!')
  }

  const quickReject = (id) => {
    setPendingNGOs(p => p.filter(n => n._id !== id))
    showToast('❌ NGO rejected.', 'error')
  }

  const totalDonations    = mockData.transactions.reduce((s, t) => s + t.amount, 0)
  const platformEarnings  = mockData.transactions.reduce((s, t) => s + t.platformFee, 0)

  const TABS = ['overview', 'document-verification', 'users', 'transactions', 'reports']

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">VASUDHA 1.0</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg font-medium">
              <ShieldCheck className="w-4 h-4 text-primary" /> Admin
            </span>
            {pendingNGOs.length > 0 && (
              <span className="flex items-center gap-1 text-xs bg-orange-100 text-orange-700 px-2.5 py-1.5 rounded-lg font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                {pendingNGOs.length} pending
              </span>
            )}
            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition text-sm font-medium"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* ── Toast ── */}
      {toastMsg && (
        <div className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold transition-all ${
          toastMsg.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {toastMsg.msg}
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8">

        {/* Page title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Platform Management & Oversight</p>
          </div>
          {pendingNGOs.length > 0 && (
            <button
              onClick={() => setActiveTab('document-verification')}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition text-sm font-semibold shadow-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {pendingNGOs.length} NGO{pendingNGOs.length > 1 ? 's' : ''} Awaiting Verification
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users',       value: mockData.donors.length + mockData.volunteers.length, icon: Users,       bg: 'bg-blue-50',   color: 'text-blue-600'   },
            { label: 'Active NGOs',        value: mockData.ngos.length,                                icon: Building,    bg: 'bg-green-50',  color: 'text-green-600'  },
            { label: 'Total Donations',    value: `₹${(totalDonations / 100000).toFixed(1)}L`,        icon: DollarSign,  bg: 'bg-purple-50', color: 'text-purple-600' },
            { label: 'Pending Verif.',     value: pendingNGOs.length,                                  icon: AlertCircle, bg: 'bg-orange-50', color: 'text-orange-600' },
          ].map((s, i) => (
            <div key={i} className={`p-5 rounded-xl border border-gray-200 ${s.bg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-medium">{s.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                </div>
                <s.icon className={`w-7 h-7 ${s.color} opacity-70`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-gray-200 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 font-medium border-b-2 transition text-sm whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab === 'document-verification' && <ShieldCheck className="w-4 h-4" />}
              {tab === 'overview'               && 'Overview'}
              {tab === 'document-verification'  && `Document Verification ${pendingNGOs.length > 0 ? `(${pendingNGOs.length})` : ''}`}
              {tab === 'users'                  && 'Users'}
              {tab === 'transactions'           && 'Transactions'}
              {tab === 'reports'                && 'Reports'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="space-y-6">

                {/* Pending alert banner */}
                {pendingNGOs.length > 0 && (
                  <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-orange-800 text-sm">
                          {pendingNGOs.length} NGO{pendingNGOs.length > 1 ? 's' : ''} pending document verification
                        </p>
                        <p className="text-xs text-orange-600 mt-0.5">Review submitted documents to approve or reject.</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('document-verification')}
                      className="text-xs font-semibold text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-lg transition"
                    >
                      Review Now →
                    </button>
                  </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Recent Transactions</h3>
                  <div className="space-y-4">
                    {mockData.transactions.slice(0, 5).map((tx, i) => (
                      <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">Transaction #{tx._id}</p>
                          <p className="text-xs text-gray-400">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{tx.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">Fee: ₹{tx.platformFee}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── DOCUMENT VERIFICATION TAB ── */}
            {activeTab === 'document-verification' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      NGO Document Verification
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {pendingNGOs.length > 0
                        ? `${pendingNGOs.length} NGO${pendingNGOs.length > 1 ? 's' : ''} awaiting document review`
                        : 'All applications reviewed!'}
                    </p>
                  </div>
                </div>

                {/* How it works */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-700 leading-relaxed">
                    <strong>How to verify:</strong> Click <em>"Review Docs"</em> on any NGO to open the full document panel.
                    Verify or reject each document individually, add remarks, then issue a final Approve or Reject verdict.
                    The NGO will be notified automatically.
                  </div>
                </div>

                {pendingNGOs.length === 0 ? (
                  <div className="bg-white rounded-xl border border-dashed border-gray-300 p-16 text-center">
                    <ShieldCheck className="w-12 h-12 text-green-300 mx-auto mb-3" />
                    <p className="text-gray-400 font-semibold text-lg">All clear!</p>
                    <p className="text-sm text-gray-400 mt-1">No NGOs pending document verification.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingNGOs.map(ngo => (
                      <NGOPendingCard
                        key={ngo._id}
                        ngo={ngo}
                        onVerify={setVerifyTarget}
                        onQuickApprove={quickApprove}
                        onQuickReject={quickReject}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── USERS TAB ── */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Donors ({mockData.donors.length})</h3>
                  <div className="space-y-3">
                    {mockData.donors.map((donor, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{donor.name}</p>
                          <p className="text-xs text-gray-500">{donor.email}</p>
                        </div>
                        <span className="text-sm font-semibold text-primary">₹{donor.totalDonated.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Volunteers ({mockData.volunteers.length})</h3>
                  <div className="space-y-3">
                    {mockData.volunteers.map((vol, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{vol.name}</p>
                          <p className="text-xs text-gray-500">{vol.skills.join(', ')}</p>
                        </div>
                        <span className="text-sm font-semibold text-primary">{vol.totalHours}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── TRANSACTIONS TAB ── */}
            {activeTab === 'transactions' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">All Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {['Transaction ID', 'Amount', 'Fee', 'Date', 'Status'].map(h => (
                          <th key={h} className="text-left py-2 px-2 font-semibold text-gray-500 text-xs uppercase tracking-wide">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.transactions.map((tx, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-3 px-2 font-medium text-gray-900">{tx._id}</td>
                          <td className="py-3 px-2 font-semibold">₹{tx.amount.toLocaleString()}</td>
                          <td className="py-3 px-2 text-gray-500">₹{tx.platformFee}</td>
                          <td className="py-3 px-2 text-gray-500">{tx.date}</td>
                          <td className="py-3 px-2">
                            <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{tx.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── REPORTS TAB ── */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                {['Financial Report', 'User Activity Report', 'NGO Performance Report', 'Document Audit Log'].map((report, i) => (
                  <div key={i} className="p-5 bg-white rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <h4 className="font-semibold text-gray-900 text-sm">{report}</h4>
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition text-sm font-medium">
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-20 space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Platform Settings</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Platform Fee</p>
                    <p className="font-bold text-gray-900">3–5%</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Total Earnings</p>
                    <p className="font-bold text-primary">₹{(platformEarnings / 1000).toFixed(0)}K</p>
                  </div>
                  <button className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition font-medium text-sm">
                    Edit Settings
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab('document-verification')}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium text-sm"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Verify NGO Documents
                    {pendingNGOs.length > 0 && (
                      <span className="ml-auto bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                        {pendingNGOs.length}
                      </span>
                    )}
                  </button>
                  <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium text-sm">
                    Send Notifications
                  </button>
                  <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium text-sm">
                    Export Data
                  </button>
                </div>
              </div>

              {/* Logout in sidebar too */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition font-medium text-sm"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Document Verification Modal ── */}
      {verifyTarget && (
        <DocumentVerificationModal
          ngo={verifyTarget}
          onClose={() => setVerifyTarget(null)}
          onVerdict={handleVerdict}
        />
      )}
    </div>
  )
}