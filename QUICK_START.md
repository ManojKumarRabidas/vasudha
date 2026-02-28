# VASUDHA Quick Start - React Vite Version

Get VASUDHA running in under 5 minutes!

## Step 1: Install & Run

```bash
npm install
npm run dev
```

The app opens at http://localhost:3000 automatically.

## Step 2: Login with Demo Accounts

On the login page, scroll down to "Demo Accounts" and click any of these:

| Role | Email | Password |
|------|-------|----------|
| Donor | rajesh@email.com | password123 |
| NGO | contact@shiksha.org | password123 |
| Volunteer | amit@email.com | password123 |
| Admin | admin@vasudha.org | password123 |

## Quick Tour

### Donor Dashboard
- View NGO activity feed (infinite scroll)
- See donation statistics
- Make donations to NGOs
- Set up Systematic Donation Plans (SDP)
- Track donation history

**Try:** Click "New Donation" button, browse NGOs in the feed

### NGO Dashboard
- View donation metrics and financials
- Manage volunteer team
- Post activities and updates
- Request volunteer help
- Update profile information

**Try:** Check the "Recent Donations" section, view volunteer list

### Volunteer Dashboard
- Discover volunteer opportunities
- Join multiple NGOs
- Track volunteer hours
- View help requests
- Manage skills and profile

**Try:** Browse "My NGOs" tab, check active help requests

### Admin Dashboard
- Approve/reject NGO registrations
- Monitor all transactions
- View user management
- Track platform finances
- Generate reports

**Try:** Go to "Pending NGOs" tab and approve an application

## What to Explore

- **Landing Page**: Features, testimonials, and CTA buttons
- **Infinite Scroll**: Scroll down on activity feed to load more content
- **Responsive Design**: Resize browser to see mobile layout
- **Tab Navigation**: Switch between different sections
- **Statistics**: View real-time metrics for each role

## Project Structure

```
frontend/
  ├── pages/
  │   ├── Landing.jsx
  │   ├── auth/Login.jsx
  │   ├── donor/Dashboard.jsx
  │   ├── ngo/Dashboard.jsx
  │   ├── volunteer/Dashboard.jsx
  │   └── admin/Dashboard.jsx
  ├── components/
  │   ├── common/ActivityFeed.jsx
  │   ├── donor/Nav.jsx, Stats.jsx
  │   ├── ngo/Nav.jsx
  │   ├── volunteer/Nav.jsx
  │   └── admin/Nav.jsx
  ├── context/AuthContext.jsx
  ├── data/data.js (mock data)
  └── App.jsx

backend/ (ready for integration)
```

## Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Design Colors

- **Primary Green** (#1F7F4A) - Main actions, NGO features
- **Secondary Gold** (#F59E0B) - Donations, impact
- **Accent Teal** (#14B8A6) - Secondary actions
- **Neutrals** - Grays and whites

## Mock Data

All data is in `frontend/data/data.js` with MongoDB-like structure:
- 3 sample NGOs (2 approved, 1 pending)
- 2 sample donors with donation history
- 2 sample volunteers with hours tracked
- 1 admin account
- Sample transactions and help requests

## Testing Checklist

- [ ] Test all 4 login accounts
- [ ] Explore each dashboard
- [ ] Check responsive design (F12 DevTools)
- [ ] Scroll infinite feed
- [ ] Click tab navigation
- [ ] Review statistics
- [ ] Test logout

## Backend Integration

To connect to a backend:

1. Replace mock data calls with API endpoints
2. Update `AuthContext.jsx` to use real authentication
3. Create backend folder with Node.js/Express
4. Connect MongoDB database
5. Deploy to production

Example API endpoints needed:
```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/ngos
POST   /api/donations
GET    /api/volunteers
GET    /api/admin/users
POST   /api/admin/approve-ngo
```

## Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- --port 3001
```

**Styles not loading?**
- Clear browser cache (Ctrl+Shift+R)
- Restart dev server

**Module not found?**
```bash
rm -rf node_modules
npm install
```

## File Sizes

- Frontend code: ~2,500 lines JS
- Mock data: ~195 lines
- Styles: Tailwind CSS (generated)

## Next Steps

1. Explore all 4 dashboards thoroughly
2. Read main `README.md` for detailed documentation
3. Review `frontend/data/data.js` structure
4. Plan backend architecture
5. Integrate with database and payment gateway

## Performance

- Optimized infinite scroll with IntersectionObserver
- Fast HMR during development
- Minimal production bundle (Vite)
- Mobile-friendly responsive design

## Production Build

```bash
npm run build
# dist/ folder ready for deployment

# Deploy to Vercel, Netlify, or any static host
```

## Support

- Check `README.md` for comprehensive docs
- Review component code for implementation examples
- Test with all demo accounts first

---

Built with React + Vite + Tailwind CSS + JavaScript.
Ready to integrate with MongoDB backend for production! 🚀
