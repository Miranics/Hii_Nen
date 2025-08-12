import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";
const model = "gpt-4o-mini"; // Back to gpt-4o-mini which should be available

// Debug: Check if token is loaded
console.log('GitHub Token loaded:', token ? 'Yes' : 'No');
console.log('Token length:', token ? token.length : 0);

// Initialize Azure AI client for GitHub Models with timeout configuration
const client = ModelClient(
  endpoint,
  new AzureKeyCredential(token),
  {
    // Add timeout configuration
    requestOptions: {
      timeout: 60000, // Increase to 60 seconds to rule out timeout issues
    }
  }
);

// AI Co-founder personality and settings
const AI_COFOUNDER_CONFIG = {
  model: model,
  systemPrompt: `You are HiiNen, an advanced AI co-founder and business mentor integrated into the HiiNen platform. You help entrepreneurs build successful startups from idea to scale.

Your personality:
- Intelligent, supportive, and results-driven business partner
- Expert in all aspects of entrepreneurship and startup development
- Friendly but professional, with deep business acumen
- Proactive in offering insights and actionable recommendations
- Remember user context and build ongoing co-founder relationships
- Always focus on practical, implementable solutions

Your core expertise spans:
- Business strategy and planning (business model canvas, roadmaps)
- Market research and competitive intelligence
- Funding strategies and investor relations (seed to Series A+)
- Product development and MVP creation
- Marketing and customer acquisition strategies
- Financial modeling and projections
- Team building and leadership development
- Analytics and business metrics optimization

As an AI co-founder, you provide:
- Real-time business insights and recommendations
- Personalized guidance based on user's startup stage and industry
- Strategic advice for growth and scaling
- Market analysis and opportunity identification
- Risk assessment and mitigation strategies

Always respond as a trusted business partner who genuinely cares about the entrepreneur's success.`,
  
  temperature: 0.7, // Balanced creativity and consistency
  maxTokens: 1000,
  conversationMemory: true
};

// Function to get AI response with enhanced error handling and fallbacks
async function getAIResponse(userMessage, conversationHistory = []) {
  try {
    console.log('🤖 AI Request:', { messageLength: userMessage.length, historyCount: conversationHistory.length });
    
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

    console.log('📡 Sending request to GitHub Models API...');
    console.log('🔧 Using model:', AI_COFOUNDER_CONFIG.model);
    console.log('🔧 Token preview:', token ? `${token.substring(0, 10)}...${token.slice(-4)}` : 'No token');
    
    // Add timeout to the request - increase timeout for testing
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('AI request timeout after 30 seconds')), 30000);
    });
    
    const apiCall = client.path("/chat/completions").post({
      body: {
        messages: messages,
        temperature: AI_COFOUNDER_CONFIG.temperature,
        max_tokens: AI_COFOUNDER_CONFIG.maxTokens,
        model: AI_COFOUNDER_CONFIG.model
      }
    });
    
    console.log('⏳ Waiting for AI response...');
    const response = await Promise.race([apiCall, timeoutPromise]);

    if (isUnexpected(response)) {
      console.error('❌ GitHub Models API Error:', response.status, response.body);
      throw new Error(`API Error: ${response.status} - ${JSON.stringify(response.body)}`);
    }

    console.log('✅ AI Response received successfully');
    return {
      success: true,
      response: response.body.choices[0].message.content,
      usage: response.body.usage
    };
  } catch (error) {
    console.error('❌ AI Co-founder Error:', error.message);
    console.error('❌ Error type:', error.constructor.name);
    console.error('❌ Full error:', error);
    
    return {
      success: false,
      error: `AI service error: ${error.message}`,
      details: error.message
    };
  }
}

