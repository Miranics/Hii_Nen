'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCurrentUser, updateProfile } from '@/lib/supabase';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    experience: '',
    notifications: {
      email: true,
      push: true,
      marketing: false,
      weekly_reports: true
    },
    privacy: {
      profile_visibility: 'public',
      show_email: false,
      show_phone: false
    },
    preferences: {
      theme: 'system',
      language: 'en',
      timezone: 'UTC'
    }
  });

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setSettings(prev => ({
          ...prev,
          fullName: currentUser.user_metadata?.full_name || '',
          email: currentUser.email || '',
          phone: currentUser.user_metadata?.phone || '',
          company: currentUser.user_metadata?.company || '',
          industry: currentUser.user_metadata?.industry || '',
          experience: currentUser.user_metadata?.experience || ''
        }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    
    try {
      // Update user profile
      await updateProfile({
        full_name: settings.fullName,
        phone: settings.phone,
        company: settings.company,
        industry: settings.industry,
        experience: settings.experience
      });
      
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings. Please try again.');
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
              <button className="w-full text-left px-4 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                Profile
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                Notifications
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                Privacy
              </button>
              <button className="w-full text-left px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                Preferences
              </button>
              <button className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                Account
              </button>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-sm p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Profile Settings</h2>
              
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={settings.fullName}
                        onChange={(e) => setSettings(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700/50 dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.email}
                        disabled
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700/50 dark:text-white"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        value={settings.company}
                        onChange={(e) => setSettings(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700/50 dark:text-white"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Professional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Industry
                      </label>
                      <select
                        value={settings.industry}
                        onChange={(e) => setSettings(prev => ({ ...prev, industry: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700/50 dark:text-white"
                      >
                        <option value="">Select Industry</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Experience Level
                      </label>
                      <select
                        value={settings.experience}
                        onChange={(e) => setSettings(prev => ({ ...prev, experience: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700/50 dark:text-white"
                      >
                        <option value="">Select Experience</option>
                        <option value="first-time">First-time entrepreneur</option>
                        <option value="some-experience">Some startup experience</option>
                        <option value="experienced">Experienced founder</option>
                        <option value="serial">Serial entrepreneur</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.email}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, email: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive push notifications in browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.push}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, push: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Weekly Reports</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly progress reports</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.notifications.weekly_reports}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, weekly_reports: e.target.checked }
                          }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </div>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
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
