// Configuration for API endpoints - Enhanced for production reliability
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://hiinen-backend.onrender.com'
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'),
  ENDPOINTS: {
    AI_CHAT: '/api/ai/chat',
    AI_INSIGHTS: '/api/ai/insights',
    AI_MARKET_ANALYSIS: '/api/ai/market-analysis',
    HEALTH: '/api/health'
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
      
      // Progressive backoff delay
      const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
