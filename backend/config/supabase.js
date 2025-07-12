const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

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
