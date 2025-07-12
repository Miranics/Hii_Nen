const { createClient } = require('@supabase/supabase-js');

// Ensure dotenv is loaded
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is required in environment variables');
}
if (!supabaseAnonKey) {
  throw new Error('SUPABASE_ANON_KEY is required in environment variables');
}
if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_KEY is required in environment variables');
}

console.log('🔗 Supabase URL:', supabaseUrl);
console.log('🔑 Supabase keys loaded successfully');

// Public client for frontend operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for backend operations (full access)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const initializeDatabase = async () => {
  try {
    console.log('🔗 Connecting to Supabase...');
    
    // Test connection
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = relation does not exist (expected for new projects)
      console.log('ℹ️  Database tables not yet created. Please run the setup script.');
    } else {
      console.log('✅ Supabase connected successfully!');
    }
  } catch (error) {
    console.error('❌ Supabase connection error:', error.message);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔄 Continuing without database connection (development mode)');
      return;
    }
    
    process.exit(1);
  }
};

module.exports = {
  supabase,
  supabaseAdmin,
  initializeDatabase
};
