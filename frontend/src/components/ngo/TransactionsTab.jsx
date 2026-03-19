import { useState, useMemo } from 'react'
import {
    ArrowDownCircle, ArrowUpCircle, Plus, Download, X,
    Search, Filter, ChevronDown, Building2, Calendar,
    CreditCard, User, FileText, DollarSign, Hash
} from 'lucide-react'

// ─── Static mock transactions ────────────────────────────────────────────────
const MOCK_TRANSACTIONS = [
    { id: 'TXN001', type: 'credit', amount: 50000, date: '2026-02-20', donor: 'Rajesh Kumar', bank: 'HDFC Bank', accountNo: 'XXXX4521', ifsc: 'HDFC0001234', transactionRef: 'NEFT2024022001', mode: 'NEFT', note: 'Annual donation', category: 'Donation' },
    { id: 'TXN002', type: 'debit', amount: 12000, date: '2026-02-18', donor: 'Field Programs Team', bank: 'SBI', accountNo: 'XXXX8823', ifsc: 'SBIN0001234', transactionRef: 'EXP2024021801', mode: 'UPI', note: 'Community health camp expenses', category: 'Field Programs' },
    { id: 'TXN003', type: 'credit', amount: 25000, date: '2026-02-15', donor: 'Priya Sharma', bank: 'ICICI Bank', accountNo: 'XXXX3310', ifsc: 'ICIC0001234', transactionRef: 'IMPS2024021501', mode: 'IMPS', note: 'Monthly donation', category: 'Donation' },
    { id: 'TXN004', type: 'debit', amount: 8500, date: '2026-02-12', donor: 'Admin Office', bank: 'Axis Bank', accountNo: 'XXXX9901', ifsc: 'UTIB0001234', transactionRef: 'EXP2024021201', mode: 'NEFT', note: 'Office supplies & stationery', category: 'Operations & Admin' },
    { id: 'TXN005', type: 'credit', amount: 100000, date: '2026-02-10', donor: 'Tata Trusts', bank: 'Kotak Bank', accountNo: 'XXXX5522', ifsc: 'KKBK0001234', transactionRef: 'RTGS2024021001', mode: 'RTGS', note: 'Project grant Q1', category: 'Grant' },
    { id: 'TXN006', type: 'debit', amount: 30000, date: '2026-02-08', donor: 'HR Dept', bank: 'SBI', accountNo: 'XXXX8823', ifsc: 'SBIN0001234', transactionRef: 'EXP2024020801', mode: 'NEFT', note: 'Staff salaries Feb 2024', category: 'Salaries & Stipends' },
    { id: 'TXN007', type: 'credit', amount: 15000, date: '2026-02-05', donor: 'Anita Desai', bank: 'PNB', accountNo: 'XXXX7712', ifsc: 'PUNB0001234', transactionRef: 'UPI2024020501', mode: 'UPI', note: 'Event sponsorship', category: 'Donation' },
    { id: 'TXN008', type: 'debit', amount: 20000, date: '2026-02-02', donor: 'Procurement', bank: 'HDFC Bank', accountNo: 'XXXX4521', ifsc: 'HDFC0001234', transactionRef: 'EXP2024020201', mode: 'Cheque', note: 'Medical equipment for camp', category: 'Equipment & Supplies' },
]

const EXPENSE_CATEGORIES = ['Operations & Admin', 'Field Programs', 'Salaries & Stipends', 'Equipment & Supplies']
const PAYMENT_MODES = ['NEFT', 'RTGS', 'IMPS', 'UPI', 'Cheque', 'Cash']

