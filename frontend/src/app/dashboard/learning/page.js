'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LearningHub() {
  const [activeSection, setActiveSection] = useState('courses');

  const learningStats = {
    coursesCompleted: '12',
    hoursLearned: '84',
    certificates: '5',
    currentStreak: '7'
  };

  const featuredCourses = [
    {
      title: 'Startup Fundamentals: From Idea to Launch',
      instructor: 'Sarah Chen',
      duration: '8 weeks',
      level: 'Beginner',
      rating: 4.8,
      students: 2340,
      price: '$199',
      image: 'startup-fundamentals',
      progress: 0,
      topics: ['Business Planning', 'Market Research', 'MVP Development', 'Fundraising']
    },
    {
      title: 'Advanced Growth Hacking Strategies',
      instructor: 'Marcus Rodriguez',
      duration: '6 weeks',
      level: 'Advanced',
      rating: 4.9,
      students: 1890,
      price: '$299',
      image: 'growth-hacking',
      progress: 35,
      topics: ['User Acquisition', 'Retention Strategies', 'Analytics', 'A/B Testing']
    },
    {
      title: 'Financial Planning for Entrepreneurs',
      instructor: 'Lisa Wang',
      duration: '4 weeks',
      level: 'Intermediate',
      rating: 4.7,
      students: 1560,
      price: '$149',
      image: 'financial-planning',
      progress: 100,
      topics: ['Financial Modeling', 'Cash Flow', 'Investment Analysis', 'Risk Management']
    },
    {
      title: 'Product Management Mastery',
      instructor: 'David Park',
      duration: '10 weeks',
      level: 'Intermediate',
      rating: 4.8,
      students: 2100,
      price: '$249',
      image: 'product-management',
      progress: 0,
      topics: ['Product Strategy', 'User Research', 'Roadmapping', 'Launch Planning']
    }
  ];

  const resources = [
    {
      title: 'Startup Toolkit',
      description: 'Essential templates and tools for starting your business',
      type: 'Templates',
      items: 45,
      icon: 'toolkit'
    },
    {
      title: 'Legal Documents Library',
      description: 'Standard legal documents and contracts for startups',
      type: 'Legal',
      items: 23,
      icon: 'legal'
    },
    {
      title: 'Funding Resources',
      description: 'Investor databases, pitch deck templates, and funding guides',
      type: 'Funding',
      items: 31,
      icon: 'funding'
    },
    {
      title: 'Marketing Playbooks',
      description: 'Proven marketing strategies and campaign templates',
      type: 'Marketing',
      items: 38,
      icon: 'marketing'
    }
  ];

  const webinars = [
    {
      title: 'Building Your First MVP in 30 Days',
      presenter: 'Alex Thompson',
      date: '2024-02-20',
      time: '2:00 PM PST',
      duration: '60 minutes',
      attendees: 450,
      type: 'Live',
      topics: ['MVP Development', 'Rapid Prototyping', 'User Testing']
    },
    {
      title: 'Raising Your Seed Round: A Complete Guide',
      presenter: 'Jennifer Liu',
      date: '2024-02-25',
      time: '11:00 AM PST',
      duration: '90 minutes',
      attendees: 380,
      type: 'Live',
      topics: ['Fundraising', 'Pitch Deck', 'Investor Relations']
    },
    {
      title: 'Scaling Your Engineering Team',
      presenter: 'Robert Kim',
      date: '2024-03-01',
      time: '3:00 PM PST',
      duration: '75 minutes',
      attendees: 320,
      type: 'Live',
      topics: ['Team Building', 'Technical Leadership', 'Remote Work']
    },
    {
      title: 'Customer Acquisition Strategies That Work',
      presenter: 'Maria Garcia',
      date: 'Available Now',
      time: 'On-demand',
      duration: '45 minutes',
      attendees: 890,
      type: 'Recorded',
      topics: ['Customer Acquisition', 'Digital Marketing', 'Growth Metrics']
    }
  ];

  const achievements = [
    { title: 'First Course Completed', icon: '🎓', unlocked: true },
    { title: 'Week Streak Champion', icon: '🔥', unlocked: true },
    { title: 'Knowledge Seeker', icon: '📚', unlocked: true },
    { title: 'MVP Builder', icon: '🚀', unlocked: false },
    { title: 'Funding Expert', icon: '💰', unlocked: false },
    { title: 'Marketing Guru', icon: '📈', unlocked: false }
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Hub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                My Learning
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
                Browse All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Courses Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{learningStats.coursesCompleted}</p>
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hours Learned</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{learningStats.hoursLearned}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certificates</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{learningStats.certificates}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Streak</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{learningStats.currentStreak} days</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-xl">
                <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/10 dark:bg-gray-900/10 backdrop-blur-md rounded-xl p-1 mb-8">
          <button
            onClick={() => setActiveSection('courses')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'courses'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveSection('resources')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'resources'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Resources
          </button>
          <button
            onClick={() => setActiveSection('webinars')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'webinars'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Webinars
          </button>
          <button
            onClick={() => setActiveSection('achievements')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeSection === 'achievements'
                ? 'bg-white/80 dark:bg-gray-800/80 text-blue-600 dark:text-blue-400 shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
            }`}
          >
            Achievements
          </button>
        </div>

        {/* Featured Courses */}
        {activeSection === 'courses' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredCourses.map((course, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl overflow-hidden border border-white/20 dark:border-gray-700/20">
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                      <div className="text-white text-center">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="text-sm opacity-90">Course Preview</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                          {course.level}
                        </span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{course.price}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">By {course.instructor}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {course.duration}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {course.rating}
                        </span>
                        <span>{course.students} students</span>
                      </div>

                      {course.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-400">Progress</span>
                            <span className="text-gray-900 dark:text-white font-medium">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.topics.map((topic, topicIndex) => (
                          <span key={topicIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>

                      <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        course.progress === 100
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : course.progress > 0
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-600 hover:bg-gray-700 text-white'
                      }`}>
                        {course.progress === 100 ? 'Completed' : course.progress > 0 ? 'Continue' : 'Enroll Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resources */}
        {activeSection === 'resources' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learning Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{resource.title}</h3>
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                            {resource.type}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{resource.items} items</span>
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
                            Explore
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Webinars */}
        {activeSection === 'webinars' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upcoming Webinars</h2>
              <div className="space-y-6">
                {webinars.map((webinar, index) => (
                  <div key={index} className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{webinar.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            webinar.type === 'Live'
                              ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                              : 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200'
                          }`}>
                            {webinar.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Presented by {webinar.presenter}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {webinar.date} • {webinar.time}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {webinar.duration}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {webinar.attendees} registered
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {webinar.topics.map((topic, topicIndex) => (
                            <span key={topicIndex} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-xs">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-6">
                        <button className={`px-6 py-2 rounded-lg transition-colors font-medium ${
                          webinar.type === 'Live'
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}>
                          {webinar.type === 'Live' ? 'Register' : 'Watch Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements */}
        {activeSection === 'achievements' && (
          <div className="space-y-6">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-6 rounded-xl border transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800'
                      : 'bg-white/30 dark:bg-gray-800/30 border-white/20 dark:border-gray-700/20 opacity-60'
                  }`}>
                    <div className="text-center">
                      <div className={`text-6xl mb-4 ${achievement.unlocked ? '' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {achievement.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        achievement.unlocked
                          ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {achievement.unlocked ? 'Unlocked' : 'Locked'}
                      </span>
                    </div>
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
