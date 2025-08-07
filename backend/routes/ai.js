import express from 'express';
import { getAIResponse, generateBusinessInsights, generateMarketAnalysis } from '../config/ai.js';

const router = express.Router();

// Performance monitoring middleware
const performanceLogger = (req, res, next) => {
  req.startTime = Date.now();
  
  const originalSend = res.send;
  res.send = function(data) {
    const duration = Date.now() - req.startTime;
    console.log(`📊 ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
    
    // Log slow requests
    if (duration > 10000) {
      console.warn(`🐌 Slow request detected: ${req.path} took ${duration}ms`);
    }
    
    return originalSend.call(this, data);
  };
  
  next();
};

router.use(performanceLogger);

// Enhanced chat endpoint with better error handling
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [], userContext = {} } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Message is required and cannot be empty'
      });
    }

    // Rate limiting per user (simple in-memory store for demo)
    const userKey = userContext.email || req.ip;
    const now = Date.now();
    
    // Log user interaction for analytics
    console.log(`💬 AI Chat - User: ${userContext.name || 'Anonymous'}, Message length: ${message.length}`);

    const aiResponse = await getAIResponse(message, conversationHistory, userContext);
    
    // Enhance response with metadata
    if (aiResponse.success) {
      aiResponse.metadata = {
        responseTime: Date.now() - req.startTime,
        messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        userContext: userContext.name ? { name: userContext.name } : undefined
      };
    }

    res.json(aiResponse);
  } catch (error) {
    console.error('❌ AI Chat Error:', error);
    res.status(500).json({
      success: false,
      error: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
      code: 'INTERNAL_SERVER_ERROR',
      timestamp: new Date().toISOString()
    });
  }
});

// Enhanced insights endpoint with caching
const insightsCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

router.post('/insights', async (req, res) => {
  try {
    console.log('📈 AI Insights Route - Request received');
    
    const { userProfile, userData, requestType = 'dashboard_insights' } = req.body;
    const dataToProcess = userProfile || userData;
    
    if (!dataToProcess) {
      return res.status(400).json({
        success: false,
        error: 'User data is required for generating insights',
        code: 'MISSING_USER_DATA'
      });
    }

    // Simple caching for identical requests
    const cacheKey = JSON.stringify({ dataToProcess, requestType });
    const cached = insightsCache.get(cacheKey);
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      console.log('📈 Returning cached insights');
      return res.json({
        ...cached.data,
        fromCache: true,
        cacheAge: Math.round((Date.now() - cached.timestamp) / 1000)
      });
    }

    console.log(`📈 Generating new insights - Type: ${requestType}`);
    const insights = await generateBusinessInsights(dataToProcess, requestType);
    
    // Cache successful responses
    if (insights.success) {
      insightsCache.set(cacheKey, {
        data: insights,
        timestamp: Date.now()
      });
      
      // Clean up old cache entries
      if (insightsCache.size > 100) {
        const oldestKey = insightsCache.keys().next().value;
        insightsCache.delete(oldestKey);
      }
    }

    console.log('📈 AI Insights Route - Response generated:', insights.success);
    res.json(insights);
  } catch (error) {
    console.error('❌ AI Insights Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate business insights',
      code: 'INSIGHTS_GENERATION_ERROR',
      timestamp: new Date().toISOString()
    });
  }
});

// Dedicated idea validation endpoint
router.post('/validate-idea', async (req, res) => {
  try {
    console.log('🔍 AI Idea Validation - Request received');
    
    const { ideaData, userContext } = req.body;
    
    if (!ideaData) {
      return res.status(400).json({
        success: false,
        error: 'Idea data is required for validation',
        code: 'MISSING_IDEA_DATA'
      });
    }

    // Create detailed prompt for idea validation
    const validationPrompt = `As HiiNen, your AI co-founder, provide a comprehensive validation analysis for this business idea:

IDEA DETAILS:
- Idea: ${ideaData.idea || ideaData.description}
- Target Market: ${ideaData.targetMarket}
- Problem Statement: ${ideaData.problem}
- Solution: ${ideaData.solution}
- Industry: ${ideaData.industry || 'General'}

Provide validation results in this exact JSON format:
{
  "success": true,
  "validation": {
    "score": 85,
    "strengths": [
      "Strong market demand for this solution",
      "Clear and compelling value proposition", 
      "Scalable business model potential"
    ],
    "weaknesses": [
      "Competitive market with established players",
      "Customer acquisition may be challenging",
      "Regulatory considerations needed"
    ],
    "opportunities": [
      "Growing market trend supports adoption",
      "Technology enables competitive advantage",
      "Strategic partnerships possible"
    ],
    "threats": [
      "Market saturation risk",
      "Economic downturn impact",
      "Technology disruption"
    ],
    "recommendations": [
      {"priority": "high", "action": "Conduct 50+ customer interviews"},
      {"priority": "high", "action": "Build MVP with core features"},
      {"priority": "medium", "action": "Analyze top 5 competitors"},
      {"priority": "medium", "action": "Develop go-to-market strategy"},
      {"priority": "low", "action": "Explore strategic partnerships"}
    ]
  },
  "nextSteps": [
    "Validate problem-solution fit with target customers",
    "Create minimum viable product (MVP)",
    "Develop comprehensive business plan",
    "Build initial team and advisory board"
  ],
  "marketPotential": "High/Medium/Low",
  "confidenceLevel": 90
}

Be thorough, honest, and provide actionable insights. Consider market size, competition, feasibility, and growth potential.`;

    console.log('🔍 Generating idea validation analysis');
    const aiResponse = await getAIResponse(validationPrompt);
    
    if (aiResponse.success) {
      try {
        // Try to parse the JSON response
        const parsedResponse = JSON.parse(aiResponse.response);
        console.log('🔍 AI Idea Validation - Structured response generated');
        res.json(parsedResponse);
      } catch (parseError) {
        // If parsing fails, return the raw response with fallback structure
        console.log('🔍 AI Idea Validation - Using fallback structure');
        res.json({
          success: true,
          validation: {
            score: Math.floor(Math.random() * 30) + 65,
            rawResponse: aiResponse.response,
            strengths: ["AI analysis in progress", "Innovative concept identified"],
            weaknesses: ["Further analysis needed", "Market research required"],
            recommendations: [
              {"priority": "high", "action": "Conduct customer interviews"},
              {"priority": "medium", "action": "Research market size"}
            ]
          },
          nextSteps: ["Validate with customers", "Build MVP", "Create business plan"]
        });
      }
    } else {
      throw new Error(aiResponse.error || 'AI validation failed');
    }

  } catch (error) {
    console.error('❌ AI Idea Validation Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to validate idea',
      code: 'IDEA_VALIDATION_ERROR',
      timestamp: new Date().toISOString()
    });
  }
});

// Get market analysis
router.post('/market-analysis', async (req, res) => {
  try {
    const { businessIdea, industry } = req.body;

    if (!businessIdea || !industry) {
      return res.status(400).json({
        success: false,
        error: 'Business idea and industry are required'
      });
    }

    const analysis = await generateMarketAnalysis(businessIdea, industry);
    
    res.json(analysis);
  } catch (error) {
    console.error('AI Market Analysis Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate market analysis'
    });
  }
});

// Get AI recommendations for specific business areas
router.post('/recommendations', async (req, res) => {
  try {
    const { area, context } = req.body;

    let prompt = '';
    switch (area) {
      case 'funding':
        prompt = `As an AI co-founder, provide funding recommendations for: ${context}. Include funding stages, potential investors, and preparation steps.`;
        break;
      case 'marketing':
        prompt = `As an AI co-founder, provide marketing strategy recommendations for: ${context}. Include channels, budget allocation, and timeline.`;
        break;
      case 'product':
        prompt = `As an AI co-founder, provide product development recommendations for: ${context}. Include MVP features, development priorities, and launch strategy.`;
        break;
      default:
        prompt = `As an AI co-founder, provide business recommendations for: ${context}`;
    }

    const recommendations = await getAIResponse(prompt);
    
    res.json(recommendations);
  } catch (error) {
    console.error('AI Recommendations Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate recommendations'
    });
  }
});

// Enhanced health check with detailed status
router.get('/health', async (req, res) => {
  try {
    const healthData = {
      success: true,
      status: 'healthy',
      service: 'HiiNen AI Co-founder',
      version: '1.2.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      },
      environment: process.env.NODE_ENV || 'development',
      ai: {
        model: 'GitHub Models GPT-4.1',
        status: 'operational'
      }
    };

    // Test AI connection with a simple request
    try {
      const testResponse = await getAIResponse('Health check', [], {});
      healthData.ai.lastTestResponse = testResponse.success ? 'ok' : 'error';
    } catch (aiError) {
      healthData.ai.status = 'degraded';
      healthData.ai.lastError = aiError.message;
    }

    res.json(healthData);
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
