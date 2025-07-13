'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MarketResearch() {
  const [activeSection, setActiveSection] = useState('overview');

  const researchData = {
    marketSize: '$2.3B',
    growth: '+23%',
    competitorCount: '247',
    opportunities: '14'
  };

  const competitors = [
    { name: 'TechCorp', marketShare: '15%', strength: 'Technology', weakness: 'Customer Service' },
    { name: 'InnovateLab', marketShare: '12%', strength: 'Innovation', weakness: 'Pricing' },
    { name: 'StartupBase', marketShare: '8%', strength: 'Marketing', weakness: 'Product Features' },
    { name: 'DigitalFlow', marketShare: '6%', strength: 'User Experience', weakness: 'Market Reach' }
  ];

  const trends = [
    { trend: 'AI Integration', impact: 'High', timeline: '6-12 months', description: 'Increased demand for AI-powered solutions' },
    { trend: 'Remote Work Tools', impact: 'Medium', timeline: '3-6 months', description: 'Growing need for collaboration platforms' },
    { trend: 'Sustainability Focus', impact: 'Medium', timeline: '12-18 months', description: 'Consumer preference for eco-friendly options' },
    { trend: 'Mobile-First Design', impact: 'High', timeline: '3-9 months', description: 'Mobile usage continues to dominate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-black dark:via-gray-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Market Research</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Market Size</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{researchData.marketSize}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Market Growth</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{researchData.growth}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Competitors</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{researchData.competitorCount}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Opportunities</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{researchData.opportunities}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveSection('overview')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'overview'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Market Overview
          </button>
          <button
            onClick={() => setActiveSection('competitors')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'competitors'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Competitor Analysis
          </button>
          <button
            onClick={() => setActiveSection('trends')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'trends'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Market Trends
          </button>
          <button
            onClick={() => setActiveSection('research')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'research'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Research Tools
          </button>
        </div>

        {/* Content Sections */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Market Analysis Summary</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The current market shows strong growth potential with a total addressable market of $2.3B and a year-over-year growth rate of 23%. 
                  This indicates a healthy and expanding market environment for new entrants.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  With 247 identified competitors, the market is competitive but not oversaturated, leaving room for innovative solutions. 
                  We've identified 14 key opportunities for market entry and differentiation.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Key success factors include technology innovation, customer experience, and strategic partnerships. 
                  The market is shifting towards AI integration and mobile-first solutions.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'competitors' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Competitors</h2>
              <div className="space-y-4">
                {competitors.map((competitor, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{competitor.name}</h3>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                        {competitor.marketShare} Market Share
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Strength</p>
                        <p className="text-gray-700 dark:text-gray-300">{competitor.strength}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Weakness</p>
                        <p className="text-gray-700 dark:text-gray-300">{competitor.weakness}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'trends' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Market Trends</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trends.map((trend, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{trend.trend}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        trend.impact === 'High' 
                          ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                          : 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200'
                      }`}>
                        {trend.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">{trend.description}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Timeline: {trend.timeline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'research' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Research Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all text-left">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Survey Builder</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Create custom surveys to gather market insights from your target audience.</p>
                </button>

                <button className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all text-left">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Competitor Scanner</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Automatically discover and analyze competitors in your market space.</p>
                </button>

                <button className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all text-left">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trend Analyzer</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Track and analyze market trends using AI-powered data analysis.</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
