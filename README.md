# VASUDHA - Connect Donors, NGOs & Volunteers

A comprehensive React-Vite platform connecting donors, NGOs, and volunteers for social impact and community development.

## Project Structure

```
.
├── frontend/                       # React-Vite frontend application
│   ├── pages/                      # Page components
│   │   ├── Landing.jsx             # Landing/home page
│   │   ├── auth/
│   │   │   └── Login.jsx           # Login page (4 user types)
│   │   ├── donor/
│   │   │   └── Dashboard.jsx       # Donor dashboard
│   │   ├── ngo/
│   │   │   └── Dashboard.jsx       # NGO dashboard
│   │   ├── volunteer/
│   │   │   └── Dashboard.jsx       # Volunteer dashboard
│   │   └── admin/
│   │       └── Dashboard.jsx       # Admin dashboard
│   ├── components/
│   │   ├── common/                 # Shared components
│   │   │   └── ActivityFeed.jsx    # Infinite scroll feed
│   │   ├── donor/                  # Donor-specific components
│   │   │   ├── Nav.jsx
│   │   │   └── Stats.jsx
│   │   ├── ngo/                    # NGO-specific components
│   │   │   └── Nav.jsx
│   │   ├── volunteer/              # Volunteer-specific components
│   │   │   └── Nav.jsx
│   │   └── admin/                  # Admin-specific components
│   │       └── Nav.jsx
│   ├── context/
│   │   └── AuthContext.jsx         # Authentication context
│   ├── data/
│   │   └── data.js                 # Mock data (MongoDB-like)
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── backend/                        # Backend folder (empty, ready for API)
│   ├── models/                     # Database models (future)
│   ├── routes/                     # API routes (future)
│   ├── controllers/                # Business logic (future)
│   └── middleware/                 # Custom middleware (future)
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── package.json
└── README.md
```

## Features

### Donor Dashboard
- Browse NGO activity feed with infinite scroll
- Make one-time donations
- Set up Systematic Donation Plans (SDP)
- Track donation history
- Follow and get notifications from NGOs

### NGO Dashboard
- Manage incoming donations
- Post activities and updates
- Recruit and track volunteers
- View financial metrics
- Update profile and bank details

### Volunteer Dashboard
- Discover volunteer opportunities
- Join multiple NGOs
- Track volunteer hours
- View active help requests
- Manage skills and profile

### Admin Dashboard
- Approve/reject NGO registrations
- Monitor all transactions
- Manage users (donors, volunteers, NGOs)
- View financial reports
- Track platform earnings (3-5% fee)

## Technology Stack

- **Frontend Framework**: React 18 + Vite
- **Language**: Pure JavaScript (no TypeScript)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Mock Data**: MongoDB-like JavaScript structure
- **State Management**: Context API

## Getting Started

### Prerequisites
- Node.js 16+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Open http://localhost:3000 in your browser

## Demo Credentials

Try these accounts to test different user types:

| Role | Email | Password |
|------|-------|----------|
| Donor | rajesh@email.com | password123 |
| NGO | contact@shiksha.org | password123 |
| Volunteer | amit@email.com | password123 |
| Admin | admin@vasudha.org | password123 |

## Design System

