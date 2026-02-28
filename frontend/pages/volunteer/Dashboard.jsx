import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import VolunteerNav from '../../components/volunteer/Nav'
import { mockData } from '../../data/data'
import { Clock, Heart, MapPin, Briefcase, Plus } from 'lucide-react'

export default function VolunteerDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const volunteer = mockData.volunteers[0]

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <VolunteerNav user={user} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {volunteer.name}</h1>
            <p className="text-gray-600">Volunteer Dashboard</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
            <Plus className="w-5 h-5" />
            Find Opportunities
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Hours', value: volunteer.totalHours, icon: Clock, color: 'bg-blue-50 text-blue-600' },
            { label: 'NGOs Joined', value: volunteer.ngoIds.length, icon: Heart, color: 'bg-red-50 text-red-600' },
            { label: 'Rating', value: `${volunteer.rating}⭐`, icon: Briefcase, color: 'bg-yellow-50 text-yellow-600' },
            { label: 'Status', value: 'Active', icon: MapPin, color: 'bg-green-50 text-green-600' }
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
          {['overview', 'opportunities', 'my-ngos', 'hours', 'profile'].map((tab) => (
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
              {tab === 'opportunities' && 'Opportunities'}
              {tab === 'my-ngos' && 'My NGOs'}
              {tab === 'hours' && 'Hours Log'}
              {tab === 'profile' && 'Profile'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Help Requests */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Active Help Requests</h3>
                  {mockData.helpRequests.map((request, i) => (
                    <div key={i} className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold text-gray-900">{request.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{request.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{request.hoursRequired}h</span>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium text-sm">
                        Join Help Request
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'opportunities' && (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">Opportunity {i}</h4>
                        <p className="text-sm text-gray-600 mt-1">NGO Name - {['Teaching', 'Mentoring', 'Social Media'][i % 3]}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Open</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Help with community outreach and event organization</p>
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium text-sm">
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'my-ngos' && (
              <div className="space-y-4">
                {volunteer.ngoIds.map((ngoId) => {
                  const ngo = mockData.ngos.find(n => n._id === ngoId)
                  return (
                    <div key={ngoId} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-start gap-4">
                        <img src={ngo.image} alt={ngo.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900">{ngo.name}</h4>
                          <p className="text-sm text-gray-600">{ngo.category}</p>
                          <p className="text-xs text-gray-500 mt-2">Rating: {ngo.rating}⭐</p>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                          View Profile
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {activeTab === 'hours' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Hours Log</h3>
                <div className="space-y-4">
                  {[
                    { date: '2024-02-20', hours: 4, ngo: 'Shiksha Foundation', activity: 'Teaching' },
                    { date: '2024-02-18', hours: 6, ngo: 'Shiksha Foundation', activity: 'Event Organization' },
                    { date: '2024-02-15', hours: 5, ngo: 'Shiksha Foundation', activity: 'Mentoring' }
                  ].map((log, i) => (
                    <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{log.activity}</p>
                        <p className="text-xs text-gray-600">{log.ngo} - {log.date}</p>
                      </div>
                      <span className="text-lg font-bold text-primary">{log.hours}h</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-6">My Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                    <input type="text" defaultValue={volunteer.name} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Location</label>
                    <input type="text" defaultValue={volunteer.location} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Skills</label>
                    <input type="text" defaultValue={volunteer.skills.join(', ')} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
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
              <h3 className="font-bold text-gray-900 mb-4">Profile Stats</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium text-gray-900 mt-1">{volunteer.location}</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600">Skills</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {volunteer.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full mt-4 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-medium">
                  Browse All NGOs
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
