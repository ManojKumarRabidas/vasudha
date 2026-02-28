# VASUDHA Backend Structure

Empty backend folder ready for API implementation. Currently the frontend uses mock data from `frontend/data/data.js`.

## Planned Structure

```
backend/
├── models/                 # Database schemas (MongoDB)
│   ├── User.js            # User accounts
│   ├── NGO.js             # NGO organizations
│   ├── Donation.js        # Donation records
│   ├── Volunteer.js       # Volunteer profiles
│   ├── Transaction.js     # Payment transactions
│   └── HelpRequest.js     # Volunteer requests
├── routes/                # API endpoints
│   ├── auth.js            # /api/auth/login, /register, /logout
│   ├── ngos.js            # /api/ngos (CRUD operations)
│   ├── donations.js       # /api/donations (POST, GET)
│   ├── volunteers.js      # /api/volunteers (GET, POST)
│   ├── users.js           # /api/users (profile management)
│   └── admin.js           # /api/admin/* (admin operations)
├── middleware/
│   ├── auth.js            # JWT verification
│   ├── validation.js      # Input validation
│   └── errorHandler.js    # Error handling
├── controllers/           # Business logic
│   ├── authController.js
│   ├── ngoController.js
│   ├── donationController.js
│   └── adminController.js
├── services/              # External services
│   ├── emailService.js    # Email notifications
│   ├── paymentService.js  # Stripe/Razorpay
│   └── storageService.js  # File uploads
├── config/
│   ├── database.js        # MongoDB connection
│   ├── constants.js       # App constants
│   └── env.js             # Environment config
├── .env.example           # Environment template
├── server.js              # Express app initialization
├── package.json           # Backend dependencies
└── README.md              # This file
```

## Tech Stack (Recommended)

- **Server**: Node.js + Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi or Zod
- **Payments**: Stripe or Razorpay SDK
- **Email**: SendGrid, Mailgun, or Nodemailer
- **File Storage**: AWS S3, Vercel Blob, or Cloudinary
- **Environment**: dotenv

## Setup Instructions (To Be Implemented)

### 1. Initialize Backend

```bash
cd backend
npm init -y
npm install express mongoose dotenv cors jsonwebtoken bcryptjs
npm install --save-dev nodemon
```

### 2. Create .env File

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/vasudha
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_xxxxx
RAZORPAY_KEY_ID=key_xxxxx
RAZORPAY_KEY_SECRET=secret_xxxxx
SENDGRID_API_KEY=SG.xxxxx
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
NODE_ENV=development
PORT=5000
```

### 3. MongoDB Collections (Using Mongoose)

Match the structure from `frontend/data/data.js`:

**Users Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String ('donor', 'ngo', 'volunteer', 'admin'),
  phone: String,
  location: String,
  profilePicture: String (URL),
  createdAt: Date,
  updatedAt: Date
}
```

**NGOs Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  registrationNumber: String,
  category: String,
  location: String,
  description: String,
  image: String (URL),
  verified: Boolean,
  rating: Number,
  totalDonations: Number,
  volunteerCount: Number,
  status: String ('approved', 'pending', 'rejected'),
  documents: [String] (URLs),
  bankDetails: Object,
  createdAt: Date
}
```

**Donations Collection**
```javascript
{
  _id: ObjectId,
  donorId: ObjectId (ref: User),
  ngoId: ObjectId (ref: NGO),
  amount: Number,
  type: String ('one-time', 'recurring'),
  frequency: String ('monthly', 'quarterly', 'yearly'),
  status: String ('completed', 'pending', 'failed'),
  transactionId: String,
  createdAt: Date,
  nextPaymentDate: Date (for recurring)
}
```

**Volunteers Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  location: String,
  skills: [String],
  ngoIds: [ObjectId] (ref: NGO),
  totalHours: Number,
  rating: Number,
  status: String ('active', 'inactive'),
  createdAt: Date
}
```

## API Endpoints

### Authentication
```
POST   /api/auth/login          # Login with email/password
POST   /api/auth/register       # Register new user
POST   /api/auth/logout         # Logout
GET    /api/auth/me             # Get current user
```

