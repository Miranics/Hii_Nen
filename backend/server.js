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

// Rate limiting - Disabled for production to avoid proxy issues
if (process.env.NODE_ENV !== 'production') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
  });
  app.use('/api/', limiter);
  console.log('🛡️ Rate limiting enabled for development');
} else {
  console.log('🚀 Rate limiting disabled for production');
}

// CORS configuration - Enhanced for development and testing
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'https://hiinen.vercel.app',
  'https://hiinen-93h32vvgk-miranics-s-projects.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

// Enhanced origin checking for development
const isVercelDomain = (origin) => {
  return origin && (
    origin.endsWith('.vercel.app') || 
    origin.includes('hiinen') || 
    origin === 'https://hiinen.vercel.app'
  );
};

const isDevelopmentOrigin = (origin) => {
  if (!origin) return true; // No origin (null) - allow for local files and apps
  
  return (
    origin.startsWith('http://localhost') ||
    origin.startsWith('http://127.0.0.1') ||
    origin.startsWith('file://') ||
    origin === 'null' // Explicit null origin check
  );
};

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, or local file testing)
    if (!origin) {
      console.log('✅ CORS allowed: no origin (likely local file or mobile app)');
      return callback(null, true);
    }
    
    // Check allowed origins
    if (allowedOrigins.includes(origin) || isVercelDomain(origin)) {
      console.log('✅ CORS allowed origin:', origin);
      return callback(null, true);
    }
    
    // Allow development origins (localhost, file://, etc.)
    if (isDevelopmentOrigin(origin)) {
      console.log('✅ CORS allowed development origin:', origin);
      return callback(null, true);
    }
    
    console.log('🚫 CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Cache-Control',
    'Accept',
    'Origin',
    'User-Agent',
    'DNT',
    'Accept-Encoding',
    'Accept-Language',
    'Connection'
  ]
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  
  // Set CORS headers for preflight
  if (!origin || isDevelopmentOrigin(origin) || allowedOrigins.includes(origin) || isVercelDomain(origin)) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,HEAD');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,Cache-Control,Accept,Origin,User-Agent,DNT,Accept-Encoding,Accept-Language,Connection');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

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
