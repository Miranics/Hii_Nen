import Image from "next/image";

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
          <a href="#features" className="hover:underline">
            Features
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </header>

      {/* === MAIN === */}
      <main className="flex flex-col gap-8 items-center text-center row-start-2 max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Start and Grow Your Ideas with <span className="text-blue-600">HiiNen</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your AI Co-Founder for ideation, validation, and startup success — let’s build the future together.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <a
            href="#get-started"
            className="rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="#learn-more"
            className="rounded-full border border-blue-600 px-6 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* === FOOTER === */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-sm text-gray-500">
        <span>&copy; {new Date().getFullYear()} HiiNen</span>
        <a href="https://github.com/miranics/Hii_Nen" target="_blank" rel="noopener noreferrer" className="hover:underline">
          GitHub
        </a>
        <a href="#privacy" className="hover:underline">
          Privacy
        </a>
      </footer>
    </div>
  );
}
