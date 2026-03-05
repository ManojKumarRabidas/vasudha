import { useNavigate } from 'react-router-dom'
import { Heart, Users, TrendingUp, Shield, ArrowRight, CheckCircle } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                {/* <Heart className="w-6 h-6 text-white" /> */}
                <img src="../public/images/vasudha-logo-2.png" alt="VASUDHA Logo" />
              </div>
              <h1 className="text-2xl font-bold text-primary">VASUDHA 1.0</h1>
            </div>
            <div>
              <button
                onClick={() => navigate('/auth/login')}
                className="px-6 py-2 border-2 border-primary bg-primary text-white rounded-lg hover:bg-primary-dark transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/auth/register')}
                className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition ml-4"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Connect for Social Impact
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            VASUDHA is a transparent platform connecting donors, NGOs, and volunteers to create meaningful social change and community development.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate('/auth/login')}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition font-semibold">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Users, title: 'Connect', desc: 'Link with NGOs doing great work' },
            { icon: Heart, title: 'Donate', desc: 'Support causes you care about' },
            { icon: TrendingUp, title: 'Impact', desc: 'Track your social contribution' },
            { icon: Shield, title: 'Verified', desc: 'Trust through transparency' }
          ].map((feature, i) => (
            <div key={i} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-y border-gray-200">
          {[
            { label: '1000+', desc: 'Verified NGOs' },
            { label: '50K+', desc: 'Active Donors' },
            { label: '100K+', desc: 'Volunteers' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{stat.label}</p>
              <p className="text-gray-600">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* User Types */}
        <div className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">Who We Serve</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Donors', icon: '💳', desc: 'Support NGOs & causes you believe in' },
              { title: 'NGOs', icon: '🏢', desc: 'Manage donations & find volunteers' },
              { title: 'Volunteers', icon: '🤝', desc: 'Make real impact in communities' },
              { title: 'Admins', icon: '⚙️', desc: 'Oversee platform & ensure trust' }
            ].map((type, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-xl text-center">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h4 className="font-bold text-lg mb-2">{type.title}</h4>
                <p className="text-gray-600 text-sm">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="py-20">
          <h3 className="text-3xl font-bold mb-12">Key Features</h3>
          <div className="space-y-4">
            {[
              'Multi-role authentication for 4 user types',
              'NGO approval & verification workflow',
              'Donation tracking & impact reporting',
              'Systematic Donation Plans (SDP)',
              'Volunteer coordination system',
              'Real-time notifications',
              'Financial transparency & reporting',
              'Activity feed & community engagement'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-secondary" />
                <span className="font-bold text-lg">VASUDHA</span>
              </div>
              <p className="text-gray-400">Connecting donors, NGOs & volunteers for social impact.</p>
            </div>
            {['Platform', 'Company', 'Support'].map((col, i) => (
              <div key={i}>
                <h4 className="font-bold mb-4">{col}</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">Our Story</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VASUDHA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
