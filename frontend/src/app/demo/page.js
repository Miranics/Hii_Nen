import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp">
            Interactive Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 animate-fadeInUp stagger-delay-1">
            Experience the power of AI-driven startup guidance
          </p>
        </div>

        {/* Demo Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Chat Interface */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fadeInUp stagger-delay-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              🤖 Chat with AI Co-Founder
            </h2>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 h-64 overflow-y-auto mb-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    AI
                  </div>
                  <div className="bg-white dark:bg-gray-600 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Hi! I'm your AI Co-Founder. What's your startup idea?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-blue-500 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">I want to build a productivity app for remote teams</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    You
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    AI
                  </div>
                  <div className="bg-white dark:bg-gray-600 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Great idea! Remote team productivity is a $12B market. Let's validate this with 3 key questions: 1) What specific pain point does your app solve? 2) Who's your target customer? 3) What makes you different from Slack or Asana?</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Send
              </button>
            </div>
          </div>

          {/* Validation Tools */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fadeInUp stagger-delay-3">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                💡 Idea Validation Score
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Market Size</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">85%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Competition Level</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/5 h-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-yellow-600">65%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Feasibility</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 rounded-full">
                      <div className="w-4/5 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">90%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200 font-semibold">
                  Overall Score: 80% - Strong potential! 🚀
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-fadeInUp stagger-delay-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                🎯 Next Steps
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Survey 50 remote workers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Create MVP wireframes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs">3</span>
                  </div>
                  <span className="text-sm text-gray-500">Find technical co-founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center animate-fadeInUp stagger-delay-5">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">AI-Powered Insights</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get instant feedback on your ideas with market research and competitive analysis
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center animate-fadeInUp stagger-delay-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Mentor Matching</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect with experienced entrepreneurs who've built similar products
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center animate-fadeInUp stagger-delay-7">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Funding Guidance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step-by-step roadmap to prepare for seed funding and investor meetings
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 animate-fadeInUp stagger-delay-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to start your startup journey?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Join thousands of entrepreneurs who've validated and launched their ideas with HiiNen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/contact"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Schedule Demo Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
