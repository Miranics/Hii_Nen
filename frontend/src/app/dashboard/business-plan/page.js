'use client';

import { useState } from 'react';
import Link from "next/link";

export default function BusinessPlanPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', name: 'Executive Summary', completed: false },
    { id: 'market', name: 'Market Analysis', completed: false },
    { id: 'product', name: 'Product/Service', completed: false },
    { id: 'marketing', name: 'Marketing Strategy', completed: false },
    { id: 'operations', name: 'Operations Plan', completed: false },
    { id: 'financial', name: 'Financial Projections', completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Business Plan Builder</h1>
              <p className="text-blue-100 mt-2">Create a comprehensive business plan step by step</p>
            </div>
            <Link 
              href="/dashboard" 
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg border border-white/30 text-white transition-all duration-200"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Sections</h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center justify-between ${
                      activeSection === section.id
                        ? 'bg-blue-500/40 text-white border-l-4 border-blue-400'
                        : 'text-blue-100 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-sm">{section.name}</span>
                    {section.completed && (
                      <span className="text-green-400 text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <p className="text-blue-200 text-sm">
                  💡 Tip: Complete each section to build a comprehensive business plan
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              {activeSection === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Executive Summary</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your business name"
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Mission Statement
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Describe your company's mission..."
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-blue-200 text-sm font-medium mb-2">
                        Key Success Factors
                      </label>
                      <textarea
                        rows={4}
                        placeholder="What will make your business successful?"
                        className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSection !== 'overview' && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {sections.find(s => s.id === activeSection)?.name}
                  </h2>
                  <p className="text-blue-200 mb-6">This section is coming soon!</p>
                  <div className="bg-blue-500/20 rounded-lg p-6 border border-blue-400/30 max-w-md mx-auto">
                    <p className="text-blue-200 text-sm">
                      We're working on building comprehensive tools for each business plan section. 
                      Start with the Executive Summary and check back for updates!
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
                <button className="px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg border border-white/30 text-white transition-all duration-200">
                  Save Draft
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                  Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
