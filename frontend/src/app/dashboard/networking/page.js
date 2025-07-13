'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Networking() {
  const [activeSection, setActiveSection] = useState('discover');

  const networkingStats = {
    connections: '127',
    mentors: '8',
    events: '12',
    messages: '45'
  };

  const suggestedConnections = [
    {
      name: 'Sarah Chen',
      title: 'Serial Entrepreneur & Angel Investor',
      company: 'TechStart Ventures',
      expertise: ['SaaS', 'B2B Sales', 'Fundraising'],
      mutualConnections: 3,
      avatar: 'SC',
      location: 'San Francisco, CA'
    },
    {
      name: 'Marcus Rodriguez',
      title: 'Product Manager',
      company: 'Meta',
      expertise: ['Product Strategy', 'User Research', 'Growth'],
      mutualConnections: 5,
      avatar: 'MR',
      location: 'Austin, TX'
    },
    {
      name: 'Lisa Wang',
      title: 'VP of Engineering',
      company: 'Stripe',
      expertise: ['Engineering Leadership', 'Scaling Teams', 'FinTech'],
      mutualConnections: 2,
      avatar: 'LW',
      location: 'New York, NY'
    },
    {
      name: 'David Park',
      title: 'Marketing Director',
      company: 'Shopify',
      expertise: ['Digital Marketing', 'Brand Strategy', 'E-commerce'],
      mutualConnections: 4,
      avatar: 'DP',
      location: 'Toronto, ON'
    }
  ];

  const upcomingEvents = [
    {
      title: 'TechCrunch Startup Battlefield',
      date: '2024-02-15',
      time: '9:00 AM - 6:00 PM',
      location: 'San Francisco, CA',
      type: 'Conference',
      attendees: 2500,
      price: '$299',
      tags: ['Startups', 'Investors', 'Demo Day']
    },
    {
      title: 'AI Founders Meetup',
      date: '2024-02-20',
      time: '6:00 PM - 9:00 PM',
      location: 'Virtual',
      type: 'Meetup',
      attendees: 150,
      price: 'Free',
      tags: ['AI/ML', 'Networking', 'Technical']
    },
    {
      title: 'Women in Tech Leadership Summit',
      date: '2024-02-25',
      time: '10:00 AM - 4:00 PM',
      location: 'Austin, TX',
      type: 'Summit',
      attendees: 800,
      price: '$149',
      tags: ['Leadership', 'Diversity', 'Career Growth']
    },
    {
      title: 'Venture Capital Mixer',
      date: '2024-03-01',
      time: '7:00 PM - 10:00 PM',
      location: 'New York, NY',
      type: 'Networking',
      attendees: 200,
      price: '$75',
      tags: ['VC', 'Funding', 'Investors']
    }
  ];

  const recentMessages = [
    {
      name: 'Jennifer Liu',
      message: 'Thanks for connecting! I\'d love to discuss your EdTech startup...',
      time: '2 hours ago',
      avatar: 'JL',
      unread: true
    },
    {
      name: 'Alex Thompson',
      message: 'Great meeting you at the networking event yesterday!',
      time: '1 day ago',
      avatar: 'AT',
      unread: false
    },
    {
      name: 'Maria Garcia',
      message: 'I have some insights about your market research that might help...',
      time: '2 days ago',
      avatar: 'MG',
      unread: true
    },
    {
      name: 'Tech Accelerator Program',
      message: 'Your application has been reviewed. We\'d like to schedule...',
      time: '3 days ago',
      avatar: 'TA',
      unread: false
    }
  ];

  const mentors = [
    {
      name: 'Robert Kim',
      title: 'Former CTO at Uber',
      expertise: ['Technical Leadership', 'Scaling Engineering', 'System Architecture'],
      rating: 4.9,
      sessions: 127,
      avatar: 'RK',
      hourlyRate: '$200/hr',
      nextAvailable: 'Tomorrow 2:00 PM'
    },
    {
      name: 'Amanda Foster',
      title: 'Ex-Goldman Sachs, Angel Investor',
      expertise: ['Financial Planning', 'Investment Strategy', 'Due Diligence'],
      rating: 4.8,
      sessions: 89,
      avatar: 'AF',
      hourlyRate: '$150/hr',
      nextAvailable: 'Friday 10:00 AM'
    },
    {
      name: 'Carlos Mendez',
      title: 'Former Head of Growth at Airbnb',
      expertise: ['Growth Hacking', 'User Acquisition', 'Analytics'],
      rating: 4.9,
      sessions: 156,
      avatar: 'CM',
      hourlyRate: '$175/hr',
      nextAvailable: 'Monday 3:00 PM'
    }
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Networking Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                Create Event
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                Find Mentors
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Networking Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Connections</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{networkingStats.connections}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Mentors</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{networkingStats.mentors}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-xl">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Events Attended</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{networkingStats.events}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Messages</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{networkingStats.messages}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveSection('discover')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'discover'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Discover People
          </button>
          <button
            onClick={() => setActiveSection('events')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'events'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Events & Meetups
          </button>
          <button
            onClick={() => setActiveSection('mentors')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'mentors'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Find Mentors
          </button>
          <button
            onClick={() => setActiveSection('messages')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'messages'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Messages
          </button>
        </div>

        {/* Discover People */}
        {activeSection === 'discover' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Suggested Connections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestedConnections.map((person, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {person.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{person.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{person.title}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{person.company}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{person.location}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {person.expertise.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {person.mutualConnections} mutual connections
                      </p>
                      <div className="flex space-x-2">
                        <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                          Connect
                        </button>
                        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events & Meetups */}
        {activeSection === 'events' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Events</h2>
              <div className="space-y-6">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                            {event.type}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.date} • {event.time}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {event.attendees} attendees
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            {event.price}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {event.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-6">
                        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium">
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Find Mentors */}
        {activeSection === 'mentors' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Mentors</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {mentors.map((mentor, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {mentor.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mentor.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{mentor.title}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                            {mentor.rating} ({mentor.sessions} sessions)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Rate:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{mentor.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Next Available:</span>
                        <span className="text-green-600 dark:text-green-400">{mentor.nextAvailable}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium">
                        Book Session
                      </button>
                      <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm font-medium">
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        {activeSection === 'messages' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Messages</h2>
              <div className="space-y-4">
                {recentMessages.map((message, index) => (
                  <div key={index} className={`p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/40 dark:hover:bg-gray-800/40 ${
                    message.unread 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                      : 'bg-white/30 dark:bg-gray-800/30 border-white/20 dark:border-gray-700/20'
                  }`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {message.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{message.name}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{message.time}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{message.message}</p>
                      </div>
                      {message.unread && (
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium">
                  View All Messages
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
