// Configuration for API endpoints - Updated for production
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://hiinen-backend.onrender.com'
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'),
  ENDPOINTS: {
    AI_CHAT: '/api/ai/chat',
    AI_INSIGHTS: '/api/ai/insights',
    AI_MARKET_ANALYSIS: '/api/ai/market-analysis',
    HEALTH: '/api/health'
  }
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

// Helper function for making API calls to HiiNen AI with retry logic
export const callHiiNenAI = async (endpoint, data, retries = 2) => {
  const fullUrl = getApiUrl(endpoint);
  console.log('🚀 Making API call to:', fullUrl);
  console.log('📤 Request data:', data);
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      // First, try to wake up the backend if it's the first attempt
      if (attempt === 0) {
        console.log('🔄 Waking up backend service...');
        try {
          await fetch(getApiUrl('/api/health'), { method: 'GET' });
          // Give the service a moment to wake up
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (wakeupError) {
          console.log('⚠️ Backend wakeup failed, continuing with main request');
        }
      }

      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        timeout: 30000, // 30 second timeout
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);

      const result = await response.json();
      console.log('📥 Response data:', result);
      
      if (!response.ok) {
        throw new Error(result.error || `API call failed with status: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.log(`💥 HiiNen AI API Error (attempt ${attempt + 1}):`, error);
      
      if (attempt === retries) {
        // Last attempt failed, provide user-friendly error
        if (error.message.includes('Failed to fetch') || error.message.includes('CONNECTION_RESET')) {
          throw new Error('🔄 Backend service is starting up. Please wait a moment and try again.');
        } else if (error.message.includes('timeout')) {
          throw new Error('⏱️ Request timed out. The service might be busy, please try again.');
        } else {
          throw new Error(`❌ AI service error: ${error.message}`);
        }
      } else {
        // Wait before retrying
        console.log(`🔄 Retrying in 3 seconds... (attempt ${attempt + 2}/${retries + 1})`);
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
  }
};
