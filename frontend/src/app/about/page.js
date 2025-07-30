import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import { 
  Rocket, 
  Target, 
  Growth, 
  Networking, 
  Idea, 
  Analytics,
  Business,
  Star,
  Achievement,
  Funding,
  Validation,
  Settings
} from "../../components/icons/ProfessionalIcons";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <Navbar />
      
      <main className="px-6 py-8">
        {/* Hero Section with Founder */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium mb-6"
            >
              ← Back to Home
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Founder Profile */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-30"></div>
                      <Image
                        src="/founder-photo-new.jpg"
                        alt="Founder and Developer"
                        width={200}
                        height={200}
                        className="relative rounded-full object-cover border-4 border-white shadow-xl"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Young Visionary Developer
                    </h2>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                      Founder & Lead Developer
                    </p>
                    
                    <div className="flex gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                        Full-Stack Developer
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                        Entrepreneur
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Passionate about leveraging cutting-edge AI technology to democratize entrepreneurship 
                      and empower the next generation of African innovators.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                                    <Rocket className="w-4 h-4" />
                AI-Powered Entrepreneurship Platform
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                Meet
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> HiiNen</span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                Your AI Co-Founder designed to transform entrepreneurial dreams into thriving businesses. 
                Built by a young developer with a vision to revolutionize how startups are born and scaled globally.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <Business className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Modern Tech Stack</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Next.js, AI, Cloud</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <Analytics className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Global Impact</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">20+ Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Overview */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Revolutionary AI Co-Founder Platform
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                HiiNen combines cutting-edge artificial intelligence with comprehensive entrepreneurship tools 
                to guide you from initial idea to successful business launch.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Idea className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">AI-Powered Ideation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced AI algorithms analyze market trends and generate personalized business ideas 
                  tailored to your skills and interests.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Validation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive market research and validation tools powered by real-time data 
                  to ensure your idea has commercial potential.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Growth className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Growth Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time business analytics and performance tracking to optimize your startup's 
                  growth trajectory and decision-making.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Networking className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Expert Mentorship</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect with seasoned entrepreneurs and industry experts who provide personalized 
                  guidance and strategic insights.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Funding className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Funding Connections</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Access to investor networks, funding opportunities, and pitch preparation tools 
                  to secure capital for your venture.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Validation className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">End-to-End Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Complete startup ecosystem from business planning and legal guidance 
                  to marketing strategies and operational excellence.
                </p>
              </div>
            </div>
          </div>

          {/* Developer Story */}
          <div className="mb-20">
            <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-12 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Achievement className="w-4 h-4" />
                  Developer Story
                </div>
                
                <h2 className="text-4xl font-bold mb-6">Built by a Young Visionary</h2>
                <p className="text-xl text-blue-100 leading-relaxed mb-8">
                  "As a young developer and entrepreneur, I experienced firsthand the challenges of turning 
                  ideas into reality. HiiNen was born from my passion to democratize entrepreneurship through 
                  technology and create opportunities for the next generation of innovators."
                </p>
                
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300 mb-2">5+</div>
                    <div className="text-blue-100">Years of Development</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-300 mb-2">10+</div>
                    <div className="text-purple-100">Technologies Mastered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-300 mb-2">1000+</div>
                    <div className="text-green-100">Entrepreneurs Helped</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Excellence */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Built with Modern Excellence
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                HiiNen leverages cutting-edge technology stack to deliver enterprise-grade performance, 
                security, and scalability for entrepreneurs worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frontend Technology</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Next.js 15</span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm">Latest</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">React 19</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm">Cutting-edge</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tailwind CSS 4</span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm">Modern</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Vercel Analytics</span>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 rounded-full text-sm">Professional</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Backend & AI</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Node.js & Express</span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-sm">Scalable</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">GitHub Models GPT-4</span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm">AI-Powered</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Supabase Database</span>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm">Secure</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Cloud Deployment</span>
                    <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 rounded-full text-sm">Global</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact & Vision */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Creating Global Impact
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Our mission extends beyond just building a platform—we're cultivating the next generation 
                  of world-changing entrepreneurs and innovative solutions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">1000+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Ideas Validated</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Networking className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">500+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Entrepreneurs Mentored</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Analytics className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">20+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Countries Reached</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Growth className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">$10M+</h3>
                  <p className="text-gray-600 dark:text-gray-400">Funding Facilitated</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Build the Future?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join a community of innovative entrepreneurs who are transforming ideas into world-changing 
                businesses with the power of AI and expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/signup"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-bold text-lg shadow-lg"
                >
                  Start Your Journey Free
                </Link>
                <Link 
                  href="/demo"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all font-bold text-lg"
                >
                  See Platform Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
