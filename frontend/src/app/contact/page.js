export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <section className="w-full max-w-2xl text-center flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400">
          We’d love to hear from you! Whether you have a question, idea, or
          want to collaborate — drop us a message.
        </p>
        <a
          href="mailto:hiinen@example.com"
          className="inline-block mt-4 rounded-full bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Send an Email
        </a>
      </section>
    </main>
  );
}
