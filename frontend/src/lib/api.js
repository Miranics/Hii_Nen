// Configuration for API endpoints - Enhanced for production reliability
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://hiinen-backend.onrender.com'
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'),
  ENDPOINTS: {
    AI_CHAT: '/api/ai/chat',
    AI_INSIGHTS: '/api/ai/insights',
    AI_MARKET_ANALYSIS: '/api/ai/market-analysis',
    AI_VALIDATE_IDEA: '/api/ai/validate-idea',
    HEALTH: '/api/health',
    USER_PROGRESS: '/api/user-progress',
    USER_PROGRESS_IDEAS: '/api/user-progress/ideas',
    USER_PROGRESS_GOALS: '/api/user-progress/goals',
    USER_PROGRESS_AI_INTERACTION: '/api/user-progress/ai-interaction'
  },
  TIMEOUT: 20000, // Increased to 20 seconds for better reliability
  MAX_RETRIES: 4, // Increased retries
  WAKEUP_TIMEOUT: 8000 // Separate timeout for wakeup calls
};

// Debug logging for API configuration
if (typeof window !== 'undefined') {
  console.log('🔧 API Configuration:');
  console.log('BASE_URL:', API_CONFIG.BASE_URL);
  console.log('Environment NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
}

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Aggressive service wakeup function
const wakeupService = async () => {
  console.log('🔄 Attempting aggressive service wakeup...');
  
  const wakeupPromises = [
    fetch(getApiUrl(API_CONFIG.ENDPOINTS.HEALTH), { 
      method: 'HEAD',
      headers: { 'Cache-Control': 'no-cache' }
    }),
    fetch(getApiUrl(API_CONFIG.ENDPOINTS.HEALTH), { 
      method: 'GET',
      headers: { 'Cache-Control': 'no-cache' }
    })
  ];
  
  try {
    await Promise.race([
      Promise.allSettled(wakeupPromises),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Wakeup timeout')), API_CONFIG.WAKEUP_TIMEOUT)
      )
    ]);
    
    // Give service time to fully wake up
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ Service wakeup completed');
    return true;
  } catch (error) {
    console.warn('⚠️ Service wakeup failed:', error.message);
    return false;
  }
};

// Enhanced health check with retry logic
export const checkBackendHealth = async () => {
  try {
    const fetchPromise = fetch(getApiUrl(API_CONFIG.ENDPOINTS.HEALTH), {
      headers: { 
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Health check timeout')), 10000)
    );
    
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error.message);
    return false;
  }
};

// Enhanced API call function with better error handling and aggressive wakeup
export const callHiiNenAI = async (endpoint, data, retries = API_CONFIG.MAX_RETRIES) => {
  const fullUrl = getApiUrl(endpoint);
  console.log('🚀 API Call:', fullUrl);
  
  // Always attempt wakeup on first try for Render services
  if (API_CONFIG.BASE_URL.includes('render.com')) {
    await wakeupService();
  }
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Use fetch with timeout
      const fetchPromise = fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify(data)
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), API_CONFIG.TIMEOUT)
      );

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ API Success:', result.success);
      return result;

    } catch (error) {
      console.warn(`🔄 Attempt ${attempt + 1}/${retries + 1} failed:`, error.message);
      
      if (attempt === retries) {
        console.error('❌ All API attempts failed');
        return {
          success: false,
          error: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
          details: error.message,
          retried: true,
          offline: true // Flag for intelligent fallbacks
        };
      }
      
      // Progressive delay with wakeup attempts
      const delay = 1000 * (attempt + 1);
      console.log(`⏱️ Waiting ${delay}ms before retry...`);
      
      // Try wakeup again on retry for persistent failures
      if (attempt >= 1 && API_CONFIG.BASE_URL.includes('render.com')) {
        await wakeupService();
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// User Progress API Functions

// Get user's personalized dashboard data
export const getUserProgress = async (userId) => {
  try {
    const fetchPromise = fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.USER_PROGRESS}?userId=${userId}`), {
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 10000)
    );
    
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    return result;
    
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return {
      success: false,
      error: error.message,
      // Return fallback data structure
      data: {
        stats: {
          ideasValidated: 0,
          businessScore: 0,
          networkConnections: 0,
          fundingReadiness: 0
        },
        weeklyGoals: [],
        ideas: [],
        activities: []
      }
    };
  }
};

// Update user progress
export const updateUserProgress = async (userId, updateData) => {
  try {
    const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.USER_PROGRESS}?userId=${userId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user progress:', error);
    return { success: false, error: error.message };
  }
};

// Add new idea for validation
export const addUserIdea = async (userId, ideaData) => {
  try {
    const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.USER_PROGRESS_IDEAS}?userId=${userId}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(ideaData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding user idea:', error);
    return { success: false, error: error.message };
  }
};

// Complete a weekly goal
export const completeUserGoal = async (userId, goalId) => {
  try {
    const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.USER_PROGRESS_GOALS}/${goalId}/complete?userId=${userId}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error completing user goal:', error);
    return { success: false, error: error.message };
  }
};

// Add new weekly goal
export const addUserGoal = async (userId, goalData) => {
  try {
    const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.USER_PROGRESS_GOALS}?userId=${userId}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(goalData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding user goal:', error);
    return { success: false, error: error.message };
  }
};

// Record AI interaction for personalization
export const recordAIInteraction = async (userId, interactionData) => {
  try {
    const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.USER_PROGRESS_AI_INTERACTION}?userId=${userId}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(interactionData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error recording AI interaction:', error);
    return { success: false, error: error.message };
  }
};
