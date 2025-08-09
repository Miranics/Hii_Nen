'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/lib/supabase';
import { UserProgressProvider } from '@/contexts/UserProgressContext';

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
        console.log('Dashboard Layout - User loaded:', currentUser?.email || 'No user');
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <UserProgressProvider user={user}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    </UserProgressProvider>
  );
}
