import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <Navbar />
      
      <main className="px-8 py-12">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white animate-fadeInUp">
            Powerful Features for Your Startup Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fadeInUp stagger-delay-1">
            HiiNen's AI Co-Founder provides everything you need to transform your ideas into successful startups. 
            From ideation to funding, we've got you covered.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="max-w-7xl mx-auto mb-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* AI-Powered Ideation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fadeInUp stagger-delay-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Image src="/idea.svg" alt="Idea Generation" width={32} height={32} className="brightness-0 invert" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI-Powered Ideation</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Brainstorm revolutionary startup ideas with our advanced AI. Get personalized suggestions based on your 
                interests, skills, and market opportunities. Never run out of innovative concepts again.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Personalized idea generation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Market trend analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Skill-based matching
                </li>
              </ul>
            </div>

            {/* Smart Validation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fadeInUp stagger-delay-3">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Image src="/validate.svg" alt="Validation" width={32} height={32} className="brightness-0 invert" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Validation</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Validate your startup ideas with real market data, competitor analysis, and customer insights. 
                Reduce risk and increase your chances of success before you invest time and money.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Market size analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Competitor research
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Customer demand validation
                </li>
              </ul>
            </div>

            {/* Mentorship Access */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fadeInUp stagger-delay-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Image src="/mentor.svg" alt="Mentorship" width={32} height={32} className="brightness-0 invert" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Expert Mentorship</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Connect with successful entrepreneurs and industry experts who've been where you want to go. 
                Get personalized guidance, feedback, and support throughout your startup journey.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  1-on-1 mentor matching
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Industry expertise
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Ongoing support
                </li>
              </ul>
            </div>

            {/* Funding Guidance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fadeInUp stagger-delay-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Image src="/funding.svg" alt="Funding" width={32} height={32} className="brightness-0 invert" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Funding Roadmap</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Navigate the complex world of startup funding with confidence. From pitch deck creation to investor 
                introductions, we guide you through every step of raising capital.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Pitch deck templates
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Investor matching
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Funding strategy
                </li>
              </ul>
            </div>

            {/* Analytics & Insights */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fadeInUp stagger-delay-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                  <Image src="/analytics.svg" alt="Analytics" width={32} height={32} className="brightness-0 invert" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Smart Analytics</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Track your startup's progress with comprehensive analytics. Monitor key metrics, identify growth 
                opportunities, and make data-driven decisions to accelerate your success.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Progress tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Performance metrics
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Growth insights
                </li>
              </ul>
            </div>

            {/* Launch Support */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 animate-fadeInUp stagger-delay-7">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Image src="/launch.svg" alt="Launch" width={32} height={32} className="brightness-0 invert" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Launch Excellence</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Execute flawless product launches with our comprehensive launch toolkit. From go-to-market strategy 
                to post-launch optimization, ensure your startup makes a powerful debut.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Launch strategy
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Marketing campaigns
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Performance monitoring
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg animate-fadeInUp stagger-delay-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Start Your Startup Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of entrepreneurs who've transformed their ideas into successful businesses with HiiNen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold text-lg"
            >
              Get Started Free
            </Link>
            <Link 
              href="/demo"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold text-lg"
            >
              Try Demo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
