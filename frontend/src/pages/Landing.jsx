import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart, Users, TrendingUp, Shield, ArrowRight, CheckCircle,
  MapPin, X, ChevronRight, Star
} from 'lucide-react'

// ─── Demo Data ────────────────────────────────────────────────────────────────

const FEATURED_NGO = {
  name: 'Paws & Hope Foundation',
  location: 'Mumbai, Maharashtra',
  emoji: '🐾',
  tagLabel: 'Animal Welfare',
  tagColor: 'bg-green-100 text-green-700',
  raised: 260000,
  goal: 500000,
  shortDesc:
    "Mumbai's largest no-kill street animal rescue network — treating, vaccinating, and rehoming dogs and cats across 12 neighbourhoods.",
  about:
    'Founded in 2016, Paws & Hope operates three rescue vans across Mumbai, a 200-bed rehabilitation centre, and monthly adoption drives. Every rescued animal receives veterinary care, vaccination, and microchipping before rehoming.',
  stats: [
    { n: '340', l: 'Animals rescued' },
    { n: '12', l: 'Adoption drives' },
    { n: '98%', l: 'Rehome rate' },
  ],
  needs: ['Veterinary medicines', 'Kennel bedding', 'Volunteer drivers', 'Animal feed'],
}

const NGO_LIST = [
  {
    id: 1,
    name: 'Aasha Kiran Child Foundation',
    location: 'Kolkata, West Bengal',
    emoji: '👧',
    type: 'human',
    tagColor: 'bg-blue-100 text-blue-700',
    raised: 180000,
    goal: 300000,
    impact: '1,200 children educated',
    shortDesc: 'Free education & skill training for underprivileged children in Kolkata urban slums.',
    about:
      'Aasha Kiran runs 14 learning centres across Kolkata\'s informal settlements, offering schooling for children aged 5–16. Includes digital literacy, spoken English, and vocational training.',
    stats: [{ n: '1,200', l: 'Children enrolled' }, { n: '14', l: 'Learning centres' }, { n: '91%', l: 'Retention rate' }],
    needs: ['Stationery', 'Tablets', 'Teacher stipends', 'Furniture'],
  },
  {
    id: 2,
    name: 'Annadaan Trust',
    location: 'New Delhi, NCR',
    emoji: '🍲',
    type: 'human',
    tagColor: 'bg-orange-100 text-orange-700',
    raised: 95000,
    goal: 150000,
    impact: '50,000 meals served',
    shortDesc: 'Hot, nutritious meals every day for daily-wage workers and homeless individuals in Delhi.',
    about:
      "Annadaan's community kitchens operate 365 days a year, serving breakfast and dinner to over 500 people daily near construction sites and railway stations.",
    stats: [{ n: '500+', l: 'Meals per day' }, { n: '3', l: 'Community kitchens' }, { n: '50K', l: 'Total served' }],
    needs: ['Rice & dal', 'Cooking fuel', 'Kitchen volunteers', 'Packaging'],
  },
  {
    id: 3,
    name: 'Green Paws Sanctuary',
    location: 'Bengaluru, Karnataka',
    emoji: '🐕',
    type: 'animal',
    tagColor: 'bg-green-100 text-green-700',
    raised: 310000,
    goal: 400000,
    impact: '520 animals sterilised',
    shortDesc: "Karnataka's largest no-kill shelter providing refuge, sterilisation, and adoption services.",
    about:
      'Green Paws houses over 300 animals at any time and runs a large-scale ABC programme. Their mobile vet unit covers 8 neighbourhoods weekly.',
    stats: [{ n: '520', l: 'Sterilised' }, { n: '300+', l: 'Animals housed' }, { n: '8', l: 'Areas covered' }],
    needs: ['Sterilisation kits', 'Animal food', 'Shelter maintenance', 'Medical staff'],
  },
  {
    id: 4,
    name: 'Umeed Shelter Home',
    location: 'Hyderabad, Telangana',
    emoji: '🏠',
    type: 'human',
    tagColor: 'bg-purple-100 text-purple-700',
    raised: 130000,
    goal: 250000,
    impact: '410 women supported',
    shortDesc: 'Emergency shelter, legal aid, and livelihood skills for women escaping domestic violence.',
    about:
      'Umeed provides up to 12 months of residential support pairing secure housing with trauma counselling, legal representation, and job-readiness training.',
    stats: [{ n: '410', l: 'Women helped' }, { n: '80%', l: 'Employment rate' }, { n: '12 mo', l: 'Support period' }],
    needs: ['Counsellors', 'Legal volunteers', 'Vocational trainers', 'Hygiene kits'],
  },
  {
    id: 5,
    name: 'Shikhsha Seva Society',
    location: 'Jaipur, Rajasthan',
    emoji: '📚',
    type: 'human',
    tagColor: 'bg-blue-100 text-blue-700',
    raised: 160000,
    goal: 280000,
    impact: '3,400 students enrolled',
    shortDesc: 'Mobile classroom buses reaching 60+ remote Rajasthan villages to combat school dropout.',
    about:
      'Shikhsha Seva operates converted buses as mobile schools, each staffed by two teachers and equipped with books, science kits, and a projector.',
    stats: [{ n: '3,400', l: 'Students' }, { n: '60+', l: 'Villages reached' }, { n: '50%', l: 'Dropout reduction' }],
    needs: ['Teachers', 'Diesel for buses', 'Science kits', 'Student uniforms'],
  },
  {
    id: 6,
    name: 'FeatherFree Bird Trust',
    location: 'Pune, Maharashtra',
    emoji: '🦜',
    type: 'animal',
    tagColor: 'bg-sky-100 text-sky-700',
    raised: 55000,
    goal: 120000,
    impact: '800 birds rehabilitated',
    shortDesc: 'Rescuing injured wild birds and running avian rehab centres across Maharashtra.',
    about:
      'FeatherFree operates two avian hospitals with specialists in raptor care and migratory species. Over 800 birds have been successfully released back into the wild.',
    stats: [{ n: '800', l: 'Birds released' }, { n: '2', l: 'Avian hospitals' }, { n: '40+', l: 'Species treated' }],
    needs: ['Bird feed', 'Avian medicines', 'Specialist vets', 'Transport'],
  },
]

