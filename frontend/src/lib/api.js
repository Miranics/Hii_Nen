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
  TIMEOUT: 30000,
  MAX_RETRIES: 3
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

// Enhanced health check with retry logic
export const checkBackendHealth = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.HEALTH), {
      signal: controller.signal,
      headers: { 'Accept': 'application/json' }
    });
    
    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.warn('Backend health check failed:', error.message);
    return false;
  }
};

// Enhanced API call function with better error handling
export const callHiiNenAI = async (endpoint, data, retries = API_CONFIG.MAX_RETRIES) => {
  const fullUrl = getApiUrl(endpoint);
  console.log('🚀 API Call:', fullUrl);
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // Wake up Render service on first attempt
      if (attempt === 0 && API_CONFIG.BASE_URL.includes('render.com')) {
        console.log('🔄 Waking up Render service...');
        try {
          await fetch(getApiUrl('/api/health'), { 
            method: 'HEAD',
            signal: AbortSignal.timeout(5000)
          });
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (wakeupError) {
          console.log('⚠️ Service wakeup skipped');
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('✅ API Success:', result.success);
      return result;

    } catch (error) {
      console.warn(`🔄 Attempt ${attempt + 1} failed:`, error.message);
      
      if (attempt === retries) {
        return {
          success: false,
          error: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
          details: error.message,
          retried: true
        };
      }
      
    }
  }
};

// User Progress API Functions

// Get user's personalized dashboard data
export const getUserProgress = async (userId) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.USER_PROGRESS}?userId=${userId}`), {
      signal: controller.signal,
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    clearTimeout(timeoutId);
    
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
