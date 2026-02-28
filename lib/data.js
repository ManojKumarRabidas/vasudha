// VASUDHA - Mock Data Layer
// This file contains all mock data that simulates a MongoDB database
// Will be replaced with actual API calls to backend in production

export const data = {
  users: {
    admin: {
      _id: "admin_1",
      name: "Admin User",
      email: "admin@vasudha.org",
      phone: "+91-9876543210",
      role: "admin",
      avatar: "/placeholder-user.jpg",
      createdAt: "2024-01-01",
      totalFundsManaged: 2500000,
      platformFeeEarned: 125000,
    },
    donors: [
      {
        _id: "donor_1",
        name: "Rajesh Kumar",
        email: "rajesh@email.com",
        phone: "+91-9123456789",
        role: "donor",
        avatar: "/placeholder-user.jpg",
        city: "Mumbai",
        state: "Maharashtra",
        isVerified: true,
        totalDonated: 250000,
        createdAt: "2024-02-15",
        sdpActive: 2,
        followingNGOs: ["ngo_1", "ngo_3"],
        donationHistory: [
          {
            _id: "donation_1",
            ngoId: "ngo_1",
            amount: 5000,
            type: "oneTime",
            date: "2024-12-01",
            status: "completed",
            cause: "Education",
          },
          {
            _id: "donation_2",
            ngoId: "ngo_2",
            amount: 1000,
            type: "sdp",
            date: "2024-12-10",
            status: "completed",
            cause: "Healthcare",
          },
        ],
        sdps: [
          {
            _id: "sdp_1",
            ngoId: "ngo_1",
            amount: 2000,
            frequency: "monthly",
            startDate: "2024-06-01",
            status: "active",
            nextDueDate: "2025-03-01",
            totalContributed: 28000,
          },
        ],
      },
      {
        _id: "donor_2",
        name: "Priya Sharma",
        email: "priya@email.com",
        phone: "+91-9234567890",
        role: "donor",
        avatar: "/placeholder-user.jpg",
        city: "Bangalore",
        state: "Karnataka",
        isVerified: true,
        totalDonated: 150000,
        createdAt: "2024-03-20",
        sdpActive: 1,
        followingNGOs: ["ngo_2"],
        donationHistory: [],
        sdps: [],
      },
    ],
    ngos: [
      {
        _id: "ngo_1",
        name: "Shiksha Foundation",
        email: "contact@shiksha.org",
        phone: "+91-8123456789",
        role: "ngo",
        avatar: "/placeholder-user.jpg",
        registrationNumber: "NGO2020001",
        city: "Delhi",
        state: "Delhi",
        description: "Providing quality education to underprivileged children in rural areas.",
        cause: ["Education", "Community Development"],
        isApproved: true,
        approvedDate: "2024-01-10",
        rating: 4.8,
        followers: 1250,
        totalReceived: 450000,
        bankDetails: {
          accountNumber: "1234567890123456",
          ifsc: "HDFC0000123",
          accountHolder: "Shiksha Foundation",
        },
        documents: {
          registration: "/docs/registration.pdf",
          panCard: "/docs/pan.pdf",
          previousWork: "/docs/work_proof.pdf",
        },
        volunteers: ["volunteer_1", "volunteer_2"],
        activities: [
          {
            _id: "activity_1",
            title: "Summer Camp 2024 Success",
            description: "Successfully conducted summer camp for 500+ children",
            image: "/placeholder.jpg",
            date: "2024-12-15",
            type: "impact",
          },
        ],
      },
      {
        _id: "ngo_2",
        name: "Swasth Bharat",
        email: "contact@swasth.org",
        phone: "+91-8234567890",
        role: "ngo",
        avatar: "/placeholder-user.jpg",
        registrationNumber: "NGO2021002",
        city: "Mumbai",
        state: "Maharashtra",
        description: "Healthcare services and awareness programs for rural communities.",
        cause: ["Healthcare", "Women Empowerment"],
        isApproved: true,
        approvedDate: "2024-02-20",
        rating: 4.6,
        followers: 890,
        totalReceived: 320000,
        bankDetails: {
          accountNumber: "9876543210987654",
          ifsc: "ICIC0000456",
          accountHolder: "Swasth Bharat",
        },
        documents: {
          registration: "/docs/registration2.pdf",
          panCard: "/docs/pan2.pdf",
          previousWork: "/docs/work_proof2.pdf",
        },
        volunteers: ["volunteer_3"],
        activities: [],
      },
      {
        _id: "ngo_3",
        name: "Street Dogs Care",
        email: "contact@dogcare.org",
        phone: "+91-8345678901",
        role: "ngo",
        avatar: "/placeholder-user.jpg",
        registrationNumber: "NGO2022003",
        city: "Bangalore",
        state: "Karnataka",
        description: "Rescue, medical care, and rehabilitation for street dogs.",
        cause: ["Animal Welfare", "Community Service"],
        isApproved: false,
        approvedDate: null,
        rating: 0,
        followers: 450,
        totalReceived: 0,
        bankDetails: null,
        documents: {
          registration: "/docs/registration3.pdf",
          panCard: "/docs/pan3.pdf",
          previousWork: "/docs/work_proof3.pdf",
        },
        volunteers: [],
        activities: [],
      },
    ],
    volunteers: [
      {
        _id: "volunteer_1",
        name: "Amit Patel",
        email: "amit@email.com",
        phone: "+91-9456789012",
        role: "volunteer",
        avatar: "/placeholder-user.jpg",
        city: "Delhi",
        state: "Delhi",
        latitude: 28.7041,
        longitude: 77.1025,
        skills: ["Teaching", "Community Outreach"],
        interests: ["Education", "Community Development"],
        joinedNGOs: ["ngo_1"],
        hoursContributed: 240,
        isVerified: true,
        rating: 4.9,
        createdAt: "2024-04-10",
      },
      {
        _id: "volunteer_2",
        name: "Neha Singh",
        email: "neha@email.com",
        phone: "+91-9567890123",
        role: "volunteer",
        avatar: "/placeholder-user.jpg",
        city: "Delhi",
        state: "Delhi",
        latitude: 28.6139,
        longitude: 77.2090,
        skills: ["Healthcare", "Counseling"],
        interests: ["Healthcare", "Mental Health"],
        joinedNGOs: ["ngo_1"],
        hoursContributed: 156,
        isVerified: true,
        rating: 4.7,
        createdAt: "2024-05-15",
      },
      {
        _id: "volunteer_3",
        name: "Vikram Reddy",
        email: "vikram@email.com",
        phone: "+91-9678901234",
        role: "volunteer",
        avatar: "/placeholder-user.jpg",
        city: "Mumbai",
        state: "Maharashtra",
        latitude: 19.0760,
        longitude: 72.8777,
        skills: ["Medical Professional", "Health Awareness"],
        interests: ["Healthcare", "Women Empowerment"],
        joinedNGOs: ["ngo_2"],
        hoursContributed: 310,
        isVerified: true,
        rating: 4.8,
        createdAt: "2024-03-01",
      },
    ],
  },

  donations: {
    causes: [
      {
        _id: "cause_1",
        name: "Education",
        description: "Support quality education for underprivileged children",
        icon: "Book",
        color: "bg-blue-500",
        totalRaised: 2500000,
        beneficiaries: 15000,
      },
      {
        _id: "cause_2",
        name: "Healthcare",
        description: "Healthcare services and medical camps for rural areas",
        icon: "Heart",
        color: "bg-red-500",
        totalRaised: 1800000,
        beneficiaries: 25000,
      },
      {
        _id: "cause_3",
        name: "Animal Welfare",
        description: "Rescue and care for stray animals",
        icon: "Paw",
        color: "bg-amber-500",
        totalRaised: 850000,
        beneficiaries: 5000,
      },
      {
        _id: "cause_4",
        name: "Women Empowerment",
        description: "Skills training and financial independence for women",
        icon: "Users",
        color: "bg-purple-500",
        totalRaised: 1200000,
        beneficiaries: 8000,
      },
      {
        _id: "cause_5",
        name: "Environmental Conservation",
        description: "Tree plantation and environmental awareness programs",
        icon: "Leaf",
        color: "bg-green-600",
        totalRaised: 650000,
        beneficiaries: 3000,
      },
    ],

    generalDonations: [
      {
        _id: "gen_donation_1",
        cause: "Education",
        amount: 25000,
        donor: "donor_1",
        date: "2024-12-10",
        status: "distributed",
        distributedTo: ["ngo_1", "ngo_2"],
      },
    ],

    platformStats: {
      totalDonated: 5450000,
      totalTransactions: 1250,
      totalDonors: 8500,
      totalNGOs: 145,
      platformFeePercentage: 4,
      totalPlatformFeeCollected: 218000,
    },
  },

  notifications: [
    {
      _id: "notif_1",
      userId: "donor_1",
      type: "donation_received",
      title: "Donation Received",
      message: "Thank you! Your donation of 5000 INR has been received by Shiksha Foundation",
      icon: "Heart",
      date: "2024-12-15",
      read: false,
    },
    {
      _id: "notif_2",
      userId: "ngo_1",
      type: "donation_received",
      title: "New Donation",
      message: "Received 5000 INR from Rajesh Kumar for Education cause",
      icon: "DollarSign",
      date: "2024-12-15",
      read: false,
    },
  ],

  requests: {
    volunteerJoinRequests: [
      {
        _id: "req_1",
        volunteerId: "volunteer_1",
        ngoId: "ngo_1",
        status: "pending",
        date: "2024-12-14",
      },
    ],
    helpRequests: [
      {
        _id: "help_1",
        ngoId: "ngo_1",
        title: "Volunteers needed for summer camp",
        description: "We need 10 volunteers for our upcoming summer camp in Delhi",
        location: "Delhi",
        skillsRequired: ["Teaching", "Community Outreach"],
        urgency: "high",
        date: "2024-12-10",
        status: "open",
        volunteersNeeded: 10,
        volunteersAssigned: 2,
      },
    ],
  },

  transactions: [
    {
      _id: "txn_1",
      fromUserId: "donor_1",
      toNgoId: "ngo_1",
      amount: 5000,
      type: "donation",
      status: "completed",
      date: "2024-12-15",
      transactionId: "TXN123456",
      platformFee: 200,
      netAmount: 4800,
    },
  ],
};

