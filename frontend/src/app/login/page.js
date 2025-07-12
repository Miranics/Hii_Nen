import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 flex flex-col justify-center text-white">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Image
              src="/hiinen-logo.svg"
              alt="HiiNen Logo"
              width={48}
              height={48}
              className="brightness-0 invert"
            />
            <span className="text-3xl font-bold">HiiNen</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 animate-fadeInUp">
            Welcome Back, Entrepreneur!
          </h1>
          
          <p className="text-lg text-blue-100 mb-8 animate-fadeInUp stagger-delay-1">
            Continue building your startup journey with your AI Co-Founder.
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 animate-fadeInUp stagger-delay-2">
            <h3 className="font-semibold mb-4">Recent Success Stories</h3>
            <div className="space-y-3 text-sm text-blue-100">
              <p>"Sarah's SaaS raised $2M after using HiiNen's validation tools"</p>
              <p>"Marcus launched his MVP in 3 months with AI guidance"</p>
              <p>"Lisa connected with her ideal mentor through our network"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="lg:w-1/2 p-8 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Sign In to Your Account</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Ready to continue building your startup?
            </p>
          </div>

          <form className="space-y-6">
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-[1.02] animate-pulseGlow"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Social Login */}
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
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all">
                <span className="mr-2">🔍</span>
                Google
              </button>
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all">
                <span className="mr-2">👨‍💼</span>
                LinkedIn
              </button>
            </div>
          </div>

          {/* Quick Access for Demo */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
              Want to explore first?{" "}
              <Link href="/demo" className="font-semibold hover:underline">
                Try our interactive demo
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
