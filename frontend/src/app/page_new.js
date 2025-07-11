import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      {/* === HEADER === */}
      <header className="row-start-1 w-full flex justify-between items-center max-w-4xl">
        <div className="flex items-center gap-2">
          <Image
            src="/hiinen-logo.svg"
            alt="HiiNen Logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold">HiiNen</span>
        </div>
        <nav className="flex gap-4">
          <Link href="/features" className="hover:underline">
            Features
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </header>

      {/* === MAIN === */}
      <main className="flex flex-col gap-6 items-center text-center row-start-2 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Start and Grow Your Ideas with{" "}
          <span className="text-blue-600">HiiNen</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your AI Co-Founder for ideation, validation, and startup success —
          let's build the future together.
        </p>
        
        {/* === FEATURES PREVIEW === */}
        <div className="grid gap-6 sm:grid-cols-3 text-center w-full max-w-3xl mt-4">
          <div className="flex flex-col items-center gap-3">
            <Image src="/idea.svg" alt="Idea Generation Icon" width={40} height={40} />
            <h3 className="text-base font-semibold">AI-Powered Ideation</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              Generate and refine startup ideas instantly with your AI Co-Founder.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Image src="/validate.svg" alt="Validation Icon" width={40} height={40} />
            <h3 className="text-base font-semibold">Smart Validation</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              Validate ideas with market data and expert AI insights.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Image src="/mentor.svg" alt="Mentorship Icon" width={40} height={40} />
            <h3 className="text-base font-semibold">Mentorship Access</h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
              Connect with curated mentors and resources tailored to your goals.
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link
            href="/features"
            className="rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors text-center"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-blue-600 px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors text-center"
          >
            Learn More
          </Link>
        </div>
      </main>

      {/* === FOOTER === */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500">
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
      </footer>
    </div>
  );
}
