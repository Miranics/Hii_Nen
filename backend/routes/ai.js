import express from 'express';
import { getAIResponse, generateBusinessInsights, generateMarketAnalysis } from '../config/ai.js';

const router = express.Router();

// Chat with AI Co-founder
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }

    const aiResponse = await getAIResponse(message, conversationHistory);
    
    res.json(aiResponse);
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get AI response'
    });
  }
});

// Get business insights for dashboard
router.post('/insights', async (req, res) => {
  try {
    console.log('AI Insights Route - Request received');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    
    const { userProfile, userData, requestType } = req.body;

    // Handle both old and new data formats
    const dataToProcess = userProfile || userData;
    
    if (!dataToProcess) {
      console.log('AI Insights Route - No user data provided');
      return res.status(400).json({
        success: false,
        error: 'User data is required'
      });
    }

    console.log('AI Insights Route - Processing request type:', requestType);
    const insights = await generateBusinessInsights(dataToProcess, requestType);
    
    console.log('AI Insights Route - Response generated:', insights.success);
    res.json(insights);
  } catch (error) {
    console.error('AI Insights Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate business insights'
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

// Health check for AI service
router.get('/health', async (req, res) => {
  try {
    const testResponse = await getAIResponse('Hello, are you working?');
    
    res.json({
      success: true,
      status: 'AI Co-founder is online',
      model: 'gpt-4o',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'AI Co-founder is offline',
      error: error.message
    });
  }
});

export default router;
