import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fadeInUp stagger-delay-1">
            Last updated: July 12, 2025
          </p>
        </div>

        {/* Privacy Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg animate-fadeInUp stagger-delay-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li>Create an account or profile</li>
                <li>Submit startup ideas or business plans</li>
                <li>Participate in mentor matching</li>
                <li>Use our AI-powered tools and features</li>
                <li>Contact us for support or inquiries</li>
                <li>Subscribe to our newsletter or updates</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. How We Use Your Information</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience with AI recommendations</li>
                <li>Match you with relevant mentors and opportunities</li>
                <li>Analyze and validate your startup ideas</li>
                <li>Send you updates, newsletters, and important notifications</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Protect against fraud and ensure platform security</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. Information Sharing and Disclosure</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We do not sell, rent, or share your personal information with third parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
                <li><strong>Mentor matching:</strong> Limited profile information shared with matched mentors</li>
                <li><strong>Service providers:</strong> Trusted partners who help us operate our platform</li>
                <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business transfers:</strong> In case of merger, acquisition, or asset sale</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Data Security</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication systems</li>
                <li>Secure data storage with backup and recovery procedures</li>
                <li>Employee training on data protection best practices</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Your Privacy Rights</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-6 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
              </ul>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Cookies and Tracking</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and provide personalized recommendations. You can control cookie settings through your browser, 
                though some features may not function properly if cookies are disabled.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. International Data Transfers</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data in accordance with 
                applicable privacy laws and regulations.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">8. Children's Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our services are not intended for children under 16 years of age. We do not knowingly 
                collect personal information from children under 16. If we become aware that we have 
                collected such information, we will take steps to delete it.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">9. Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by email or through our platform. Your continued use of our services after such 
                modifications constitutes acceptance of the updated Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">10. Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                If you have questions about this Privacy Policy or how we handle your data, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: privacy@hiinen.com<br />
                  Phone: +234 (0) 123 456 789<br />
                  Address: Lagos, Nigeria<br />
                  Data Protection Officer: dpo@hiinen.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/terms"
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold"
            >
              <span>📋</span>
              Terms of Service
            </Link>
            <Link 
              href="/contact"
              className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
            >
              <span>💬</span>
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
