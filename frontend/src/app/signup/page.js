'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { signUp, signInWithGoogle } from '@/lib/supabase';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'entrepreneur'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🚀 Starting signup with data:', formData);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (!formData.fullName.trim()) {
      setError('Full name is required');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    try {
      console.log('📧 Attempting signup...');
      const { data, error } = await signUp(
        formData.email, 
        formData.password, 
        formData.fullName, 
        formData.userType
      );
      
      console.log('✅ Signup result:', { data, error });
      
      if (error) {
        console.error('❌ Signup error:', error);
        setError(error.message || 'Signup failed');
      } else {
        console.log('🎉 Signup successful!');
        // Show success message
        alert(`✅ Account created successfully!\n\nEmail: ${formData.email}\nPlease check your email to verify your account before logging in.`);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          userType: 'entrepreneur'
        });
        // Redirect to login
        router.push('/login');
      }
    } catch (err) {
      console.error('💥 Unexpected signup error:', err);
      setError(`Unexpected error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { data, error } = await signInWithGoogle();
      if (error) {
        setError(error.message);
      }
      // Google OAuth will redirect automatically
    } catch (err) {
      setError('Google signup failed');
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Logo */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity w-fit">
            <div className="animate-spin-slow">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">H</span>
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HiiNen
            </span>
          </Link>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Left Side - Branding & Benefits */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 flex flex-col justify-center text-white">
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Join HiiNen Today</h2>
              <p className="text-blue-100">Start your entrepreneurial journey with AI-powered guidance</p>
            </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 animate-fadeInUp">
            Your AI Co-Founder Awaits
          </h1>
          
          <p className="text-lg text-blue-100 mb-8 animate-fadeInUp stagger-delay-1">
            Join thousands of entrepreneurs building successful startups with AI-powered guidance.
          </p>
          
          <div className="space-y-4 animate-fadeInUp stagger-delay-2">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-900 text-sm">✓</span>
              </div>
              <span>AI-powered idea generation & validation</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-900 text-sm">✓</span>
              </div>
              <span>Expert mentor matching</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <span className="text-green-900 text-sm">✓</span>
              </div>
              <span>Funding assistance & investor connections</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start building your dream startup today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                ❌ {error}
              </div>
            )}
            
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Entrepreneurial Experience
              </label>
              <select
                id="experience"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select your experience level</option>
                <option value="first-time">First-time entrepreneur</option>
                <option value="some-experience">Some startup experience</option>
                <option value="experienced">Experienced founder</option>
                <option value="serial">Serial entrepreneur</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] animate-pulseGlow"
            >
              Create Account & Start Building
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Social Sign Up */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium hover:bg-gray-50 transition-all">
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent font-semibold">
                  Google
                </span>
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium hover:bg-gray-50 transition-all">
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent font-semibold">
                  LinkedIn
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
