'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { getCurrentUser } from '@/lib/supabase';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    userType: '',
    bio: '',
    location: '',
    company: '',
    website: ''
  });

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setFormData({
            fullName: currentUser.user_metadata?.full_name || '',
            email: currentUser.email || '',
            userType: currentUser.user_metadata?.user_type || '',
            bio: currentUser.user_metadata?.bio || '',
            location: currentUser.user_metadata?.location || '',
            company: currentUser.user_metadata?.company || '',
            website: currentUser.user_metadata?.website || ''
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    // TODO: Implement profile update functionality
    console.log('Saving profile:', formData);
    setEditing(false);
  };

  const getUserInitials = (user) => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Profile</h1>
              <p className="text-blue-100 mt-2">Manage your account information and preferences</p>
            </div>
            <Link 
              href="/dashboard" 
              className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg border border-white/30 text-white transition-all duration-200"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {getUserInitials(user)}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {formData.fullName || 'User'}
              </h3>
              <p className="text-blue-200 text-sm mb-2">{formData.email}</p>
              <span className="inline-block bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full capitalize">
                {formData.userType || 'entrepreneur'}
              </span>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-left space-y-2">
                  {formData.location && (
                    <p className="text-blue-200 text-sm">
                      📍 {formData.location}
                    </p>
                  )}
                  {formData.company && (
                    <p className="text-blue-200 text-sm">
                      🏢 {formData.company}
                    </p>
                  )}
                  {formData.website && (
                    <p className="text-blue-200 text-sm">
                      🌐 {formData.website}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Profile Details</h2>
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg border border-blue-400/30 transition-all duration-200"
                  >
                    ✏️ Edit Profile
                  </button>
                ) : (
                  <div className="space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 rounded-lg border border-green-400/30 transition-all duration-200"
                    >
                      ✓ Save
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg border border-red-400/30 transition-all duration-200"
                    >
                      ✕ Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white py-3">{formData.fullName || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Email
                  </label>
                  <p className="text-white py-3">{formData.email}</p>
                  <p className="text-blue-300 text-xs">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    User Type
                  </label>
                  {editing ? (
                    <select
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="entrepreneur">Entrepreneur</option>
                      <option value="mentor">Mentor</option>
                      <option value="both">Both</option>
                    </select>
                  ) : (
                    <p className="text-white py-3 capitalize">{formData.userType || 'entrepreneur'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Location
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white py-3">{formData.location || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Company
                  </label>
                  {editing ? (
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white py-3">{formData.company || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Website
                  </label>
                  {editing ? (
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <p className="text-white py-3">{formData.website || 'Not set'}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-blue-200 text-sm font-medium mb-2">
                    Bio
                  </label>
                  {editing ? (
                    <textarea
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 resize-none"
                    />
                  ) : (
                    <p className="text-white py-3">{formData.bio || 'No bio added yet'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
