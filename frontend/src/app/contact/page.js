import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <Navbar />
      
      <main className="px-8 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fadeInUp">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fadeInUp stagger-delay-1">
            Have questions about HiiNen? Want to partner with us? Or just want to say hello? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fadeInUp stagger-delay-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="press">Press Inquiry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02]"
              >
                <span className="mr-2">📧</span>
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fadeInUp stagger-delay-3">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">hello@hiinen.com</p>
                    <p className="text-gray-600 dark:text-gray-400">support@hiinen.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">+234 (0) 123 456 789</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Available Mon-Fri, 9AM-6PM WAT</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Office</h3>
                    <p className="text-gray-600 dark:text-gray-400">Lagos, Nigeria</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Remote-first team</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fadeInUp stagger-delay-4">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Follow Us</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">🐦</span>
                  <span className="font-medium text-gray-900 dark:text-white">Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">💼</span>
                  <span className="font-medium text-gray-900 dark:text-white">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">📘</span>
                  <span className="font-medium text-gray-900 dark:text-white">Facebook</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group">
                  <span className="text-2xl group-hover:scale-110 transition-transform">📸</span>
                  <span className="font-medium text-gray-900 dark:text-white">Instagram</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fadeInUp stagger-delay-5">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Quick Actions</h2>
              
              <div className="space-y-4">
                <Link 
                  href="/demo"
                  className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🚀</span>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">Try Demo</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Experience HiiNen in action</span>
                  </div>
                </Link>
                
                <Link 
                  href="/faq"
                  className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">❓</span>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">FAQ</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Find answers to common questions</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
