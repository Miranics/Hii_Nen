'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MentorshipPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your AI Co-Founder mentor. I'm here to help you navigate your startup journey. What would you like to discuss today?",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "How do I validate my business idea?",
    "What should be in my MVP?",
    "How do I find my target market?",
    "When should I start looking for funding?",
    "How do I build a founding team?",
    "What legal structure should I choose?"
  ];

  const handleSendMessage = async (message = newMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "How do I validate my business idea?": "Great question! Here's a structured approach to validate your idea:\n\n1. **Problem-Solution Fit**: Talk to 20-30 potential customers to confirm the problem exists\n2. **Market Research**: Analyze market size, competition, and trends\n3. **MVP Testing**: Build a simple version and test with real users\n4. **Financial Validation**: Ensure people will pay for your solution\n\nWould you like me to dive deeper into any of these steps?",
        
        "What should be in my MVP?": "Your MVP should include:\n\n1. **Core Features Only**: Focus on solving the main problem\n2. **User Authentication**: If needed for your app\n3. **Basic UI/UX**: Simple but functional design\n4. **Analytics**: Track user behavior and engagement\n5. **Feedback Mechanism**: Way for users to share thoughts\n\nRemember: MVP = Minimum VIABLE Product, not minimum features. What's your idea so I can give more specific advice?",
        
        "How do I find my target market?": "Finding your target market involves:\n\n1. **Create User Personas**: Age, income, pain points, behaviors\n2. **Analyze Competitors**: Who are they targeting?\n3. **Use Analytics**: Google Analytics, social media insights\n4. **Direct Surveys**: Ask potential customers directly\n5. **Test Different Segments**: A/B test with different audiences\n\nStart broad, then narrow down based on who responds best to your solution.",
        
        "When should I start looking for funding?": "Consider funding when you have:\n\n1. **Proven Traction**: Users, revenue, or strong engagement metrics\n2. **Clear Business Model**: How you'll make money\n3. **Scalability Plan**: How you'll grow with investment\n4. **Strong Team**: Co-founders or key employees\n5. **Market Validation**: Proof people want your product\n\nBootstrap as long as possible - it keeps you focused and gives you more equity.",
        
        "How do I build a founding team?": "Building a strong team:\n\n1. **Complementary Skills**: Technical + Business + Domain expertise\n2. **Shared Vision**: Everyone believes in the mission\n3. **Work History**: People you've worked with before\n4. **Equity Structure**: Fair but performance-based\n5. **Cultural Fit**: Similar work ethic and values\n\nDon't rush this - a bad co-founder is worse than no co-founder.",
        
        "What legal structure should I choose?": "For most startups, I recommend:\n\n1. **LLC**: Simple, flexible, good for small teams\n2. **C-Corp**: Better for raising investment, employee stock options\n3. **Delaware C-Corp**: Gold standard for VC-backed startups\n\nFactors to consider:\n- Funding plans\n- Tax implications\n- Number of founders\n- Employee equity plans\n\nConsult with a startup lawyer for specific advice!"
      };

      const response = responses[message] || "That's an interesting question! Based on my experience with thousands of startups, I'd recommend starting with customer discovery. Talk to your potential users, understand their pain points, and validate that your solution addresses a real need. Would you like me to help you create a customer interview script?";

      const aiMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                🤖 AI Co-Founder Mentorship
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">AI Co-Founder</h2>
                <p className="text-sm text-green-500">● Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Suggested questions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="text-left text-sm p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all text-gray-700 dark:text-gray-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about your startup..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:text-white"
                disabled={loading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !newMessage.trim()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
