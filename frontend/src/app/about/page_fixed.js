import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function AboutPage() {
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
            About HiiNen
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto animate-fadeInUp stagger-delay-1">
            Empowering the next generation of African entrepreneurs with AI-powered guidance and support.
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="animate-fadeInUp stagger-delay-2">
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  HiiNen — inspired by the Tiv phrase <em className="text-blue-600 dark:text-blue-400">"Se Hii Nen"</em> 
                  ("Let's Start") — is your AI Co-Founder designed to empower young African entrepreneurs. 
                  From idea generation to startup validation and mentorship connections, HiiNen helps you 
                  launch impactful projects that tackle real community challenges.
                </p>
                <p>
                  Founded by Nanen — meaning <em className="text-purple-600 dark:text-purple-400">"to give"</em> in Tiv — 
                  this platform embodies the spirit of giving: giving you tools, knowledge, and guidance to 
                  start and grow what matters. We believe every great idea deserves the chance to become reality.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fadeInUp stagger-delay-3">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">1000+</div>
                  <div className="text-gray-600 dark:text-gray-400">Ideas Validated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                  <div className="text-gray-600 dark:text-gray-400">Entrepreneurs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">20+</div>
                  <div className="text-gray-600 dark:text-gray-400">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">$10M+</div>
                  <div className="text-gray-600 dark:text-gray-400">Funding Raised</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fadeInUp stagger-delay-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                To democratize entrepreneurship by providing every aspiring founder with access to AI-powered 
                guidance, expert mentorship, and the tools needed to transform ideas into successful, 
                impactful businesses that drive positive change in their communities.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fadeInUp stagger-delay-5">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                A world where geography, background, or resources never limit an entrepreneur's potential. 
                We envision thriving startup ecosystems across Africa and beyond, powered by accessible 
                AI technology and a global community of mentors and innovators.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white animate-fadeInUp stagger-delay-6">
            Our Core Values
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center animate-fadeInUp stagger-delay-7">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Community</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Building a supportive ecosystem where entrepreneurs lift each other up.
              </p>
            </div>

            <div className="text-center animate-fadeInUp stagger-delay-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Embracing cutting-edge AI technology to solve real-world problems.
              </p>
            </div>

            <div className="text-center animate-fadeInUp stagger-delay-9">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Making entrepreneurship tools available to everyone, regardless of background.
              </p>
            </div>

            <div className="text-center animate-fadeInUp stagger-delay-10">
              <div className="w-20 h-20 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-orange-600 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Impact</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Creating solutions that drive meaningful change in communities worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 shadow-lg animate-fadeInUp stagger-delay-11">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of entrepreneurs who've transformed their ideas into successful businesses with HiiNen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg"
              >
                Get Started Free
              </Link>
              <Link 
                href="/contact"
                className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all font-semibold text-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
