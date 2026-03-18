import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import NGONav from '../../components/ngo/Nav'
import { mockData } from '../../data/data'
import { TrendingUp, Users, Heart, Plus } from 'lucide-react'
import PostActivityModal from '../../components/ngo/PostActivityModel'
import PublicProfileModal from '../../components/ngo/PublicProfileModal'
import TransactionsTab from '../../components/ngo/TransactionsTab'
import VolunteersTab from '../../components/ngo/VolunteersTab'
import ActivitiesTab from '../../components/ngo/ActivitiesTab'


export default function NGODashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [showPostModal, setShowPostModal] = useState(false)
  const [showPublicProfile, setShowPublicProfile] = useState(false)
  const ngo = mockData.ngos[0]

  // Profile form state — pre-filled from mockData
  const [profileForm, setProfileForm] = useState({
    name: ngo.name || '',
    registrationNumber: ngo.registrationNumber || '',
    location: ngo.location || '',
    description: ngo.description || '',
    website: ngo.website || '',
    phone: ngo.phone || '',
    email: ngo.email || '',
    foundedYear: ngo.foundedYear || '',
    panNumber: ngo.panNumber || '',
    certificate80G: ngo.certificate80G || '',
    fcraNumber: ngo.fcraNumber || '',
    bankName: ngo.bankName || '',
    accountNumber: ngo.accountNumber || '',
    ifscCode: ngo.ifscCode || '',
    accountHolderName: ngo.accountHolderName || '',
    legalDocRef: ngo.legalDocRef || '',
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const handlePostSubmit = (data) => {
    // In a real app: push to state / API
    console.log('New post:', data)
  }

  const stats = [
    {
      label: 'Total Donations',
      value: `₹${(ngo.totalDonations / 100000).toFixed(1)}L`,
      icon: Heart,
      bg: 'bg-red-50',
      iconColor: 'text-red-500',
      textColor: 'text-red-600',
    },
    {
      label: 'Active Donors',
      value: '320',
      icon: Users,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      textColor: 'text-blue-600',
    },
    {
      label: 'Volunteers',
      value: ngo.volunteerCount,
      icon: Users,
      bg: 'bg-green-50',
      iconColor: 'text-green-500',
      textColor: 'text-green-600',
    },
    {
      label: 'Rating',
      value: `${ngo.rating} ⭐`,
      icon: TrendingUp,
      bg: 'bg-yellow-50',
      iconColor: 'text-yellow-500',
      textColor: 'text-yellow-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <NGONav user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ngo.name}</h1>
            <p className="text-gray-500 text-sm mt-1">NGO Management Dashboard</p>
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium shadow-sm"
          >
            <Plus className="w-5 h-5" /> Post Activity
          </button>
        </div>

        {/* Stats — FIX: use inline style classes split properly so Tailwind JIT includes them */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-6 rounded-xl border border-gray-200 ${stat.bg}`}
            >
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
        <div className="flex gap-1 mb-8 border-b border-gray-200">
          {['overview', 'transactions', 'volunteers', 'activities', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 font-medium border-b-2 transition text-sm ${activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="space-y-6 lg:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Donations</h3>
                    <div className="space-y-4">
                      {[{ name: "Rajib Kumar", amount: 5000 }, { name: "Priya Sharma", amount: 3000 }, { name: "Amit Patel", amount: 2000 }].map((donor) => (
                        <div key={donor.name} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                          <div>
                            <p className="font-medium text-gray-900">{donor.name}</p>
                            <p className="text-xs text-gray-400">{Math.floor(Math.random() * 30) + 1} days ago</p>
                          </div>
                          <p className="text-lg font-bold text-primary">₹{donor.amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                      {ngo.activities.map((activity, i) => (
                        <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
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
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Verification</p>
                        <p className={`font-semibold mt-0.5 ${ngo.verified ? 'text-green-600' : 'text-red-500'}`}>
                          {ngo.verified ? '✓ Verified' : '✗ Not Verified'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Registration No.</p>
                        <p className="font-semibold text-gray-800 mt-0.5">{ngo.registrationNumber}</p>
                      </div>
                      <div className="pt-4 border-t border-gray-100 space-y-2">
                        <button
                          onClick={() => setActiveTab('profile')}
                          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-sm font-medium"
                        >
                          Edit Profile
                        </button>
                        <button
                          onClick={() => setShowPublicProfile(true)}
                          className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition text-sm font-medium"
                        >
                          View Public Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DONATIONS */}
            {activeTab === 'transactions' && <TransactionsTab ngo={ngo} />}

            {/* VOLUNTEERS */}
            {activeTab === 'volunteers' && <VolunteersTab />}

            {/* ACTIVITIES */}
            {activeTab === 'activities' && <ActivitiesTab />}

            {/* PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-8">
                <h3 className="font-bold text-gray-900 text-lg">NGO Profile</h3>

                {/* Basic Info */}
                <section>
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
                    Basic Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Organization Name', name: 'name', type: 'text' },
                      { label: 'Registration Number', name: 'registrationNumber', type: 'text' },
                      { label: 'Location / City', name: 'location', type: 'text' },
                      { label: 'Founded Year', name: 'foundedYear', type: 'number' },
                      { label: 'Email Address', name: 'email', type: 'email' },
                      { label: 'Phone Number', name: 'phone', type: 'tel' },
                      { label: 'Website', name: 'website', type: 'url' },
                    ].map((field) => (
                      <div key={field.name} className={field.name === 'name' ? 'md:col-span-2' : ''}>
                        <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={profileForm[field.name]}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Description / Mission</label>
                      <textarea
                        name="description"
                        value={profileForm.description}
                        onChange={handleProfileChange}
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      />
                    </div>
                  </div>
                </section>

                {/* Legal & Compliance */}
                <section>
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
                    Legal & Compliance (Verification)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'PAN / Tax ID', name: 'panNumber', placeholder: 'e.g. ABCDE1234F' },
                      { label: '80G Certificate Number', name: 'certificate80G', placeholder: 'e.g. CIT(E)/80G/...' },
                      { label: 'FCRA Registration Number', name: 'fcraNumber', placeholder: 'e.g. 094780001' },
                      { label: 'Legal Document Reference', name: 'legalDocRef', placeholder: 'Trust deed / Society reg. ref.' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                        <input
                          type="text"
                          name={field.name}
                          value={profileForm[field.name]}
                          onChange={handleProfileChange}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                {/* Bank Details */}
                <section>
                  <h4 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
                    Bank Account Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Bank Name', name: 'bankName', placeholder: 'e.g. State Bank of India' },
                      { label: 'Account Holder Name', name: 'accountHolderName', placeholder: 'As per bank records' },
                      { label: 'Account Number', name: 'accountNumber', placeholder: 'xxxxxxxxxxxxxxxx' },
                      { label: 'IFSC Code', name: 'ifscCode', placeholder: 'e.g. SBIN0001234' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs font-medium text-gray-500 mb-1">{field.label}</label>
                        <input
                          type="text"
                          name={field.name}
                          value={profileForm[field.name]}
                          onChange={handleProfileChange}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <button className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold text-sm shadow-sm">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <PostActivityModal
        isOpen={showPostModal}
        onClose={() => setShowPostModal(false)}
        onSubmit={handlePostSubmit}
      />
      <PublicProfileModal
        isOpen={showPublicProfile}
        onClose={() => setShowPublicProfile(false)}
        ngo={{ ...ngo, ...profileForm }}
      />
    </div>
  )
}