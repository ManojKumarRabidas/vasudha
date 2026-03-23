/*import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import DonorNav from '../../components/donor/Nav'
import DonorStats from '../../components/donor/Stats'
import ActivityFeed from '../../components/common/ActivityFeed'
import NewDonationModal from '../../components/donor/NewDonationModal'
import { mockData } from '../../data/data'
import { LogOut, Plus } from 'lucide-react'

export default function DonorDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('feed')
  const [ngoFollowing, setNgoFollowing] = useState([])
  const [donations, setDonations] = useState([])
  const [showDonationModal, setShowDonationModal] = useState(false)

  useEffect(() => {
    // Load donor data
    if (user) {
      const donor = mockData.donors[0]
      setDonations(donor.donations)
      setNgoFollowing(donor.donations.map(d => mockData.ngos.find(n => n._id === d.ngoId)))
    }
  }, [user])

  if (!user) return null

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DonorNav user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
            <p className="text-gray-600">Donor Dashboard</p>
          </div>
          {/* <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
            <Plus className="w-5 h-5" />
            New Donation
          </button> *//*}
          <button
            onClick={() => setShowDonationModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            <Plus className="w-5 h-5" /> New Donation
          </button>
        </div>

        {/* Stats *//*}
        <DonorStats donations={donations} />

        {/* Tabs *//*}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {['feed', 'my-donations', 'sdp', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 font-medium border-b-2 transition ${activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              {tab === 'feed' && 'NGO Feed'}
              {tab === 'my-donations' && 'My Donations'}
              {tab === 'sdp' && 'SDP Plans'}
              {tab === 'notifications' && 'Notifications'}
            </button>
          ))}
        </div>

        {/* Content *//*}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'feed' && <ActivityFeed ngos={mockData.ngos} />}

            {activeTab === 'my-donations' && (
              <div className="space-y-4">
                {donations.map((donation, i) => (
                  <div key={i} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {mockData.ngos.find(n => n._id === donation.ngoId)?.name}
                        </h3>
                        <p className="text-sm text-gray-600">{new Date(donation.date).toLocaleDateString()}</p>
                      </div>
                      <span className="text-2xl font-bold text-primary">₹{donation.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-600 capitalize">{donation.type.replace('-', ' ')}</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Completed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'sdp' && (
              <div className="p-8 bg-white rounded-lg text-center border border-gray-200">
                <p className="text-gray-600 mb-4">No active SDP plans yet</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                  Create SDP Plan
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-white rounded-lg shadow-sm border border-blue-100 bg-blue-50">
                    <p className="font-medium text-gray-900">NGO Activity Update</p>
                    <p className="text-sm text-gray-600 mt-1">An NGO you follow has posted new activity</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - NGOs You Follow *//*}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">NGOs You Follow</h3>
              <div className="space-y-4">
                {ngoFollowing.slice(0, 3).map((ngo, i) => (
                  <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                    <p className="font-medium text-gray-900 text-sm">{ngo?.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{ngo?.category}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-xs font-medium text-yellow-600">★ {ngo?.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition text-sm font-medium">
                View All NGOs
              </button>
            </div>
          </div>
        </div>
      </main>

      <NewDonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
        donor={mockData.donors[0]}
      />
    </div>
  )
}*/

import { useState, useEffect, useRef } from 'react'
import {
    X, Heart, IndianRupee, ChevronRight, Check,
    Smartphone, Globe, CreditCard, Wallet, Copy, CheckCircle2,
    Download, ArrowLeft, FileText, Shield,
    RefreshCw, AlertCircle, Bell, Settings, User, Search,
    MapPin, Filter, Star, Eye, EyeOff,
    Mail, Phone, Lock, LogOut, Edit3, Camera, Trash2,
    Moon, Volume2, VolumeX,
    Building2, TrendingUp, Award, Zap,
    CheckSquare, XCircle, Info, Gift, Calendar,
    ExternalLink, BadgeCheck, Home, MoreVertical,
    ChevronDown, SlidersHorizontal, ArrowUpRight,
    RotateCcw, Send, KeyRound, Sparkles
} from 'lucide-react'

