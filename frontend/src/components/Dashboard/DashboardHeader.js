'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/supabase';
import { useUserProgress } from '@/contexts/UserProgressContext';

export default function DashboardHeader({ user, title }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { stats } = useUserProgress();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="lg:pl-72">
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          // onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 lg:hidden" />

        <div className="flex flex-1 justify-between items-center">
          {/* Page title and breadcrumb */}
          <div>
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              {title || 'Dashboard'}
            </h1>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <span>Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</span>
            </div>
          </div>

          {/* Right side - Stats and Profile */}
          <div className="flex items-center gap-x-4">
            {/* Quick stats */}
            <div className="hidden sm:flex items-center gap-x-4 text-sm">
              <div className="flex items-center gap-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">{stats.ideasValidated} Ideas</span>
              </div>
              <div className="flex items-center gap-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">{stats.businessScore}% Score</span>
              </div>
              <div className="flex items-center gap-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">{stats.networkConnections} Connections</span>
              </div>
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-x-2 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-medium text-gray-900">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {user?.user_metadata?.user_type || 'Entrepreneur'}
                  </div>
                </div>
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <a
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account Settings
                  </a>
                  <a
                    href="/dashboard/analytics"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    View Analytics
                  </a>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
