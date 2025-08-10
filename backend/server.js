import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/supabase.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import ideaRoutes from './routes/ideas.js';
import mentorRoutes from './routes/mentors.js';
import aiRoutes from './routes/ai.js';
import userProgressRoutes from './routes/user-progress.js';

// Load environment variables
dotenv.config();

// Initialize Supabase connection
initializeDatabase();

const app = express();

// Trust proxy for deployment on Render/Railway/etc - Required for proper rate limiting
app.set('trust proxy', true);

// Security middleware
app.use(helmet());

// Rate limiting - Render-compatible configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil(15 * 60 / 60) + ' minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip rate limiting for health checks
  skip: (req, res) => {
    return req.path === '/api/health';
  },
  // Disable validation to prevent Render proxy issues
  validate: false,
  // Better key generation for proxied environments
  keyGenerator: (req) => {
    return req.ip || req.connection.remoteAddress || 'unknown';
  }
});
app.use('/api/', limiter);

// CORS configuration - Updated for production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'https://hiinen.vercel.app',
  'https://hiinen-93h32vvgk-miranics-s-projects.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

// Also allow any vercel app deployment
const isVercelDomain = (origin) => {
  return origin && (
    origin.endsWith('.vercel.app') || 
    origin.includes('hiinen') || 
    origin === 'https://hiinen.vercel.app'
  );
};

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || isVercelDomain(origin)) {
      console.log('✅ CORS allowed origin:', origin);
      return callback(null, true);
    }
    
    console.log('🚫 CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/user-progress', userProgressRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'HiiNen API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 HiiNen API Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Trust proxy: enabled for Render deployment`);
});
