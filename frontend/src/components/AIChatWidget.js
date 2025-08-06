'use client';

import { useState, useRef, useEffect } from 'react';
import { callHiiNenAI, API_CONFIG, checkBackendHealth } from '../lib/api';

export default function AIChatWidget({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      message: `Hi ${user?.first_name || 'there'}! I'm HiiNen, your AI co-founder. I'm here to help you build and grow your startup. What would you like to work on today?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check backend health periodically
  useEffect(() => {
    const checkHealth = async () => {
      const isHealthy = await checkBackendHealth();
      setBackendStatus(isHealthy ? 'online' : 'offline');
      
      if (!isHealthy && connectionAttempts < 3) {
        setConnectionAttempts(prev => prev + 1);
        setTimeout(checkHealth, 10000); // Retry in 10 seconds
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [connectionAttempts]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.message
      }));

      const data = await callHiiNenAI(API_CONFIG.ENDPOINTS.AI_CHAT, {
        message: inputMessage,
        conversationHistory: conversationHistory.slice(-10),
        userContext: {
          name: user?.first_name,
          email: user?.email,
          timestamp: new Date().toISOString()
        }
      });

      if (data.success) {
        const aiMessage = {
          id: Date.now() + 1,
          sender: 'ai',
          message: data.response,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiMessage]);
        setBackendStatus('online');
        setConnectionAttempts(0);
      } else {
        throw new Error(data.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'ai',
        message: backendStatus === 'offline' 
          ? 'I\'m currently offline. The backend service may be starting up. Please try again in a moment.'
          : 'I apologize, but I\'m having trouble responding right now. Please try again.',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      setBackendStatus('offline');
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "Help me analyze my market competition",
    "What funding options should I consider?",
    "How can I improve my business plan?",
    "What's the best way to validate my idea?",
    "Help me create a marketing strategy"
  ];

  const getStatusColor = () => {
    switch (backendStatus) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'checking': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case 'online': return 'HiiNen AI Online';
      case 'offline': return 'Connecting...';
      case 'checking': return 'Checking Status...';
      default: return 'Unknown Status';
    }
  };

  return (
    <>
      {/* Enhanced Chat Toggle Button with Status Indicator */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        } text-white group`}
      >
        {/* Status Indicator */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor()} rounded-full border-2 border-white animate-pulse`}></div>
        
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium hidden group-hover:block">
              {getStatusText()}
            </span>
          </div>
        )}
      </button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-2xl flex flex-col">
          
          {/* Enhanced Chat Header with Status */}
          <div className="p-4 border-b border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center relative">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor()} rounded-full border border-white`}></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">HiiNen AI Co-founder</h3>
                  <p className={`text-xs ${backendStatus === 'online' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {getStatusText()}
                  </p>
                </div>
              </div>
              
              {/* Connection retry button when offline */}
              {backendStatus === 'offline' && (
                <button
                  onClick={() => {
                    setBackendStatus('checking');
                    setConnectionAttempts(0);
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  title="Retry connection"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Messages with enhanced error display */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : msg.isError
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                    : 'bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white border border-white/20 dark:border-gray-700/20'
                }`}>
                  <p className="text-sm">{msg.message}</p>
                  {msg.isError && (
                    <button
                      onClick={() => setMessages(prev => prev.filter(m => m.id !== msg.id))}
                      className="mt-2 text-xs underline opacity-70 hover:opacity-100"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Enhanced loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/20 rounded-2xl p-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">HiiNen is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Try asking:</p>
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="w-full text-left p-2 text-xs bg-white/20 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/20 rounded-lg hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Message Input */}
          <div className="p-4 border-t border-white/20 dark:border-gray-700/20">
            {backendStatus === 'offline' && (
              <div className="mb-3 p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg text-yellow-800 dark:text-yellow-200 text-xs text-center">
                Backend is starting up. Messages may take longer to process.
              </div>
            )}
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                placeholder={backendStatus === 'online' ? "Ask HiiNen anything about your startup..." : "Connecting to HiiNen..."}
                className="flex-1 px-3 py-2 bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm disabled:opacity-50"
                disabled={isLoading || backendStatus === 'checking'}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading || backendStatus === 'checking'}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