// ─── CSS (inject once) ────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');
  :root {
    --primary: #1a6b3a;
    --primary-light: #22873e;
    --primary-dark: #155230;
    --accent: #f0a500;
    --surface: #f7f9f7;
    --card: #ffffff;
    --border: #e8ede9;
    --text: #1a2b1e;
    --muted: #6b7f70;
  }
  * { box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: var(--surface); color: var(--text); }
  .font-display { font-family: 'DM Serif Display', serif; }
  .bg-primary { background-color: var(--primary) !important; }
  .bg-primary-light { background-color: var(--primary-light) !important; }
  .text-primary { color: var(--primary) !important; }
  .border-primary { border-color: var(--primary) !important; }
  .ring-primary { --tw-ring-color: var(--primary); }
  .focus\\:ring-primary\\/20:focus { --tw-ring-color: rgba(26,107,58,0.2); }
  .hover\\:bg-primary-dark:hover { background-color: var(--primary-dark) !important; }
  .bg-primary\\/5 { background-color: rgba(26,107,58,0.05) !important; }
  .bg-primary\\/10 { background-color: rgba(26,107,58,0.1) !important; }
  .bg-primary\\/20 { background-color: rgba(26,107,58,0.2) !important; }
  .border-primary\\/20 { border-color: rgba(26,107,58,0.2) !important; }
  .text-primary\\/60 { color: rgba(26,107,58,0.6) !important; }
  .fade-in { animation: fadeIn 0.35s ease both; }
  .slide-up { animation: slideUp 0.4s cubic-bezier(.16,1,.3,1) both; }
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  @keyframes slideUp { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform:rotate(360deg) } }
  .pulse-dot { animation: pulseDot 2s ease infinite; }
  @keyframes pulseDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.8)} }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; }
  .input-base { width:100%; border: 1.5px solid var(--border); border-radius: 12px; padding: 11px 14px 11px 40px; font-size: 14px; background: white; outline: none; transition: border-color .2s, box-shadow .2s; font-family: 'DM Sans', sans-serif; }
  .input-base:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(26,107,58,0.1); }
  .input-error { border-color: #ef4444 !important; }
  .btn-primary { background: var(--primary); color: white; border: none; border-radius: 12px; padding: 13px 20px; font-size: 14px; font-weight: 700; cursor: pointer; transition: background .2s, transform .1s, box-shadow .2s; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 2px 12px rgba(26,107,58,0.3); }
  .btn-primary:hover { background: var(--primary-dark); box-shadow: 0 4px 20px rgba(26,107,58,0.4); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .btn-outline { background: white; color: var(--primary); border: 2px solid var(--primary); border-radius: 12px; padding: 11px 20px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .btn-outline:hover { background: var(--primary); color: white; }
  .btn-ghost { background: transparent; color: var(--muted); border: 1.5px solid var(--border); border-radius: 12px; padding: 11px 18px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .btn-ghost:hover { background: var(--surface); border-color: #cdd7ce; }
  .tab-active { background: var(--primary); color: white; border-radius: 8px; }
  .tab-inactive { color: var(--muted); }
  .badge-green { background:#dcfce7; color:#15803d; padding:3px 10px; border-radius:99px; font-size:11px; font-weight:700; }
  .badge-yellow { background:#fef9c3; color:#a16207; padding:3px 10px; border-radius:99px; font-size:11px; font-weight:700; }
  .badge-red { background:#fee2e2; color:#b91c1c; padding:3px 10px; border-radius:99px; font-size:11px; font-weight:700; }
  .badge-blue { background:#dbeafe; color:#1d4ed8; padding:3px 10px; border-radius:99px; font-size:11px; font-weight:700; }
  .badge-gray { background:#f1f5f1; color:#4b5563; padding:3px 10px; border-radius:99px; font-size:11px; font-weight:700; }
  .nav-item { display:flex; align-items:center; gap:8px; padding:9px 14px; border-radius:10px; cursor:pointer; transition:all .18s; font-size:14px; font-weight:600; color:var(--muted); border:none; background:transparent; font-family:'DM Sans',sans-serif; width:100%; }
  .nav-item:hover { background:rgba(26,107,58,0.07); color:var(--primary); }
  .nav-item.active { background:rgba(26,107,58,0.12); color:var(--primary); }
  .progress-bar { height:6px; background:#e5e7eb; border-radius:99px; overflow:hidden; }
  .progress-fill { height:100%; background:var(--primary); border-radius:99px; transition:width 0.8s cubic-bezier(.16,1,.3,1); }
  .modal-overlay { position:fixed; inset:0; z-index:50; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.5); backdrop-filter:blur(4px); }
  .modal-box { background:white; border-radius:24px; box-shadow:0 25px 60px rgba(0,0,0,0.18); width:100%; max-width:480px; margin:16px; max-height:92vh; display:flex; flex-direction:column; overflow:hidden; }
  .google-btn { display:flex; align-items:center; justify-content:center; gap:10px; width:100%; padding:12px; border:1.5px solid var(--border); border-radius:12px; background:white; cursor:pointer; font-size:14px; font-weight:600; color:var(--text); transition:all .2s; font-family:'DM Sans',sans-serif; }
  .google-btn:hover { border-color:#aaa; box-shadow:0 2px 8px rgba(0,0,0,0.08); }
  .otp-input { width:48px; height:52px; border:2px solid var(--border); border-radius:12px; text-align:center; font-size:20px; font-weight:700; color:var(--text); outline:none; transition:all .2s; font-family:'DM Sans',sans-serif; }
  .otp-input:focus { border-color:var(--primary); box-shadow:0 0 0 3px rgba(26,107,58,0.12); }
  .step-dot { border-radius:99px; transition:all .3s; }
  .notif-unread { background:#f0fdf4; border-left:3px solid var(--primary); }
  .setting-row { display:flex; align-items:center; justify-content:space-between; padding:14px 0; border-bottom:1px solid var(--border); }
  .setting-row:last-child { border-bottom:none; }
  .toggle-track { position:relative; width:44px; height:24px; background:#e5e7eb; border-radius:99px; cursor:pointer; transition:background .2s; border:none; }
  .toggle-track.on { background:var(--primary); }
  .toggle-thumb { position:absolute; top:2px; left:2px; width:20px; height:20px; background:white; border-radius:50%; box-shadow:0 1px 4px rgba(0,0,0,0.2); transition:transform .2s; }
  .toggle-track.on .toggle-thumb { transform:translateX(20px); }
  .ngo-card { background:white; border:1.5px solid var(--border); border-radius:16px; overflow:hidden; transition:all .2s; cursor:pointer; }
  .ngo-card:hover { border-color:var(--primary); box-shadow:0 4px 20px rgba(26,107,58,0.12); transform:translateY(-2px); }
  .donor-avatar { width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg,var(--primary),var(--primary-light)); display:flex; align-items:center; justify-content:center; font-size:28px; font-weight:700; color:white; font-family:'DM Serif Display',serif; }
  .stat-card { background:white; border:1.5px solid var(--border); border-radius:14px; padding:16px; text-align:center; }
  .history-row { display:flex; align-items:center; gap:14px; padding:14px 16px; border-bottom:1px solid var(--border); transition:background .15s; }
  .history-row:hover { background:#fafbfa; }
  .history-row:last-child { border-bottom:none; }
`

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const MOCK_NGOS = [
    { _id: '1', name: 'Asha Foundation', category: 'Education', location: 'Mumbai', verified: true, rating: 4.8, raised: 1250000, goal: 2000000, desc: 'Empowering children through quality education and skill development programs across rural Maharashtra.' },
    { _id: '2', name: 'Green Earth Trust', category: 'Environment', location: 'Bengaluru', verified: true, rating: 4.6, raised: 890000, goal: 1500000, desc: 'Planting 1 million trees and restoring natural habitats in degraded forest areas.' },
    { _id: '3', name: 'Mamta Welfare Society', category: 'Women Empowerment', location: 'Delhi', verified: true, rating: 4.7, raised: 560000, goal: 800000, desc: 'Providing skill training and microfinance to empower rural women toward financial independence.' },
    { _id: '4', name: 'Paws & Care India', category: 'Animal Welfare', location: 'Hyderabad', verified: false, rating: 4.4, raised: 320000, goal: 600000, desc: 'Rescuing, treating and rehoming stray animals across Hyderabad city.' },
    { _id: '5', name: 'Bal Vikas Kendra', category: 'Child Welfare', location: 'Kolkata', verified: true, rating: 4.9, raised: 1800000, goal: 2500000, desc: 'Rescuing child labourers and providing them shelter, nutrition and education.' },
    { _id: '6', name: 'Flood Relief Network', category: 'Disaster Relief', location: 'Chennai', verified: true, rating: 4.5, raised: 3200000, goal: 4000000, desc: 'Rapid response disaster relief with food, water and shelter for flood victims.' },
    { _id: '7', name: 'Grameen Pragati', category: 'Rural Development', location: 'Jaipur', verified: true, rating: 4.3, raised: 445000, goal: 1000000, desc: 'Building rural infrastructure and improving livelihoods in Rajasthan villages.' },
    { _id: '8', name: 'Arogya Health Trust', category: 'Healthcare', location: 'Pune', verified: true, rating: 4.7, raised: 2100000, goal: 3000000, desc: 'Free healthcare camps and mobile medical units for underserved communities.' },
]

const MOCK_DONOR = {
    name: 'Rahul Sharma', email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210', location: 'Mumbai, Maharashtra',
    joined: 'January 2023', totalDonated: 47500,
    donationCount: 12, ngoSupported: 5, rank: 'Silver Donor',
    bio: 'Passionate about creating a better world through small consistent acts of generosity.',
}

const MOCK_DONATIONS = [
    { id: 'D001', date: '2025-03-15', ngo: 'Asha Foundation', category: 'Education', amount: 5000, status: 'Completed', mode: 'UPI', txn: 'TXN8A3F2B1C', type: 'one-time' },
    { id: 'D002', date: '2025-02-28', ngo: 'Bal Vikas Kendra', category: 'Child Welfare', amount: 10000, status: 'Completed', mode: 'UPI', txn: 'TXN9D4E1A7B', type: 'monthly' },
    { id: 'D003', date: '2025-02-10', ngo: 'Green Earth Trust', category: 'Environment', amount: 2500, status: 'Completed', mode: 'UPI', txn: 'TXN2F5C8D3E', type: 'one-time' },
    { id: 'D004', date: '2025-01-20', ngo: 'Flood Relief Network', category: 'Disaster Relief', amount: 15000, status: 'Completed', mode: 'UPI', txn: 'TXN7B1A9F4C', type: 'one-time' },
    { id: 'D005', date: '2025-01-05', ngo: 'Paws & Care India', category: 'Animal Welfare', amount: 3000, status: 'Pending', mode: 'UPI', txn: 'TXN3C6D2E8A', type: 'one-time' },
    { id: 'D006', date: '2024-12-25', ngo: 'Arogya Health Trust', category: 'Healthcare', amount: 7500, status: 'Completed', mode: 'UPI', txn: 'TXN5E9B4F1D', type: 'annual' },
    { id: 'D007', date: '2024-12-01', ngo: 'Mamta Welfare Society', category: 'Women Empowerment', amount: 4500, status: 'Failed', mode: 'UPI', txn: 'TXN1A7C3B6E', type: 'one-time' },
]

const MOCK_NOTIFICATIONS = [
    { id: 1, type: 'donation', icon: CheckCircle2, iconColor: 'text-green-600', bg: 'bg-green-50', title: 'Donation Confirmed', message: 'Your ₹5,000 donation to Asha Foundation was received successfully.', time: '2 hours ago', read: false },
    { id: 2, type: 'ngo', icon: Building2, iconColor: 'text-blue-600', bg: 'bg-blue-50', title: 'NGO Update', message: 'Bal Vikas Kendra has published their Q1 2025 impact report — 340 children helped!', time: '1 day ago', read: false },
    { id: 3, type: 'volunteer', icon: Heart, iconColor: 'text-rose-600', bg: 'bg-rose-50', title: 'Volunteer Opportunity', message: 'Green Earth Tree Plantation Drive this Sunday in Bengaluru. 50 spots left.', time: '2 days ago', read: true },
    { id: 4, type: 'system', icon: Award, iconColor: 'text-yellow-600', bg: 'bg-yellow-50', title: 'Badge Earned! 🏅', message: 'You\'ve earned the "Consistent Donor" badge for 3 months of giving. Keep it up!', time: '3 days ago', read: true },
    { id: 5, type: 'donation', icon: Gift, iconColor: 'text-purple-600', bg: 'bg-purple-50', title: 'Tax Receipt Ready', message: '80G certificate for FY 2024–25 is ready. Download now for tax filing.', time: '5 days ago', read: true },
    { id: 6, type: 'ngo', icon: TrendingUp, iconColor: 'text-indigo-600', bg: 'bg-indigo-50', title: 'Campaign Milestone', message: 'Flood Relief Network has reached 80% of its fundraising goal!', time: '1 week ago', read: true },
]

const BADGES = [
    { icon: '🌱', label: 'First Donation', earned: true, desc: 'Made your first donation' },
    { icon: '🔥', label: 'Streak Keeper', earned: true, desc: '3 months consecutive' },
    { icon: '🏅', label: 'Consistent Donor', earned: true, desc: 'Donated 10+ times' },
    { icon: '🌟', label: 'Silver Donor', earned: true, desc: 'Donated ₹25,000+' },
    { icon: '👑', label: 'Gold Donor', earned: false, desc: 'Donate ₹1,00,000+' },
    { icon: '🦁', label: 'Champion', earned: false, desc: 'Support 10+ NGOs' },
]

const NGO_CATEGORIES = ['All', 'Education', 'Healthcare', 'Environment', 'Women Empowerment', 'Child Welfare', 'Disaster Relief', 'Rural Development', 'Animal Welfare']
const LOCATIONS = ['All Cities', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur']
const QUICK_AMOUNTS = [500, 1000, 2500, 5000, 10000]
const UPI_APPS = [
    { name: 'GPay', color: 'bg-blue-500', short: 'G' },
    { name: 'PhonePe', color: 'bg-purple-600', short: 'P' },
    { name: 'Paytm', color: 'bg-sky-500', short: 'T' },
    { name: 'BHIM', color: 'bg-orange-500', short: 'B' },
]
const VASUDHA_UPI = 'vasudha@upi'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n) => Number(n).toLocaleString('en-IN')
const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
const pct = (r, g) => Math.min(100, Math.round((r / g) * 100))
const genRef = () => 'VSD' + Date.now().toString().slice(-8).toUpperCase()
const genTxn = () => 'TXN' + Math.random().toString(36).slice(2, 10).toUpperCase()

// ─── Shared UI ────────────────────────────────────────────────────────────────
function Toggle({ on, onChange }) {
    return (
        <button className={`toggle-track ${on ? 'on' : ''}`} onClick={() => onChange(!on)}>
            <div className="toggle-thumb" />
        </button>
    )
}

function StepDots({ step, total }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
            {Array.from({ length: total }).map((_, i) => (
                <div key={i} className="step-dot" style={{
                    width: i <= step ? 24 : 8, height: 8,
                    background: i < step ? 'var(--primary)' : i === step ? 'rgba(26,107,58,0.5)' : '#e5e7eb'
                }} />
            ))}
        </div>
    )
}

function StatusBadge({ status }) {
    const map = { Completed: 'badge-green', Pending: 'badge-yellow', Failed: 'badge-red' }
    return <span className={map[status] || 'badge-gray'}>{status}</span>
}

function SectionCard({ title, children, action }) {
    return (
        <div className="card" style={{ padding: '20px', marginBottom: 16 }}>
            {(title || action) && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    {title && <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{title}</p>}
                    {action}
                </div>
            )}
            {children}
        </div>
    )
}

// ─── AUTH: Login / Forgot Password ────────────────────────────────────────────
function LoginPage({ onLogin, onForgot }) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [show, setShow] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const e = {}
        if (!email.trim() || !email.includes('@')) e.email = 'Enter a valid email'
        if (!pass.trim() || pass.length < 6) e.pass = 'Password must be 6+ characters'
        return e
    }

    const handleLogin = () => {
        const e = validate()
        if (Object.keys(e).length) { setErrors(e); return }
        setLoading(true)
        setTimeout(() => { setLoading(false); onLogin() }, 1600)
    }

    const handleGoogle = () => {
        setLoading(true)
        setTimeout(() => { setLoading(false); onLogin() }, 1200)
    }

    return (
        <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <div className="slide-up" style={{ width: '100%', maxWidth: 420 }}>
                {/* Brand */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ width: 56, height: 56, background: 'var(--primary)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                        <Heart size={28} color="white" />
                    </div>
                    <h1 className="font-display" style={{ fontSize: 30, fontWeight: 400, color: 'var(--text)', marginBottom: 4 }}>VASUDHA</h1>
                    <p style={{ fontSize: 13, color: 'var(--muted)' }}>Donor Portal — Sign in to continue</p>
                </div>

                <div className="card" style={{ padding: 28 }}>
                    {/* Google */}
                    <button className="google-btn" onClick={handleGoogle} style={{ marginBottom: 20 }}>
                        <svg width="18" height="18" viewBox="0 0 18 18">
                            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                        </svg>
                        Continue with Google
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                        <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>OR</span>
                        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: 14 }}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                            <input value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }}
                                placeholder="you@email.com" className={`input-base ${errors.email ? 'input-error' : ''}`} />
                        </div>
                        {errors.email && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 8 }}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                            <input value={pass} onChange={e => { setPass(e.target.value); setErrors(p => ({ ...p, pass: '' })) }}
                                type={show ? 'text' : 'password'}
                                placeholder="••••••••"
                                className={`input-base ${errors.pass ? 'input-error' : ''}`}
                                style={{ paddingRight: 42 }} />
                            <button onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                                {show ? <EyeOff size={16} color="#9ca3af" /> : <Eye size={16} color="#9ca3af" />}
                            </button>
                        </div>
                        {errors.pass && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.pass}</p>}
                    </div>

                    <div style={{ textAlign: 'right', marginBottom: 20 }}>
                        <button onClick={onForgot} style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                            Forgot password?
                        </button>
                    </div>

                    <button className="btn-primary" onClick={handleLogin} disabled={loading} style={{ width: '100%' }}>
                        {loading ? <><RefreshCw size={16} className="spin" /> Signing in…</> : <>Sign In <ChevronRight size={16} /></>}
                    </button>

                    <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 18 }}>
                        New here?{' '}
                        <button style={{ color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                            Create account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

// ─── AUTH: Forgot Password (Mobile + OTP) ─────────────────────────────────────
function ForgotPasswordPage({ onBack, onDone }) {
    const [step, setStep] = useState(0) // 0=phone, 1=otp, 2=newpass
    const [phone, setPhone] = useState('')
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [newPass, setNewPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [timer, setTimer] = useState(30)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const otpRefs = useRef([])

    useEffect(() => {
        if (step === 1 && timer > 0) {
            const t = setInterval(() => setTimer(p => p - 1), 1000)
            return () => clearInterval(t)
        }
    }, [step, timer])

    const handleSendOTP = () => {
        if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
            setErrors({ phone: 'Enter a valid 10-digit mobile number' }); return
        }
        setErrors({})
        setLoading(true)
        setTimeout(() => { setLoading(false); setStep(1); setTimer(30) }, 1500)
    }

    const handleOtpChange = (i, val) => {
        if (!/^\d?$/.test(val)) return
        const next = [...otp]
        next[i] = val
        setOtp(next)
        if (val && i < 5) otpRefs.current[i + 1]?.focus()
        if (!val && i > 0) otpRefs.current[i - 1]?.focus()
    }

    const handleVerifyOTP = () => {
        const code = otp.join('')
        if (code.length < 6) { setErrors({ otp: 'Enter the 6-digit OTP' }); return }
        setErrors({})
        setLoading(true)
        setTimeout(() => { setLoading(false); setStep(2) }, 1200)
    }

    const handleResetPass = () => {
        const e = {}
        if (newPass.length < 6) e.newPass = 'Minimum 6 characters'
        if (newPass !== confirmPass) e.confirmPass = 'Passwords do not match'
        if (Object.keys(e).length) { setErrors(e); return }
        setLoading(true)
        setTimeout(() => { setLoading(false); onDone() }, 1200)
    }

    const STEP_TITLES = ['Forgot Password', 'Enter OTP', 'New Password']
    const STEP_SUBS = ['Enter your registered mobile number', 'Check your SMS for the 6-digit code', 'Set a strong new password']

    return (
        <div style={{ minHeight: '100vh', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <div className="slide-up" style={{ width: '100%', maxWidth: 420 }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ width: 52, height: 52, background: 'var(--primary)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                        <KeyRound size={24} color="white" />
                    </div>
                    <h2 className="font-display" style={{ fontSize: 24, fontWeight: 400, color: 'var(--text)' }}>{STEP_TITLES[step]}</h2>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{STEP_SUBS[step]}</p>
                </div>

                <div className="card" style={{ padding: 28 }}>
                    <StepDots step={step} total={3} />

                    {/* Step 0: Phone */}
                    {step === 0 && (
                        <div>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mobile Number</label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                <input value={phone} onChange={e => { setPhone(e.target.value); setErrors({}) }}
                                    placeholder="+91 98765 43210"
                                    className={`input-base ${errors.phone ? 'input-error' : ''}`} />
                            </div>
                            {errors.phone && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.phone}</p>}
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '10px 14px', marginTop: 14, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <Info size={14} color="#15803d" style={{ marginTop: 1, flexShrink: 0 }} />
                                <p style={{ fontSize: 12, color: '#15803d' }}>An OTP will be sent to this number via SMS. Standard charges may apply.</p>
                            </div>
                            <button className="btn-primary" onClick={handleSendOTP} disabled={loading} style={{ width: '100%', marginTop: 20 }}>
                                {loading ? <><RefreshCw size={15} className="spin" /> Sending OTP…</> : <><Send size={15} /> Send OTP</>}
                            </button>
                        </div>
                    )}

                    {/* Step 1: OTP */}
                    {step === 1 && (
                        <div>
                            <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20, textAlign: 'center' }}>
                                Sent to <strong style={{ color: 'var(--text)' }}>{phone}</strong>
                            </p>
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
                                {otp.map((d, i) => (
                                    <input key={i} ref={el => otpRefs.current[i] = el}
                                        className="otp-input" value={d} maxLength={1}
                                        onChange={e => handleOtpChange(i, e.target.value)}
                                        onKeyDown={e => e.key === 'Backspace' && !d && i > 0 && otpRefs.current[i - 1]?.focus()}
                                    />
                                ))}
                            </div>
                            {errors.otp && <p style={{ fontSize: 11, color: '#ef4444', textAlign: 'center', marginBottom: 8 }}>{errors.otp}</p>}
                            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                                {timer > 0
                                    ? <p style={{ fontSize: 13, color: 'var(--muted)' }}>Resend OTP in <strong style={{ color: 'var(--primary)' }}>{timer}s</strong></p>
                                    : <button onClick={() => { setTimer(30); setOtp(['', '', '', '', '', '']) }} style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <RotateCcw size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />Resend OTP
                                    </button>
                                }
                            </div>
                            <button className="btn-primary" onClick={handleVerifyOTP} disabled={loading} style={{ width: '100%' }}>
                                {loading ? <><RefreshCw size={15} className="spin" /> Verifying…</> : <>Verify OTP <ChevronRight size={15} /></>}
                            </button>
                        </div>
                    )}

                    {/* Step 2: New Password */}
                    {step === 2 && (
                        <div>
                            <div style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input value={newPass} onChange={e => { setNewPass(e.target.value); setErrors(p => ({ ...p, newPass: '' })) }}
                                        type={showNew ? 'text' : 'password'} placeholder="Min. 6 characters"
                                        className={`input-base ${errors.newPass ? 'input-error' : ''}`} style={{ paddingRight: 42 }} />
                                    <button onClick={() => setShowNew(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        {showNew ? <EyeOff size={15} color="#9ca3af" /> : <Eye size={15} color="#9ca3af" />}
                                    </button>
                                </div>
                                {errors.newPass && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.newPass}</p>}
                            </div>
                            <div style={{ marginBottom: 20 }}>
                                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confirm Password</label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input value={confirmPass} onChange={e => { setConfirmPass(e.target.value); setErrors(p => ({ ...p, confirmPass: '' })) }}
                                        type={showConfirm ? 'text' : 'password'} placeholder="Repeat password"
                                        className={`input-base ${errors.confirmPass ? 'input-error' : ''}`} style={{ paddingRight: 42 }} />
                                    <button onClick={() => setShowConfirm(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                        {showConfirm ? <EyeOff size={15} color="#9ca3af" /> : <Eye size={15} color="#9ca3af" />}
                                    </button>
                                </div>
                                {errors.confirmPass && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.confirmPass}</p>}
                            </div>
                            <button className="btn-primary" onClick={handleResetPass} disabled={loading} style={{ width: '100%' }}>
                                {loading ? <><RefreshCw size={15} className="spin" /> Resetting…</> : <><CheckCircle2 size={15} /> Reset Password</>}
                            </button>
                        </div>
                    )}

                    <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--muted)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', margin: '18px auto 0', justifyContent: 'center' }}>
                        <ArrowLeft size={14} /> Back to Login
                    </button>
                </div>
            </div>
        </div>
    )
}

// ─── DASHBOARD LAYOUT ─────────────────────────────────────────────────────────
function DonorDashboard({ onLogout }) {
    const [page, setPage] = useState('home')
    const [donateOpen, setDonateOpen] = useState(false)

    const NAV_ITEMS = [
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'ngos', label: 'Search NGOs', icon: Search },
        { id: 'history', label: 'Donation History', icon: FileText },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: 2 },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'settings', label: 'Settings', icon: Settings },
    ]

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface)' }}>
            {/* Sidebar */}
            <div style={{ width: 240, background: 'white', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', padding: '24px 16px', flexShrink: 0 }}>
                {/* Logo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, padding: '0 4px' }}>
                    <div style={{ width: 36, height: 36, background: 'var(--primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Heart size={18} color="white" />
                    </div>
                    <div>
                        <p className="font-display" style={{ fontSize: 17, fontWeight: 400, color: 'var(--text)', lineHeight: 1.2 }}>VASUDHA</p>
                        <p style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>DONOR PORTAL</p>
                    </div>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {NAV_ITEMS.map(item => {
                        const Icon = item.icon
                        return (
                            <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => setPage(item.id)}>
                                <Icon size={16} />
                                <span style={{ flex: 1 }}>{item.label}</span>
                                {item.badge && <span style={{ background: '#ef4444', color: 'white', fontSize: 10, fontWeight: 700, borderRadius: 99, padding: '1px 6px' }}>{item.badge}</span>}
                            </button>
                        )
                    })}
                </nav>

                {/* Donate CTA */}
                <button className="btn-primary" onClick={() => setDonateOpen(true)} style={{ marginBottom: 12 }}>
                    <Heart size={15} /> New Donation
                </button>

                {/* Logout */}
                <button className="btn-ghost" onClick={onLogout}>
                    <LogOut size={15} /> Sign Out
                </button>
            </div>

            {/* Main content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '28px 32px' }}>
                {page === 'home' && <HomeDashboard onDonate={() => setDonateOpen(true)} onNav={setPage} />}
                {page === 'ngos' && <SearchNGOs />}
                {page === 'history' && <DonationHistory />}
                {page === 'notifications' && <NotificationsPage />}
                {page === 'profile' && <ProfilePage />}
                {page === 'settings' && <SettingsPage onLogout={onLogout} />}
            </div>

            {/* Donation Modal */}
            {donateOpen && <NewDonationModal onClose={() => setDonateOpen(false)} donor={MOCK_DONOR} />}
        </div>
    )
}

// ─── HOME DASHBOARD ────────────────────────────────────────────────────────────
function HomeDashboard({ onDonate, onNav }) {
    const recentDonations = MOCK_DONATIONS.slice(0, 3)

    return (
        <div className="fade-in">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 2 }}>Good morning 👋</p>
                    <h1 className="font-display" style={{ fontSize: 28, fontWeight: 400, color: 'var(--text)' }}>Rahul Sharma</h1>
                </div>
                <button className="btn-primary" onClick={onDonate} style={{ padding: '11px 20px' }}>
                    <Heart size={15} /> Donate Now
                </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
                {[
                    { label: 'Total Donated', value: `₹${fmt(MOCK_DONOR.totalDonated)}`, icon: IndianRupee, color: '#dcfce7', iconColor: 'var(--primary)' },
                    { label: 'Donations Made', value: MOCK_DONOR.donationCount, icon: CheckCircle2, color: '#dbeafe', iconColor: '#2563eb' },
                    { label: 'NGOs Supported', value: MOCK_DONOR.ngoSupported, icon: Building2, color: '#fef9c3', iconColor: '#d97706' },
                    { label: 'Donor Rank', value: MOCK_DONOR.rank, icon: Award, color: '#f3e8ff', iconColor: '#9333ea' },
                ].map((s, i) => {
                    const Icon = s.icon
                    return (
                        <div key={i} className="card" style={{ padding: '18px 20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon size={18} color={s.iconColor} />
                                </div>
                            </div>
                            <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{s.value}</p>
                            <p style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</p>
                        </div>
                    )
                })}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                {/* Recent Donations */}
                <SectionCard title="Recent Donations" action={
                    <button onClick={() => onNav('history')} style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        View all <ArrowUpRight size={14} />
                    </button>
                }>
                    {recentDonations.map((d, i) => (
                        <div key={i} className="history-row" style={{ borderRadius: i === 0 ? '10px 10px 0 0' : i === recentDonations.length - 1 ? '0 0 10px 10px' : 0 }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>{d.ngo.charAt(0)}</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.ngo}</p>
                                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{fmtDate(d.date)}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>₹{fmt(d.amount)}</p>
                                <StatusBadge status={d.status} />
                            </div>
                        </div>
                    ))}
                </SectionCard>

                {/* Right column */}
                <div>
                    {/* Badges */}
                    <SectionCard title="My Badges">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {BADGES.filter(b => b.earned).map((b, i) => (
                                <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 20 }}>{b.icon}</span>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{b.label}</p>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Impact */}
                    <SectionCard title="Your Impact">
                        {[
                            { label: '📚 Children educated', value: '34' },
                            { label: '🌳 Trees planted', value: '120' },
                            { label: '🏥 Medical camps', value: '8' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{item.label}</span>
                                <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary)' }}>{item.value}</span>
                            </div>
                        ))}
                    </SectionCard>
                </div>
            </div>
        </div>
    )
}

// ─── SEARCH NGOs PAGE ─────────────────────────────────────────────────────────
function SearchNGOs() {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')
    const [location, setLocation] = useState('All Cities')
    const [sort, setSort] = useState('rating')
    const [showFilters, setShowFilters] = useState(false)

    const filtered = MOCK_NGOS.filter(n => {
        const matchQ = !query || n.name.toLowerCase().includes(query.toLowerCase()) || n.category.toLowerCase().includes(query.toLowerCase())
        const matchC = category === 'All' || n.category === category
        const matchL = location === 'All Cities' || n.location === location
        return matchQ && matchC && matchL
    }).sort((a, b) => sort === 'rating' ? b.rating - a.rating : b.raised - a.raised)

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 className="font-display" style={{ fontSize: 26, fontWeight: 400, color: 'var(--text)' }}>Explore NGOs</h1>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{filtered.length} organisations found</p>
                </div>
            </div>

            {/* Search + Filter bar */}
            <div className="card" style={{ padding: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: showFilters ? 16 : 0 }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                        <input value={query} onChange={e => setQuery(e.target.value)}
                            placeholder="Search by name or cause…"
                            style={{ width: '100%', paddingLeft: 40, paddingRight: 14, paddingTop: 10, paddingBottom: 10, border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
                    </div>
                    <button className="btn-ghost" onClick={() => setShowFilters(s => !s)} style={{ padding: '10px 16px', flexShrink: 0 }}>
                        <SlidersHorizontal size={15} /> Filters {showFilters ? '▲' : '▼'}
                    </button>
                </div>

                {showFilters && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                        {/* Category */}
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase' }}>Category</label>
                            <div style={{ position: 'relative' }}>
                                <Tag size={14} color="#9ca3af" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                                <select value={category} onChange={e => setCategory(e.target.value)}
                                    style={{ width: '100%', padding: '9px 10px 9px 32px', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 13, background: 'white', fontFamily: 'DM Sans, sans-serif', outline: 'none', appearance: 'none' }}>
                                    {NGO_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                        {/* Location */}
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase' }}>Location</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={14} color="#9ca3af" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                                <select value={location} onChange={e => setLocation(e.target.value)}
                                    style={{ width: '100%', padding: '9px 10px 9px 32px', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 13, background: 'white', fontFamily: 'DM Sans, sans-serif', outline: 'none', appearance: 'none' }}>
                                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                                </select>
                            </div>
                        </div>
                        {/* Sort */}
                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase' }}>Sort By</label>
                            <div style={{ position: 'relative' }}>
                                <Star size={14} color="#9ca3af" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                                <select value={sort} onChange={e => setSort(e.target.value)}
                                    style={{ width: '100%', padding: '9px 10px 9px 32px', border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 13, background: 'white', fontFamily: 'DM Sans, sans-serif', outline: 'none', appearance: 'none' }}>
                                    <option value="rating">Highest Rated</option>
                                    <option value="raised">Most Raised</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Active filters */}
                {(category !== 'All' || location !== 'All Cities') && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                        {category !== 'All' && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(26,107,58,0.08)', color: 'var(--primary)', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 99 }}>
                                {category}
                                <button onClick={() => setCategory('All')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}><X size={12} color="var(--primary)" /></button>
                            </span>
                        )}
                        {location !== 'All Cities' && (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(26,107,58,0.08)', color: 'var(--primary)', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 99 }}>
                                <MapPin size={11} />{location}
                                <button onClick={() => setLocation('All Cities')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}><X size={12} color="var(--primary)" /></button>
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* NGO Grid */}
            {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <Search size={40} color="#d1d5db" style={{ margin: '0 auto 12px' }} />
                    <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--muted)' }}>No NGOs found</p>
                    <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>Try adjusting your filters</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                    {filtered.map(ngo => (
                        <div key={ngo._id} className="ngo-card">
                            <div style={{ padding: '18px 20px 14px' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(26,107,58,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>{ngo.name.charAt(0)}</span>
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{ngo.name}</p>
                                            {ngo.verified && <BadgeCheck size={15} color="var(--primary)" />}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
                                            <span style={{ fontSize: 11, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <MapPin size={10} />{ngo.location}
                                            </span>
                                            <span style={{ fontSize: 11, color: '#92400e', background: '#fef3c7', padding: '1px 7px', borderRadius: 99, fontWeight: 600 }}>{ngo.category}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                                        <Star size={13} color="#f59e0b" fill="#f59e0b" />
                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{ngo.rating}</span>
                                    </div>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 14 }}>{ngo.desc}</p>
                                <div className="progress-bar" style={{ marginBottom: 6 }}>
                                    <div className="progress-fill" style={{ width: `${pct(ngo.raised, ngo.goal)}%` }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 12, color: 'var(--muted)' }}>₹{fmt(ngo.raised)} raised</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>{pct(ngo.raised, ngo.goal)}%</span>
                                </div>
                            </div>
                            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                                <button className="btn-ghost" style={{ flex: 1, padding: '9px 12px', fontSize: 13 }}>
                                    <ExternalLink size={13} /> View
                                </button>
                                <button className="btn-primary" style={{ flex: 1, padding: '9px 12px', fontSize: 13 }}>
                                    <Heart size={13} /> Donate
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// ─── DONATION HISTORY PAGE ────────────────────────────────────────────────────
function DonationHistory() {
    const [filter, setFilter] = useState('All')
    const [search, setSearch] = useState('')
    const [receiptOpen, setReceiptOpen] = useState(null)

    const filtered = MOCK_DONATIONS.filter(d => {
        const matchS = filter === 'All' || d.status === filter
        const matchQ = !search || d.ngo.toLowerCase().includes(search.toLowerCase())
        return matchS && matchQ
    })

    const totalFiltered = filtered.reduce((s, d) => d.status === 'Completed' ? s + d.amount : s, 0)

    const downloadReceipt = (d) => {
        const html = `<!DOCTYPE html><html><head><title>Donation Receipt — ${d.id}</title>
        <style>body{font-family:Arial,sans-serif;max-width:480px;margin:40px auto;color:#1a1a1a}.logo{font-size:22px;font-weight:900;color:#1a6b3a;margin-bottom:4px}.tag{font-size:11px;color:#6b7280;margin-bottom:24px}.hero{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;text-align:center;margin-bottom:20px}.amount{font-size:36px;font-weight:900;color:#1a6b3a}table{width:100%;border-collapse:collapse;font-size:13px}td{padding:10px 8px;border-bottom:1px solid #f3f4f6}td:first-child{color:#6b7280;width:45%}td:last-child{font-weight:700}.footer{text-align:center;margin-top:24px;font-size:11px;color:#9ca3af}.badge{display:inline-block;background:#dcfce7;color:#15803d;padding:3px 12px;border-radius:99px;font-size:11px;font-weight:700}</style></head><body>
        <div class="logo">VASUDHA</div><div class="tag">Donation Receipt — Official</div>
        <div class="hero"><div style="font-size:13px;color:#6b7280;margin-bottom:4px">Amount Donated</div><div class="amount">₹${fmt(d.amount)}</div><div style="margin-top:8px"><span class="badge">✓ ${d.status}</span></div></div>
        <table><tr><td>Receipt No.</td><td>${d.id}</td></tr><tr><td>Transaction ID</td><td>${d.txn}</td></tr><tr><td>Date</td><td>${fmtDate(d.date)}</td></tr><tr><td>NGO</td><td>${d.ngo}</td></tr><tr><td>Category</td><td>${d.category}</td></tr><tr><td>Type</td><td style="text-transform:capitalize">${d.type}</td></tr><tr><td>Payment Mode</td><td>UPI</td></tr><tr><td>Status</td><td>${d.status}</td></tr></table>
        <div class="footer">System-generated receipt. For 80G, contact NGO directly.<br/>VASUDHA Platform · ${new Date().toLocaleString('en-IN')}</div></body></html>`
        const w = window.open('', '_blank')
        w.document.write(html)
        w.document.close()
        setTimeout(() => w.print(), 400)
    }

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <h1 className="font-display" style={{ fontSize: 26, fontWeight: 400, color: 'var(--text)' }}>Donation History</h1>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{filtered.length} records · ₹{fmt(totalFiltered)} confirmed</p>
                </div>
            </div>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 22 }}>
                {[
                    { label: 'Total Donated', value: `₹${fmt(MOCK_DONOR.totalDonated)}`, color: '#dcfce7', icon: '💰' },
                    { label: 'Completed', value: MOCK_DONATIONS.filter(d => d.status === 'Completed').length, color: '#dbeafe', icon: '✅' },
                    { label: 'This Year', value: `₹${fmt(MOCK_DONATIONS.filter(d => d.date.startsWith('2025') && d.status === 'Completed').reduce((s, d) => s + d.amount, 0))}`, color: '#fef9c3', icon: '📅' },
                ].map((s, i) => (
                    <div key={i} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ fontSize: 24 }}>{s.icon}</span>
                        <div>
                            <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{s.value}</p>
                            <p style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="card" style={{ padding: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={15} color="#9ca3af" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search by NGO name…"
                            style={{ width: '100%', paddingLeft: 36, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'DM Sans, sans-serif' }} />
                    </div>
                    <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: 10, padding: 3, border: '1px solid var(--border)' }}>
                        {['All', 'Completed', 'Pending', 'Failed'].map(f => (
                            <button key={f} onClick={() => setFilter(f)}
                                style={{ padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: filter === f ? 'var(--primary)' : 'transparent', color: filter === f ? 'white' : 'var(--muted)', transition: 'all .2s', fontFamily: 'DM Sans, sans-serif' }}>
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="card" style={{ overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
                                {['Date', 'NGO Name', 'Category', 'Amount', 'Type', 'Status', 'Transaction ID', 'Receipt'].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={8} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)', fontSize: 14 }}>No donations found</td></tr>
                            ) : filtered.map((d, i) => (
                                <tr key={d.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background .15s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#fafbfa'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                                    <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                                        <Calendar size={13} style={{ verticalAlign: 'middle', marginRight: 5 }} />{fmtDate(d.date)}
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(26,107,58,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary)' }}>{d.ngo.charAt(0)}</span>
                                            </div>
                                            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap' }}>{d.ngo}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{ fontSize: 11, color: '#92400e', background: '#fef3c7', padding: '2px 8px', borderRadius: 99, fontWeight: 600 }}>{d.category}</span>
                                    </td>
                                    <td style={{ padding: '14px 16px', fontSize: 15, fontWeight: 800, color: 'var(--text)', whiteSpace: 'nowrap' }}>₹{fmt(d.amount)}</td>
                                    <td style={{ padding: '14px 16px', fontSize: 12, color: 'var(--muted)', textTransform: 'capitalize' }}>{d.type}</td>
                                    <td style={{ padding: '14px 16px' }}><StatusBadge status={d.status} /></td>
                                    <td style={{ padding: '14px 16px', fontSize: 12, color: 'var(--muted)', fontFamily: 'monospace' }}>{d.txn}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        {d.status === 'Completed'
                                            ? <button onClick={() => downloadReceipt(d)}
                                                style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: 'var(--primary)', background: 'rgba(26,107,58,0.06)', border: '1px solid rgba(26,107,58,0.2)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                                                <Download size={12} /> Receipt
                                            </button>
                                            : <span style={{ fontSize: 12, color: '#9ca3af' }}>—</span>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

// ─── NOTIFICATIONS PAGE ───────────────────────────────────────────────────────
function NotificationsPage() {
    const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS)
    const [filter, setFilter] = useState('All')

    const unread = notifs.filter(n => !n.read).length
    const TYPES = ['All', 'donation', 'ngo', 'volunteer', 'system']
    const TYPE_LABELS = { All: 'All', donation: 'Donations', ngo: 'NGO Updates', volunteer: 'Volunteer', system: 'System' }

    const filtered = notifs.filter(n => filter === 'All' || n.type === filter)

    const markRead = (id) => setNotifs(p => p.map(n => n.id === id ? { ...n, read: true } : n))
    const markAllRead = () => setNotifs(p => p.map(n => ({ ...n, read: true })))
    const deleteNotif = (id) => setNotifs(p => p.filter(n => n.id !== id))

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <h1 className="font-display" style={{ fontSize: 26, fontWeight: 400, color: 'var(--text)' }}>Notifications</h1>
                        {unread > 0 && <span style={{ background: '#ef4444', color: 'white', fontSize: 12, fontWeight: 800, borderRadius: 99, padding: '2px 10px' }}>{unread} new</span>}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{filtered.length} notifications</p>
                </div>
                {unread > 0 && (
                    <button onClick={markAllRead} style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700, background: 'none', border: '1.5px solid rgba(26,107,58,0.3)', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                        <CheckSquare size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />Mark all read
                    </button>
                )}
            </div>

            {/* Type filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {TYPES.map(t => (
                    <button key={t} onClick={() => setFilter(t)}
                        style={{ padding: '7px 16px', borderRadius: 99, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1.5px solid', borderColor: filter === t ? 'var(--primary)' : 'var(--border)', background: filter === t ? 'var(--primary)' : 'white', color: filter === t ? 'white' : 'var(--muted)', transition: 'all .2s', fontFamily: 'DM Sans, sans-serif' }}>
                        {TYPE_LABELS[t]}
                    </button>
                ))}
            </div>

            {/* Notification list */}
            <div className="card" style={{ overflow: 'hidden' }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <Bell size={36} color="#d1d5db" style={{ margin: '0 auto 10px' }} />
                        <p style={{ fontWeight: 700, color: 'var(--muted)' }}>No notifications here</p>
                    </div>
                ) : filtered.map((n, i) => {
                    const Icon = n.icon
                    return (
                        <div key={n.id}
                            style={{ display: 'flex', gap: 14, padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none', background: n.read ? 'white' : '#f0fdf4', cursor: 'pointer', transition: 'background .2s' }}
                            onClick={() => markRead(n.id)}>
                            {/* Icon */}
                            <div style={{ width: 42, height: 42, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: n.read ? 'var(--surface)' : '#dcfce7' }}>
                                <Icon size={18} className={n.iconColor} style={{ color: n.read ? '#9ca3af' : undefined }} />
                            </div>
                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                                    <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>{n.title}</p>
                                    {!n.read && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />}
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{n.message}</p>
                                <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 5 }}>{n.time}</p>
                            </div>
                            {/* Delete */}
                            <button onClick={e => { e.stopPropagation(); deleteNotif(n.id) }}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, opacity: 0.4, flexShrink: 0 }}>
                                <X size={15} color="var(--muted)" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage() {
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({ ...MOCK_DONOR })
    const [saved, setSaved] = useState(false)
    const [activeTab, setActiveTab] = useState('info')

    const handleSave = () => {
        setSaved(true)
        setEditing(false)
        setTimeout(() => setSaved(false), 2500)
    }

    const TABS = [
        { id: 'info', label: 'Personal Info' },
        { id: 'summary', label: 'Donation Summary' },
        { id: 'ngos', label: 'Saved NGOs' },
        { id: 'badges', label: 'Badges' },
    ]

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h1 className="font-display" style={{ fontSize: 26, fontWeight: 400, color: 'var(--text)' }}>My Profile</h1>
                {saved && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#dcfce7', color: '#15803d', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 700 }}>
                        <CheckCircle2 size={15} /> Profile saved!
                    </div>
                )}
            </div>

            {/* Profile hero card */}
            <div className="card" style={{ padding: '28px 28px 20px', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                    {/* Avatar */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div className="donor-avatar">
                            {form.name.charAt(0)}
                        </div>
                        <button style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, background: 'var(--primary)', border: '2px solid white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Camera size={12} color="white" />
                        </button>
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{form.name}</h2>
                            <span style={{ background: '#fef9c3', color: '#a16207', fontSize: 12, fontWeight: 700, padding: '2px 10px', borderRadius: 99 }}>🏅 {form.rank}</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 6 }}>{form.bio}</p>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12} />{form.email}</span>
                            <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{form.phone}</span>
                            <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{form.location}</span>
                            <span style={{ fontSize: 12, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} />Joined {form.joined}</span>
                        </div>
                    </div>
                    <button className={editing ? 'btn-primary' : 'btn-ghost'} onClick={editing ? handleSave : () => setEditing(true)} style={{ padding: '9px 18px', flexShrink: 0 }}>
                        {editing ? <><Check size={14} /> Save</> : <><Edit3 size={14} /> Edit</>}
                    </button>
                </div>

                {/* Stats strip */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, marginTop: 24, background: 'var(--border)', borderRadius: 12, overflow: 'hidden' }}>
                    {[
                        { label: 'Total Donated', value: `₹${fmt(form.totalDonated)}` },
                        { label: 'Donations', value: form.donationCount },
                        { label: 'NGOs Supported', value: form.ngoSupported },
                    ].map((s, i) => (
                        <div key={i} style={{ background: 'white', padding: '14px 16px', textAlign: 'center' }}>
                            <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>{s.value}</p>
                            <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 12, padding: 4, marginBottom: 20, border: '1px solid var(--border)' }}>
                {TABS.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                        style={{ flex: 1, padding: '9px 12px', borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: activeTab === t.id ? 'var(--primary)' : 'transparent', color: activeTab === t.id ? 'white' : 'var(--muted)', transition: 'all .2s', fontFamily: 'DM Sans, sans-serif' }}>
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Tab: Personal Info */}
            {activeTab === 'info' && (
                <div className="card" style={{ padding: 24 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {[
                            { label: 'Full Name', field: 'name', icon: User },
                            { label: 'Phone Number', field: 'phone', icon: Phone },
                            { label: 'Email Address', field: 'email', icon: Mail },
                            { label: 'Location', field: 'location', icon: MapPin },
                        ].map(({ label, field, icon: Icon }) => (
                            <div key={field}>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
                                <div style={{ position: 'relative' }}>
                                    <Icon size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                                    <input value={form[field]} onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                                        disabled={!editing}
                                        style={{ width: '100%', paddingLeft: 38, paddingRight: 12, paddingTop: 10, paddingBottom: 10, border: '1.5px solid', borderColor: editing ? 'var(--primary)' : 'var(--border)', borderRadius: 10, fontSize: 13, fontFamily: 'DM Sans, sans-serif', outline: 'none', background: editing ? 'white' : 'var(--surface)', color: 'var(--text)', transition: 'all .2s' }} />
                                </div>
                            </div>
                        ))}
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bio</label>
                            <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                                disabled={!editing} rows={3}
                                style={{ width: '100%', padding: '10px 14px', border: '1.5px solid', borderColor: editing ? 'var(--primary)' : 'var(--border)', borderRadius: 10, fontSize: 13, fontFamily: 'DM Sans, sans-serif', outline: 'none', background: editing ? 'white' : 'var(--surface)', color: 'var(--text)', resize: 'none', transition: 'all .2s' }} />
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Donation Summary */}
            {activeTab === 'summary' && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 18 }}>
                        {[
                            { label: 'Total Donated', value: `₹${fmt(MOCK_DONOR.totalDonated)}`, emoji: '💰', bg: '#f0fdf4' },
                            { label: 'Avg per Donation', value: `₹${fmt(Math.round(MOCK_DONOR.totalDonated / MOCK_DONOR.donationCount))}`, emoji: '📊', bg: '#eff6ff' },
                            { label: 'Largest Donation', value: '₹15,000', emoji: '🏆', bg: '#fefce8' },
                            { label: 'Favourite Cause', value: 'Education', emoji: '📚', bg: '#fdf4ff' },
                        ].map((s, i) => (
                            <div key={i} className="card" style={{ padding: '18px 20px', background: s.bg, borderColor: 'transparent' }}>
                                <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{s.emoji}</span>
                                <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>{s.value}</p>
                                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</p>
                            </div>
                        ))}
                    </div>
                    {/* Recent */}
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 14, color: 'var(--text)' }}>Recent Donations</div>
                        {MOCK_DONATIONS.slice(0, 4).map((d, i) => (
                            <div key={d.id} className="history-row">
                                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(26,107,58,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>{d.ngo.charAt(0)}</span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 700, fontSize: 13 }}>{d.ngo}</p>
                                    <p style={{ fontSize: 11, color: 'var(--muted)' }}>{fmtDate(d.date)}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 800, fontSize: 14 }}>₹{fmt(d.amount)}</p>
                                    <StatusBadge status={d.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab: Saved NGOs */}
            {activeTab === 'ngos' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
                    {MOCK_NGOS.slice(0, 5).map(ngo => (
                        <div key={ngo._id} className="card" style={{ padding: '16px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(26,107,58,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 14 }}>{ngo.name.charAt(0)}</span>
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ngo.name}</p>
                                    <p style={{ fontSize: 11, color: 'var(--muted)' }}>{ngo.category} · {ngo.location}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Star size={12} color="#f59e0b" fill="#f59e0b" />
                                    <span style={{ fontSize: 12, fontWeight: 700 }}>{ngo.rating}</span>
                                </div>
                            </div>
                            <div className="progress-bar" style={{ marginBottom: 6 }}>
                                <div className="progress-fill" style={{ width: `${pct(ngo.raised, ngo.goal)}%` }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{ fontSize: 11, color: 'var(--muted)' }}>₹{fmt(ngo.raised)}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)' }}>{pct(ngo.raised, ngo.goal)}% funded</span>
                            </div>
                            <button className="btn-primary" style={{ width: '100%', padding: '9px', fontSize: 13 }}>
                                <Heart size={13} /> Donate Again
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Tab: Badges */}
            {activeTab === 'badges' && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                        {BADGES.map((b, i) => (
                            <div key={i} className="card" style={{ padding: '20px 16px', textAlign: 'center', opacity: b.earned ? 1 : 0.5, position: 'relative', overflow: 'hidden' }}>
                                {!b.earned && <div style={{ position: 'absolute', top: 8, right: 8, fontSize: 10, fontWeight: 700, background: '#f3f4f6', color: '#6b7280', padding: '2px 7px', borderRadius: 99 }}>Locked</div>}
                                <div style={{ fontSize: 38, marginBottom: 10 }}>{b.icon}</div>
                                <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{b.label}</p>
                                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{b.desc}</p>
                                {b.earned && <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 4, background: '#dcfce7', color: '#15803d', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99 }}><Check size={11} /> Earned</div>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────
function SettingsPage({ onLogout }) {
    const [settings, setSettings] = useState({
        emailNotifs: true, smsNotifs: true, pushNotifs: false,
        donationAlerts: true, ngoUpdates: true, volunteerOpps: false,
        systemAlerts: true, newsletter: false,
        twoFactor: false, loginAlerts: true,
        darkMode: false, compactView: false,
        currency: 'INR', language: 'English',
    })
    const [saved, setSaved] = useState(false)
    const [section, setSection] = useState('notifications')

    const toggle = (key) => setSettings(p => ({ ...p, [key]: !p[key] }))

    const saveSettings = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    const SECTIONS = [
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'privacy', label: 'Privacy & Security', icon: Shield },
        { id: 'account', label: 'Account', icon: User },
        { id: 'appearance', label: 'Appearance', icon: Moon },
    ]

    const SettingRow = ({ label, desc, settingKey, children }) => (
        <div className="setting-row">
            <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: desc ? 2 : 0 }}>{label}</p>
                {desc && <p style={{ fontSize: 12, color: 'var(--muted)' }}>{desc}</p>}
            </div>
            {children || <Toggle on={settings[settingKey]} onChange={() => toggle(settingKey)} />}
        </div>
    )

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <h1 className="font-display" style={{ fontSize: 26, fontWeight: 400, color: 'var(--text)' }}>Settings</h1>
                <button className="btn-primary" onClick={saveSettings} style={{ padding: '10px 20px' }}>
                    {saved ? <><Check size={14} /> Saved!</> : <><Check size={14} /> Save Changes</>}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>
                {/* Sidebar */}
                <div className="card" style={{ padding: 10, alignSelf: 'start' }}>
                    {SECTIONS.map(s => {
                        const Icon = s.icon
                        return (
                            <button key={s.id} onClick={() => setSection(s.id)}
                                className={`nav-item ${section === s.id ? 'active' : ''}`}>
                                <Icon size={15} /> {s.label}
                            </button>
                        )
                    })}
                </div>

                {/* Content */}
                <div>
                    {section === 'notifications' && (
                        <div>
                            <SectionCard title="Notification Channels">
                                <SettingRow label="Email Notifications" desc="Get updates in your inbox" settingKey="emailNotifs" />
                                <SettingRow label="SMS Notifications" desc="Text alerts on your phone" settingKey="smsNotifs" />
                                <SettingRow label="Push Notifications" desc="Browser push notifications" settingKey="pushNotifs" />
                            </SectionCard>
                            <SectionCard title="Notification Types">
                                <SettingRow label="Donation Alerts" desc="Receipts & confirmations" settingKey="donationAlerts" />
                                <SettingRow label="NGO Updates" desc="Impact reports and news" settingKey="ngoUpdates" />
                                <SettingRow label="Volunteer Opportunities" desc="Local volunteering events" settingKey="volunteerOpps" />
                                <SettingRow label="System Alerts" desc="Platform updates and announcements" settingKey="systemAlerts" />
                                <SettingRow label="Newsletter" desc="Monthly impact digest" settingKey="newsletter" />
                            </SectionCard>
                        </div>
                    )}

                    {section === 'privacy' && (
                        <div>
                            <SectionCard title="Security">
                                <SettingRow label="Two-Factor Authentication" desc="Adds an extra layer of security" settingKey="twoFactor" />
                                <SettingRow label="Login Alerts" desc="Get notified of new sign-ins" settingKey="loginAlerts" />
                            </SectionCard>
                            <SectionCard title="Password">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    {['Current Password', 'New Password', 'Confirm New Password'].map((l, i) => (
                                        <div key={i} style={{ gridColumn: i === 2 ? '1 / -1' : undefined }}>
                                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</label>
                                            <div style={{ position: 'relative' }}>
                                                <Lock size={14} color="#9ca3af" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
                                                <input type="password" placeholder="••••••••"
                                                    style={{ width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 13, fontFamily: 'DM Sans, sans-serif', outline: 'none' }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn-outline" style={{ marginTop: 16, padding: '10px 20px' }}>
                                    <Lock size={14} /> Update Password
                                </button>
                            </SectionCard>
                            <SectionCard title="Danger Zone">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                                    <div>
                                        <p style={{ fontWeight: 600, fontSize: 14, color: '#dc2626' }}>Delete Account</p>
                                        <p style={{ fontSize: 12, color: 'var(--muted)' }}>Permanently remove your data</p>
                                    </div>
                                    <button style={{ padding: '9px 18px', border: '1.5px solid #ef4444', borderRadius: 10, fontSize: 13, fontWeight: 700, color: '#dc2626', background: 'white', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {section === 'account' && (
                        <div>
                            <SectionCard title="Account Details">
                                {[
                                    { label: 'Full Name', val: MOCK_DONOR.name, icon: User },
                                    { label: 'Email', val: MOCK_DONOR.email, icon: Mail },
                                    { label: 'Phone', val: MOCK_DONOR.phone, icon: Phone },
                                    { label: 'Member Since', val: MOCK_DONOR.joined, icon: Calendar },
                                ].map(({ label, val, icon: Icon }, i) => (
                                    <div key={i} className="setting-row">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(26,107,58,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon size={15} color="var(--primary)" />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>{label}</p>
                                                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{val}</p>
                                            </div>
                                        </div>
                                        <button style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                                    </div>
                                ))}
                            </SectionCard>
                            <SectionCard title="Session">
                                <button className="btn-ghost" onClick={onLogout} style={{ width: '100%', color: '#dc2626', borderColor: '#fecaca' }}>
                                    <LogOut size={15} style={{ color: '#dc2626' }} /> Sign Out of All Devices
                                </button>
                            </SectionCard>
                        </div>
                    )}

                    {section === 'appearance' && (
                        <SectionCard title="Display Preferences">
                            <SettingRow label="Dark Mode" desc="Easy on the eyes at night" settingKey="darkMode" />
                            <SettingRow label="Compact View" desc="Show more content in less space" settingKey="compactView" />
                            <SettingRow label="Language" desc="Interface language">
                                <select value={settings.language} onChange={e => setSettings(p => ({ ...p, language: e.target.value }))}
                                    style={{ padding: '7px 12px', border: '1.5px solid var(--border)', borderRadius: 9, fontSize: 13, fontFamily: 'DM Sans, sans-serif', outline: 'none', color: 'var(--text)' }}>
                                    {['English', 'हिंदी', 'বাংলা', 'தமிழ்', 'తెలుగు'].map(l => <option key={l}>{l}</option>)}
                                </select>
                            </SettingRow>
                        </SectionCard>
                    )}
                </div>
            </div>
        </div>
    )
}

// ─── NEW DONATION MODAL ────────────────────────────────────────────────────────
const INIT_FORM = { ngoId: '', amount: '', type: 'one-time', note: '', paymentMethod: 'upi', donorName: MOCK_DONOR.name, donorEmail: MOCK_DONOR.email, donorPhone: MOCK_DONOR.phone, pan: '' }

function NewDonationModal({ onClose, donor }) {
    const [step, setStep] = useState(0)
    const [form, setForm] = useState({ ...INIT_FORM, donorName: donor?.name || '', donorEmail: donor?.email || '', donorPhone: donor?.phone || '' })
    const [errors, setErrors] = useState({})

    const handleClose = () => { setStep(0); setForm(INIT_FORM); setErrors({}); onClose() }
    const STEPS = ['Details', 'Payment', 'UPI Pay', 'Receipt']

    return (
        <div className="modal-overlay">
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px 14px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div style={{ width: 30, height: 30, background: 'var(--primary)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Heart size={15} color="white" />
                        </div>
                        <div>
                            <span style={{ fontWeight: 800, color: 'var(--text)', fontSize: 14 }}>New Donation</span>
                            <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>Step {step + 1} of 4 — {STEPS[step]}</span>
                        </div>
                    </div>
                    {step < 3 && <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 8, color: 'var(--muted)' }}><X size={16} /></button>}
                </div>

                <div style={{ padding: '18px 24px 4px', flexShrink: 0 }}>
                    <StepDots step={step} total={4} />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 24px' }}>
                    {step === 0 && <ModalDonationForm form={form} setForm={setForm} errors={errors} setErrors={setErrors} onNext={() => setStep(1)} />}
                    {step === 1 && <ModalPaymentMethod form={form} setForm={setForm} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
                    {step === 2 && <ModalUPIPayment form={form} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
                    {step === 3 && <ModalReceipt form={form} donor={donor} onClose={handleClose} />}
                </div>
            </div>
        </div>
    )
}

function ModalDonationForm({ form, setForm, onNext, errors, setErrors }) {
    const [catFilter, setCatFilter] = useState('All')
    const filteredNGOs = MOCK_NGOS.filter(n => catFilter === 'All' || n.category === catFilter)
    const ch = (field, val) => { setForm(p => ({ ...p, [field]: val })); if (errors[field]) setErrors(p => ({ ...p, [field]: '' })) }

    const validate = () => {
        const e = {}
        if (!form.ngoId) e.ngoId = 'Please select an NGO'
        if (!form.amount || isNaN(form.amount) || +form.amount < 1) e.amount = 'Enter a valid amount'
        if (!form.donorName?.trim()) e.donorName = 'Name is required'
        if (!form.donorEmail?.trim() || !form.donorEmail.includes('@')) e.donorEmail = 'Valid email required'
        if (!form.donorPhone?.trim() || form.donorPhone.replace(/\D/g, '').length < 10) e.donorPhone = 'Valid phone required'
        return e
    }

    const handleNext = () => { const e = validate(); if (Object.keys(e).length) { setErrors(e); return }; onNext() }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ textAlign: 'center', paddingTop: 4 }}>
                <div style={{ width: 48, height: 48, background: 'rgba(26,107,58,0.1)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                    <Heart size={22} color="var(--primary)" />
                </div>
                <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)' }}>Make a Donation</h2>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Your generosity creates real change</p>
            </div>

            {/* Donor details */}
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, padding: 16 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Your Details</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    {[
                        { label: 'Full Name', field: 'donorName', icon: User, placeholder: 'Your name' },
                        { label: 'Phone', field: 'donorPhone', icon: Phone, placeholder: '10-digit number' },
                    ].map(({ label, field, icon: Icon, placeholder }) => (
                        <div key={field}>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 5 }}>{label} <span style={{ color: '#ef4444' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <Icon size={14} color="#9ca3af" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                                <input value={form[field] || ''} onChange={e => ch(field, e.target.value)} placeholder={placeholder}
                                    style={{ width: '100%', paddingLeft: 32, paddingRight: 10, paddingTop: 9, paddingBottom: 9, border: `1.5px solid ${errors[field] ? '#ef4444' : 'var(--border)'}`, borderRadius: 10, fontSize: 13, fontFamily: 'DM Sans, sans-serif', outline: 'none', background: 'white' }} />
                            </div>
                            {errors[field] && <p style={{ fontSize: 10, color: '#ef4444', marginTop: 2 }}>{errors[field]}</p>}
                        </div>
                    ))}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 5 }}>Email <span style={{ color: '#ef4444' }}>*</span></label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={14} color="#9ca3af" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                            <input value={form.donorEmail || ''} onChange={e => ch('donorEmail', e.target.value)} placeholder="you@email.com"
                                style={{ width: '100%', paddingLeft: 32, paddingRight: 10, paddingTop: 9, paddingBottom: 9, border: `1.5px solid ${errors.donorEmail ? '#ef4444' : 'var(--border)'}`, borderRadius: 10, fontSize: 13, fontFamily: 'DM Sans, sans-serif', outline: 'none', background: 'white' }} />
                        </div>
                        {errors.donorEmail && <p style={{ fontSize: 10, color: '#ef4444', marginTop: 2 }}>{errors.donorEmail}</p>}
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--muted)', marginBottom: 5 }}>PAN Number <span style={{ fontSize: 10, color: '#9ca3af' }}>(optional, for 80G)</span></label>
                        <div style={{ position: 'relative' }}>
                            <FileText size={14} color="#9ca3af" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
                            <input value={form.pan || ''} onChange={e => ch('pan', e.target.value.toUpperCase())} placeholder="ABCDE1234F" maxLength={10}
                                style={{ width: '100%', paddingLeft: 32, paddingRight: 10, paddingTop: 9, paddingBottom: 9, border: '1.5px solid var(--border)', borderRadius: 10, fontSize: 13, fontFamily: 'monospace', outline: 'none', background: 'white', textTransform: 'uppercase' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Category filter */}
            <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Filter by Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {NGO_CATEGORIES.slice(0, 5).map(cat => (
                        <button key={cat} onClick={() => { setCatFilter(cat); ch('ngoId', '') }}
                            style={{ padding: '5px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1.5px solid', borderColor: catFilter === cat ? 'var(--primary)' : 'var(--border)', background: catFilter === cat ? 'var(--primary)' : 'white', color: catFilter === cat ? 'white' : 'var(--muted)', transition: 'all .18s', fontFamily: 'DM Sans, sans-serif' }}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* NGO Selector */}
            <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                    Select NGO <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ maxHeight: 180, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {filteredNGOs.map(ngo => (
                        <button key={ngo._id} onClick={() => ch('ngoId', ngo._id)}
                            style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: `2px solid ${form.ngoId === ngo._id ? 'var(--primary)' : 'var(--border)'}`, background: form.ngoId === ngo._id ? 'rgba(26,107,58,0.04)' : 'white', textAlign: 'left', cursor: 'pointer', transition: 'all .18s', fontFamily: 'DM Sans, sans-serif' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(26,107,58,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: 14 }}>{ngo.name.charAt(0)}</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ngo.name}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>{ngo.category}</span>
                                    {ngo.verified && <span style={{ fontSize: 10, color: '#15803d', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 2 }}><CheckCircle2 size={10} /> Verified</span>}
                                    <span style={{ fontSize: 11, color: '#b45309', fontWeight: 700 }}>★ {ngo.rating}</span>
                                </div>
                            </div>
                            {form.ngoId === ngo._id && <Check size={16} color="var(--primary)" style={{ flexShrink: 0 }} />}
                        </button>
                    ))}
                </div>
                {errors.ngoId && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.ngoId}</p>}
            </div>

            {/* Quick Amounts */}
            <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                    Amount (₹) <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
                    {QUICK_AMOUNTS.map(a => (
                        <button key={a} onClick={() => ch('amount', a)}
                            style={{ padding: '7px 16px', borderRadius: 9, border: '1.5px solid', borderColor: +form.amount === a ? 'var(--primary)' : 'var(--border)', background: +form.amount === a ? 'var(--primary)' : 'white', color: +form.amount === a ? 'white' : 'var(--muted)', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all .18s', fontFamily: 'DM Sans, sans-serif' }}>
                            ₹{fmt(a)}
                        </button>
                    ))}
                </div>
                <div style={{ position: 'relative' }}>
                    <IndianRupee size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="number" value={form.amount} onChange={e => ch('amount', e.target.value)} placeholder="Or enter custom amount"
                        style={{ width: '100%', paddingLeft: 34, paddingRight: 14, paddingTop: 11, paddingBottom: 11, border: `1.5px solid ${errors.amount ? '#ef4444' : 'var(--border)'}`, borderRadius: 12, fontSize: 14, fontFamily: 'DM Sans, sans-serif', outline: 'none' }} />
                </div>
                {errors.amount && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{errors.amount}</p>}
            </div>

            {/* Donation Type */}
            <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Donation Type</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {['one-time', 'monthly', 'annual'].map(t => (
                        <button key={t} onClick={() => ch('type', t)}
                            style={{ padding: '9px', borderRadius: 10, border: '1.5px solid', borderColor: form.type === t ? 'var(--primary)' : 'var(--border)', background: form.type === t ? 'var(--primary)' : 'white', color: form.type === t ? 'white' : 'var(--muted)', fontSize: 12, fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize', transition: 'all .18s', fontFamily: 'DM Sans, sans-serif' }}>
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Note */}
            <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Message <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></label>
                <textarea value={form.note} onChange={e => ch('note', e.target.value)} placeholder="Add a personal message for the NGO…" rows={2}
                    style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 12, fontSize: 13, resize: 'none', fontFamily: 'DM Sans, sans-serif', outline: 'none' }} />
            </div>

            {/* Summary preview */}
            {MOCK_NGOS.find(n => n._id === form.ngoId) && +form.amount > 0 && (
                <div style={{ background: 'rgba(26,107,58,0.05)', border: '1.5px solid rgba(26,107,58,0.2)', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ fontSize: 11, color: 'var(--muted)' }}>Donating to</p>
                        <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>{MOCK_NGOS.find(n => n._id === form.ngoId)?.name}</p>
                    </div>
                    <p style={{ fontSize: 26, fontWeight: 900, color: 'var(--primary)' }}>₹{fmt(form.amount)}</p>
                </div>
            )}

            <button className="btn-primary" onClick={handleNext} style={{ width: '100%' }}>
                Continue to Payment <ChevronRight size={16} />
            </button>
        </div>
    )
}

function ModalPaymentMethod({ form, setForm, onNext, onBack }) {
    const selectedNGO = MOCK_NGOS.find(n => n._id === form.ngoId)
    const PAYMENT_METHODS = [
        { id: 'upi', label: 'UPI', icon: Smartphone, desc: 'Pay instantly via any UPI app', available: true },
        { id: 'netbanking', label: 'Net Banking', icon: Globe, desc: 'Coming soon', available: false },
        { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Coming soon', available: false },
        { id: 'wallet', label: 'Wallet', icon: Wallet, desc: 'Coming soon', available: false },
    ]
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)' }}>Choose Payment</h2>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Select how you'd like to pay</p>
            </div>
            <div style={{ background: '#f9fafb', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ fontSize: 11, color: 'var(--muted)' }}>Paying to</p>
                    <p style={{ fontWeight: 800, fontSize: 14 }}>{selectedNGO?.name}</p>
                </div>
                <p style={{ fontSize: 26, fontWeight: 900, color: 'var(--primary)' }}>₹{fmt(form.amount)}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PAYMENT_METHODS.map(pm => {
                    const Icon = pm.icon
                    return (
                        <button key={pm.id} disabled={!pm.available} onClick={() => pm.available && setForm(p => ({ ...p, paymentMethod: pm.id }))}
                            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 14, border: `2px solid ${!pm.available ? 'var(--border)' : form.paymentMethod === pm.id ? 'var(--primary)' : 'var(--border)'}`, background: form.paymentMethod === pm.id ? 'rgba(26,107,58,0.04)' : 'white', opacity: pm.available ? 1 : 0.5, cursor: pm.available ? 'pointer' : 'not-allowed', textAlign: 'left', transition: 'all .18s', fontFamily: 'DM Sans, sans-serif' }}>
                            <div style={{ width: 40, height: 40, borderRadius: 12, background: pm.available ? 'rgba(26,107,58,0.08)' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon size={20} color={pm.available ? 'var(--primary)' : '#9ca3af'} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 700, fontSize: 14, color: pm.available ? 'var(--text)' : '#9ca3af' }}>{pm.label}</p>
                                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{pm.desc}</p>
                            </div>
                            {!pm.available && <span style={{ fontSize: 10, background: '#fef9c3', color: '#a16207', padding: '2px 8px', borderRadius: 99, fontWeight: 700 }}>Soon</span>}
                            {pm.available && form.paymentMethod === pm.id && <Check size={16} color="var(--primary)" />}
                        </button>
                    )
                })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', fontSize: 12, color: 'var(--muted)' }}>
                <Shield size={13} /> All transactions are secured & encrypted
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-ghost" onClick={onBack} style={{ padding: '12px 18px' }}>
                    <ArrowLeft size={15} /> Back
                </button>
                <button className="btn-primary" onClick={onNext} disabled={!form.paymentMethod} style={{ flex: 1 }}>
                    Proceed to Pay <ChevronRight size={15} />
                </button>
            </div>
        </div>
    )
}

function ModalUPIPayment({ form, onNext, onBack }) {
    const [upiId, setUpiId] = useState('')
    const [selectedApp, setSelectedApp] = useState(null)
    const [copied, setCopied] = useState(false)
    const [verifying, setVerifying] = useState(false)
    const [verified, setVerified] = useState(false)
    const [upiError, setUpiError] = useState('')

    const copyUPI = () => { navigator.clipboard?.writeText(VASUDHA_UPI); setCopied(true); setTimeout(() => setCopied(false), 2000) }
    const handleVerify = () => {
        if (!upiId.trim()) { setUpiError('Enter your UPI ID'); return }
        if (!upiId.includes('@')) { setUpiError('Enter a valid UPI ID (e.g. name@upi)'); return }
        setUpiError(''); setVerifying(true)
        setTimeout(() => { setVerifying(false); setVerified(true) }, 1800)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text)' }}>Pay via UPI</h2>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Use any UPI app to complete the payment</p>
            </div>
            <div style={{ background: 'rgba(26,107,58,0.05)', border: '1.5px solid rgba(26,107,58,0.2)', borderRadius: 14, padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Total Amount</p>
                <p style={{ fontSize: 34, fontWeight: 900, color: 'var(--primary)' }}>₹{fmt(form.amount)}</p>
            </div>
            <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Pay to UPI ID</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#f9fafb', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px' }}>
                    <p style={{ flex: 1, fontSize: 14, fontWeight: 800, fontFamily: 'monospace' }}>{VASUDHA_UPI}</p>
                    <button onClick={copyUPI} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                        {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
                    </button>
                </div>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6 }}>Open any UPI app → Send Money → Enter UPI ID above → Enter ₹{fmt(form.amount)}</p>
            </div>
            <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Quick launch</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {UPI_APPS.map(app => (
                        <button key={app.name} onClick={() => setSelectedApp(app.name)}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 8px', borderRadius: 12, border: `2px solid ${selectedApp === app.name ? 'var(--primary)' : 'var(--border)'}`, background: selectedApp === app.name ? 'rgba(26,107,58,0.04)' : 'white', cursor: 'pointer', transition: 'all .18s', fontFamily: 'DM Sans, sans-serif' }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 14 }} className={app.color}>
                                {app.short}
                            </div>
                            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)' }}>{app.name}</span>
                        </button>
                    ))}
                </div>
                {selectedApp && <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 6 }}>Opening {selectedApp} — in production this would deep-link to the app.</p>}
            </div>
            <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Confirm your UPI ID (after paying)</p>
                <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Smartphone size={14} color="#9ca3af" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
                        <input value={upiId} onChange={e => { setUpiId(e.target.value); setUpiError(''); setVerified(false) }}
                            placeholder="yourname@upi"
                            style={{ width: '100%', paddingLeft: 32, paddingRight: 10, paddingTop: 10, paddingBottom: 10, border: `1.5px solid ${upiError ? '#ef4444' : verified ? '#22c55e' : 'var(--border)'}`, borderRadius: 10, fontSize: 13, fontFamily: 'DM Sans, sans-serif', outline: 'none' }} />
                    </div>
                    <button onClick={handleVerify} disabled={verifying || verified}
                        style={{ padding: '10px 16px', borderRadius: 10, border: 'none', background: verified ? '#dcfce7' : 'var(--primary)', color: verified ? '#15803d' : 'white', fontSize: 13, fontWeight: 700, cursor: verifying || verified ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'DM Sans, sans-serif', opacity: verifying || verified ? 0.9 : 1 }}>
                        {verifying ? <><RefreshCw size={13} className="spin" />Checking</> : verified ? <><Check size={13} />Verified</> : 'Verify'}
                    </button>
                </div>
                {upiError && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{upiError}</p>}
                {verified && <p style={{ fontSize: 11, color: '#15803d', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><Check size={11} /> UPI ID verified successfully</p>}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-ghost" onClick={onBack} style={{ padding: '12px 18px' }}>
                    <ArrowLeft size={15} /> Back
                </button>
                <button className="btn-primary" onClick={onNext} disabled={!verified} style={{ flex: 1 }}>
                    I've Paid — Get Receipt <ChevronRight size={15} />
                </button>
            </div>
        </div>
    )
}

function ModalReceipt({ form, donor, onClose }) {
    const selectedNGO = MOCK_NGOS.find(n => n._id === form.ngoId)
    const ref = genRef()
    const txn = genTxn()
    const now = new Date()

    const downloadReceipt = () => {
        const html = `<!DOCTYPE html><html><head><title>Donation Receipt</title>
    <style>body{font-family:Arial,sans-serif;max-width:480px;margin:40px auto;color:#1a1a1a}.logo{font-size:22px;font-weight:900;color:#1a6b3a;margin-bottom:4px}.tag{font-size:11px;color:#6b7280;margin-bottom:24px}.hero{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;text-align:center;margin-bottom:20px}.amount{font-size:36px;font-weight:900;color:#1a6b3a}table{width:100%;border-collapse:collapse;font-size:13px}td{padding:10px 8px;border-bottom:1px solid #f3f4f6}td:first-child{color:#6b7280;width:45%}td:last-child{font-weight:700}.footer{text-align:center;margin-top:24px;font-size:11px;color:#9ca3af}.badge{display:inline-block;background:#dcfce7;color:#15803d;padding:3px 12px;border-radius:99px;font-size:11px;font-weight:700}</style></head><body>
    <div class="logo">VASUDHA</div><div class="tag">Donation Receipt — Official</div>
    <div class="hero"><div style="font-size:13px;color:#6b7280;margin-bottom:4px">Total Donated</div><div class="amount">₹${fmt(form.amount)}</div><div style="margin-top:8px"><span class="badge">✓ Payment Confirmed</span></div></div>
    <table><tr><td>Receipt No.</td><td>${ref}</td></tr><tr><td>Transaction ID</td><td>${txn}</td></tr><tr><td>Date & Time</td><td>${now.toLocaleString('en-IN')}</td></tr><tr><td>Donor Name</td><td>${form.donorName || donor?.name || 'Donor'}</td></tr><tr><td>Email</td><td>${form.donorEmail || ''}</td></tr><tr><td>Phone</td><td>${form.donorPhone || ''}</td></tr>${form.pan ? `<tr><td>PAN</td><td>${form.pan}</td></tr>` : ''}<tr><td>NGO</td><td>${selectedNGO?.name}</td></tr><tr><td>Category</td><td>${selectedNGO?.category}</td></tr><tr><td>Donation Type</td><td style="text-transform:capitalize">${form.type}</td></tr><tr><td>Payment Mode</td><td>UPI</td></tr>${form.note ? `<tr><td>Message</td><td>${form.note}</td></tr>` : ''}</table>
    <div class="footer">System-generated receipt. For 80G certificate, contact NGO directly.<br/>Generated on ${now.toLocaleString('en-IN')} · VASUDHA Platform</div></body></html>`
        const win = window.open('', '_blank')
        win.document.write(html)
        win.document.close()
        setTimeout(() => win.print(), 400)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <CheckCircle2 size={34} color="#16a34a" />
                </div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>Donation Successful!</h2>
                <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>Thank you for making a difference ❤️</p>
            </div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>Amount Donated</p>
                <p style={{ fontSize: 34, fontWeight: 900, color: '#15803d' }}>₹{fmt(form.amount)}</p>
                <p style={{ fontSize: 13, color: '#4b5563', marginTop: 4, fontWeight: 600 }}>{selectedNGO?.name}</p>
            </div>
            <div style={{ border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                {[
                    { label: 'Receipt No.', value: ref, mono: true },
                    { label: 'Transaction ID', value: txn, mono: true },
                    { label: 'Date & Time', value: now.toLocaleString('en-IN') },
                    { label: 'Donor', value: form.donorName || donor?.name || 'Donor' },
                    { label: 'NGO', value: selectedNGO?.name },
                    { label: 'Type', value: <span style={{ textTransform: 'capitalize' }}>{form.type}</span> },
                    { label: 'Payment Mode', value: 'UPI' },
                    { label: 'Status', value: <span style={{ color: '#16a34a', fontWeight: 800 }}>✓ Confirmed</span> },
                ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', fontSize: 13, background: i % 2 === 0 ? '#f9fafb' : 'white' }}>
                        <span style={{ color: 'var(--muted)' }}>{row.label}</span>
                        <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: row.mono ? 'monospace' : undefined, fontSize: row.mono ? 11 : undefined }}>{row.value}</span>
                    </div>
                ))}
            </div>
            {form.pan && (
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <Info size={14} color="#2563eb" style={{ marginTop: 1, flexShrink: 0 }} />
                    <p style={{ fontSize: 12, color: '#1e40af' }}>Your PAN <strong>{form.pan}</strong> has been recorded. 80G certificate will be issued by the NGO.</p>
                </div>
            )}
            <div style={{ background: '#fefce8', border: '1px solid #fde68a', borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <AlertCircle size={14} color="#d97706" style={{ marginTop: 1, flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: '#92400e' }}>For <strong>80G tax exemption</strong>, contact <strong>{selectedNGO?.name}</strong> directly with receipt no. <strong>{ref}</strong></p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-outline" onClick={downloadReceipt} style={{ flex: 1 }}>
                    <Download size={15} /> Download Receipt
                </button>
                <button className="btn-primary" onClick={onClose} style={{ flex: 1 }}>
                    Done
                </button>
            </div>
        </div>
    )
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function DonorApp() {
    const [screen, setScreen] = useState('login') // login | forgot | dashboard

    useEffect(() => {
        // Inject styles
        if (!document.getElementById('vasudha-styles')) {
            const style = document.createElement('style')
            style.id = 'vasudha-styles'
            style.textContent = STYLES
            document.head.appendChild(style)
        }
        return () => {
            const el = document.getElementById('vasudha-styles')
            if (el) el.remove()
        }
    }, [])

    return (
        <>
            {screen === 'login' && (
                <LoginPage
                    onLogin={() => setScreen('dashboard')}
                    onForgot={() => setScreen('forgot')}
                />
            )}
            {screen === 'forgot' && (
                <ForgotPasswordPage
                    onBack={() => setScreen('login')}
                    onDone={() => setScreen('login')}
                />
            )}
            {screen === 'dashboard' && (
                <DonorDashboard
                    onLogout={() => setScreen('login')}
                />
            )}
        </>
    )
}
