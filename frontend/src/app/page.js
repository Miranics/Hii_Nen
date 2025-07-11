import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen justify-between bg-gradient-to-b from-white to-blue-50 dark:from-black dark:to-gray-900 text-foreground font-sans overflow-x-hidden">
      {/* === DECORATIVE BLOB === */}
      <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-blue-200 dark:bg-blue-900 rounded-full blur-[120px] opacity-50 -z-10"></div>

      {/* === HEADER === */}
      <header className="w-full px-8 py-4 flex justify-between items-center max-w-6xl mx-auto sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Image
            src="/hiinen-logo.svg"
            alt="HiiNen Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight">
            HiiNen
          </span>
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

      {/* === MAIN HERO === */}
      <main className="flex flex-col items-center justify-center flex-grow px-8 text-center py-32 sm:py-48 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight animate-fadeInUp">
          Start and Grow Your Ideas with{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            HiiNen
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl animate-fadeInUp [animation-delay:0.2s]">
          Your AI Co-Founder for ideation, validation, and startup success — let’s build the future together with smart tools and real mentorship.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp [animation-delay:0.4s]">
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
      </main>

      {/* === FEATURES PREVIEW === */}
      <section className="w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-24">
        <div className="grid gap-8 sm:grid-cols-3 w-full max-w-6xl mx-auto px-8">
          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-700 shadow hover:shadow-xl transition-shadow animate-fadeInUp">
            <Image src="/idea.svg" alt="Idea Generation" width={48} height={48} />
            <h3 className="text-lg font-bold">AI-Powered Ideation</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              Instantly generate and refine startup ideas with your AI Co-Founder.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-b from-purple-100 to-purple-200 dark:from-gray-800 dark:to-gray-700 shadow hover:shadow-xl transition-shadow animate-fadeInUp [animation-delay:0.2s]">
            <Image src="/validate.svg" alt="Validation" width={48} height={48} />
            <h3 className="text-lg font-bold">Smart Validation</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              Validate ideas with real market data and smart insights.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-gradient-to-b from-green-100 to-green-200 dark:from-gray-800 dark:to-gray-700 shadow hover:shadow-xl transition-shadow animate-fadeInUp [animation-delay:0.4s]">
            <Image src="/mentor.svg" alt="Mentorship" width={48} height={48} />
            <h3 className="text-lg font-bold">Mentorship Access</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
              Connect with mentors and resources tailored to your goals.
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
