import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen justify-between bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-black dark:via-gray-900 dark:to-blue-900 text-foreground font-sans overflow-x-hidden">
      {/* === ANIMATED BACKGROUND ELEMENTS === */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-[120px] opacity-30 animate-float -z-10"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-r from-pink-400 to-blue-500 rounded-full blur-[80px] opacity-25 animate-float stagger-delay-2 -z-10"></div>
      <div className="absolute top-1/2 left-1/4 w-[200px] h-[200px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-[60px] opacity-20 animate-float stagger-delay-3 -z-10"></div>

      {/* === HEADER === */}
      <header className="w-full px-8 py-4 flex justify-between items-center max-w-6xl mx-auto sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur z-10 border-b border-gray-200 dark:border-gray-800 animate-slideInDown">
        <div className="flex items-center gap-2 animate-slideInLeft">
          <div className="animate-scaleRotate">
            <Image
              src="/hiinen-logo.svg"
              alt="HiiNen Logo"
              width={40}
              height={40}
              className="animate-spin-slow"
            />
          </div>
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight hover:text-purple-600 transition-colors duration-300">
            HiiNen
          </span>
        </div>
        <nav className="flex gap-6 text-sm font-medium animate-slideInRight">
          <Link href="/features" className="hover:text-blue-600 transition-all transform hover:scale-110 animate-fadeInUp stagger-delay-1">
            Features
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-all transform hover:scale-110 animate-fadeInUp stagger-delay-2">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-all transform hover:scale-110 animate-fadeInUp stagger-delay-3">
            Contact
          </Link>
          <Link href="/faq" className="hover:text-blue-600 transition-all transform hover:scale-110 animate-fadeInUp stagger-delay-4">
            FAQ
          </Link>
          <Link href="/terms" className="hover:text-blue-600 transition-all transform hover:scale-110 animate-fadeInUp stagger-delay-5">
            Terms
          </Link>
        </nav>
      </header>

      {/* === MAIN HERO === */}
      <main className="flex flex-col items-center justify-center flex-grow px-8 text-center py-32 sm:py-48 max-w-5xl mx-auto relative">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full opacity-30 animate-float stagger-delay-2"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-pink-400 rounded-full opacity-25 animate-float stagger-delay-3"></div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-slideUpFade">
          Start and Grow Your Ideas with{" "}
          <span className="gradient-text-visible">
            HiiNen
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl animate-fadeInUp stagger-delay-2">
          Your AI Co-Founder for ideation, validation, and startup success — let's build the future together with smart tools and real mentorship.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fadeInScale stagger-delay-3">
          <Link
            href="/features"
            className="rounded-full bg-blue-600 text-white px-8 py-3 text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all transform hover:scale-105 animate-pulseGlow"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-blue-600 text-blue-600 px-8 py-3 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all transform hover:scale-105 glass-morphism"
          >
            Learn More
          </Link>
        </div>
      </main>

      {/* === FEATURES PREVIEW === */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Build Your Next 
              <span className="gradient-text-visible"> Unicorn Startup</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From idea to IPO, HiiNen provides comprehensive AI-powered tools and expert guidance
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {/* Core Features Row 1 */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-700 card-hover-effect animate-fadeInUp stagger-delay-1">
              <div className="animate-float">
                <Image src="/idea.svg" alt="AI Ideation" width={48} height={48} />
              </div>
              <h3 className="text-lg font-bold">AI-Powered Ideation</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                Generate breakthrough startup ideas with advanced AI algorithms and market analysis
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-b from-purple-100 to-purple-200 dark:from-gray-800 dark:to-gray-700 card-hover-effect animate-fadeInUp stagger-delay-2">
              <div className="animate-float stagger-delay-1">
                <Image src="/validate.svg" alt="Smart Validation" width={48} height={48} />
              </div>
              <h3 className="text-lg font-bold">Smart Validation</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                Validate ideas with real market data, competitor analysis, and AI-driven insights
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-b from-green-100 to-green-200 dark:from-gray-800 dark:to-gray-700 card-hover-effect animate-fadeInUp stagger-delay-3">
              <div className="animate-float stagger-delay-2">
                <Image src="/mentor.svg" alt="Expert Mentorship" width={48} height={48} />
              </div>
              <h3 className="text-lg font-bold">Expert Mentorship</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                Connect with successful entrepreneurs and industry experts tailored to your niche
              </p>
            </div>
            
            {/* Additional Features Row 2 */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-b from-orange-100 to-orange-200 dark:from-gray-800 dark:to-gray-700 card-hover-effect animate-fadeInUp stagger-delay-1">
              <div className="animate-float">
                <Image src="/funding.svg" alt="Funding Assistant" width={48} height={48} />
              </div>
              <h3 className="text-lg font-bold">Funding Assistant</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                AI-powered pitch deck creation and investor matching algorithms
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-b from-pink-100 to-pink-200 dark:from-gray-800 dark:to-gray-700 card-hover-effect animate-fadeInUp stagger-delay-2">
              <div className="animate-float stagger-delay-1">
                <Image src="/analytics.svg" alt="Market Analytics" width={48} height={48} />
              </div>
              <h3 className="text-lg font-bold">Market Analytics</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                Real-time market trends, customer insights, and competitive intelligence
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-b from-indigo-100 to-indigo-200 dark:from-gray-800 dark:to-gray-700 card-hover-effect animate-fadeInUp stagger-delay-3">
              <div className="animate-float stagger-delay-2">
                <Image src="/launch.svg" alt="Launch Accelerator" width={48} height={48} />
              </div>
              <h3 className="text-lg font-bold">Launch Accelerator</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                Step-by-step guidance from MVP to market with AI-optimized strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="w-full py-24 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How <span className="gradient-text-visible">HiiNen</span> Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your AI Co-Founder guides you through every step of building a successful startup
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center animate-slideInLeft">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-pulseGlow">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Share Your Vision</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tell HiiNen about your interests, skills, and the problems you want to solve. Our AI analyzes your input to understand your unique strengths.
              </p>
            </div>
            
            <div className="text-center animate-slideUpFade stagger-delay-2">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-pulseGlow stagger-delay-1">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">AI-Powered Strategy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized business strategies, market validation, and step-by-step roadmaps powered by advanced AI and real market data.
              </p>
            </div>
            
            <div className="text-center animate-slideInRight">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold animate-pulseGlow stagger-delay-2">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Launch & Scale</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Execute your plan with ongoing AI guidance, expert mentorship, and access to our network of investors and partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === STATS & SOCIAL PROOF === */}
      <section className="w-full py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Ambitious Entrepreneurs
            </h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Join thousands of founders who are building the next generation of successful startups
            </p>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            <div className="animate-fadeInUp stagger-delay-1">
              <div className="text-4xl font-bold mb-2 animate-slideUpFade">2,500+</div>
              <div className="text-blue-200">Ideas Validated</div>
            </div>
            <div className="animate-fadeInUp stagger-delay-2">
              <div className="text-4xl font-bold mb-2 animate-slideUpFade">150+</div>
              <div className="text-blue-200">Startups Launched</div>
            </div>
            <div className="animate-fadeInUp stagger-delay-3">
              <div className="text-4xl font-bold mb-2 animate-slideUpFade">$50M+</div>
              <div className="text-blue-200">Funding Raised</div>
            </div>
            <div className="animate-fadeInUp stagger-delay-4">
              <div className="text-4xl font-bold mb-2 animate-slideUpFade">98%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section className="w-full py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Founders Are Saying
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real stories from entrepreneurs who transformed their ideas into successful businesses
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg card-hover-effect animate-fadeInUp stagger-delay-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SA
                </div>
                <div>
                  <div className="font-bold">Sarah Chen</div>
                  <div className="text-sm text-gray-500">CEO, TechFlow</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "HiiNen helped me validate my SaaS idea and connect with the right investors. We raised $2M in our seed round!"
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg card-hover-effect animate-fadeInUp stagger-delay-2">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  MJ
                </div>
                <div>
                  <div className="font-bold">Marcus Johnson</div>
                  <div className="text-sm text-gray-500">Founder, GreenTech Solutions</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "The AI-powered market analysis saved me months of research. My startup is now profitable within 8 months!"
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg card-hover-effect animate-fadeInUp stagger-delay-3">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  LP
                </div>
                <div>
                  <div className="font-bold">Lisa Park</div>
                  <div className="text-sm text-gray-500">Co-founder, EduAI</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                "From idea to launch in 6 months. HiiNen's mentorship network was invaluable for navigating early challenges."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="w-full py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <div className="animate-fadeInUp">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Build Your Dream Startup?
            </h2>
            <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who are turning their ideas into successful businesses with AI-powered guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInScale stagger-delay-2">
              <Link
                href="/signup"
                className="rounded-full bg-white text-purple-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all transform hover:scale-105 animate-pulseGlow"
              >
                Start Building Now - Free
              </Link>
              <Link
                href="/demo"
                className="rounded-full border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-purple-600 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all transform hover:scale-105"
              >
                Watch Demo
              </Link>
            </div>
            
            <p className="text-sm text-indigo-200 mt-6">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="w-full px-8 py-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 border-t border-gray-200 dark:border-gray-800">
        <span>&copy; {new Date().getFullYear()} HiiNen</span>
        <a
          href="https://github.com/miranics/Hii_Nen"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          GitHub
        </a>
        <Link href="/privacy" className="hover:underline">
          Privacy
        </Link>
        <Link href="/faq" className="hover:underline">
          FAQ
        </Link>
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
      </footer>
    </div>
  );
}
