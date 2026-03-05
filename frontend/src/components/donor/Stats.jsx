import { Heart, TrendingUp, Users } from 'lucide-react'

export default function DonorStats({ donations }) {
  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0)
  const totalNGOs = new Set(donations.map(d => d.ngoId)).size

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Total Donated</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">₹{totalDonated.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">NGOs Supported</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{totalNGOs}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm">Donations Made</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{donations.length}</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
