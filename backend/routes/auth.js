import express from 'express';
import { body, validationResult } from 'express-validator';
import { supabase, supabaseAdmin } from '../config/supabase.js';

const router = express.Router();

// Middleware to verify Supabase JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post(
  '/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('fullName').trim().isLength({ min: 2 }),
    body('userType').isIn(['entrepreneur', 'mentor', 'both'])
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors.array() 
        });
      }

      const { email, password, fullName, userType } = req.body;

      // Create user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType
          }
        }
      });

      if (authError) {
        return res.status(400).json({ 
          error: authError.message 
        });
      }

      // Create user profile in our custom table
      try {
        const { data: profileData, error: profileError } = await supabaseAdmin
          .from('user_profiles')
          .insert([
            {
              id: authData.user.id,
              email: authData.user.email,
              full_name: fullName,
              user_type: userType,
              created_at: new Date().toISOString()
            }
          ])
          .select()
          .single();

        if (profileError) {
          console.error('Profile creation error:', profileError);
          console.error('Profile error details:', JSON.stringify(profileError, null, 2));
          
          // Try to create with minimal data
          const { data: retryData, error: retryError } = await supabaseAdmin
            .from('user_profiles')
            .upsert([
              {
                id: authData.user.id,
                email: authData.user.email,
                full_name: fullName,
                user_type: userType
              }
            ])
            .select()
            .single();
            
          if (retryError) {
            console.error('Profile retry failed:', retryError);
          } else {
            console.log('Profile created on retry:', retryData);
          }
        } else {
          console.log('Profile created successfully:', profileData);
        }
      } catch (profileException) {
        console.error('Profile creation exception:', profileException);
      }

      res.status(201).json({
        message: 'User registered successfully! Please check your email to verify your account.',
        user: {
          id: authData.user.id,
          email: authData.user.email,
          fullName: fullName,
          userType: userType
        }
      });

    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Server error during registration' });
    }
  }
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: errors.array() 
        });
      }

      const { email, password } = req.body;

      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        return res.status(401).json({ 
          error: 'Invalid credentials' 
        });
      }

      // Get user profile
      const { data: profileData, error: profileError } = await supabaseAdmin
        .from('user_profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      res.json({
        message: 'Login successful',
        user: {
          id: authData.user.id,
          email: authData.user.email,
          fullName: profileData?.full_name || authData.user.user_metadata?.full_name,
          userType: profileData?.user_type || authData.user.user_metadata?.user_type
        },
        token: authData.session.access_token,
        refreshToken: authData.session.refresh_token
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error during login' });
    }
  }
);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Server error during logout' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Get user profile
    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    res.json({
      user: {
        id: req.user.id,
        email: req.user.email,
        fullName: profileData?.full_name || req.user.user_metadata?.full_name,
        userType: profileData?.user_type || req.user.user_metadata?.user_type,
        emailVerified: req.user.email_confirmed_at !== null
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/auth/google
// @desc    Google OAuth login
// @access  Public
router.post('/google', async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.FRONTEND_URL}/dashboard`
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ authUrl: data.url });
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).json({ error: 'Server error during Google authentication' });
  }
});

export default router;
