import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function TermsPage() {
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
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fadeInUp stagger-delay-1">
            Last updated: July 12, 2025
          </p>
        </div>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fadeInUp stagger-delay-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                By accessing and using HiiNen's platform, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Description of Service</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                HiiNen provides an AI-powered platform designed to help entrepreneurs validate ideas, connect with mentors, 
                access funding opportunities, and build successful startups. Our services include but are not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li>AI-powered idea generation and validation</li>
                <li>Mentor matching and networking opportunities</li>
                <li>Funding guidance and investor connections</li>
                <li>Educational resources and analytics</li>
                <li>Community features and collaboration tools</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. User Responsibilities</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                As a user of HiiNen, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Use the platform only for lawful purposes</li>
                <li>Respect the intellectual property rights of others</li>
                <li>Not engage in any activity that could harm or disrupt the platform</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                All content, features, and functionality on HiiNen, including but not limited to text, graphics, logos, 
                and software, are owned by HiiNen and are protected by copyright, trademark, and other intellectual property laws. 
                Users retain ownership of their original ideas and content shared on the platform.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Privacy and Data Protection</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
                use, and protect your information. By using our service, you consent to the collection and use of 
                your data as described in our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                HiiNen provides its services "as is" without warranty of any kind. We shall not be liable for any 
                direct, indirect, incidental, special, or consequential damages resulting from the use or inability 
                to use our services. This includes, but is not limited to, damages for loss of profits, data, or other intangibles.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Termination</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Either party may terminate this agreement at any time with or without notice. Upon termination, 
                your right to use the service will cease immediately. HiiNen reserves the right to terminate accounts 
                that violate these terms or engage in prohibited activities.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">8. Modifications to Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                HiiNen reserves the right to modify these terms at any time. Users will be notified of significant 
                changes via email or platform notifications. Continued use of the service after modifications constitutes 
                acceptance of the updated terms.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">9. Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: legal@hiinen.com<br />
                  Phone: +234 (0) 123 456 789<br />
                  Address: Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/privacy"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/contact"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