const STORIES = [
  {
    id: 0,
    emoji: '✏️',
    bg: 'bg-blue-50',
    tagLabel: 'Education',
    tagColor: 'bg-blue-100 text-blue-700',
    title: "From traffic signal to classroom — Riya's story",
    ngo: 'Aasha Kiran Child Foundation',
    quote:
      "I used to watch school buses go past and wonder if I'd ever sit in one. Now I want to be a science teacher.",
    person: 'Riya, 15 — Class 9 student',
    story:
      "Riya was 9 when Aasha Kiran found her selling marigold garlands at a Kolkata intersection, missing school for two years. After enrolment, she not only caught up with peers — she topped her batch in the state-board exam at 14.",
    stats: [{ n: '1,200', l: 'Students like Riya' }, { n: '91%', l: 'Retention' }, { n: '14', l: 'Centres' }],
  },
  {
    id: 1,
    emoji: '🐶',
    bg: 'bg-green-50',
    tagLabel: 'Animal Rescue',
    tagColor: 'bg-green-100 text-green-700',
    title: 'Bruno found his forever home',
    ngo: 'Paws & Hope Foundation',
    quote:
      "He can't run yet, but he wags his tail every morning. He survived because a stranger cared enough to call at 2 AM.",
    person: "Aditi, Bruno's adoptive parent",
    story:
      'A motorist called Paws & Hope at 2 AM after spotting a heavily injured dog on the highway. The rescue team arrived within 20 minutes. Bruno had three fractured legs. After four months of intensive care, he was adopted by a Thane family.',
    stats: [{ n: '340', l: 'Animals rescued' }, { n: '98%', l: 'Rehome rate' }, { n: '12', l: 'Adoption drives' }],
  },
  {
    id: 2,
    emoji: '🍛',
    bg: 'bg-orange-50',
    tagLabel: 'Food Relief',
    tagColor: 'bg-orange-100 text-orange-700',
    title: "A hot meal every night — Ramesh's relief",
    ngo: 'Annadaan Trust',
    quote:
      "There were nights I went to bed telling myself tomorrow will be better. Annadaan made sure tomorrow had food in it.",
    person: 'Ramesh Kumar, daily-wage worker, Delhi',
    story:
      "Ramesh lost his construction job when the monsoon halted work for three months. A colleague brought him to Annadaan's kitchen. Three months later, with work resumed, Ramesh now volunteers every Sunday morning.",
    stats: [{ n: '500+', l: 'Meals daily' }, { n: '50K', l: 'Total served' }, { n: '365', l: 'Days a year' }],
  },
  {
    id: 3,
    emoji: '💜',
    bg: 'bg-purple-50',
    tagLabel: 'Women Safety',
    tagColor: 'bg-purple-100 text-purple-700',
    title: "Reena's second chance at life",
    ngo: 'Umeed Shelter Home',
    quote:
      "I left with a skill, a court order, and something I thought I'd lost — confidence. My children have a mother again.",
    person: 'Reena (name changed), Hyderabad',
    story:
      "Reena arrived at Umeed at 3 AM with her two children and a bruised face. Over nine months, Umeed's team helped her file a legal case, complete a tailoring course, and secure a job 2 km from her new rented room.",
    stats: [{ n: '410', l: 'Women helped' }, { n: '80%', l: 'Found employment' }, { n: '100+', l: 'Legal cases filed' }],
  },
  {
    id: 4,
    emoji: '🌍',
    bg: 'bg-teal-50',
    tagLabel: 'Community',
    tagColor: 'bg-teal-100 text-teal-700',
    title: 'One village, two transformations',
    ngo: 'One Earth Foundation',
    quote:
      "We didn't know healthy animals meant a healthier village. Now our children play freely, and the dogs protect the lane at night.",
    person: 'Selvi, resident — Periyakuppam, Chennai',
    story:
      "When One Earth's team arrived, they found 30 unvaccinated street dogs and families disposing waste near water sources. Six months later, every dog was vaccinated and the local school had adopted two as campus mascots.",
    stats: [{ n: '90', l: 'Animals vaccinated' }, { n: '180', l: 'Families reached' }, { n: '35%', l: 'Disease reduction' }],
  },
  {
    id: 5,
    emoji: '🦅',
    bg: 'bg-sky-50',
    tagLabel: 'Wildlife',
    tagColor: 'bg-sky-100 text-sky-700',
    title: 'Wings again — the kite that flew free',
    ngo: 'FeatherFree Bird Trust',
    quote:
      "When she circled overhead three times before disappearing into the treeline, everyone on that hill cried. That's why we do this.",
    person: 'Dr. Priya Nair, FeatherFree veterinarian',
    story:
      "A black kite arrived with a broken wing and a fishing hook in its beak. After two weeks of surgery and flight-muscle rehab, the kite was released at Sinhagad forest — and circled overhead before vanishing into the trees.",
    stats: [{ n: '800', l: 'Birds released' }, { n: '40+', l: 'Species treated' }, { n: '2', l: 'Avian hospitals' }],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n) {
  return n >= 100000 ? '₹' + (n / 100000).toFixed(1) + 'L' : '₹' + (n / 1000).toFixed(0) + 'K'
}
function pct(r, g) {
  return Math.min(100, Math.round((r / g) * 100))
}

// ─── NGO Detail Modal ────────────────────────────────────────────────────────

function NGOModal({ ngo, onClose }) {
  if (!ngo) return null
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="bg-primary rounded-t-2xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-4xl mb-3">{ngo.emoji}</div>
          <h3 className="text-xl font-bold text-white mb-1">{ngo.name}</h3>
          <p className="text-white/70 text-sm flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {ngo.location}
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">About</p>
            <p className="text-gray-600 text-sm leading-relaxed">{ngo.about}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Impact at a glance</p>
            <div className="grid grid-cols-3 gap-3">
              {ngo.stats.map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xl font-bold text-primary">{s.n}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Current needs</p>
            <div className="flex flex-wrap gap-2">
              {ngo.needs.map((nd, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">{nd}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Fundraising progress</p>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-semibold text-primary">{fmt(ngo.raised)} raised</span>
              <span className="text-gray-400">Goal: {fmt(ngo.goal)}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: pct(ngo.raised, ngo.goal) + '%' }} />
            </div>
            <p className="text-xs text-gray-400 mt-1">{pct(ngo.raised, ngo.goal)}% funded</p>
          </div>

          <div className="flex gap-3 pt-1">
            <button className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition text-sm">
              Donate Now
            </button>
            <button className="flex-1 px-4 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition text-sm">
              Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Story Detail Modal ───────────────────────────────────────────────────────

function StoryModal({ story, onClose }) {
  if (!story) return null
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className={`${story.bg} rounded-t-2xl flex items-center justify-center py-10 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition"
          >
            <X className="w-4 h-4 text-gray-700" />
          </button>
          <span className="text-6xl">{story.emoji}</span>
        </div>

        <div className="p-6 space-y-4">
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${story.tagColor}`}>
            {story.tagLabel}
          </span>
          <h3 className="text-xl font-bold text-gray-900 leading-snug">{story.title}</h3>
          <p className="text-xs font-semibold text-primary">{story.ngo}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{story.story}</p>

          <div className="border-l-4 border-primary pl-4 py-2 bg-gray-50 rounded-r-lg">
            <p className="text-sm text-gray-700 italic leading-relaxed">"{story.quote}"</p>
            <p className="text-xs text-gray-400 mt-2">— {story.person}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {story.stats.map((s, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-lg font-bold text-primary">{s.n}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>

          <button className="w-full px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition text-sm">
            Support This NGO
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Landing Page ────────────────────────────────────────────────────────

export default function Landing() {
  const navigate = useNavigate()
  const [selectedNGO, setSelectedNGO] = useState(null)
  const [selectedStory, setSelectedStory] = useState(null)
  const [showAllNGOs, setShowAllNGOs] = useState(false)

  const visibleNGOs = showAllNGOs ? NGO_LIST : NGO_LIST.slice(0, 4)

  return (
    <div className="min-h-screen bg-white">

      {/* ── Header (unchanged) ── */}
      <header className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img src="/images/vasudha-logo-2.png" alt="VASUDHA Logo" />
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

      {/* ── Hero Section (unchanged) ── */}
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

        {/* Features Grid (unchanged) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Users, title: 'Connect', desc: 'Link with NGOs doing great work' },
            { icon: Heart, title: 'Donate', desc: 'Support causes you care about' },
            { icon: TrendingUp, title: 'Impact', desc: 'Track your social contribution' },
            { icon: Shield, title: 'Verified', desc: 'Trust through transparency' },
          ].map((feature, i) => (
            <div key={i} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats (unchanged) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-y border-gray-200">
          {[
            { label: '1000+', desc: 'Verified NGOs' },
            { label: '50K+', desc: 'Active Donors' },
            { label: '100K+', desc: 'Volunteers' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">{stat.label}</p>
              <p className="text-gray-600">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* ── NEW: Featured NGO Banner ── */}
        <div className="py-20">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
            <div>
              <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-1">★ Featured This Month</p>
              <h3 className="text-3xl font-bold text-gray-900">NGO Spotlight</h3>
            </div>
            <button
              onClick={() => setSelectedNGO(FEATURED_NGO)}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View full profile <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-primary rounded-2xl p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Left content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center text-3xl">
                  {FEATURED_NGO.emoji}
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">Featured NGO</p>
                  <h4 className="text-xl font-bold text-white">{FEATURED_NGO.name}</h4>
                  <p className="text-white/60 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {FEATURED_NGO.location}
                  </p>
                </div>
              </div>

              <p className="text-white/75 text-sm leading-relaxed mb-6 max-w-lg">
                {FEATURED_NGO.shortDesc}
              </p>

              {/* Impact stats row */}
              <div className="flex flex-wrap gap-6 mb-6">
                {FEATURED_NGO.stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold text-white">{s.n}</p>
                    <p className="text-white/50 text-xs">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="max-w-sm">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white font-semibold">{fmt(FEATURED_NGO.raised)} raised</span>
                  <span className="text-white/50">Goal: {fmt(FEATURED_NGO.goal)}</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: pct(FEATURED_NGO.raised, FEATURED_NGO.goal) + '%' }}
                  />
                </div>
                <p className="text-white/40 text-xs mt-1">
                  {pct(FEATURED_NGO.raised, FEATURED_NGO.goal)}% funded
                </p>
              </div>
            </div>

            {/* Right CTA */}
            <div className="flex flex-col gap-3 md:items-stretch md:min-w-[180px]">
              <button
                onClick={() => setSelectedNGO(FEATURED_NGO)}
                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition text-sm flex items-center justify-center gap-2"
              >
                Donate Now <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 border-2 border-white/40 text-white rounded-xl font-semibold hover:bg-white/10 transition text-sm">
                Volunteer
              </button>
            </div>
          </div>
        </div>

        {/* ── NEW: Explore NGOs ── */}
        <div className="py-4 pb-20">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Explore NGOs</h3>
              <p className="text-gray-600 mt-1">Browse our verified network of NGOs making real impact.</p>
            </div>
            <button
              onClick={() => setShowAllNGOs(v => !v)}
              className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              {showAllNGOs ? 'Show less' : 'View all NGOs'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* NGO Cards — same grid as Features section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleNGOs.map((ngo, i) => (
              <div
                key={ngo.id}
                onClick={() => setSelectedNGO(ngo)}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-primary/40 transition cursor-pointer flex flex-col gap-4"
              >
                {/* Icon + name */}
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {ngo.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 leading-snug">{ngo.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-0.5 mt-0.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" /> {ngo.location}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">{ngo.shortDesc}</p>

                {/* Progress */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-primary">{fmt(ngo.raised)} raised</span>
                    <span className="text-gray-400">Goal: {fmt(ngo.goal)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: pct(ngo.raised, ngo.goal) + '%' }}
                    />
                  </div>
                </div>

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-500 font-medium">{ngo.impact}</p>
                  <button
                    onClick={e => { e.stopPropagation(); setSelectedNGO(ngo) }}
                    className="text-xs px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold"
                  >
                    Donate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── NEW: Success Stories ── */}
        <div className="py-20 border-t border-gray-200">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-3">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">Success Stories</h3>
              <p className="text-gray-600 mt-1">Real people, real animals — changed by your generosity.</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span>Click any story to read more</span>
            </div>
          </div>

          {/* Stories Grid — same 4-col grid as Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORIES.map((story, i) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition cursor-pointer"
              >
                {/* Story image area */}
                <div className={`${story.bg} flex items-center justify-center py-8 relative`}>
                  <span className="text-5xl">{story.emoji}</span>
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${story.tagColor}`}>
                    {story.tagLabel}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h4 className="font-bold text-gray-900 mb-3 text-sm leading-snug">{story.title}</h4>

                  {/* Pull quote — same blockquote pattern */}
                  <div className="border-l-4 border-primary pl-3 mb-4">
                    <p className="text-xs text-gray-600 italic leading-relaxed line-clamp-3">
                      "{story.quote}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-primary">{story.ngo}</p>
                    <span className="text-xs bg-gray-50 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                      {story.stats[0].n} {story.stats[0].l}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Types (unchanged) */}
        <div className="py-20 border-t border-gray-200">
          <h3 className="text-3xl font-bold text-center mb-12">Who We Serve</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Donors', icon: '💳', desc: 'Support NGOs & causes you believe in' },
              { title: 'NGOs', icon: '🏢', desc: 'Manage donations & find volunteers' },
              { title: 'Volunteers', icon: '🤝', desc: 'Make real impact in communities' },
              { title: 'Admins', icon: '⚙️', desc: 'Oversee platform & ensure trust' },
            ].map((type, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-xl text-center">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h4 className="font-bold text-lg mb-2">{type.title}</h4>
                <p className="text-gray-600 text-sm">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features (unchanged) */}
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
              'Activity feed & community engagement',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (unchanged) */}
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

      {/* Modals */}
      <NGOModal ngo={selectedNGO} onClose={() => setSelectedNGO(null)} />
      <StoryModal story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  )
}