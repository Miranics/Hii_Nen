'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser, updateProfile } from '@/lib/supabase';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    location: '',
    company: '',
    website: '',
    linkedin: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setProfile({
          firstName: currentUser.user_metadata?.firstName || '',
          lastName: currentUser.user_metadata?.lastName || '',
          email: currentUser.email || '',
          bio: currentUser.user_metadata?.bio || '',
          location: currentUser.user_metadata?.location || '',
          company: currentUser.user_metadata?.company || '',
          website: currentUser.user_metadata?.website || '',
          linkedin: currentUser.user_metadata?.linkedin || ''
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    
    try {
      // Update user profile with comprehensive data
      await updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
        location: profile.location,
        company: profile.company,
        website: profile.website,
        linkedin: profile.linkedin
      });
      
      setMessage('Settings saved successfully! Your profile has been updated.');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings. Please try again.');
      setTimeout(() => setMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-black dark:via-gray-900 dark:to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }

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
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Settings
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.includes('Error') 
              ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800' 
              : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'profile' 
                    ? 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'notifications' 
                    ? 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                Notifications
              </button>
              <button 
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'privacy' 
                    ? 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                Privacy
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  activeTab === 'preferences' 
                    ? 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                Preferences
              </button>
              <button 
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all ${
                  activeTab === 'account' ? 'bg-red-50 dark:bg-red-900/20' : ''
                }`}
              >
                Account
              </button>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/20 dark:bg-gray-900/20 backdrop-blur-md rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-xl p-8">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile Settings</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={profile.firstName}
                          onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={profile.lastName}
                          onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        disabled
                        className="w-full px-4 py-3 rounded-xl bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="City, Country"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={profile.company}
                          onChange={(e) => setProfile({...profile, company: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Your company"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          value={profile.website}
                          onChange={(e) => setProfile({...profile, website: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          value={profile.linkedin}
                          onChange={(e) => setProfile({...profile, linkedin: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://linkedin.com/in/yourprofile"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={saving}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Notification Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 border border-white/30 dark:border-gray-700/30">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">New mentorship opportunities</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Idea validation updates</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Weekly progress reports</span>
                          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Marketing recommendations</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                      </div>
                    </div>

                    <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 border border-white/30 dark:border-gray-700/30">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Push Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Browser notifications</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Mobile app notifications</span>
                          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 border border-white/30 dark:border-gray-700/30">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Make profile public</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Show in mentor directory</span>
                          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Allow direct messages</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                      </div>
                    </div>

                    <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 border border-white/30 dark:border-gray-700/30">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Data Sharing</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Share analytics data</span>
                          <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Allow marketing communications</span>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 border border-white/30 dark:border-gray-700/30">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Interface</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Theme
                          </label>
                          <select className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Auto (System)</option>
                            <option>Light</option>
                            <option>Dark</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Language
                          </label>
                          <select className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 border border-white/30 dark:border-gray-700/30">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Startup Preferences</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Industry Focus
                          </label>
                          <select className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Technology</option>
                            <option>Healthcare</option>
                            <option>Finance</option>
                            <option>Education</option>
                            <option>E-commerce</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Stage
                          </label>
                          <select className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Idea Stage</option>
                            <option>MVP Development</option>
                            <option>Early Stage</option>
                            <option>Growth Stage</option>
                            <option>Scale Stage</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 border border-white/30 dark:border-gray-700/30">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Security</h3>
                      <div className="space-y-4">
                        <button className="w-full text-left px-6 py-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-blue-900 dark:text-blue-100">Change Password</div>
                              <div className="text-sm text-blue-600 dark:text-blue-400">Update your account password</div>
                            </div>
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                        <button className="w-full text-left px-6 py-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-green-900 dark:text-green-100">Two-Factor Authentication</div>
                              <div className="text-sm text-green-600 dark:text-green-400">Enable 2FA for enhanced security</div>
                            </div>
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                      <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-4">Danger Zone</h3>
                      <div className="space-y-4">
                        <button className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium">
                          Delete Account
                        </button>
                        <p className="text-sm text-red-600 dark:text-red-400">
                          This action cannot be undone. All your data will be permanently deleted.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
