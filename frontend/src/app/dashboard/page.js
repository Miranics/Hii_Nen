'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/supabase';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    ideasValidated: 0,
    launchProgress: 0,
    connections: 0,
    fundingReadiness: 0
  });
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        router.push('/login');
        return;
      }
      setUser(currentUser);
      // Load user stats - for now using mock data
      setStats({
        ideasValidated: 3,
        launchProgress: 67,
        connections: 12,
        fundingReadiness: 85
      });
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center gap-3">
                <Image
                  src="/hiinen-logo.svg"
                  alt="HiiNen Logo"
                  width={32}
                  height={32}
                  className="dark:brightness-0 dark:invert"
                />
                <span className="text-xl font-bold text-gray-900 dark:text-white">HiiNen</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors relative">
                <span className="text-xl">🔔</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <div className="relative group">
                <button className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm hover:from-blue-600 hover:to-purple-600 transition-all">
                  {getUserInitials(user?.email)}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{getUserName()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    ⚙️ Settings
                  </Link>
                  <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    👤 Profile
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-sm h-screen sticky top-0">
          <div className="p-6">
            <div className="space-y-6">
              {/* Dashboard Overview */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Overview</h3>
                <nav className="space-y-2">
                  <Link href="/dashboard" className="bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 group flex items-center px-3 py-2 text-sm font-medium rounded-lg">
                    <span className="mr-3">📊</span>
                    Dashboard
                  </Link>
                  <Link href="/dashboard/progress" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg">
                    <span className="mr-3">📈</span>
                    Progress
                  </Link>
                </nav>
              </div>

              {/* AI Co-Founder */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">AI Co-Founder</h3>
                <nav className="space-y-2">
                  <Link href="/dashboard/idea-validation" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg">
                    <span className="mr-3">💡</span>
                    Idea Validation
                  </Link>
                  <Link href="/dashboard/mentorship" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg">
                    <span className="mr-3">👨‍🏫</span>
                    AI Mentorship
                  </Link>
                  <Link href="/dashboard/funding" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg">
                    <span className="mr-3">💰</span>
                    Funding Tools
                  </Link>
                  <Link href="/dashboard/analytics" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg">
                    <span className="mr-3">📊</span>
                    Analytics
                  </Link>
                </nav>
              </div>

              {/* Tools */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Tools</h3>
                <nav className="space-y-2">
                  <Link href="/dashboard/networking" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg">
                    <span className="mr-3">🤝</span>
                    Networking
                  </Link>
                  <Link href="/dashboard/resources" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg">
                    <span className="mr-3">📚</span>
                    Resources
                  </Link>
                </nav>
              </div>

              {/* Settings */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Account</h3>
                <nav className="space-y-2">
                  <Link href="/dashboard/settings" className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg">
                    <span className="mr-3">⚙️</span>
                    Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group flex items-center px-3 py-2 text-sm font-medium rounded-lg w-full text-left"
                  >
                    <span className="mr-3">🚪</span>
                    Logout
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
                Welcome back, {getUserName()}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 animate-fadeInUp stagger-delay-1">
                Here's what's happening with your startup journey today.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-fadeInUp stagger-delay-1">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400">💡</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Ideas Validated</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.ideasValidated}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-fadeInUp stagger-delay-2">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400">🚀</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Launch Progress</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.launchProgress}%</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-fadeInUp stagger-delay-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400">🤝</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Connections</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.connections}</dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm animate-fadeInUp stagger-delay-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 dark:text-orange-400">💰</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Funding Ready</dt>
                      <dd className="text-lg font-medium text-gray-900 dark:text-white">{stats.fundingReadiness}%</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* AI Recommendations */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fadeInUp stagger-delay-2">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    🤖 AI Co-Founder Recommendations
                  </h2>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg">
                      <h3 className="font-medium text-blue-900 dark:text-blue-100">Market Research Opportunity</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Your SaaS idea shows 300% growth potential in the productivity space. Consider surveying 100 potential customers this week.
                      </p>
                      <button 
                        onClick={() => router.push('/dashboard/market-research')}
                        className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Start Survey →
                      </button>
                    </div>

                    <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r-lg">
                      <h3 className="font-medium text-green-900 dark:text-green-100">Mentor Match Available</h3>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        Sarah Chen (ex-Google PM) has 90% compatibility with your project. She's available for a 30-min intro call.
                      </p>
                      <button 
                        onClick={() => router.push('/dashboard/mentorship')}
                        className="mt-2 text-sm text-green-600 dark:text-green-400 hover:underline"
                      >
                        Schedule Call →
                      </button>
                    </div>

                    <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r-lg">
                      <h3 className="font-medium text-purple-900 dark:text-purple-100">Funding Milestone</h3>
                      <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                        You're 2 steps away from seed funding readiness. Complete your financial projections and pitch deck.
                      </p>
                      <button 
                        onClick={() => router.push('/dashboard/funding')}
                        className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        View Checklist →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fadeInUp stagger-delay-3">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <button 
                      onClick={() => router.push('/dashboard/idea-validation')}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-[1.02]"
                    >
                      💡 Validate New Idea
                    </button>
                    <button 
                      onClick={() => router.push('/dashboard/mentorship')}
                      className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                    >
                      🤖 Chat with AI Mentor
                    </button>
                    <button 
                      onClick={() => router.push('/dashboard/analytics')}
                      className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
                    >
                      📊 Generate Report
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 animate-fadeInUp stagger-delay-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Completed idea validation for "TaskFlow"</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Connected with Alex Rodriguez</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Updated business model canvas</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