### Colors
- **Primary Green** (#1F7F4A): Trust, NGO actions, main CTAs
- **Secondary Gold** (#F59E0B): Impact, donations, highlights
- **Accent Teal** (#14B8A6): Innovation, connections, secondary actions
- **Neutrals**: Grays for text, borders, backgrounds

### Typography
- **Font**: System fonts (Inter, Segoe UI, sans-serif)
- **Headings**: Bold with clear hierarchy
- **Body**: Regular weight, readable line height

## Mock Data Structure

The `frontend/data/data.js` contains MongoDB-like mock data:

```javascript
{
  ngos: [
    {
      _id: '507f1f77bcf86cd799439011',
      name: 'Shiksha Foundation',
      email: 'contact@shiksha.org',
      status: 'approved',
      category: 'Education',
      ...
    }
  ],
  donors: [...],
  volunteers: [...],
  transactions: [...],
  pendingNGOs: [...],
  helpRequests: [...]
}
```

## File Overview

| File | Purpose |
|------|---------|
| `frontend/App.jsx` | Routes and user flows |
| `frontend/context/AuthContext.jsx` | Authentication state management |
| `frontend/data/data.js` | Mock database (195+ lines) |
| `frontend/pages/*/` | Dashboard components for each role |
| `frontend/components/*/Nav.jsx` | Navigation bars for each role |
| `frontend/components/common/ActivityFeed.jsx` | Infinite scroll feed component |

## Backend Integration (Future)

To integrate with a backend:

1. **Set up Node.js/Express server** in `backend/` folder
2. **Create MongoDB schemas** for:
   - Users (donors, NGOs, volunteers, admins)
   - Donations & transactions
   - Volunteers & help requests
   - Activities & notifications

3. **Build REST API endpoints**:
   ```
   POST /api/auth/login
   POST /api/auth/register
   GET /api/ngos
   GET /api/ngos/:id
   POST /api/donations
   GET /api/donations
   POST /api/volunteers
   GET /api/volunteers
   GET /api/admin/users
   POST /api/admin/approve-ngo
   ```

4. **Replace mock data calls** with actual API calls in frontend components

5. **Update AuthContext** to handle JWT tokens

Example:
```javascript
// Before (mock data)
const ngos = mockData.ngos

// After (with backend)
const response = await fetch('/api/ngos')
const ngos = await response.json()
```

## Key Components

### AuthContext
- Manages user login/logout state
- Stores user information
- Provides auth context to all components

### ActivityFeed
- Displays NGO activities with infinite scroll
- Optimized rendering with Intersection Observer
- Shows likes, comments, share options

### Navigation Components
- Role-specific nav bars (Donor, NGO, Volunteer, Admin)
- Mobile responsive with hamburger menu
- Quick access to important features

### Dashboard Components
- Tab-based interfaces
- Statistics and analytics
- Interactive data management
- Modals and forms for actions

## Current Status

**Completed:**
- Full React-Vite setup with Tailwind CSS
- 4 complete dashboards (Donor, NGO, Volunteer, Admin)
- Landing page with feature showcase
- Multi-role login system
- Mock data layer (195+ lines)
- Navigation components for each role
- Activity feed with infinite scroll
- Responsive design (mobile-first)
- 50+ reusable components

**Ready for:**
- Backend API integration
- Database connection
- Payment gateway setup
- Real-time features
- Production deployment

## Performance

- Optimized infinite scroll with IntersectionObserver
- Lazy loading of components
- Minimal bundle size (Vite optimized)
- Fast HMR (Hot Module Replacement) during development
- Tailwind CSS purging for production

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 12+, Chrome Android

## Contributing

1. Create feature branches from `main`
2. Follow component-based architecture
3. Keep components modular and reusable
4. Test on mobile and desktop
5. Update documentation

## Future Enhancements

- Payment integration (Stripe/Razorpay)
- Real-time notifications
- Messaging system
- File uploads (AWS S3)
- Analytics dashboard
- Dark mode
- Multi-language support
- Mobile app (React Native)
- Advanced search & filters
- Email notifications

## Deployment

### Vercel
```bash
vercel deploy
```

### Netlify
```bash
netlify deploy
```

### Docker
Create Dockerfile for containerized deployment

### Traditional Server
- Build: `npm run build`
- Deploy dist/ folder to any static host
- Set up backend API separately

## License

MIT - Free to use for commercial and personal projects

## Support

For questions or issues:
- Check existing documentation in root folder
- Review component code for usage examples
- Test with demo credentials first

---

Built with React + Vite for social impact and community development.