### NGOs
```
GET    /api/ngos                # List all NGOs
GET    /api/ngos/:id            # Get specific NGO
POST   /api/ngos                # Register new NGO (NGO role only)
PUT    /api/ngos/:id            # Update NGO (owner only)
GET    /api/ngos/:id/donations  # Get NGO donations
GET    /api/ngos/:id/volunteers # Get NGO volunteers
POST   /api/ngos/:id/activities # Post activity (owner only)
```

### Donations
```
POST   /api/donations           # Make donation
GET    /api/donations           # Get user's donations
GET    /api/donations/:id       # Get donation details
POST   /api/sdp                 # Create SDP plan
GET    /api/sdp                 # Get user's SDP plans
```

### Volunteers
```
POST   /api/volunteers          # Register as volunteer
GET    /api/volunteers          # List volunteers
GET    /api/volunteers/:id      # Get volunteer details
PUT    /api/volunteers/:id      # Update volunteer
POST   /api/volunteers/:id/join-ngo   # Request to join NGO
POST   /api/volunteers/:id/help-request # Log help hours
```

### Admin
```
GET    /api/admin/ngos/pending  # Get pending NGO approvals
POST   /api/admin/ngos/approve  # Approve NGO
POST   /api/admin/ngos/reject   # Reject NGO
GET    /api/admin/transactions  # Get all transactions
GET    /api/admin/users         # Get all users
GET    /api/admin/analytics     # Platform analytics
POST   /api/admin/settings      # Update platform settings
```

## Integration with Frontend

Replace mock data calls in `frontend/components/*`:

**Before (Mock Data)**
```javascript
import { mockData } from '../data/data'
const ngos = mockData.ngos
```

**After (API Call)**
```javascript
const [ngos, setNgos] = useState([])

useEffect(() => {
  fetch('/api/ngos')
    .then(res => res.json())
    .then(data => setNgos(data))
    .catch(err => console.error(err))
}, [])
```

## Security Considerations

- Hash passwords with bcryptjs (10 salt rounds)
- Use JWT for stateless authentication
- Implement CORS properly
- Validate all inputs (Joi/Zod)
- Use rate limiting for API
- Implement request logging
- Use HTTPS in production
- Sanitize database inputs
- Implement RLS (Row Level Security)
- Add audit logging for admin actions

## Payment Processing Flow

1. Frontend sends donation amount
2. Backend creates Stripe/Razorpay session
3. User completes payment
4. Webhook confirms payment
5. Update donation record in DB
6. Send confirmation email
7. Update NGO's totalDonations
8. Distribute platform fee

## File Upload Process

1. User selects file (NGO document)
2. Frontend sends to `/api/upload`
3. Backend validates file
4. Upload to AWS S3/Cloudinary
5. Store URL in database
6. Return URL to frontend

## Testing

Use Postman/Insomnia to test endpoints:
- Test without auth (should fail)
- Test with invalid token (should fail)
- Test with valid token (should succeed)
- Test input validation
- Test role-based access control

## Deployment

```bash
# Build for production
npm run build

# Deploy to Vercel, Railway, Render, or Heroku
# Set environment variables in deployment platform
```

## Monitoring

- Set up error tracking (Sentry)
- Add request logging (Morgan)
- Monitor database performance
- Track API response times
- Set up alerts for errors

## Current Status

This folder is a placeholder. Start implementation by:
1. Creating `server.js` with Express setup
2. Connecting MongoDB
3. Implementing authentication
4. Building routes based on frontend requirements
5. Testing all endpoints thoroughly
6. Deploying to production

## Frontend Integration Timeline

1. **Phase 1**: Basic API setup + authentication
2. **Phase 2**: NGO and donation endpoints
3. **Phase 3**: Volunteer system
4. **Phase 4**: Admin operations
5. **Phase 5**: Payment integration
6. **Phase 6**: Production deployment

---

Backend is ready to be implemented. Start with authentication and NGO endpoints first!
