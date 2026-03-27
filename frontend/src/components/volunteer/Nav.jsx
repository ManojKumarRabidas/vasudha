import { Heart, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function VolunteerNav({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-100 shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-primary">VASUDHA</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-primary transition">Find Work</a>
          <a href="#" className="text-gray-600 hover:text-primary transition">My NGOs</a>
          <a href="#" className="text-gray-600 hover:text-primary transition">Hours</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-primary transition">
            <Settings className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center text-sm font-bold text-purple-700">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-4">
            <a href="#" className="block text-gray-600 hover:text-primary">Find Work</a>
            <a href="#" className="block text-gray-600 hover:text-primary">My NGOs</a>
            <a href="#" className="block text-gray-600 hover:text-primary">Hours</a>

            <button onClick={onLogout} className="w-full text-left text-red-600 hover:text-red-700">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
