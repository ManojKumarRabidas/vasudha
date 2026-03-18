# VASUDHA Architecture Guide

## System Overview

VASUDHA is a multi-role platform built with a modular architecture designed for scalability and easy backend integration.

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (Next.js 16)                 │
├─────────────────────────────────────────────────────────┤
│  Landing Page → Role Selection → Login → Dashboard      │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│                  Mock Data Layer (lib/data.js)          │
│  (Simulates MongoDB - Replace with API calls later)     │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│              Backend API (Future - /backend)             │
│    Express.js + MongoDB + JWT Authentication           │
└─────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Page Structure (App Router)

```
app/
├── page.tsx                         → Landing Page
├── auth/
│   └── login/page.tsx              → Unified Login
├── donor/
│   └── dashboard/page.tsx          → Donor Main Hub
├── ngo/
│   └── dashboard/page.tsx          → NGO Main Hub
├── volunteer/
│   └── dashboard/page.tsx          → Volunteer Main Hub
└── admin/
    └── dashboard/page.tsx          → Admin Hub
```

### Component Hierarchy

```
RootLayout
├── LandingPage
├── AuthPage (Login/Signup)
└── DashboardLayout
    ├── Navigation (role-specific)
    ├── MainContent
    │   ├── Stats Component
    │   ├── Tabs/Sections
    │   └── Cards/Lists
    └── Footer/Sidebars
```

### State Management

**Current**: React Context + localStorage
```
AuthContext
├── user (logged-in user data)
├── role (user's role)
└── isLoading (auth state)
```

**Future**: Add global state management
- Redux for complex state
- SWR for data fetching
- React Query for cache management

## Data Flow

### Authentication Flow

```
1. User lands on /auth/login
   ↓
2. Selects role (Donor, NGO, Volunteer, Admin)
   ↓
3. Enters credentials or OTP
   ↓
4. System validates against lib/data.js (mock)
   ↓
5. Stores user & role in localStorage
   ↓
6. Redirects to role-specific dashboard
   ↓
7. Components fetch data from lib/data.js
```

### Donation Flow (Example)

```
Donor Dashboard
    ↓
Browse NGOs (fetchAllNGOs from lib/data.js)
    ↓
Select NGO and click Donate
    ↓
Payment Processing (mock Stripe/Razorpay)
    ↓
Transaction created in lib/data.js
    ↓
NGO notified via notifications
    ↓
Donor sees confirmation & updated balance
```

## Component Patterns

### Dashboard Container Pattern
```typescript
// page.tsx
export default function Dashboard() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Fetch user from localStorage
    // Verify auth
    // Fetch data
  }, []);

  return (
    <div>
      <Nav user={user} />
      <MainContent user={user} />
    </div>
  );
}
```

### Data Fetching Pattern
```typescript
// Current (Mock)
import { data, fetchAllNGOs } from '@/lib/data';

const ngos = fetchAllNGOs();

// Future (API)
import { useEffect, useState } from 'react';

export function useNGOs() {
  const [ngos, setNgos] = useState([]);
  
  useEffect(() => {
    fetch('/api/ngos')
      .then(r => r.json())
      .then(setNgos);
  }, []);
  
  return ngos;
}
```

## Design System Implementation

### CSS Architecture

```
globals.css
├── Design Tokens (CSS Variables)
│   ├── Colors (--primary, --secondary, etc.)
│   ├── Typography (--font-sans, --font-mono)
│   └── Spacing (--radius)
├── Theme System
│   ├── Light Mode (:root)
│   └── Dark Mode (.dark)
└── Tailwind Integration
    └── @theme directive mapping
```

### Available Tokens
- `--primary` (Deep Green)
- `--secondary` (Gold)
- `--accent` (Teal)
- `--background` / `--foreground`
- `--card` / `--card-foreground`
- `--muted` / `--muted-foreground`
- `--destructive` / `--destructive-foreground`

### Usage in Components
```tsx
<div className="bg-primary text-primary-foreground">
  Primary CTA
</div>

<div className="bg-secondary/10 text-secondary border border-secondary">
  Secondary Card
</div>
```

## Integration Points

### Mock Data → Real API

Replace all `lib/data.js` calls:

```typescript
// Step 1: Mock (Current)
import { data, fetchAllNGOs } from '@/lib/data';
const ngos = fetchAllNGOs();

// Step 2: API (Future)
const response = await fetch('/api/ngos');
const ngos = await response.json();

// Step 3: SWR (Optimal)
import useSWR from 'swr';
const { data: ngos } = useSWR('/api/ngos');
```

