'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BusinessPlanning() {
  const [activeSection, setActiveSection] = useState('canvas');
  const [planProgress, setPlanProgress] = useState(65);

  const businessModel = {
    valueProposition: 'AI-powered startup mentorship platform',
    customerSegments: 'Early-stage entrepreneurs, first-time founders',
    channels: 'Web platform, mobile app, partnerships',
    revenueStreams: 'Subscription fees, mentor commissions, premium features'
  };

  const milestones = [
    { title: 'Market Research Completion', status: 'completed', date: '2024-01-15', progress: 100 },
    { title: 'MVP Development', status: 'in-progress', date: '2024-02-28', progress: 75 },
    { title: 'Beta Testing Launch', status: 'pending', date: '2024-03-15', progress: 0 },
    { title: 'Funding Round A', status: 'pending', date: '2024-04-30', progress: 0 },
    { title: 'Product Launch', status: 'pending', date: '2024-06-01', progress: 0 }
  ];

  const financialProjections = [
    { year: 'Year 1', revenue: '$50K', expenses: '$80K', profit: '-$30K' },
    { year: 'Year 2', revenue: '$200K', expenses: '$150K', profit: '$50K' },
    { year: 'Year 3', revenue: '$500K', expenses: '$300K', profit: '$200K' },
    { year: 'Year 4', revenue: '$1.2M', expenses: '$600K', profit: '$600K' },
    { year: 'Year 5', revenue: '$2.5M', expenses: '$1.2M', profit: '$1.3M' }
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Business Planning</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Plan Progress:</span>
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${planProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{planProgress}%</span>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                Export Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveSection('canvas')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'canvas'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Business Model Canvas
          </button>
          <button
            onClick={() => setActiveSection('roadmap')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'roadmap'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Roadmap & Milestones
          </button>
          <button
            onClick={() => setActiveSection('financial')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'financial'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Financial Planning
          </button>
          <button
            onClick={() => setActiveSection('templates')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'templates'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Templates & Tools
          </button>
        </div>

        {/* Business Model Canvas */}
        {activeSection === 'canvas' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Key Partners */}
              <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  Key Partners
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Technology vendors</li>
                  <li>• Educational institutions</li>
                  <li>• Industry mentors</li>
                  <li>• Payment processors</li>
                  <li>• Marketing partners</li>
                </ul>
                <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Edit Partners
                </button>
              </div>

              {/* Key Activities */}
              <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  Key Activities
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Platform development</li>
                  <li>• Mentor recruitment</li>
                  <li>• Content creation</li>
                  <li>• User support</li>
                  <li>• Marketing campaigns</li>
                </ul>
                <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Edit Activities
                </button>
              </div>

              {/* Value Proposition */}
              <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6 lg:col-span-2 xl:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  Value Proposition
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {businessModel.valueProposition}
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>• AI-powered mentor matching</p>
                  <p>• Personalized learning paths</p>
                  <p>• Real-time progress tracking</p>
                  <p>• Community-driven support</p>
                </div>
                <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Edit Value Proposition
                </button>
              </div>

              {/* Customer Relationships */}
              <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  Customer Relationships
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Personal assistance</li>
                  <li>• Self-service platform</li>
                  <li>• Online communities</li>
                  <li>• Automated services</li>
                  <li>• Co-creation workshops</li>
                </ul>
                <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Edit Relationships
                </button>
              </div>

              {/* Customer Segments */}
              <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  Customer Segments
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {businessModel.customerSegments}
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• First-time entrepreneurs</li>
                  <li>• Tech startup founders</li>
                  <li>• Business students</li>
                  <li>• Career changers</li>
                </ul>
                <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                  Edit Segments
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Roadmap & Milestones */}
        {activeSection === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Project Milestones</h2>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' 
                        ? 'bg-green-500 text-white' 
                        : milestone.status === 'in-progress'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                    }`}>
                      {milestone.status === 'completed' ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 bg-white/30 dark:bg-gray-800/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{milestone.title}</h3>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{milestone.date}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{milestone.progress}% Complete</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Financial Planning */}
        {activeSection === 'financial' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Projections</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Year</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Revenue</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Expenses</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Net Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialProjections.map((projection, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{projection.year}</td>
                        <td className="py-3 px-4 text-green-600 dark:text-green-400">{projection.revenue}</td>
                        <td className="py-3 px-4 text-red-600 dark:text-red-400">{projection.expenses}</td>
                        <td className={`py-3 px-4 font-medium ${
                          projection.profit.startsWith('-') 
                            ? 'text-red-600 dark:text-red-400' 
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          {projection.profit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Funding Requirements</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">$150K</p>
                <p className="text-gray-600 dark:text-gray-400">Initial funding needed</p>
              </div>

              <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Break-even Point</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Month 18</p>
                <p className="text-gray-600 dark:text-gray-400">Expected break-even</p>
              </div>

              <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">ROI Projection</h3>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">267%</p>
                <p className="text-gray-600 dark:text-gray-400">5-year ROI estimate</p>
              </div>
            </div>
          </div>
        )}

        {/* Templates & Tools */}
        {activeSection === 'templates' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Business Plan Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <button className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all text-left">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Executive Summary</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Create a compelling executive summary template.</p>
                </button>

                <button className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all text-left">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Financial Model</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Build comprehensive financial projections and models.</p>
                </button>

                <button className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all text-left">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Analysis</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Detailed market research and analysis templates.</p>
                </button>

                <button className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all text-left">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Marketing Strategy</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Develop comprehensive marketing and sales strategies.</p>
                </button>

                <button className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all text-left">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Structure</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Plan your organizational structure and hiring strategy.</p>
                </button>

                <button className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20 hover:bg-white/40 dark:hover:bg-gray-800/40 transition-all text-left">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl mr-4">
                      <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Risk Assessment</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Identify and plan for potential business risks.</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
