import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import NGONav from '../../components/ngo/Nav'
import { mockData } from '../../data/data'
import { TrendingUp, Users, Heart, FileText, Plus } from 'lucide-react'

export default function NGODashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const ngo = mockData.ngos[0]

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NGONav user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{ngo.name}</h1>
            <p className="text-gray-600">NGO Management Dashboard</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
            <Plus className="w-5 h-5" />
            Post Activity
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Donations', value: `₹${(ngo.totalDonations / 100000).toFixed(1)}L`, icon: Heart, color: 'bg-red-50 text-red-600' },
            { label: 'Active Donors', value: '320', icon: Users, color: 'bg-blue-50 text-blue-600' },
            { label: 'Volunteers', value: ngo.volunteerCount, icon: Users, color: 'bg-green-50 text-green-600' },
            { label: 'Rating', value: `${ngo.rating}⭐`, icon: TrendingUp, color: 'bg-yellow-50 text-yellow-600' }
          ].map((stat, i) => (
            <div key={i} className={`p-6 rounded-lg ${stat.color.split(' ')[0]} border border-gray-200`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color.split(' ')[1]}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {['overview', 'donations', 'volunteers', 'activities', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 font-medium border-b-2 transition ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Donations */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Recent Donations</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">Donor {i}</p>
                          <p className="text-xs text-gray-600">2 days ago</p>
                        </div>
                        <p className="text-lg font-bold text-primary">₹{(5000 * i).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Recent Activities</h3>
                  <div className="space-y-4">
                    {ngo.activities.map((activity, i) => (
                      <div key={i} className="pb-4 border-b border-gray-100 last:border-0">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{activity.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'donations' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Donation History</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">Donor #{i}</p>
                        <p className="text-xs text-gray-600">Date: 2024-02-{20-i}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Received</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'volunteers' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Volunteer Team</h3>
                <div className="space-y-4">
                  {mockData.volunteers.map((vol, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-gray-900">{vol.name}</p>
                          <p className="text-xs text-gray-600">{vol.skills.join(', ')}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                      </div>
                      <p className="text-sm text-gray-600">Total Hours: <span className="font-medium">{vol.totalHours}h</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Activity Posts</h3>
                <div className="space-y-4">
                  {ngo.activities.map((activity, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{activity.date}</p>
                      <div className="mt-3 flex gap-2">
                        <button className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Edit</button>
                        <button className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-6">NGO Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Organization Name</label>
                    <input type="text" defaultValue={ngo.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Registration Number</label>
                    <input type="text" defaultValue={ngo.registrationNumber} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Location</label>
                    <input type="text" defaultValue={ngo.location} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <button className="w-full px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium mt-6">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium text-gray-900">{ngo.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="font-medium text-green-600">{ngo.verified ? '✓ Yes' : 'Not Verified'}</p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium">
                    View Public Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
