import { useState } from 'react'
import {
    X, Heart, Building2, IndianRupee, ChevronRight, Check,
    Smartphone, Globe, CreditCard, Wallet, Copy, CheckCircle2,
    Download, ArrowLeft, Tag, FileText, Clock, Shield,
    RefreshCw, AlertCircle
} from 'lucide-react'
import { mockData } from '../../data/data'

// ─── Constants ────────────────────────────────────────────────────────────────
const NGO_CATEGORIES = [
    'All', 'Education', 'Healthcare', 'Environment',
    'Women Empowerment', 'Child Welfare', 'Disaster Relief', 'Rural Development',
]

const QUICK_AMOUNTS = [500, 1000, 2500, 5000, 10000]

const PAYMENT_METHODS = [
    {
        id: 'upi', label: 'UPI', icon: Smartphone,
        desc: 'Pay instantly via any UPI app',
        available: true,
        color: 'border-primary bg-primary/5 text-primary',
    },
    {
        id: 'netbanking', label: 'Net Banking', icon: Globe,
        desc: 'Coming soon', available: false,
        color: 'border-gray-200 bg-gray-50 text-gray-400',
    },
    {
        id: 'card', label: 'Credit / Debit Card', icon: CreditCard,
        desc: 'Coming soon', available: false,
        color: 'border-gray-200 bg-gray-50 text-gray-400',
    },
    {
        id: 'wallet', label: 'Wallet', icon: Wallet,
        desc: 'Coming soon', available: false,
        color: 'border-gray-200 bg-gray-50 text-gray-400',
    },
]

const UPI_APPS = [
    { name: 'GPay', color: 'bg-blue-500', short: 'G' },
    { name: 'PhonePe', color: 'bg-purple-600', short: 'P' },
    { name: 'Paytm', color: 'bg-sky-500', short: 'T' },
    { name: 'BHIM', color: 'bg-orange-500', short: 'B' },
]

