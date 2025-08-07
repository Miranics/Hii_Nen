'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/supabase';

export default function IdeaValidationPageSimple() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setUserLoading(true);
    try {
      const { user: currentUser, error } = await getCurrentUser();
      if (error) {
        console.error('Error getting user:', error);
        router.push('/login');
        return;
      }
      if (!currentUser) {
        console.log('No user found, redirecting to login');
        router.push('/login');
        return;
      }
      console.log('✅ User found:', currentUser.email);
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/login');
    } finally {
      setUserLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <Link 
          href="/dashboard" 
          className="text-blue-600 hover:text-blue-800 mb-6 inline-block"
        >
          ← Back to Dashboard
        </Link>
        
        <h1 className="text-3xl font-bold mb-8">Idea Validation - Test Page</h1>
        
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">User Authenticated</h2>
            <p className="text-gray-600 mb-4">Email: {user.email}</p>
            <p className="text-green-600">✅ Authentication working correctly</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>✅ Page loads without JavaScript errors</li>
                <li>✅ User authentication successful</li>
                <li>✅ Supabase connection working</li>
                <li>✅ No circular dependency issues</li>
              </ul>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Next Step:</strong> If this page loads successfully, the issue is with the complex components or imports in the original idea validation page.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-red-600">❌ User not authenticated</p>
          </div>
        )}
      </div>
    </div>
  );
}
