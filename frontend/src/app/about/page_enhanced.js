import Navbar from "../../components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <Navbar />
      
      <main className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
        <section className="w-full max-w-4xl text-center flex flex-col items-center gap-6 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">About HiiNen</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg animate-fadeInUp stagger-delay-1">
            HiiNen — inspired by the Tiv phrase <em>Se Hii Nen</em> ("Let's Start") — is your AI Co-Founder
            designed to empower young African entrepreneurs. From idea generation to startup validation and
            mentorship connections, HiiNen helps you launch impactful projects that tackle real community challenges.
          </p>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg animate-fadeInUp stagger-delay-2">
            Founded by Nanen — meaning "to give" in Tiv — this platform embodies the spirit of giving:
            giving you tools, knowledge, and guidance to start and grow what matters.
          </p>
          
          <div className="mt-8 animate-fadeInUp stagger-delay-3">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold">
              Start Your Journey
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
