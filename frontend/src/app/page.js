import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen justify-between bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-gray-900 text-foreground font-sans">
      {/* === HEADER === */}
      <header className="w-full px-8 py-4 flex justify-between items-center max-w-6xl mx-auto sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Image
            src="/hiinen-logo.svg"
            alt="HiiNen Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-extrabold text-blue-600">HiiNen</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/features" className="hover:text-blue-600 transition-colors">
            Features
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
          <Link href="/faq" className="hover:text-blue-600 transition-colors">
            FAQ
          </Link>
          <Link href="/terms" className="hover:text-blue-600 transition-colors">
            Terms
          </Link>
        </nav>
      </header>

      {/* === MAIN === */}
      <main className="flex flex-col items-center justify-center flex-grow px-8 text-center py-24 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Start and Grow Your Ideas with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            HiiNen
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl">
          Your AI Co-Founder for ideation, validation, and startup success —
          let’s build the future together with smart tools and great guidance.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/features"
            className="rounded-full bg-blue-600 text-white px-8 py-3 text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-blue-600 text-blue-600 px-8 py-3 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-shadow"
          >
            Learn More
          </Link>
        </div>

        {/* === FEATURES PREVIEW === */}
        <div className="grid gap-8 sm:grid-cols-3 mt-20 w-full">
          <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
            <Image src="/idea.svg" alt="Idea Generation" width={48} height={48} />
            <h3 className="text-lg font-semibold">AI-Powered Ideation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Instantly generate and refine startup ideas with your AI Co-Founder.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
            <Image src="/validate.svg" alt="Validation" width={48} height={48} />
            <h3 className="text-lg font-semibold">Smart Validation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Validate ideas with real market data and smart insights.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-shadow">
            <Image src="/mentor.svg" alt="Mentorship" width={48} height={48} />
            <h3 className="text-lg font-semibold">Mentorship Access</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Connect with mentors and resources tailored to your goals.
            </p>
          </div>
        </div>
      </main>

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
