# HiiNen
> *"Se Hii Nen"* - Let's Start (Tiv Language)

**AI-Powered Co-Founder Platform for First-Time Entrepreneurs**

HiiNen transforms entrepreneurial dreams into actionable business strategies through advanced AI guidance, comprehensive mentorship, and intelligent business development tools.

---

## Overview

HiiNen is a production-ready, full-stack platform that serves as an AI co-founder for aspiring entrepreneurs. Built with modern web technologies and powered by GitHub Models GPT-4.1, it provides personalized business guidance, market analysis, and step-by-step startup development support.

### Key Capabilities

**AI Co-Founder Intelligence**
- Real-time business conversations with AI entrepreneurship expert
- Personalized startup recommendations and market insights
- Dynamic business plan generation and validation

**Comprehensive Dashboard Ecosystem**
- Analytics & Performance Tracking
- Market Research & Competitive Analysis
- Business Planning & Strategy Development
- Funding Opportunities & Investor Connections
- Professional Networking & Mentorship
- Learning Hub with Curated Resources
- Account Management & Preferences

**Enterprise-Grade Architecture**
- Secure authentication and user management
- Real-time AI interactions with conversation history
- Responsive design optimized for all devices
- Production-ready security and performance optimization

---

## Technical Architecture

### Technology Stack

**Frontend**
```
Next.js 15.3.5          React 19.0.0
Tailwind CSS 4          Supabase Client
Turbopack               Modern ES Modules
```

**Backend**
```
Node.js + Express       GitHub Models API
Supabase PostgreSQL     JWT Authentication
Helmet Security         CORS Protection
Rate Limiting          Environment Management
```

**Infrastructure**
```
Vercel (Frontend)       Railway (Backend)
GitHub Actions          Automated Deployment
SSL/HTTPS              Custom Domain Ready
```

### Project Structure

```
HiiNen/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/           # 7 AI-enhanced modules
│   │   │   ├── (auth)/             # Authentication pages
│   │   │   └── (marketing)/        # Landing pages
│   │   ├── components/
│   │   │   ├── AIChatWidget.js     # Real-time AI interactions
│   │   │   ├── Navbar.js           # Navigation component
│   │   │   └── BackendStatus.js    # System monitoring
│   │   └── lib/
│   │       ├── api.js              # Centralized API layer
│   │       └── supabase.js         # Database configuration
│   ├── vercel.json                 # Deployment configuration
│   └── next.config.mjs             # Security & build settings
├── backend/
│   ├── routes/
│   │   ├── ai.js                   # AI endpoint handlers
│   │   ├── auth.js                 # Authentication routes
│   │   └── users.js                # User management
│   ├── config/
│   │   ├── ai.js                   # GitHub Models integration
│   │   ├── database.js             # Database configuration
│   │   └── supabase.js             # Supabase connection
│   ├── models/
│   │   └── User.js                 # Data models
│   ├── railway.json                # Deployment configuration
│   └── server.js                   # Express application
└── deployment/
    ├── DEPLOYMENT_GUIDE.md         # Deployment instructions
    ├── .env.template               # Environment variables
    └── AI_INTEGRATION_STATUS.md    # Technical documentation
```

---

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git for version control
- Supabase account (database)
- GitHub account (AI Models API)

### Local Development

**1. Clone and Install**
```bash
git clone https://github.com/Miranics/Hii_Nen.git
cd Hii_Nen

# Frontend setup
cd frontend
npm install

# Backend setup
cd ../backend
npm install
```

**2. Environment Configuration**
```bash
# Frontend (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:5000

# Backend (.env)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
GITHUB_TOKEN=your_github_models_token
```

**3. Development Servers**
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

**4. Access Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Health Check: `http://localhost:5000/api/health`

---

## Deployment

### Production Deployment

**Vercel (Frontend)**
```bash
# Automatic deployment via GitHub integration
# Configure environment variables in Vercel dashboard
# Custom domain support available
```

**Railway (Backend)**
```bash
# Automatic deployment via GitHub integration
# Environment variables managed in Railway dashboard
# Scalable hosting with built-in monitoring
```

### Build Process

**Frontend Build**
```bash
npm run build
# Output: Optimized static files (101KB shared bundle)
# 22 pages with server-side generation
# Build time: ~69 seconds
```

**Backend Deployment**
```bash
npm start
# Production server with security middleware
# Rate limiting and CORS protection
# Health monitoring and logging
```

---

## API Documentation

### Core Endpoints

**AI Interactions**
```
POST /api/ai/chat
POST /api/ai/insights
POST /api/ai/market-analysis
```

**Authentication**
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
```

**User Management**
```
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/account
```

**System Monitoring**
```
GET /api/health
```

### Response Format

```json
{
  "success": true,
  "data": {
    "message": "AI response content",
    "insights": ["business", "recommendations"],
    "timestamp": "2025-01-21T00:00:00.000Z"
  },
  "meta": {
    "requestId": "uuid",
    "version": "1.0.0"
  }
}
```

---

## Security & Performance

### Security Measures
- Content Security Policy (CSP) implementation
- CORS protection with environment-based origins
- Rate limiting on all API endpoints
- Secure environment variable management
- JWT-based authentication with Supabase
- Helmet.js security headers

### Performance Optimization
- Static site generation with Next.js
- Optimized bundle sizes (all pages < 155KB)
- Turbopack for fast development builds
- CDN distribution via Vercel
- Database query optimization

---

## Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- ES6+ JavaScript with modern syntax
- Functional React components with hooks
- Tailwind CSS for all styling
- Comprehensive error handling
- API documentation for new endpoints

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Support & Contact

**Project Maintainer:** Nanen Miracle Mbanaade  
**Status:** Production-Ready MVP  
**Version:** 1.0.0  
**Last Updated:** January 21, 2025

For support, feature requests, or business inquiries, please open an issue on GitHub or contact the development team.

---

*HiiNen - Empowering entrepreneurs with AI-driven business intelligence and personalized startup guidance.*

