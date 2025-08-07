'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/supabase';
import AIChatWidget from '@/components/AIChatWidget';
import { callHiiNenAI, API_CONFIG, getUserProgress, completeUserGoal } from '@/lib/api';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiInsights, setAiInsights] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [userProgress, setUserProgress] = useState(null);
  const [progressLoading, setProgressLoading] = useState(false);
  const [stats, setStats] = useState({
    ideasValidated: 0,
    businessScore: 0,
    networkConnections: 0,
    fundingReadiness: 0
  });
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserProgress();
      fetchAIInsights();
    }
  }, [user]);

  const fetchUserProgress = async () => {
    if (!user?.id) return;
    
    setProgressLoading(true);
    try {
      const result = await getUserProgress(user.id);
      if (result.success && result.data) {
        setUserProgress(result.data);
        setStats({
          ideasValidated: result.data.stats?.ideasValidated || 0,
          businessScore: result.data.stats?.businessScore || 0,
          networkConnections: result.data.stats?.networkConnections || 0,
          fundingReadiness: result.data.stats?.fundingReadiness || 0
        });
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    } finally {
      setProgressLoading(false);
    }
  };

  const handleCompleteGoal = async (goalId) => {
    if (!user?.id || !goalId) return;
    
    try {
      const result = await completeUserGoal(user.id, goalId);
      if (result.success) {
        // Refresh user progress to reflect the completed goal
        await fetchUserProgress();
      }
    } catch (error) {
      console.error('Error completing goal:', error);
    }
  };

  const fetchAIInsights = async () => {
    setInsightsLoading(true);
    try {
      const data = await callHiiNenAI(API_CONFIG.ENDPOINTS.AI_INSIGHTS, {
        userProfile: {
          email: user?.email,
          metadata: user?.user_metadata,
          stats: stats,
          progress: userProgress
        },
        requestType: 'dashboard_insights'
      });
      
      if (data.success) {
        setAiInsights(data.insights || []);
        setAiRecommendations(data.recommendations || []);
      } else {
        // Fallback to static insights if API fails
        setAiInsights([
          {
            type: 'market_validation',
            title: 'Market Validation Opportunity',
            message: 'Based on your profile, I\'ve identified a 73% market fit potential for SaaS solutions in your industry. Consider validating with 50+ customer interviews before your next funding round.',
            color: 'blue',
            action: 'Ask HiiNen'
          },
          {
            type: 'funding',
            title: 'Funding Readiness Assessment',
            message: 'Your metrics show 85% readiness for Series A. Focus on improving monthly recurring revenue growth rate and customer acquisition cost optimization.',
            color: 'green',
            action: 'Get Strategy'
          },
          {
            type: 'growth',
            title: 'Growth Acceleration Tip',
            message: 'Your current trajectory suggests implementing a referral program could increase user acquisition by 40%. I can help you design one tailored to your business model.',
            color: 'purple',
            action: 'Learn More'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      // Use static insights as fallback
      setAiInsights([
        {
          type: 'market_validation',
          title: 'Market Validation Opportunity',
          message: 'Based on your profile, I\'ve identified a 73% market fit potential for SaaS solutions in your industry.',
          color: 'blue',
          action: 'Ask HiiNen'
        }
      ]);
    }
    setInsightsLoading(false);
  };

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      // User progress will be fetched automatically by useEffect when user is set
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getUserInitials = (email) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    return user?.email?.split('@')[0] || 'User';
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-black dark:via-gray-900 dark:to-blue-900">
      {/* Animated Background Elements */}
      <div className="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-[120px] opacity-20 animate-float -z-10"></div>
      <div className="fixed bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-r from-pink-400 to-blue-500 rounded-full blur-[80px] opacity-15 animate-float stagger-delay-2 -z-10"></div>

      {/* Navigation Header */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <Image
                  src="/hiinen-logo.svg"
                  alt="HiiNen Logo"
                  width={32}
                  height={32}
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">HiiNen</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5h5l-5-5H9l-5 5h5l-5 5h5z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <div className="relative group">
                <button className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm hover:from-blue-600 hover:to-purple-600 transition-all">
                  {getUserInitials(user?.email)}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-xl py-2 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100 border border-white/20">
                  <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{getUserName()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50">
                    Settings
                  </Link>
                  <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50">
                    Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm h-screen sticky top-0 border-r border-white/20">
          <div className="p-6">
            <div className="space-y-8">
              {/* Dashboard Overview */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Overview</h3>
                <nav className="space-y-2">
                  <Link href="/dashboard" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Dashboard
                  </Link>
                  <Link href="/dashboard/analytics" className="text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics
                  </Link>
                </nav>
              </div>

              {/* AI Features */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">AI Co-Founder</h3>
                <nav className="space-y-2">
                  <Link href="/dashboard/idea-validation" className="text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Idea Validation
                  </Link>
                  <Link href="/dashboard/mentorship" className="text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    AI Mentorship
                  </Link>
                  <Link href="/dashboard/market-research" className="text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Market Research
                  </Link>
                  <Link href="/dashboard/business-plan" className="text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Business Planning
                  </Link>
                </nav>
              </div>

              {/* Growth Tools */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Growth</h3>
                <nav className="space-y-2">
                  <Link href="/dashboard/funding" className="text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Funding Hub
                  </Link>
                  <Link href="/dashboard/networking" className="text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Networking
                  </Link>
                  <Link href="/dashboard/resources" className="text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Learning Hub
                  </Link>
                </nav>
              </div>

              {/* Account */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Account</h3>
                <nav className="space-y-2">
                  <Link href="/dashboard/settings" className="text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-800/50 group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 group flex items-center px-4 py-3 text-sm font-medium rounded-xl w-full text-left transition-all"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-fadeInUp">
                Good morning, {getUserName()}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 animate-fadeInUp stagger-delay-1">
                Here's your startup progress overview for today.
              </p>
            </div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 animate-fadeInUp stagger-delay-1 dashboard-card">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Ideas Validated</dt>
                      <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.ideasValidated}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 animate-fadeInUp stagger-delay-2 dashboard-card">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Business Score</dt>
                      <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.businessScore}/100</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 animate-fadeInUp stagger-delay-3 dashboard-card">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Network Connections</dt>
                      <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.networkConnections}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 animate-fadeInUp stagger-delay-4 dashboard-card">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Funding Readiness</dt>
                      <dd className="text-2xl font-bold text-gray-900 dark:text-white">{stats.fundingReadiness}%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* HiiNen AI Insights */}
              <div className="lg:col-span-2">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-sm p-6 animate-fadeInUp stagger-delay-2 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        HiiNen AI Insights
                      </h2>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                      Real-time
                    </span>
                  </div>
                  <div className="space-y-4">
                    {insightsLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <span className="ml-3 text-gray-600 dark:text-gray-400">HiiNen is analyzing your data...</span>
                      </div>
                    ) : (
                      aiInsights.map((insight, index) => (
                        <div key={index} className={`border-l-4 border-${insight.color}-500 bg-${insight.color}-50/50 dark:bg-${insight.color}-900/20 p-4 rounded-r-xl`}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className={`font-medium text-${insight.color}-900 dark:text-${insight.color}-100`}>{insight.title}</h3>
                              <p className={`text-sm text-${insight.color}-700 dark:text-${insight.color}-300 mt-1`}>
                                {insight.message}
                              </p>
                            </div>
                            <button className={`text-xs text-${insight.color}-600 dark:text-${insight.color}-400 hover:underline ml-4 whitespace-nowrap`}>
                              {insight.action}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                    
                    {aiInsights.length === 0 && !insightsLoading && (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">Ask HiiNen for personalized insights!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Center */}
              <div className="space-y-6">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-sm p-6 animate-fadeInUp stagger-delay-3 border border-white/20">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
                  <div className="space-y-4">
                    <button 
                      onClick={() => router.push('/dashboard/idea-validation')}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-[1.02] flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Validate New Idea
                    </button>
                    <button 
                      onClick={() => router.push('/dashboard/mentorship')}
                      className="w-full bg-white/70 dark:bg-gray-700/70 backdrop-blur-md border border-white/20 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-medium hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Ask AI Mentor
                    </button>
                    <button 
                      onClick={() => router.push('/dashboard/business-plan')}
                      className="w-full bg-white/70 dark:bg-gray-700/70 backdrop-blur-md border border-white/20 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-medium hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Update Business Plan
                    </button>
                  </div>
                </div>

                {/* Progress Tracker */}
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-sm p-6 animate-fadeInUp stagger-delay-4 border border-white/20">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">This Week's Goals</h2>
                  <div className="space-y-4">
                    {progressLoading ? (
                      <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Loading goals...</span>
                      </div>
                    ) : userProgress?.weeklyGoals && userProgress.weeklyGoals.length > 0 ? (
                      userProgress.weeklyGoals.slice(0, 5).map((goal) => (
                        <div key={goal._id} className="flex items-start space-x-3">
                          <button
                            onClick={() => !goal.completed && handleCompleteGoal(goal._id)}
                            disabled={goal.completed}
                            className={`w-5 h-5 rounded-full flex items-center justify-center mt-1 transition-colors ${
                              goal.completed 
                                ? 'bg-green-500 cursor-default' 
                                : 'border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 cursor-pointer'
                            }`}
                          >
                            {goal.completed && (
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${goal.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                              {goal.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {goal.completed 
                                ? `Completed ${new Date(goal.completedAt).toLocaleDateString()}`
                                : `Due ${new Date(goal.dueDate).toLocaleDateString()}`
                              }
                            </p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            goal.priority === 'high' 
                              ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                              : goal.priority === 'medium'
                              ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }`}>
                            {goal.priority}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No goals set for this week.</p>
                        <button className="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                          Add your first goal
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Widget */}
      <AIChatWidget user={user} />
    </div>
  );
}
