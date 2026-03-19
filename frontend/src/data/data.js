// Mock Data Structure (MongoDB-like)
export const mockData = {
  // NGO Collection
  ngos: [
    {
      _id: '507f1f77bcf86cd799439011',
      name: 'Shiksha Foundation',
      email: 'contact@shiksha.org',
      status: 'approved',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
      description: 'Providing quality education to underprivileged children',
      registrationNumber: 'REG2020001',
      location: 'Delhi, India',
      panNumber: 'EXEPR2006H',
      foundedYear: 2023,
      phone: 9562310245,
      certificate80G: 'GHD84521EFR10FG200',
      fcraNumber: 'FCRA2020001',
      legalDocRef: 'legal_doc_507f1f77bcf86cd799439011.pdf',
      bankName: 'State Bank of India',
      accountNumber: '1234567890',
      ifscCode: 'SBIN0001234',
      accountHolderName: 'Shiksha Foundation',
      website: 'https://shikshafoundation.org',
      verified: true,
      rating: 4.8,
      totalDonations: 450000,
      volunteerCount: 45,
      activities: [
        { date: '2024-02-20', title: 'School supplies distribution', image: 'https://images.unsplash.com/photo-1427504494785-cdba6c3fb3e6?w=400&h=300&fit=crop' },
        { date: '2024-02-15', title: 'Teacher training session', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop' }
      ]
    },
    {
      _id: '507f1f77bcf86cd799439012',
      name: 'Street Dogs Care',
      email: 'care@streetdogs.org',
      status: 'approved',
      category: 'Animal Welfare',
      image: 'https://images.unsplash.com/photo-1633722715463-d30628cad4ae?w=400&h=300&fit=crop',
      description: 'Rescuing and caring for street animals',
      registrationNumber: 'REG2020002',
      location: 'Mumbai, India',
      verified: true,
      rating: 4.6,
      totalDonations: 380000,
      volunteerCount: 32,
      activities: [
        { date: '2024-02-18', title: 'Vaccination camp', image: 'https://images.unsplash.com/photo-1576091160550-112173f31c77?w=400&h=300&fit=crop' }
      ]
    },
    {
      _id: '507f1f77bcf86cd799439013',
      name: 'Clean Water Initiative',
      email: 'info@cleanwater.org',
      status: 'approved',
      category: 'Water & Sanitation',
      image: 'https://images.unsplash.com/photo-1599303840976-fc3d6f58b1c8?w=400&h=300&fit=crop',
      description: 'Bringing clean drinking water to rural villages',
      registrationNumber: 'REG2020003',
      location: 'Rajasthan, India',
      verified: true,
      rating: 4.9,
      totalDonations: 650000,
      volunteerCount: 28,
      activities: []
    }
  ],

  // Donor Collection
  donors: [
    {
      _id: '507f1f77bcf86cd799439021',
      name: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      phone: '9876543210',
      location: 'Bangalore, India',
      totalDonated: 125000,
      donations: [
        { ngoId: '507f1f77bcf86cd799439011', amount: 5000, date: '2024-02-20', type: 'one-time' },
        { ngoId: '507f1f77bcf86cd799439012', amount: 2000, date: '2024-02-15', type: 'one-time' }
      ],
      sdp: [ // Systematic Donation Plans
        { ngoId: '507f1f77bcf86cd799439011', frequency: 'monthly', amount: 1000, startDate: '2024-01-01' }
      ]
    },
    {
      _id: '507f1f77bcf86cd799439022',
      name: 'Priya Singh',
      email: 'priya@email.com',
      phone: '9876543211',
      location: 'Delhi, India',
      totalDonated: 95000,
      donations: [
        { ngoId: '507f1f77bcf86cd799439013', amount: 10000, date: '2024-02-10', type: 'one-time' }
      ],
      sdp: []
    }
  ],

  // Volunteer Collection
  volunteers: [
    {
      _id: '507f1f77bcf86cd799439031',
      name: 'Amit Sharma',
      email: 'amit@email.com',
      phone: '9876543220',
      location: 'Delhi, India',
      skills: ['Teaching', 'Mentoring', 'Social Media'],
      ngoIds: ['507f1f77bcf86cd799439011'],
      totalHours: 48,
      rating: 4.7,
      status: 'active'
    },
    {
      _id: '507f1f77bcf86cd799439032',
      name: 'Neha Gupta',
      email: 'neha@email.com',
      phone: '9876543221',
      location: 'Mumbai, India',
      skills: ['Medical', 'First Aid', 'Health Awareness'],
      ngoIds: ['507f1f77bcf86cd799439012'],
      totalHours: 72,
      rating: 4.9,
      status: 'active'
    }
  ],

  // Admin
  admins: [
    {
      _id: '507f1f77bcf86cd799439041',
      name: 'Admin User',
      email: 'admin@vasudha.org',
      role: 'super_admin',
      platformFee: 3
    }
  ],

  // Transactions
  transactions: [
    {
      _id: 't1',
      donorId: '507f1f77bcf86cd799439021',
      ngoId: '507f1f77bcf86cd799439011',
      amount: 5000,
      date: '2024-02-20',
      status: 'completed',
      type: 'donation',
      platformFee: 150
    },
    {
      _id: 't2',
      donorId: '507f1f77bcf86cd799439021',
      ngoId: '507f1f77bcf86cd799439012',
      amount: 2000,
      date: '2024-02-15',
      status: 'completed',
      type: 'donation',
      platformFee: 60
    }
  ],

  // Pending NGO Registrations
  pendingNGOs: [
    {
      _id: '507f1f77bcf86cd799439051',
      name: 'Women Empowerment Society',
      email: 'contact@womenpwr.org',
      category: 'Women Empowerment',
      registrationNumber: 'REG2024001',
      documents: ['registration_cert.pdf', 'tax_proof.pdf'],
      submittedDate: '2024-02-18',
      status: 'pending'
    }
  ],

  // Help Requests
  helpRequests: [
    {
      _id: 'hr1',
      ngoId: '507f1f77bcf86cd799439011',
      title: 'Need volunteers for book distribution',
      description: 'We need 20 volunteers for book distribution next Sunday',
      location: 'Delhi, Sector 5',
      skillsRequired: ['Teaching', 'Organizing'],
      hoursRequired: 4,
      date: '2024-02-25',
      status: 'open',
      volunteers: 8
    }
  ]
}

// Utility functions
export const getNGOById = (id) => mockData.ngos.find(ngo => ngo._id === id)
export const getDonorById = (id) => mockData.donors.find(donor => donor._id === id)
export const getVolunteerById = (id) => mockData.volunteers.find(vol => vol._id === id)
export const getNGOs = () => mockData.ngos
export const getDonors = () => mockData.donors
export const getVolunteers = () => mockData.volunteers
export const getTransactions = () => mockData.transactions
export const getPendingNGOs = () => mockData.pendingNGOs
export const getHelpRequests = () => mockData.helpRequests
