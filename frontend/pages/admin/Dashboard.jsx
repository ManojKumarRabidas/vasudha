import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AdminNav from '../../components/admin/Nav'
import { mockData } from '../../data/data'
import { CheckCircle, X, TrendingUp, Users, Building, DollarSign } from 'lucide-react'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [pendingNGOs, setPendingNGOs] = useState(mockData.pendingNGOs)

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const approveNGO = (id) => {
    setPendingNGOs(pendingNGOs.filter(ngo => ngo._id !== id))
  }

  const rejectNGO = (id) => {
    setPendingNGOs(pendingNGOs.filter(ngo => ngo._id !== id))
  }

  // Calculate stats
  const totalDonations = mockData.transactions.reduce((sum, t) => sum + t.amount, 0)
  const platformEarnings = mockData.transactions.reduce((sum, t) => sum + t.platformFee, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Platform Management & Oversight</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">
          {[
            { label: 'Total Users', value: mockData.donors.length + mockData.volunteers.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
            { label: 'Active NGOs', value: mockData.ngos.length, icon: Building, color: 'bg-green-50 text-green-600' },
            { label: 'Total Donations', value: `₹${(totalDonations / 100000).toFixed(1)}L`, icon: DollarSign, color: 'bg-purple-50 text-purple-600' },
            { label: 'Platform Fee', value: `₹${(platformEarnings / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'bg-yellow-50 text-yellow-600' }
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
          {['overview', 'pending-ngos', 'users', 'transactions', 'reports'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-4 font-medium border-b-2 transition ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'pending-ngos' && 'Pending NGOs'}
              {tab === 'users' && 'Users'}
              {tab === 'transactions' && 'Transactions'}
              {tab === 'reports' && 'Reports'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Pending NGO Approvals */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">NGO Approvals Pending</h3>
                  {pendingNGOs.length === 0 ? (
                    <p className="text-gray-600 py-8 text-center">No pending approvals</p>
                  ) : (
                    <div className="space-y-4">
                      {pendingNGOs.map((ngo) => (
                        <div key={ngo._id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-bold text-gray-900">{ngo.name}</p>
                              <p className="text-sm text-gray-600">{ngo.email}</p>
                            </div>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => approveNGO(ngo._id)}
                              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-medium"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectNGO(ngo._id)}
                              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Transactions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Recent Transactions</h3>
                  <div className="space-y-4">
                    {mockData.transactions.slice(0, 5).map((transaction, i) => (
                      <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-gray-900">Transaction #{transaction._id}</p>
                          <p className="text-xs text-gray-600">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">₹{transaction.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">Fee: ₹{transaction.platformFee}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pending-ngos' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Pending NGO Registrations</h3>
                {pendingNGOs.length === 0 ? (
                  <p className="text-gray-600 py-12 text-center">All applications approved!</p>
                ) : (
                  <div className="space-y-4">
                    {pendingNGOs.map((ngo) => (
                      <div key={ngo._id} className="p-6 border border-gray-200 rounded-lg">
                        <div className="mb-4">
                          <h4 className="font-bold text-gray-900">{ngo.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{ngo.email}</p>
                          <p className="text-sm text-gray-600">Reg: {ngo.registrationNumber}</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
                          <div className="flex gap-2">
                            {ngo.documents.map((doc, i) => (
                              <button key={i} className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                                {doc}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveNGO(ngo._id)}
                            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm font-medium flex items-center justify-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button
                            onClick={() => rejectNGO(ngo._id)}
                            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Donors */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Donors ({mockData.donors.length})</h3>
                  <div className="space-y-3">
                    {mockData.donors.map((donor, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{donor.name}</p>
                          <p className="text-xs text-gray-600">{donor.email}</p>
                        </div>
                        <span className="text-sm font-medium">₹{donor.totalDonated.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Volunteers */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Volunteers ({mockData.volunteers.length})</h3>
                  <div className="space-y-3">
                    {mockData.volunteers.map((volunteer, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{volunteer.name}</p>
                          <p className="text-xs text-gray-600">{volunteer.skills.join(', ')}</p>
                        </div>
                        <span className="text-sm font-medium">{volunteer.totalHours}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">All Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-2 font-medium">Transaction ID</th>
                        <th className="text-left py-2 px-2 font-medium">Amount</th>
                        <th className="text-left py-2 px-2 font-medium">Fee</th>
                        <th className="text-left py-2 px-2 font-medium">Date</th>
                        <th className="text-left py-2 px-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.transactions.map((tx, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-2 font-medium text-gray-900">{tx._id}</td>
                          <td className="py-3 px-2">₹{tx.amount.toLocaleString()}</td>
                          <td className="py-3 px-2">₹{tx.platformFee}</td>
                          <td className="py-3 px-2 text-gray-600">{tx.date}</td>
                          <td className="py-3 px-2">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                {['Financial Report', 'User Activity Report', 'NGO Performance Report'].map((report, i) => (
                  <div key={i} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-gray-900">{report}</h4>
                      <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-20 space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Platform Settings</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Platform Fee</p>
                    <p className="font-bold text-gray-900">3-5%</p>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <button className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium text-sm">
                      Edit Settings
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium text-sm mb-2">
                  Send Notifications
                </button>
                <button className="w-full px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium text-sm">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