const INIT_EXPENSE = {
    date: '', amount: '', category: '', bank: '', accountNo: '',
    ifsc: '', transactionRef: '', mode: 'NEFT', receiver: '', note: '',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmt(n) { return Number(n).toLocaleString('en-IN') }
function fmtDate(d) {
    if (!d) return ''
    const dt = new Date(d)
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

// ─── Add Expense Modal ────────────────────────────────────────────────────────
function AddExpenseModal({ isOpen, onClose, onSave }) {
    const [form, setForm] = useState(INIT_EXPENSE)
    const [errors, setErrors] = useState({})

    if (!isOpen) return null

    const ch = (e) => { setForm(p => ({ ...p, [e.target.name]: e.target.value })); setErrors(p => ({ ...p, [e.target.name]: '' })) }

    const validate = () => {
        const e = {}
        if (!form.date) e.date = 'Required'
        if (!form.amount || isNaN(form.amount) || +form.amount <= 0) e.amount = 'Valid amount required'
        if (!form.category) e.category = 'Required'
        if (!form.receiver.trim()) e.receiver = 'Required'
        return e
    }

    const handleSave = () => {
        const e = validate()
        if (Object.keys(e).length) { setErrors(e); return }
        onSave({
            ...form, id: 'TXN' + Date.now(), type: 'debit',
            amount: parseFloat(form.amount), donor: form.receiver,
        })
        setForm(INIT_EXPENSE); setErrors({}); onClose()
    }

    const fields = [
        { label: 'Date', name: 'date', type: 'date', col: 1 },
        { label: 'Amount (₹)', name: 'amount', type: 'number', placeholder: '0.00', col: 1 },
        { label: 'Category', name: 'category', type: 'select', options: EXPENSE_CATEGORIES, col: 1 },
        { label: 'Payment Mode', name: 'mode', type: 'select', options: PAYMENT_MODES, col: 1 },
        { label: 'Receiver / Paid To', name: 'receiver', type: 'text', placeholder: 'Name or Vendor', col: 2 },
        { label: 'Transaction Ref #', name: 'transactionRef', type: 'text', placeholder: 'e.g. NEFT2024...', col: 1 },
        { label: 'Bank Name', name: 'bank', type: 'text', placeholder: 'e.g. SBI', col: 1 },
        { label: 'Account No.', name: 'accountNo', type: 'text', placeholder: 'XXXX1234', col: 1 },
        { label: 'IFSC Code', name: 'ifsc', type: 'text', placeholder: 'e.g. SBIN0001234', col: 1 },
        { label: 'Note / Description', name: 'note', type: 'textarea', placeholder: 'Purpose of expense...', col: 2 },
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <ArrowUpCircle className="w-5 h-5 text-red-500" /> Log Expense
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">Record a debit / outgoing transaction</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
                </div>
                <div className="px-6 py-5 grid grid-cols-2 gap-4">
                    {fields.map(f => (
                        <div key={f.name} className={f.col === 2 ? 'col-span-2' : ''}>
                            <label className="block text-xs font-medium text-gray-500 mb-1">{f.label}</label>
                            {f.type === 'select' ? (
                                <select name={f.name} value={form[f.name]} onChange={ch}
                                    className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors[f.name] ? 'border-red-400' : 'border-gray-300'}`}>
                                    <option value="">Select...</option>
                                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                            ) : f.type === 'textarea' ? (
                                <textarea name={f.name} value={form[f.name]} onChange={ch} rows={2} placeholder={f.placeholder}
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" />
                            ) : (
                                <input type={f.type} name={f.name} value={form[f.name]} onChange={ch} placeholder={f.placeholder}
                                    className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${errors[f.name] ? 'border-red-400' : 'border-gray-300'}`} />
                            )}
                            {errors[f.name] && <p className="text-xs text-red-500 mt-0.5">{errors[f.name]}</p>}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <button onClick={onClose} className="px-5 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">Cancel</button>
                    <button onClick={handleSave} className="px-6 py-2 text-sm bg-red-500 border border-gray-300 rounded-lg hover:bg-red-600 transition font-semibold">Save Expense</button>
                </div>
            </div>
        </div>
    )
}

// ─── Transaction Detail Modal ─────────────────────────────────────────────────
function TransactionDetailModal({ tx, onClose }) {
    if (!tx) return null

    const isCredit = tx.type === 'credit'

    const downloadPDF = () => {
        // Build a printable HTML receipt and trigger browser print-to-PDF
        const html = `
      <!DOCTYPE html><html><head><title>Receipt ${tx.id}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 520px; margin: 40px auto; color: #1a1a1a; }
        .header { text-align:center; border-bottom: 2px solid #e5e7eb; padding-bottom:16px; margin-bottom:20px; }
        .badge { display:inline-block; padding:4px 14px; border-radius:99px; font-size:12px; font-weight:700;
          background:${isCredit ? '#dcfce7' : '#fee2e2'}; color:${isCredit ? '#15803d' : '#b91c1c'}; }
        .amount { font-size:32px; font-weight:800; color:${isCredit ? '#15803d' : '#b91c1c'}; text-align:center; margin:12px 0; }
        table { width:100%; border-collapse:collapse; margin-top:16px; }
        td { padding:10px 8px; border-bottom:1px solid #f3f4f6; font-size:13px; }
        td:first-child { color:#6b7280; width:45%; }
        td:last-child { font-weight:600; }
        .footer { text-align:center; margin-top:24px; font-size:11px; color:#9ca3af; }
      </style></head><body>
      <div class="header">
        <h2 style="margin:0 0 6px">Transaction Receipt</h2>
        <span class="badge">${isCredit ? 'CREDIT' : 'DEBIT'}</span>
      </div>
      <div class="amount">${isCredit ? '+' : '-'} ₹${fmt(tx.amount)}</div>
      <table>
        <tr><td>Transaction ID</td><td>${tx.id}</td></tr>
        <tr><td>Date</td><td>${fmtDate(tx.date)}</td></tr>
        <tr><td>${isCredit ? 'Donor / From' : 'Paid To / Receiver'}</td><td>${tx.donor}</td></tr>
        <tr><td>Category</td><td>${tx.category}</td></tr>
        <tr><td>Payment Mode</td><td>${tx.mode}</td></tr>
        <tr><td>Reference #</td><td>${tx.transactionRef || 'N/A'}</td></tr>
        <tr><td>Bank</td><td>${tx.bank || 'N/A'}</td></tr>
        <tr><td>Account No.</td><td>${tx.accountNo || 'N/A'}</td></tr>
        <tr><td>IFSC Code</td><td>${tx.ifsc || 'N/A'}</td></tr>
        <tr><td>Note</td><td>${tx.note || '—'}</td></tr>
      </table>
      <div class="footer">Generated on ${new Date().toLocaleString('en-IN')} · This is a system-generated receipt.</div>
      </body></html>
    `
        const win = window.open('', '_blank')
        win.document.write(html)
        win.document.close()
        win.focus()
        setTimeout(() => { win.print() }, 400)
    }

    const rows = [
        { icon: Hash, label: 'Transaction ID', value: tx.id },
        { icon: Calendar, label: 'Date', value: fmtDate(tx.date) },
        { icon: User, label: isCredit ? 'Donor / From' : 'Paid To', value: tx.donor },
        { icon: Filter, label: 'Category', value: tx.category },
        { icon: CreditCard, label: 'Payment Mode', value: tx.mode },
        { icon: FileText, label: 'Reference #', value: tx.transactionRef || 'N/A' },
        { icon: Building2, label: 'Bank', value: tx.bank || 'N/A' },
        { icon: Hash, label: 'Account No.', value: tx.accountNo || 'N/A' },
        { icon: Hash, label: 'IFSC Code', value: tx.ifsc || 'N/A' },
        { icon: FileText, label: 'Note', value: tx.note || '—' },
    ]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Transaction Details</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><X className="w-4 h-4" /></button>
                </div>

                {/* Amount hero */}
                <div className={`mx-6 mt-5 rounded-xl p-5 flex items-center justify-between ${isCredit ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <div>
                        <span className={`text-xs font-bold uppercase tracking-widest ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
                            {isCredit ? '▲ Credit' : '▼ Debit'}
                        </span>
                        <p className={`text-3xl font-extrabold mt-1 ${isCredit ? 'text-green-700' : 'text-red-700'}`}>
                            {isCredit ? '+' : '-'} ₹{fmt(tx.amount)}
                        </p>
                    </div>
                    {isCredit
                        ? <ArrowDownCircle className="w-10 h-10 text-green-400" />
                        : <ArrowUpCircle className="w-10 h-10 text-red-400" />
                    }
                </div>

                {/* Detail rows */}
                <div className="px-6 py-4 space-y-0">
                    {rows.map((r, i) => (
                        <div key={i} className={`flex items-start gap-3 py-3 ${i < rows.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <r.icon className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 flex justify-between items-start gap-2">
                                <span className="text-sm text-gray-400">{r.label}</span>
                                <span className="text-sm font-semibold text-gray-800 text-right">{r.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
                    <button onClick={onClose} className="px-5 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition">Close</button>
                    <button onClick={downloadPDF} className="flex items-center gap-2 px-5 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold">
                        <Download className="w-4 h-4" /> Download Receipt
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TransactionsTab({ ngo }) {
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS)
    const [showExpenseModal, setShowExpenseModal] = useState(false)
    const [selectedTx, setSelectedTx] = useState(null)
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState('all')

    const filtered = useMemo(() => {
        return transactions.filter(tx => {
            if (typeFilter !== 'all' && tx.type !== typeFilter) return false
            if (dateFrom && tx.date < dateFrom) return false
            if (dateTo && tx.date > dateTo) return false
            if (search && !tx.donor.toLowerCase().includes(search.toLowerCase()) &&
                !tx.id.toLowerCase().includes(search.toLowerCase()) &&
                !tx.category.toLowerCase().includes(search.toLowerCase())) return false
            return true
        }).sort((a, b) => new Date(b.date) - new Date(a.date))
    }, [transactions, typeFilter, dateFrom, dateTo, search])

    const totalCredit = filtered.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0)
    const totalDebit = filtered.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0)
    const balance = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0)
        - transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0)

    const handleAddExpense = (data) => setTransactions(p => [data, ...p])

    const downloadExcel = () => {
        // Build CSV (no external lib needed for basic export)
        const headers = ['ID', 'Date', 'Type', 'Amount', 'Category', 'Donor/Receiver', 'Bank', 'Account No', 'IFSC', 'Mode', 'Reference', 'Note']
        const rows = filtered.map(t => [
            t.id, t.date, t.type.toUpperCase(), t.amount, t.category,
            t.donor, t.bank, t.accountNo, t.ifsc, t.mode, t.transactionRef, t.note
        ])
        const csv = [headers, ...rows].map(r => r.map(c => `"${c || ''}"`).join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a'); a.href = url
        a.download = `transactions_${dateFrom || 'all'}_to_${dateTo || 'all'}.csv`
        a.click(); URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-5">
            {/* Fund Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Fund Available', value: `₹${fmt(balance)}`, color: 'text-gray-900', bg: 'bg-white', border: 'border-2 border-primary/30' },
                    { label: `Credits (filtered)`, value: `+₹${fmt(totalCredit)}`, color: 'text-green-700', bg: 'bg-green-50', border: 'border border-green-200' },
                    { label: `Debits (filtered)`, value: `-₹${fmt(totalDebit)}`, color: 'text-red-700', bg: 'bg-red-50', border: 'border border-red-200' },
                ].map((c, i) => (
                    <div key={i} className={`${c.bg} ${c.border} rounded-xl p-4`}>
                        <p className="text-xs text-gray-500 font-medium">{c.label}</p>
                        <p className={`text-xl font-extrabold mt-1 ${c.color}`}>{c.value}</p>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Search */}
                    <div className="flex items-center gap-2 flex-1 min-w-[180px] border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search donor, ID, category..."
                            className="bg-transparent text-sm outline-none w-full text-gray-700" />
                    </div>

                    {/* Type filter */}
                    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                        {['all', 'credit', 'debit'].map(t => (
                            <button key={t} onClick={() => setTypeFilter(t)}
                                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition capitalize ${typeFilter === t ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                    }`}>{t}</button>
                        ))}
                    </div>

                    {/* Date range */}
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                        <span className="text-gray-400 text-sm">to</span>
                        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>

                    {/* Actions */}
                    <button onClick={downloadExcel}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <button onClick={() => setShowExpenseModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-red-600 transition shadow-sm">
                        <Plus className="w-4 h-4" /> Log Expense
                    </button>
                </div>
            </div>

            {/* Transaction List */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900 text-sm">
                        Transactions <span className="text-gray-400 font-normal">({filtered.length})</span>
                    </h3>
                </div>

                {filtered.length === 0 ? (
                    <div className="py-16 text-center text-gray-400 text-sm">No transactions found for the selected filters.</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filtered.map((tx) => (
                            <button key={tx.id} onClick={() => setSelectedTx(tx)}
                                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition text-left group">
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                                    }`}>
                                    {tx.type === 'credit'
                                        ? <ArrowDownCircle className="w-5 h-5 text-green-600" />
                                        : <ArrowUpCircle className="w-5 h-5 text-red-600" />
                                    }
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-900 text-sm truncate">{tx.donor}</p>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">{tx.category}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <p className="text-xs text-gray-400">{fmtDate(tx.date)}</p>
                                        <p className="text-xs text-gray-300">·</p>
                                        <p className="text-xs text-gray-400">{tx.id}</p>
                                        <p className="text-xs text-gray-300">·</p>
                                        <p className="text-xs text-gray-400">{tx.mode}</p>
                                    </div>
                                </div>
                                {/* Amount */}
                                <div className="text-right flex-shrink-0">
                                    <p className={`font-bold text-base ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                        {tx.type === 'credit' ? '+' : '-'} ₹{fmt(tx.amount)}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5 group-hover:text-primary transition">View details →</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            <AddExpenseModal isOpen={showExpenseModal} onClose={() => setShowExpenseModal(false)} onSave={handleAddExpense} />
            <TransactionDetailModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
        </div>
    )
}