import { Heart, Bell, Settings, LogOut, Menu, X, DollarSign, UserPlus, MessageSquare, Heart as HeartIcon, Check, CheckCheck, ChevronRight, User, Shield, BellRing, Globe, Palette, HelpCircle, Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

// ─── Mock Notifications ───────────────────────────────────────────────────────
const MOCK_NOTIFICATIONS = [
  {
    id: 1, type: 'donation', read: false,
    title: 'New Donation Received',
    message: 'Rajesh Kumar donated ₹50,000 to your NGO.',
    time: '2 min ago',
    avatar: 'R',
    avatarColor: 'bg-green-100 text-green-700',
  },
  {
    id: 2, type: 'volunteer_join', read: false,
    title: 'Volunteer Join Request',
    message: 'Priya Nair has requested to join as a volunteer.',
    time: '15 min ago',
    avatar: 'P',
    avatarColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 3, type: 'volunteer_help', read: false,
    title: 'Volunteer Needs Help',
    message: 'Karan Singh sent a message: "Need support for the event setup."',
    time: '1 hr ago',
    avatar: 'K',
    avatarColor: 'bg-orange-100 text-orange-700',
  },
  {
    id: 4, type: 'like', read: true,
    title: 'Post Liked',
    message: '142 people liked your "Annual Health Camp 2024" post.',
    time: '3 hr ago',
    avatar: '❤️',
    avatarColor: 'bg-red-100 text-red-600',
  },
  {
    id: 5, type: 'comment', read: true,
    title: 'New Comment',
    message: 'Meera Iyer commented: "Amazing work! Keep it up 🙌"',
    time: '5 hr ago',
    avatar: 'M',
    avatarColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 6, type: 'donation', read: true,
    title: 'New Donation Received',
    message: 'Tata Trusts transferred ₹1,00,000 as project grant.',
    time: '1 day ago',
    avatar: 'T',
    avatarColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 7, type: 'comment', read: true,
    title: 'New Comment',
    message: 'Ankit Gupta commented on your fundraiser post.',
    time: '2 days ago',
    avatar: 'A',
    avatarColor: 'bg-teal-100 text-teal-700',
  },
]

const NOTIFICATION_ICON = {
  donation: { icon: DollarSign, color: 'text-green-600 bg-green-50' },
  volunteer_join: { icon: UserPlus, color: 'text-blue-600 bg-blue-50' },
  volunteer_help: { icon: MessageSquare, color: 'text-orange-600 bg-orange-50' },
  like: { icon: HeartIcon, color: 'text-red-500 bg-red-50' },
  comment: { icon: MessageSquare, color: 'text-purple-600 bg-purple-50' },
}

// ─── Settings Options ─────────────────────────────────────────────────────────
const SETTINGS_OPTIONS = [
  { icon: User, label: 'Account & Profile', desc: 'Edit your NGO account details', color: 'text-blue-600 bg-blue-50' },
  { icon: Shield, label: 'Privacy & Security', desc: 'Password, 2FA, data settings', color: 'text-green-600 bg-green-50' },
  { icon: BellRing, label: 'Notification Preferences', desc: 'Control what alerts you receive', color: 'text-yellow-600 bg-yellow-50' },
  { icon: Globe, label: 'Language & Region', desc: 'Language, timezone, currency', color: 'text-teal-600 bg-teal-50' },
  { icon: Palette, label: 'Appearance / Theme', desc: 'Light, dark, or system theme', color: 'text-purple-600 bg-purple-50' },
  { icon: HelpCircle, label: 'Help & Support', desc: 'FAQs, contact us, report an issue', color: 'text-orange-600 bg-orange-50' },
]

// ─── Hook: close on outside click ────────────────────────────────────────────
function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (e) => { if (ref.current && !ref.current.contains(e.target)) handler() }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}

