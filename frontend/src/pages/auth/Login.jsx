import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Heart, Mail, Lock, Eye, EyeOff, Loader, X, ArrowLeft } from 'lucide-react'

// ─── Forgot Password Modal ────────────────────────────────────────────────────
function ForgotPasswordModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
        <button onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 transition">
          <X className="w-4 h-4" />
        </button>

        {!sent ? (
          <>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-1">Forgot Password?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              Enter your email and we'll send you a reset link.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-70 flex items-center justify-center gap-2 text-sm"
              >
                {loading && <Loader className="w-4 h-4 animate-spin" />}
                Send Reset Link
              </button>
            </form>
            <button onClick={onClose}
              className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to sign in
            </button>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-1">Check your email</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              We sent a password reset link to<br />
              <span className="font-semibold text-gray-700">{email}</span>
            </p>
            <button onClick={onClose}
              className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition text-sm">
              Back to Sign In
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Main Login Page ──────────────────────────────────────────────────────────
export default function Login() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()

  const [email,          setEmail]          = useState('')
  const [password,       setPassword]       = useState('')
  const [showPassword,   setShowPassword]   = useState(false)
  const [error,          setError]          = useState('')
  const [showForgot,     setShowForgot]     = useState(false)

  const demoAccounts = [
    { email: 'rajesh@email.com',      password: 'password123', role: 'Donor',     color: 'bg-blue-500'   },
    { email: 'contact@shiksha.org',   password: 'password123', role: 'NGO',       color: 'bg-green-500'  },
    { email: 'amit@email.com',        password: 'password123', role: 'Volunteer', color: 'bg-purple-500' },
    { email: 'admin@vasudha.org',     password: 'password123', role: 'Admin',     color: 'bg-red-500'    },
  ]

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }
    login(email, password)
    const role =
      email.includes('shiksha') ? 'ngo'       :
      email.includes('amit')    ? 'volunteer' :
      email.includes('admin')   ? 'admin'     : 'donor'
    setTimeout(() => navigate(`/${role}/dashboard`), 1000)
  }

  const handleDemoLogin = (account) => {
    setEmail(account.email)
    setPassword(account.password)
  }

  const handleGoogleLogin = () => {
    // Wire up your Google OAuth here
    setError('Google login coming soon!')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <Heart className="w-8 h-8 text-white fill-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">VASUDHA</h1>
        <p className="text-gray-500 text-sm mt-1">Sign in to continue</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-5">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 text-sm mb-5"
        >
          {/* Google SVG icon */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-xs text-primary font-semibold hover:text-primary-dark transition"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-70 flex items-center justify-center gap-2 text-sm mt-2"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            Sign In →
          </button>
        </form>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-500 mt-5">
          New here?{' '}
          <a href="/auth/register" className="text-primary font-semibold hover:text-primary-dark transition">
            Create account
          </a>
        </p>
      </div>

      {/* Demo Accounts */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 mt-4">
        <h3 className="font-bold text-gray-900 mb-1">Demo Accounts</h3>
        <p className="text-gray-500 text-xs mb-4">Click any account to auto-fill credentials</p>
        <div className="grid grid-cols-2 gap-2">
          {demoAccounts.map((account, i) => (
            <button
              key={i}
              onClick={() => handleDemoLogin(account)}
              className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition border border-gray-200"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-gray-900 text-sm">{account.role}</p>
                <div className={`w-2.5 h-2.5 rounded-full ${account.color}`} />
              </div>
              <p className="text-xs text-gray-500 truncate">{account.email}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}
    </div>
  )
}