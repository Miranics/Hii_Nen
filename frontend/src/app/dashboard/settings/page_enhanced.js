'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, updateUserProfile } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { UserProfileIcon, SettingsIcon } from '@/components/icons/DashboardIcons';

export default function EnhancedSettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    full_name: '',
    user_type: '',
    company_name: '',
    industry: '',
    business_stage: '',
    location: '',
    bio: '',
    website: '',
    linkedin: '',
    twitter: ''
  });
  const [message, setMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { user: currentUser } = await getCurrentUser();
        if (!currentUser) {
          router.push('/login');
          return;
        }
        
        setUser(currentUser);
        
        // Set form data from user metadata
        const metadata = currentUser.user_metadata || {};
        setFormData({
          full_name: metadata.full_name || '',
          user_type: metadata.user_type || '',
          company_name: metadata.company_name || '',
          industry: metadata.industry || '',
          business_stage: metadata.business_stage || '',
          location: metadata.location || '',
          bio: metadata.bio || '',
          website: metadata.website || '',
          linkedin: metadata.linkedin || '',
          twitter: metadata.twitter || ''
        });
      } catch (error) {
        console.error('Error loading user data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const result = await updateUserProfile(formData);
      if (result.error) {
        throw result.error;
      }
      
      setMessage('Profile updated successfully!');
      
      // Refresh user data
      const { user: updatedUser } = await getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserProfileIcon },
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon }
  ];

  const userTypes = [
    'First-time Entrepreneur',
    'Serial Entrepreneur',
    'Student Entrepreneur',
    'Corporate Intrapreneur',
    'Social Entrepreneur',
    'Tech Entrepreneur',
    'Other'
  ];

  const businessStages = [
    'Idea Stage',
    'Validation Stage',
    'MVP Development',
    'Early Traction',
    'Growth Stage',
    'Scaling',
    'Established Business'
  ];

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'E-commerce',
    'Manufacturing',
    'Real Estate',
    'Food & Beverage',
    'Transportation',
    'Energy',
    'Entertainment',
    'Other'
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
          <div className="h-96 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}! 
          Manage your account and preferences below.
        </p>
      </div>

      {/* User Info Card */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
        <div className="flex items-center">
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mr-4">
            <span className="text-2xl font-bold">
              {user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Welcome'}
            </h2>
            <p className="opacity-90">{user?.email}</p>
            <p className="text-sm opacity-75">
              {user?.user_metadata?.user_type || 'Entrepreneur'} • 
              Member since {new Date(user?.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" color={activeTab === tab.id ? '#2563eb' : '#6b7280'} />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Tab Content */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="space-y-6">
          {message && (
            <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {message.includes('Error') ? (
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <UserProfileIcon className="w-5 h-5 mr-2 text-blue-600" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">Contact support to change your email</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Entrepreneur Type</label>
                <select
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your type</option>
                  {userTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your company or startup name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Stage</label>
                <select
                  name="business_stage"
                  value={formData.business_stage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select your current business stage</option>
                  {businessStages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself, your background, and your entrepreneurial journey..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Social & Contact Information</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {/* Preferences Tab Content */}
      {activeTab === 'preferences' && (
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2 text-blue-600" />
            Preferences & Notifications
          </h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Weekly progress updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">AI insights and recommendations</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Marketing and promotional emails</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Privacy Settings</h4>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Make profile visible to other entrepreneurs</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Allow mentors to contact me</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
