import { useState, useEffect } from 'react'
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
          </button> */}
          <button
            onClick={() => setShowDonationModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
          >
            <Plus className="w-5 h-5" /> New Donation
          </button>
        </div>

        {/* Stats */}
        <DonorStats donations={donations} />

        {/* Tabs */}
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

        {/* Content */}
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

          {/* Sidebar - NGOs You Follow */}
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
}