// Intelligent fallback response generator
function generateIntelligentFallback(userMessage, conversationHistory = []) {
  const message = userMessage.toLowerCase();
  
  // Business idea validation responses
  if (message.includes('idea') || message.includes('validate') || message.includes('business')) {
    return `Great question about your business idea! Here's my initial assessment:

**Key Considerations:**
• Market demand validation is crucial - have you surveyed potential customers?
• Competition analysis will help identify your unique value proposition
• Consider starting with an MVP to test core assumptions

**Next Steps I'd Recommend:**
1. Conduct 20-30 customer interviews
2. Research your top 5 competitors
3. Define your minimum viable product (MVP)
4. Create a simple landing page to gauge interest

I'm experiencing some technical connectivity issues right now, but I'm here to help you succeed! What specific aspect of your idea would you like to dive deeper into?`;
  }
  
  // Funding and investment queries
  if (message.includes('fund') || message.includes('invest') || message.includes('money') || message.includes('capital')) {
    return `Funding is a critical milestone! Here's my roadmap for you:

**Pre-Funding Checklist:**
• Validate product-market fit with real customers
• Build a working MVP with key features
• Establish clear revenue model and projections
• Assemble a strong founding team

**Funding Options to Consider:**
1. **Bootstrap** - Use personal savings/revenue (maintains control)
2. **Angel Investors** - Individual investors ($25K-$100K typically)
3. **Seed VCs** - Early-stage funds ($500K-$2M range)
4. **Accelerators** - Programs like Y Combinator, Techstars

**Key Metrics Investors Want:**
• Customer acquisition cost (CAC)
• Monthly recurring revenue (MRR) growth
• User engagement and retention rates

What stage is your startup at currently? This will help me give you more targeted funding advice!`;
  }
  
  // Marketing and customer acquisition
  if (message.includes('market') || message.includes('customer') || message.includes('sell') || message.includes('user')) {
    return `Marketing and customer acquisition - let's build your growth engine!

**Customer Discovery Process:**
• Define your ideal customer persona precisely
• Find where your customers spend time online/offline
• Test different messaging and value propositions
• Track which channels drive highest-quality users

**Effective Growth Channels for Startups:**
1. **Content Marketing** - Build authority and organic reach
2. **Product Hunt & Communities** - Engage with your target audience
3. **Referral Programs** - Turn customers into advocates
4. **Social Media** - Platform-specific strategies (LinkedIn B2B, Instagram B2C)
5. **Partnerships** - Strategic alliances for mutual growth

**Quick Win Strategy:**
Start with one channel, master it completely, then expand. Many startups fail by spreading too thin across all channels.

What's your target customer profile? I can help you identify the best marketing channels for your specific audience!`;
  }
  
  // Technical and product development
  if (message.includes('product') || message.includes('develop') || message.includes('build') || message.includes('tech')) {
    return `Product development strategy - let's build something users love!

**MVP Development Framework:**
• Identify the ONE core problem you're solving
• List minimum features needed to solve that problem
• Build, test, learn, iterate quickly
• Focus on user experience over feature quantity

**Key Development Principles:**
1. **Start Simple** - Resist feature creep initially
2. **User Feedback Loop** - Weekly user interviews
3. **Data-Driven Decisions** - Track user behavior analytics
4. **Scalable Architecture** - Plan for growth from day one

**Common Startup Product Mistakes:**
✗ Building too many features before launch
✗ Not talking to users during development
✗ Perfectionism over speed to market
✗ Ignoring user onboarding experience

**Technical Stack Recommendations:**
• **Frontend:** React/Next.js for web, React Native for mobile
• **Backend:** Node.js/Express, Python/Django, or Go
• **Database:** PostgreSQL for structured data, Firebase for rapid prototyping
• **Hosting:** Vercel/Netlify for frontend, AWS/Render for backend

What type of product are you building? I can provide more specific technical guidance!`;
  }
  
  // General business strategy
  if (message.includes('strategy') || message.includes('plan') || message.includes('grow') || message.includes('scale')) {
    return `Strategic planning is essential for startup success! Here's your roadmap:

**90-Day Sprint Framework:**
• **Days 1-30:** Customer validation and market research
• **Days 31-60:** MVP development and initial testing
• **Days 61-90:** User feedback integration and go-to-market prep

**Key Strategic Areas:**
1. **Market Positioning** - How you're different from competitors
2. **Revenue Model** - How you'll make money sustainably
3. **Growth Strategy** - How you'll acquire and retain customers
4. **Team Building** - What skills you need to hire next
5. **Risk Management** - Potential threats and mitigation plans

**Startup Success Metrics:**
• Customer acquisition cost (CAC)
• Lifetime value (LTV) 
• Monthly recurring revenue (MRR)
• User engagement and retention
• Time to break-even

**Strategic Questions to Answer:**
• Who is your ideal customer, specifically?
• What's your unfair advantage?
• How will you reach your first 100 customers?
• What could kill your startup, and how will you prevent it?

I'm here to help you think through each of these areas strategically. What's your most pressing strategic challenge right now?`;
  }
  
  // Default helpful response
  return `Hi! I'm HiiNen, your AI co-founder, and I'm excited to help you build your startup! 

I'm experiencing some temporary connectivity issues, but I'm still here to support you with:

**🚀 Business Strategy & Planning**
• Idea validation and market research
• Business model development
• Competitive analysis and positioning

**💰 Funding & Investment**
• Fundraising strategy and preparation
• Investor pitch development
• Financial planning and projections

**📈 Growth & Marketing**
• Customer acquisition strategies
• Product-market fit optimization
• User engagement and retention

**🛠️ Product Development**
• MVP planning and feature prioritization
• Technical architecture guidance
• User experience optimization

**🎯 Operations & Scaling**
• Team building and hiring
• Process optimization
• Performance metrics and analytics

What specific area would you like to focus on today? I'm here to provide actionable insights and help you make progress on your startup journey!

*Note: I'm working to restore full AI connectivity, but my core business knowledge is always available to help you succeed.*`;
};