### Authentication Flow

```typescript
// Mock (Current)
const user = data.users.donors.find(d => d.email === email);
localStorage.setItem('user', JSON.stringify(user));

// JWT (Future)
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});
const { token } = await response.json();
localStorage.setItem('token', token);
```

## Scalability Considerations

### Frontend Optimization
1. **Code Splitting**: Automatic via Next.js App Router
2. **Image Optimization**: Next.js Image component
3. **Data Caching**: Implement with SWR
4. **Infinite Scroll**: Already implemented with pagination mock

### Backend Requirements (When Ready)
1. **Database**: MongoDB with proper indexing
2. **API Rate Limiting**: Prevent abuse
3. **Caching Layer**: Redis for frequently accessed data
4. **File Storage**: AWS S3 for NGO documents
5. **Message Queue**: Bull/BullMQ for async tasks
6. **Real-time**: Socket.io for notifications

### Deployment Strategy

```
Local Development
    ↓
Staging (Vercel Preview)
    ↓
Production (Vercel)
    
Environment Variables:
- .env.local (development)
- .env.production (production)
- .env.test (testing)
```

## Security Considerations

### Current (Frontend Only)
- Demo credentials in localStorage
- No actual authentication
- All data visible in browser

### To-Do (Backend Integration)
1. **JWT Tokens**: httpOnly cookies, refresh tokens
2. **Password Security**: bcrypt hashing (server-side only)
3. **CORS**: Restrict API access
4. **Input Validation**: Server-side validation always
5. **SQL Injection Prevention**: Use parameterized queries
6. **CSRF Protection**: CSRF tokens in forms
7. **Rate Limiting**: Per-user request limits
8. **Data Encryption**: Sensitive data encryption at rest

## Environment Variables

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Production
```env
NEXT_PUBLIC_API_URL=https://vasudha.app
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_live_...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

## Testing Strategy

### Unit Tests (Jest)
```
components/
├── __tests__/
│   ├── donor.test.tsx
│   ├── ngo.test.tsx
│   └── admin.test.tsx
```

### Integration Tests (Cypress)
```
e2e/
├── auth.cy.ts
├── donor-flow.cy.ts
├── ngo-flow.cy.ts
└── admin-flow.cy.ts
```

### Mock Testing
Use MSW (Mock Service Worker) to mock API responses during tests

## Performance Metrics

### Current Performance
- Lighthouse Score: Target 90+
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

### Optimization Roadmap
1. Image optimization with WebP
2. Code splitting for large dashboards
3. Virtual scrolling for infinite lists
4. Service Worker for offline capability
5. CDN integration for static assets

## Monitoring & Logging

### Frontend Monitoring
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

### Backend Monitoring
- Winston for logging
- Datadog for performance monitoring
- ELK Stack for log aggregation

## Roadmap for Production

### Phase 1: Backend Setup (Week 1-2)
- [ ] Set up Node.js/Express server
- [ ] Configure MongoDB
- [ ] Implement JWT auth
- [ ] Create API endpoints

### Phase 2: Payment Integration (Week 3)
- [ ] Integrate Stripe/Razorpay
- [ ] Implement transaction handling
- [ ] Set up webhook handlers

### Phase 3: Real-time Features (Week 4)
- [ ] WebSocket setup for notifications
- [ ] Implement messaging system
- [ ] Real-time dashboard updates

### Phase 4: DevOps & Deployment (Week 5)
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Automated testing
- [ ] Production deployment

### Phase 5: Optimization & Launch (Week 6)
- [ ] Performance optimization
- [ ] Security audit
- [ ] Load testing
- [ ] Beta launch

## Key Files for Backend Integration

### API Route Templates
```
backend/
├── api/
│   ├── auth.js              # Login, Register, Logout
│   ├── users.js             # User management
│   ├── ngos.js              # NGO CRUD
│   ├── donations.js         # Donation processing
│   ├── volunteers.js        # Volunteer management
│   └── admin.js             # Admin operations
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── errorHandler.js      # Global error handling
│   └── validation.js        # Input validation
└── config/
    └── database.js          # MongoDB connection
```

### Environment Setup
```bash
# Install backend dependencies
npm install express mongoose bcrypt jsonwebtoken dotenv cors

# Create .env file
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/vasudha
JWT_SECRET=your_super_secret_key
NODE_ENV=development
PORT=5000
```

## Conclusion

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Easy to test and maintain
- ✅ Scalable for future growth
- ✅ Smooth transition from mock to real backend
- ✅ Production-ready structure

For questions or contributions, refer to the main README.md