const VASUDHA_UPI = 'vasudha@upi'   // demo UPI ID

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n) { return Number(n).toLocaleString('en-IN') }
function genRef() { return 'VSD' + Date.now().toString().slice(-8).toUpperCase() }
function genTxn() { return 'TXN' + Math.random().toString(36).slice(2, 10).toUpperCase() }

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepDots({ step, total }) {
    return (
        <div className="flex items-center justify-center gap-2 mb-6">
            {Array.from({ length: total }).map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i < step ? 'w-6 h-2 bg-primary' :
                        i === step ? 'w-6 h-2 bg-primary/60' :
                            'w-2 h-2 bg-gray-200'
                    }`} />
            ))}
        </div>
    )
}

// ─── STEP 1: Donation Form ────────────────────────────────────────────────────
function DonationForm({ form, setForm, onNext, errors, setErrors }) {
    const [catFilter, setCatFilter] = useState('All')

    const filteredNGOs = mockData.ngos.filter(n =>
        catFilter === 'All' || n.category === catFilter
    )

    const ch = (field, val) => {
        setForm(p => ({ ...p, [field]: val }))
        if (errors[field]) setErrors(p => ({ ...p, [field]: '' }))
    }

    const validate = () => {
        const e = {}
        if (!form.ngoId) e.ngoId = 'Please select an NGO'
        if (!form.amount || isNaN(form.amount) || +form.amount < 1)
            e.amount = 'Enter a valid amount'
        return e
    }

    const handleNext = () => {
        const e = validate()
        if (Object.keys(e).length) { setErrors(e); return }
        onNext()
    }

    const selectedNGO = mockData.ngos.find(n => n._id === form.ngoId)

    return (
        <div className="space-y-5">
            <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Make a Donation</h2>
                <p className="text-xs text-gray-400 mt-0.5">Your generosity creates real change</p>
            </div>

            {/* Category filter */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Filter by Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                    {NGO_CATEGORIES.map(cat => (
                        <button key={cat} type="button"
                            onClick={() => { setCatFilter(cat); ch('ngoId', '') }}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition ${catFilter === cat
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                }`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* NGO selector */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Select NGO <span className="text-red-400">*</span>
                </label>
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {filteredNGOs.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-4">No NGOs in this category</p>
                    ) : filteredNGOs.map(ngo => (
                        <button key={ngo._id} type="button"
                            onClick={() => ch('ngoId', ngo._id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition ${form.ngoId === ngo._id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}>
                            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-base font-bold text-primary flex-shrink-0">
                                {ngo.name.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{ngo.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-gray-400">{ngo.category}</span>
                                    {ngo.verified && (
                                        <span className="text-xs text-green-600 font-medium flex items-center gap-0.5">
                                            <CheckCircle2 className="w-3 h-3" /> Verified
                                        </span>
                                    )}
                                    <span className="text-xs text-yellow-500 font-medium">★ {ngo.rating}</span>
                                </div>
                            </div>
                            {form.ngoId === ngo._id && (
                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                            )}
                        </button>
                    ))}
                </div>
                {errors.ngoId && <p className="text-xs text-red-500 mt-1">{errors.ngoId}</p>}
            </div>

            {/* Quick amounts */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Amount (₹) <span className="text-red-400">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {QUICK_AMOUNTS.map(a => (
                        <button key={a} type="button"
                            onClick={() => ch('amount', a)}
                            className={`px-4 py-1.5 rounded-lg border text-sm font-semibold transition ${+form.amount === a
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                                }`}>
                            ₹{fmt(a)}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="number" value={form.amount}
                        onChange={e => ch('amount', e.target.value)}
                        placeholder="Or enter custom amount"
                        className={`w-full pl-9 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition ${errors.amount ? 'border-red-300' : 'border-gray-200'
                            }`} />
                </div>
                {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
            </div>

            {/* Donation type */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Donation Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {['one-time', 'monthly', 'annual'].map(t => (
                        <button key={t} type="button"
                            onClick={() => ch('type', t)}
                            className={`py-2 rounded-lg border text-xs font-semibold capitalize transition ${form.type === t
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
                                }`}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Note */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Note <span className="text-gray-300">(optional)</span>
                </label>
                <textarea value={form.note} onChange={e => ch('note', e.target.value)}
                    placeholder="Add a personal message for the NGO..."
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition" />
            </div>

            {/* Summary preview */}
            {selectedNGO && form.amount > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500">Donating to</p>
                        <p className="text-sm font-bold text-gray-900">{selectedNGO.name}</p>
                    </div>
                    <p className="text-2xl font-extrabold text-primary">₹{fmt(form.amount)}</p>
                </div>
            )}

            <button onClick={handleNext}
                className="w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition shadow-md flex items-center justify-center gap-2">
                Continue to Payment <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    )
}

// ─── STEP 2: Payment Method ───────────────────────────────────────────────────
function PaymentMethod({ form, setForm, onNext, onBack }) {
    const selectedNGO = mockData.ngos.find(n => n._id === form.ngoId)

    return (
        <div className="space-y-5">
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900">Choose Payment</h2>
                <p className="text-xs text-gray-400 mt-0.5">Select how you'd like to pay</p>
            </div>

            {/* Amount recap */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                    <p className="text-xs text-gray-400">Paying to</p>
                    <p className="text-sm font-bold text-gray-900">{selectedNGO?.name}</p>
                </div>
                <p className="text-2xl font-extrabold text-primary">₹{fmt(form.amount)}</p>
            </div>

            {/* Payment methods */}
            <div className="space-y-2">
                {PAYMENT_METHODS.map(pm => {
                    const Icon = pm.icon
                    return (
                        <button key={pm.id} type="button"
                            disabled={!pm.available}
                            onClick={() => pm.available && setForm(p => ({ ...p, paymentMethod: pm.id }))}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 transition text-left ${!pm.available
                                    ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                                    : form.paymentMethod === pm.id
                                        ? pm.color + ' border-2'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${pm.available ? 'bg-primary/10' : 'bg-gray-100'
                                }`}>
                                <Icon className={`w-5 h-5 ${pm.available ? 'text-primary' : 'text-gray-300'}`} />
                            </div>
                            <div className="flex-1">
                                <p className={`text-sm font-bold ${pm.available ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {pm.label}
                                </p>
                                <p className="text-xs text-gray-400">{pm.desc}</p>
                            </div>
                            {!pm.available && (
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-semibold">
                                    Soon
                                </span>
                            )}
                            {pm.available && form.paymentMethod === pm.id && (
                                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                            )}
                        </button>
                    )
                })}
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                <Shield className="w-3.5 h-3.5" /> All transactions are secured & encrypted
            </div>

            <div className="flex gap-3">
                <button onClick={onBack}
                    className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={onNext} disabled={!form.paymentMethod}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    Proceed to Pay <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

// ─── STEP 3: UPI Payment ──────────────────────────────────────────────────────
function UPIPayment({ form, onNext, onBack }) {
    const [upiId, setUpiId] = useState('')
    const [selectedApp, setSelectedApp] = useState(null)
    const [copied, setCopied] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [verified, setVerified] = useState(false)
    const [upiError, setUpiError] = useState('')

    const copyUPI = () => {
        navigator.clipboard.writeText(VASUDHA_UPI)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleVerify = () => {
        if (!upiId.trim()) { setUpiError('Enter your UPI ID'); return }
        if (!upiId.includes('@')) { setUpiError('Enter a valid UPI ID (e.g. name@upi)'); return }
        setUpiError('')
        setVerifying(true)
        setTimeout(() => { setVerifying(false); setVerified(true) }, 1800)
    }

    return (
        <div className="space-y-5">
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900">Pay via UPI</h2>
                <p className="text-xs text-gray-400 mt-0.5">Use any UPI app to complete the payment</p>
            </div>

            {/* Amount */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl py-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Total Amount</p>
                <p className="text-3xl font-extrabold text-primary">₹{fmt(form.amount)}</p>
            </div>

            {/* Vasudha UPI ID */}
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Pay to UPI ID</p>
                <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <p className="flex-1 text-sm font-bold text-gray-800 font-mono">{VASUDHA_UPI}</p>
                    <button onClick={copyUPI}
                        className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition">
                        {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                    Open any UPI app → Send Money → Enter the UPI ID above → Enter amount ₹{fmt(form.amount)}
                </p>
            </div>

            {/* UPI Apps */}
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Quick launch</p>
                <div className="grid grid-cols-4 gap-2">
                    {UPI_APPS.map(app => (
                        <button key={app.name} type="button"
                            onClick={() => setSelectedApp(app.name)}
                            className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition ${selectedApp === app.name ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}>
                            <div className={`w-9 h-9 rounded-xl ${app.color} flex items-center justify-center text-white font-bold text-sm`}>
                                {app.short}
                            </div>
                            <span className="text-xs text-gray-600 font-medium">{app.name}</span>
                        </button>
                    ))}
                </div>
                {selectedApp && (
                    <p className="text-xs text-center text-gray-400 mt-2">
                        Opening {selectedApp} is a demo — in production this would deep-link to the app.
                    </p>
                )}
            </div>

            {/* UPI ID confirm */}
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Confirm your UPI ID (after paying)
                </p>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input value={upiId} onChange={e => { setUpiId(e.target.value); setUpiError(''); setVerified(false) }}
                            placeholder="yourname@upi"
                            className={`w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition ${upiError ? 'border-red-300' : verified ? 'border-green-400' : 'border-gray-200'
                                }`} />
                    </div>
                    <button onClick={handleVerify} disabled={verifying || verified}
                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition flex items-center gap-1.5 ${verified
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-primary text-white hover:bg-primary-dark'
                            } disabled:opacity-60`}>
                        {verifying
                            ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Checking</>
                            : verified
                                ? <><Check className="w-3.5 h-3.5" /> Verified</>
                                : 'Verify'
                        }
                    </button>
                </div>
                {upiError && <p className="text-xs text-red-500 mt-1">{upiError}</p>}
                {verified && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><Check className="w-3 h-3" /> UPI ID verified successfully</p>}
            </div>

            <div className="flex gap-3">
                <button onClick={onBack}
                    className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button onClick={onNext} disabled={!verified}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    I've Paid — Get Receipt <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

// ─── STEP 4: Receipt ──────────────────────────────────────────────────────────
function Receipt({ form, donor, onClose }) {
    const selectedNGO = mockData.ngos.find(n => n._id === form.ngoId)
    const ref = genRef()
    const txn = genTxn()
    const now = new Date()

    const downloadReceipt = () => {
        const html = `<!DOCTYPE html><html><head><title>Donation Receipt</title>
    <style>
      body{font-family:Arial,sans-serif;max-width:480px;margin:40px auto;color:#1a1a1a}
      .logo{font-size:22px;font-weight:900;color:#1F7F4A;margin-bottom:4px}
      .tag{font-size:11px;color:#6b7280;margin-bottom:24px}
      .hero{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;text-align:center;margin-bottom:20px}
      .amount{font-size:36px;font-weight:900;color:#1F7F4A}
      table{width:100%;border-collapse:collapse;font-size:13px}
      td{padding:10px 8px;border-bottom:1px solid #f3f4f6}
      td:first-child{color:#6b7280;width:45%}
      td:last-child{font-weight:700}
      .footer{text-align:center;margin-top:24px;font-size:11px;color:#9ca3af}
      .badge{display:inline-block;background:#dcfce7;color:#15803d;padding:3px 12px;border-radius:99px;font-size:11px;font-weight:700}
    </style></head><body>
    <div class="logo">VASUDHA</div>
    <div class="tag">Donation Receipt — Official</div>
    <div class="hero">
      <div style="font-size:13px;color:#6b7280;margin-bottom:4px">Total Donated</div>
      <div class="amount">₹${fmt(form.amount)}</div>
      <div style="margin-top:8px"><span class="badge">✓ Payment Confirmed</span></div>
    </div>
    <table>
      <tr><td>Receipt No.</td><td>${ref}</td></tr>
      <tr><td>Transaction ID</td><td>${txn}</td></tr>
      <tr><td>Date & Time</td><td>${now.toLocaleString('en-IN')}</td></tr>
      <tr><td>Donor Name</td><td>${donor?.name || 'Donor'}</td></tr>
      <tr><td>NGO</td><td>${selectedNGO?.name}</td></tr>
      <tr><td>Category</td><td>${selectedNGO?.category}</td></tr>
      <tr><td>Donation Type</td><td style="text-transform:capitalize">${form.type}</td></tr>
      <tr><td>Payment Mode</td><td>UPI</td></tr>
      ${form.note ? `<tr><td>Note</td><td>${form.note}</td></tr>` : ''}
    </table>
    <div class="footer">This is a system-generated receipt. For 80G certificate, contact the NGO directly.<br/>Generated on ${now.toLocaleString('en-IN')} · VASUDHA Platform</div>
    </body></html>`
        const win = window.open('', '_blank')
        win.document.write(html)
        win.document.close()
        setTimeout(() => win.print(), 400)
    }

    return (
        <div className="space-y-5">
            {/* Success hero */}
            <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-9 h-9 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Donation Successful!</h2>
                <p className="text-xs text-gray-400 mt-1">Thank you for making a difference ❤️</p>
            </div>

            {/* Amount */}
            <div className="bg-green-50 border border-green-200 rounded-xl py-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Amount Donated</p>
                <p className="text-3xl font-extrabold text-green-700">₹{fmt(form.amount)}</p>
                <p className="text-sm text-gray-600 mt-1 font-medium">{selectedNGO?.name}</p>
            </div>

            {/* Receipt details */}
            <div className="border border-gray-100 rounded-xl overflow-hidden">
                {[
                    { label: 'Receipt No.', value: ref, mono: true },
                    { label: 'Transaction ID', value: txn, mono: true },
                    { label: 'Date & Time', value: now.toLocaleString('en-IN') },
                    { label: 'Donor', value: donor?.name || 'Donor' },
                    { label: 'NGO', value: selectedNGO?.name },
                    { label: 'Type', value: <span className="capitalize">{form.type}</span> },
                    { label: 'Payment Mode', value: 'UPI' },
                    { label: 'Status', value: <span className="text-green-600 font-bold">✓ Confirmed</span> },
                ].map((row, i) => (
                    <div key={i} className={`flex items-center justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                        <span className="text-gray-400">{row.label}</span>
                        <span className={`font-semibold text-gray-800 ${row.mono ? 'font-mono text-xs' : ''}`}>{row.value}</span>
                    </div>
                ))}
            </div>

            {/* 80G note */}
            <div className="flex items-start gap-2.5 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-800">
                    For your <strong>80G tax exemption certificate</strong>, contact{' '}
                    <strong>{selectedNGO?.name}</strong> directly with this receipt number.
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button onClick={downloadReceipt}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-primary text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-white transition">
                    <Download className="w-4 h-4" /> Download Receipt
                </button>
                <button onClick={onClose}
                    className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-dark transition shadow-md">
                    Done
                </button>
            </div>
        </div>
    )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
const INIT_FORM = {
    ngoId: '', amount: '', type: 'one-time',
    note: '', paymentMethod: 'upi',
}

export default function NewDonationModal({ isOpen, onClose, donor }) {
    const [step, setStep] = useState(0)
    const [form, setForm] = useState(INIT_FORM)
    const [errors, setErrors] = useState({})

    if (!isOpen) return null

    const handleClose = () => {
        setStep(0); setForm(INIT_FORM); setErrors({}); onClose()
    }

    const STEPS = ['Details', 'Payment', 'UPI Pay', 'Receipt']
    const totalSteps = 4

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={step < 3 ? handleClose : undefined} />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 max-h-[92vh] flex flex-col overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                            <Heart className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-gray-900 text-sm">New Donation</span>
                    </div>
                    {step < 3 && (
                        <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Step dots */}
                <div className="px-6 pt-4 flex-shrink-0">
                    <StepDots step={step} total={totalSteps} />
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {step === 0 && (
                        <DonationForm form={form} setForm={setForm} errors={errors} setErrors={setErrors}
                            onNext={() => setStep(1)} />
                    )}
                    {step === 1 && (
                        <PaymentMethod form={form} setForm={setForm}
                            onNext={() => setStep(2)} onBack={() => setStep(0)} />
                    )}
                    {step === 2 && (
                        <UPIPayment form={form}
                            onNext={() => setStep(3)} onBack={() => setStep(1)} />
                    )}
                    {step === 3 && (
                        <Receipt form={form} donor={donor} onClose={handleClose} />
                    )}
                </div>
            </div>
        </div>
    )
}