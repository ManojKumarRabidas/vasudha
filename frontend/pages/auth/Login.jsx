import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Heart, Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const demoAccounts = [
    { email: 'rajesh@email.com', password: 'password123', role: 'Donor', color: 'bg-blue-500' },
    { email: 'contact@shiksha.org', password: 'password123', role: 'NGO', color: 'bg-green-500' },
    { email: 'amit@email.com', password: 'password123', role: 'Volunteer', color: 'bg-purple-500' },
    { email: 'admin@vasudha.org', password: 'password123', role: 'Admin', color: 'bg-red-500' }
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    login(email, password)
    
    // Determine role and navigate
    const role = email.includes('donor') ? 'donor' : 
                 email.includes('shiksha') ? 'ngo' :
                 email.includes('amit') ? 'volunteer' :
                 email.includes('admin') ? 'admin' : 'donor'
    
    setTimeout(() => navigate(`/${role}/dashboard`), 1000)
  }

  const handleDemoLogin = (account) => {
    setEmail(account.email)
    setPassword(account.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-white">VASUDHA</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600 mb-8">Sign in to your account</p>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                Sign In
              </button>
            </form>
          </div>

          {/* Demo Accounts */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="font-bold text-gray-900 mb-4">Demo Accounts</h3>
            <p className="text-gray-600 text-sm mb-4">Try VASUDHA with demo accounts:</p>
            <div className="space-y-3">
              {demoAccounts.map((account, i) => (
                <button
                  key={i}
                  onClick={() => handleDemoLogin(account)}
                  className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{account.role}</p>
                      <p className="text-xs text-gray-600">{account.email}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${account.color}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
