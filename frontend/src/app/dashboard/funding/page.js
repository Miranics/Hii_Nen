'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FundingHub() {
  const [activeSection, setActiveSection] = useState('overview');

  const fundingMetrics = {
    totalRaised: '$0',
    targetAmount: '$150K',
    investors: '0',
    progress: 0
  };

  const fundingStages = [
    { 
      stage: 'Pre-Seed', 
      range: '$10K - $100K', 
      description: 'Initial funding for MVP development and market validation',
      investors: 'Friends, Family, Angel Investors',
      equity: '5-15%'
    },
    { 
      stage: 'Seed', 
      range: '$100K - $2M', 
      description: 'Scale team, refine product-market fit, initial traction',
      investors: 'Angel Investors, Seed VCs, Accelerators',
      equity: '15-25%'
    },
    { 
      stage: 'Series A', 
      range: '$2M - $15M', 
      description: 'Scale operations, expand market reach, optimize unit economics',
      investors: 'Venture Capital Firms',
      equity: '20-30%'
    },
    { 
      stage: 'Series B+', 
      range: '$15M+', 
      description: 'International expansion, market domination, new products',
      investors: 'Large VCs, Strategic Investors',
      equity: '15-25%'
    }
  ];

  const investors = [
    {
      name: 'TechStart Ventures',
      type: 'Seed VC',
      focus: 'B2B SaaS, AI/ML',
      checkSize: '$100K - $500K',
      portfolio: '45 companies',
      contact: 'Open to pitches'
    },
    {
      name: 'Innovation Capital',
      type: 'Early Stage VC',
      focus: 'EdTech, FinTech',
      checkSize: '$250K - $1M',
      portfolio: '32 companies',
      contact: 'Warm intro preferred'
    },
    {
      name: 'Angel Network Pro',
      type: 'Angel Group',
      focus: 'Consumer Apps, B2B Tools',
      checkSize: '$25K - $100K',
      portfolio: '120+ investments',
      contact: 'Application process'
    },
    {
      name: 'Future Fund',
      type: 'Accelerator',
      focus: 'All sectors',
      checkSize: '$50K + program',
      portfolio: '200+ startups',
      contact: 'Batch applications'
    }
  ];

  const pitchChecklist = [
    { item: 'Problem Statement', completed: true, description: 'Clearly define the problem you\'re solving' },
    { item: 'Market Size & Opportunity', completed: true, description: 'TAM, SAM, SOM analysis completed' },
    { item: 'Solution & Product Demo', completed: false, description: 'Working prototype or demo ready' },
    { item: 'Business Model', completed: true, description: 'Revenue streams and pricing strategy' },
    { item: 'Traction & Metrics', completed: false, description: 'User growth, revenue, key metrics' },
    { item: 'Competitive Analysis', completed: true, description: 'Competitive landscape and differentiation' },
    { item: 'Financial Projections', completed: false, description: '3-5 year financial forecasts' },
    { item: 'Team Introduction', completed: true, description: 'Founders and key team members' },
    { item: 'Funding Ask & Use', completed: false, description: 'Amount needed and how it will be used' },
    { item: 'Exit Strategy', completed: false, description: 'Potential exit opportunities and timeline' }
  ];

  const completedItems = pitchChecklist.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedItems / pitchChecklist.length) * 100);

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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Funding Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                Create Pitch Deck
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                Find Investors
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Funding Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Raised</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{fundingMetrics.totalRaised}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Target Amount</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{fundingMetrics.targetAmount}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Investors</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{fundingMetrics.investors}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{fundingMetrics.progress}%</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
            Funding Overview
          </button>
          <button
            onClick={() => setActiveSection('stages')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'stages'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Funding Stages
          </button>
          <button
            onClick={() => setActiveSection('investors')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'investors'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Investor Directory
          </button>
          <button
            onClick={() => setActiveSection('pitch')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'pitch'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Pitch Preparation
          </button>
        </div>

        {/* Funding Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Funding Journey</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300">Funding Stage</span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                        Pre-Seed
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300">Business Stage</span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                        MVP Development
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl">
                      <span className="text-gray-700 dark:text-gray-300">Pitch Readiness</span>
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                        {completionPercentage}% Complete
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Next Steps</h3>
                  <div className="space-y-3">
                    <div className="flex items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">1</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Complete Pitch Deck</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Finalize your investor presentation</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">2</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Build MVP Traction</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Gather user feedback and metrics</p>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl">
                      <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">3</div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Network with Investors</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Start building investor relationships</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Funding Stages */}
        {activeSection === 'stages' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Funding Stages Explained</h2>
              <div className="space-y-6">
                {fundingStages.map((stage, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{stage.stage}</h3>
                      <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                        {stage.range}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{stage.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Typical Investors</p>
                        <p className="text-gray-800 dark:text-gray-200">{stage.investors}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Equity Range</p>
                        <p className="text-gray-800 dark:text-gray-200">{stage.equity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Investor Directory */}
        {activeSection === 'investors' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Investor Directory</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {investors.map((investor, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{investor.name}</h3>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                        {investor.type}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Focus Areas:</span>
                        <span className="text-gray-800 dark:text-gray-200 text-sm">{investor.focus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Check Size:</span>
                        <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">{investor.checkSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Portfolio:</span>
                        <span className="text-gray-800 dark:text-gray-200 text-sm">{investor.portfolio}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Contact:</span>
                        <span className="text-blue-600 dark:text-blue-400 text-sm">{investor.contact}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pitch Preparation */}
        {activeSection === 'pitch' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Pitch Deck Checklist</h2>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Completion</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{completionPercentage}%</p>
                  </div>
                  <div className="w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-300 dark:text-gray-600"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`}
                        className="text-blue-600 dark:text-blue-400 transition-all duration-300"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {pitchChecklist.map((item, index) => (
                  <div key={index} className="flex items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl border border-white/20 dark:border-gray-700/20">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${
                      item.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {item.completed ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.item}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      item.completed
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                        : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/70'
                    }`}>
                      {item.completed ? 'Completed' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
