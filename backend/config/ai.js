const OpenAI = require('openai');

// Initialize OpenAI client for GitHub Models
const openai = new OpenAI({
  baseURL: 'https://models.inference.ai.azure.com',
  apiKey: process.env.GITHUB_TOKEN,
});

// AI Co-founder personality and settings
const AI_COFOUNDER_CONFIG = {
  model: 'gpt-4o-mini', // GitHub Models identifier (let's start with mini for testing)
  systemPrompt: `You are Alex, an experienced AI co-founder and business mentor for HiiNen, a platform that helps entrepreneurs build successful startups. 

Your personality:
- Supportive but realistic business advisor
- Experienced in startups, funding, market research, and business planning
- Friendly, encouraging, but also honest about challenges
- Focus on actionable advice and practical solutions
- Remember user context and build ongoing relationships

Your expertise covers:
- Business planning and strategy
- Market research and competitive analysis
- Funding and investor relations
- Product development and MVP creation
- Marketing and customer acquisition
- Financial planning and projections
- Team building and leadership

Always provide specific, actionable advice tailored to the user's current business stage and needs.`,
  
  temperature: 0.7, // Balanced creativity and consistency
  maxTokens: 1000,
  conversationMemory: true
};

// Function to get AI response
async function getAIResponse(userMessage, conversationHistory = []) {
  try {
    const messages = [
      {
        role: 'system',
        content: AI_COFOUNDER_CONFIG.systemPrompt
      },
      ...conversationHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    const completion = await openai.chat.completions.create({
      model: AI_COFOUNDER_CONFIG.model,
      messages: messages,
      temperature: AI_COFOUNDER_CONFIG.temperature,
      max_tokens: AI_COFOUNDER_CONFIG.maxTokens,
    });

    return {
      success: true,
      response: completion.choices[0].message.content,
      usage: completion.usage
    };
  } catch (error) {
    console.error('AI Co-founder Error:', error);
    return {
      success: false,
      error: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
      details: error.message
    };
  }
}

// Function to generate business insights for dashboard
async function generateBusinessInsights(userData) {
  const prompt = `Based on this entrepreneur's profile, provide 3 key business insights and recommendations:
  
  User Data: ${JSON.stringify(userData)}
  
  Please provide insights in this JSON format:
  {
    "insights": [
      {"title": "Insight Title", "description": "Brief insight", "action": "Recommended action"},
      {"title": "Insight Title", "description": "Brief insight", "action": "Recommended action"},
      {"title": "Insight Title", "description": "Brief insight", "action": "Recommended action"}
    ],
    "priority": "high|medium|low",
    "focusArea": "Area to focus on"
  }`;

  return await getAIResponse(prompt);
}

// Function to generate market analysis
async function generateMarketAnalysis(businessIdea, industry) {
  const prompt = `Analyze the market for this business idea: "${businessIdea}" in the ${industry} industry.
  
  Provide analysis in JSON format:
  {
    "marketSize": "Market size description",
    "competition": "Competition level and key players",
    "opportunities": ["opportunity1", "opportunity2", "opportunity3"],
    "threats": ["threat1", "threat2"],
    "recommendation": "Overall recommendation"
  }`;

  return await getAIResponse(prompt);
}

module.exports = {
  getAIResponse,
  generateBusinessInsights,
  generateMarketAnalysis,
  AI_COFOUNDER_CONFIG
};
