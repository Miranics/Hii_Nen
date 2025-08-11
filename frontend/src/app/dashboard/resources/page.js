'use client';

import { useState } from 'react';
import Link from "next/link";

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resources = [
    {
      id: 1,
      title: 'Startup Legal Toolkit',
      description: 'Essential legal documents and templates for your startup',
      category: 'legal',
      type: 'toolkit',
      url: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Business Model Canvas Template',
      description: 'Interactive template to develop your business model',
      category: 'planning',
      type: 'template',
      url: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Pitch Deck Examples',
      description: 'Successful pitch decks from funded startups',
      category: 'funding',
      type: 'examples',
      url: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Market Research Guide',
      description: 'Comprehensive guide to conducting market research',
      category: 'research',
      type: 'guide',
      url: '#',
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'legal', name: 'Legal' },
    { id: 'planning', name: 'Business Planning' },
    { id: 'funding', name: 'Funding' },
    { id: 'research', name: 'Market Research' }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Resources</h1>
              <p className="text-blue-100 mt-2">Tools, templates, and guides for your startup journey</p>
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
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-500/80 text-white border-blue-400'
                  : 'bg-white/10 text-blue-100 hover:bg-white/20 border-white/30'
              } backdrop-blur-sm border`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-200"
            >
              {resource.featured && (
                <div className="inline-block bg-yellow-400/20 text-yellow-300 text-xs px-2 py-1 rounded-full mb-3">
                  Featured
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-3">{resource.title}</h3>
              <p className="text-blue-100 mb-4 text-sm">{resource.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-blue-300 capitalize bg-blue-500/20 px-2 py-1 rounded">
                  {resource.type}
                </span>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm">
                  Access Resource
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-blue-200 text-lg">No resources found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