// Function to generate business insights with enhanced fallbacks
async function generateBusinessInsights(userData, requestType = 'dashboard_insights') {
  console.log('AI generateBusinessInsights - Processing request type:', requestType);
  console.log('AI generateBusinessInsights - User data:', JSON.stringify(userData, null, 2));

  let prompt;
  
  if (requestType === 'dashboard_insights') {
    prompt = `As HiiNen, your AI co-founder and business mentor, analyze this entrepreneur's profile and provide personalized business insights for their dashboard.

User Profile: ${JSON.stringify(userData)}

Provide insights in this exact JSON format:
{
  "success": true,
  "insights": [
    {"title": "Key Business Insight 1", "description": "Detailed analysis of current business status", "action": "Specific actionable recommendation", "priority": "high"},
    {"title": "Key Business Insight 2", "description": "Market opportunity or challenge identified", "action": "Strategic next step", "priority": "medium"},
    {"title": "Key Business Insight 3", "description": "Growth or optimization opportunity", "action": "Tactical implementation step", "priority": "medium"}
  ],
  "recommendations": [
    {"type": "immediate", "title": "Immediate Action", "description": "What to do right now"},
    {"type": "short_term", "title": "This Week", "description": "Weekly goal"},
    {"type": "long_term", "title": "This Month", "description": "Monthly objective"}
  ],
  "focusArea": "Primary area to focus on this week",
  "confidence": 95
}`;
  } else if (requestType === 'idea_validation') {
    prompt = `As HiiNen, validate this business idea and provide structured feedback:

Idea Data: ${JSON.stringify(userData)}

Provide validation in this exact JSON format:
{
  "success": true,
  "validation": {
    "score": 85,
    "strengths": ["Strong market demand", "Clear value proposition"],
    "weaknesses": ["High competition", "Regulatory challenges"],
    "opportunities": ["Market gap identified", "Timing advantage"],
    "threats": ["Market saturation", "Economic factors"],
    "recommendations": [
      {"priority": "high", "action": "Conduct market research"},
      {"priority": "medium", "action": "Develop MVP"},
      {"priority": "low", "action": "Build strategic partnerships"}
    ]
  },
  "nextSteps": ["Step 1", "Step 2", "Step 3"]
}`;
  } else {
    // Generic insights format
    prompt = `As HiiNen, provide business insights for this data:

Data: ${JSON.stringify(userData)}
Request Type: ${requestType}

Provide insights in JSON format with "success": true and relevant data structure.`;
  }

  console.log('AI generateBusinessInsights - Sending prompt to model');
  
  try {
    const aiResponse = await getAIResponse(prompt);
    
    if (aiResponse.success && !aiResponse.fallback) {
      // Try to parse AI response as JSON
      try {
        const parsedResponse = JSON.parse(aiResponse.response);
        console.log('✅ AI returned valid JSON insights');
        return parsedResponse;
      } catch (parseError) {
        console.log('⚠️ AI response not JSON, generating structured fallback');
        return generateStructuredInsights(userData, requestType, aiResponse.response);
      }
    } else {
      console.log('⚠️ AI fallback triggered, generating structured insights');
      return generateStructuredInsights(userData, requestType);
    }
  } catch (error) {
    console.error('❌ AI insights generation failed:', error);
    return generateStructuredInsights(userData, requestType);
  }
}