// Helper functions to simulate API calls
export const fetchUser = (userId, role) => {
  if (role === "admin") {
    return data.users.admin;
  }
  if (role === "donor") {
    return data.users.donors.find((d) => d._id === userId);
  }
  if (role === "ngo") {
    return data.users.ngos.find((n) => n._id === userId);
  }
  if (role === "volunteer") {
    return data.users.volunteers.find((v) => v._id === userId);
  }
};

export const fetchAllNGOs = (filters = {}) => {
  let ngos = data.users.ngos;
  if (filters.approved) {
    ngos = ngos.filter((ngo) => ngo.isApproved === filters.approved);
  }
  if (filters.cause) {
    ngos = ngos.filter((ngo) => ngo.cause.includes(filters.cause));
  }
  return ngos;
};

export const fetchDonorFeed = (donorId) => {
  const donor = data.users.donors.find((d) => d._id === donorId);
  if (!donor) return [];
  
  const followedNGOs = data.users.ngos.filter((ngo) =>
    donor.followingNGOs.includes(ngo._id)
  );
  
  const activities = [];
  followedNGOs.forEach((ngo) => {
    if (ngo.activities && ngo.activities.length > 0) {
      activities.push(
        ...ngo.activities.map((activity) => ({
          ...activity,
          ngoId: ngo._id,
          ngoName: ngo.name,
          ngoAvatar: ngo.avatar,
        }))
      );
    }
  });
  
  return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const fetchNGOVolunteers = (ngoId) => {
  const ngo = data.users.ngos.find((n) => n._id === ngoId);
  if (!ngo) return [];
  
  return data.users.volunteers.filter((v) => ngo.volunteers.includes(v._id));
};

export const fetchPendingNGOs = () => {
  return data.users.ngos.filter((ngo) => !ngo.isApproved);
};

export const fetchAllDonors = () => {
  return data.users.donors;
};

export const fetchAllVolunteers = () => {
  return data.users.volunteers;
};

export const fetchCauses = () => {
  return data.donations.causes;
};

export const fetchDonationTransactions = (ngoId) => {
  return data.transactions.filter((txn) => txn.toNgoId === ngoId);
};

export const fetchNotifications = (userId) => {
  return data.notifications.filter((notif) => notif.userId === userId);
};

export const fetchNGOStatistics = (ngoId) => {
  const ngo = data.users.ngos.find((n) => n._id === ngoId);
  const transactions = data.transactions.filter((t) => t.toNgoId === ngoId);
  const volunteers = data.users.volunteers.filter((v) => v.joinedNGOs.includes(ngoId));
  
  return {
    totalReceived: ngo?.totalReceived || 0,
    totalTransactions: transactions.length,
    activeVolunteers: volunteers.length,
    totalVolunteerHours: volunteers.reduce((sum, v) => sum + v.hoursContributed, 0),
    rating: ngo?.rating || 0,
  };
};
