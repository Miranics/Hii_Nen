import Image from "next/image";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <section className="w-full max-w-5xl grid gap-12 sm:grid-cols-3 text-center">
        <div className="flex flex-col items-center gap-4">
          <Image src="/idea.svg" alt="Idea Generation Icon" width={48} height={48} />
          <h2 className="text-lg font-semibold">AI-Powered Ideation</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Generate and refine startup ideas instantly with your AI Co-Founder.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Image src="/validate.svg" alt="Validation Icon" width={48} height={48} />
          <h2 className="text-lg font-semibold">Smart Validation</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Validate ideas with market data and expert AI insights.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Image src="/mentor.svg" alt="Mentorship Icon" width={48} height={48} />
          <h2 className="text-lg font-semibold">Mentorship Access</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Connect with curated mentors and resources tailored to your goals.
          </p>
        </div>
      </section>
    </main>
  );
}
