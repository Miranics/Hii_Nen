export default function FAQPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <section className="w-full max-w-3xl text-center flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold">Frequently Asked Questions</h1>
        
        <div className="text-left space-y-4">
          <div>
            <h2 className="text-lg font-semibold">What is HiiNen?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              HiiNen is your AI Co-Founder — it helps you generate startup ideas, validate them,
              and connect with mentorship and resources.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Is HiiNen free?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Currently, HiiNen is free for early-stage entrepreneurs. Some premium features
              may be added in the future.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">How can I get support?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              You can reach out anytime at{" "}
              <a
                href="mailto:hiinen@example.com"
                className="text-blue-600 underline hover:text-blue-700"
              >
                hiinen@example.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
