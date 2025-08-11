'use client';

import { useState, useEffect } from 'react';
import { UserProgressProvider } from '@/contexts/UserProgressContext';
import { getCurrentUser } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          router.push('/login');
          return;
        }
        console.log('🔍 Dashboard Layout - User data:', { 
          id: currentUser.id, 
          email: currentUser.email,
          fullUser: currentUser 
        });
        setUser(currentUser);
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <UserProgressProvider user={user}>
      {children}
    </UserProgressProvider>
  );
}
