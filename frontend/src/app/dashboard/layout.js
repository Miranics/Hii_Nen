'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/supabase';
import { UserProgressProvider } from '@/contexts/UserProgressContext';
import DashboardSidebar from '@/components/Dashboard/DashboardSidebar';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user: currentUser, error } = await getCurrentUser();
        if (error) {
          console.error('Error checking user:', error);
        }
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <UserProgressProvider user={user}>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <DashboardSidebar user={user} />
        
        {/* Main content */}
        <div className="lg:pl-72">
          <main className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </UserProgressProvider>
  );
}