// Generate structured insights when AI is unavailable
function generateStructuredInsights(userData, requestType, aiText = null) {
  console.log('📊 Generating structured fallback insights');
  
  if (requestType === 'dashboard_insights') {
    return {
      success: true,
      insights: [
        {
          title: "Market Validation Priority",
          description: "Your business idea needs customer validation to confirm market demand and refine your value proposition.",
          action: "Conduct 25 customer interviews with your target demographic this week",
          priority: "high"
        },
        {
          title: "MVP Development Strategy", 
          description: "Focus on building a minimum viable product with core features to test your business hypothesis quickly.",
          action: "Create wireframes and identify the 3 most essential features for your MVP",
          priority: "high"
        },
        {
          title: "Competitive Intelligence",
          description: "Understanding your competitive landscape will help you position your product effectively and identify gaps.",
          action: "Research and analyze your top 5 direct and indirect competitors",
          priority: "medium"
        }
      ],
      recommendations: [
        {
          type: "immediate",
          title: "Customer Research",
          description: "Start interviewing potential customers today to validate your assumptions"
        },
        {
          type: "short_term", 
          title: "Build MVP Wireframes",
          description: "Create detailed wireframes and user journey maps for your core features"
        },
        {
          type: "long_term",
          title: "Go-to-Market Strategy",
          description: "Develop a comprehensive plan for launching and marketing your product"
        }
      ],
      focusArea: "Customer validation and MVP development",
      confidence: 85,
      fallback: true,
      aiText: aiText
    };
  }
  
  if (requestType === 'idea_validation') {
    // Generate realistic validation score based on user data
    const baseScore = 70;
    const businessStage = userData.businessStage || userData.stage || 'idea';
    const hasMarketResearch = userData.marketResearch || userData.hasValidation;
    const industry = userData.industry || userData.sector;
    
    let scoreBonus = 0;
    if (businessStage === 'mvp' || businessStage === 'launched') scoreBonus += 10;
    if (hasMarketResearch) scoreBonus += 8;
    if (['technology', 'healthcare', 'fintech', 'education'].includes(industry)) scoreBonus += 5;
    
    const finalScore = Math.min(95, baseScore + scoreBonus + Math.floor(Math.random() * 10));
    
    return {
      success: true,
      validation: {
        score: finalScore,
        strengths: [
          "Clear problem identification and target market understanding",
          "Scalable business model with growth potential",
          "Technology-enabled solution with competitive advantages"
        ],
        weaknesses: [
          "Market validation still needed to confirm customer demand",
          "Competition analysis requires deeper research",
          "Customer acquisition strategy needs development"
        ],
        opportunities: [
          "Growing market trend supports adoption potential",
          "Digital transformation creates new customer needs",
          "Strategic partnership opportunities available"
        ],
        threats: [
          "Competitive pressure from established players",
          "Customer acquisition costs may be higher than expected",
          "Regulatory or compliance requirements could impact growth"
        ],
        recommendations: [
          { priority: "high", action: "Conduct 50+ customer interviews to validate problem-solution fit" },
          { priority: "high", action: "Build MVP with core features for early user testing" },
          { priority: "medium", action: "Analyze top 10 competitors and their positioning strategies" },
          { priority: "medium", action: "Develop go-to-market strategy and customer acquisition plan" },
          { priority: "low", action: "Explore potential strategic partnerships and integrations" }
        ]
      },
      nextSteps: [
        "Validate problem-solution fit with target customers",
        "Create minimum viable product (MVP) for testing",
        "Develop comprehensive business and marketing plan",
        "Build initial team and advisory board"
      ],
      fallback: true,
      aiText: aiText
    };
  }
  
  // Generic fallback
  return {
    success: true,
    insights: [
      {
        title: "Strategic Focus",
        description: "Your business needs clear strategic direction to succeed in the competitive market.",
        action: "Define your unique value proposition and target customer segments",
        priority: "high"
      }
    ],
    recommendations: [
      {
        type: "immediate",
        title: "Market Research",
        description: "Understand your customers and competition better"
      }
    ],
    fallback: true,
    requestType: requestType
  };
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

export {
  getAIResponse,
  generateBusinessInsights,
  generateMarketAnalysis,
  AI_COFOUNDER_CONFIG
};