// ─── Notifications Dropdown ───────────────────────────────────────────────────
function NotificationsDropdown({ onClose }) {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => setNotifications(p => p.map(n => ({ ...n, read: true })))
  const markRead = (id) => setNotifications(p => p.map(n => n.id === id ? { ...n, read: true } : n))
  const deleteNotif = (id) => setNotifications(p => p.filter(n => n.id !== id))

  return (
    <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{unreadCount}</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-1 text-xs text-primary font-semibold hover:text-primary-dark transition">
            <CheckCheck className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-200" />
            No notifications
          </div>
        ) : (
          notifications.map(n => {
            const typeCfg = NOTIFICATION_ICON[n.type] || NOTIFICATION_ICON.comment
            const Icon = typeCfg.icon
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition hover:bg-gray-50 group relative ${!n.read ? 'bg-primary/5' : ''}`}
              >
                {/* Unread dot */}
                {!n.read && (
                  <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
                )}

                {/* Icon */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold ${n.avatarColor}`}>
                  {['❤️', '🔔'].includes(n.avatar)
                    ? <span className="text-base">{n.avatar}</span>
                    : n.avatar
                  }
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-xs font-semibold ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>{n.title}</p>
                    <span className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center ${typeCfg.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                </div>

                {/* Delete on hover */}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteNotif(n.id) }}
                  className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition p-1 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )
          })
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <button className="w-full text-center text-xs text-primary font-semibold hover:text-primary-dark transition">
            View all notifications
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Settings Dropdown ────────────────────────────────────────────────────────
function SettingsDropdown({ user, onLogout }) {
  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
      {/* User info header */}
      <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-base font-bold text-primary">
            {user?.name?.charAt(0)?.toUpperCase() || 'N'}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{user?.name || 'NGO Admin'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'admin@ngo.org'}</p>
          </div>
        </div>
      </div>

      {/* Settings list */}
      <div className="py-2">
        {SETTINGS_OPTIONS.map((opt, i) => (
          <button
            key={i}
            onClick={() => { }} // demo — no action
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition group"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${opt.color}`}>
              <opt.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{opt.label}</p>
              <p className="text-xs text-gray-400">{opt.desc}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-400 transition" />
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="px-3 py-3 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition group"
        >
          <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition">
            <LogOut className="w-4 h-4 text-red-500" />
          </div>
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
    </div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function NGONav({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Unread count derived from mock (in real app: from state/context)
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length

  const notifRef = useRef(null)
  const settingsRef = useRef(null)

  useOutsideClick(notifRef, () => setShowNotifications(false))
  useOutsideClick(settingsRef, () => setShowSettings(false))

  const toggleNotif = () => { setShowNotifications(p => !p); setShowSettings(false) }
  const toggleSettings = () => { setShowSettings(p => !p); setShowNotifications(false) }

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-100 shadow-sm z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-bold text-primary">VASUDHAA</h1>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-1">

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={toggleNotif}
              className={`relative p-2 rounded-xl transition ${showNotifications ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-primary hover:bg-gray-50'}`}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold px-0.5">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && <NotificationsDropdown onClose={() => setShowNotifications(false)} />}
          </div>

          {/* Settings */}
          <div ref={settingsRef} className="relative">
            <button
              onClick={toggleSettings}
              className={`p-2 rounded-xl transition ${showSettings ? 'bg-primary/10 text-primary' : 'text-gray-500 hover:text-primary hover:bg-gray-50'}`}
            >
              <Settings className={`w-5 h-5 transition-transform duration-300 ${showSettings ? 'rotate-45' : ''}`} />
            </button>
            {showSettings && <SettingsDropdown user={user} onLogout={onLogout} />}
          </div>

        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            {/* Notifications (mobile) */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">Notifications</p>
              {MOCK_NOTIFICATIONS.slice(0, 3).map(n => (
                <div key={n.id} className={`flex items-start gap-3 px-3 py-2.5 rounded-xl ${!n.read ? 'bg-primary/5' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${n.avatarColor}`}>
                    {n.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{n.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 mt-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 mb-2">Settings</p>
              {SETTINGS_OPTIONS.slice(0, 3).map((opt, i) => (
                <button key={i} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${opt.color}`}>
                    <opt.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 mt-3">
              <button onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}