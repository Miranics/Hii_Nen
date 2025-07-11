export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <section className="w-full max-w-4xl text-center flex flex-col items-center gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">About HiiNen</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          HiiNen — inspired by the Tiv phrase <em>Se Hii Nen</em> (“Let’s Start”) — is your AI Co-Founder
          designed to empower young African entrepreneurs. From idea generation to startup validation and
          mentorship connections, HiiNen helps you launch impactful projects that tackle real community challenges.
        </p>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Founded by Nanen — meaning “to give” in Tiv — this platform embodies the spirit of giving:
          giving you tools, knowledge, and guidance to start and grow what matters.
        </p>
      </section>
    </main>
  );
}
