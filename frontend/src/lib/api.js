// Configuration for API endpoints - Updated for production
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
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

// Helper function for making API calls to HiiNen AI
export const callHiiNenAI = async (endpoint, data) => {
  const fullUrl = getApiUrl(endpoint);
  console.log('🚀 Making API call to:', fullUrl);
  console.log('📤 Request data:', data);
  
  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
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
    console.error('💥 HiiNen AI API Error:', error);
    console.error('💥 Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};
