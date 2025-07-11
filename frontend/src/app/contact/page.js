export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <section className="w-full max-w-2xl flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Have a question or want to collaborate? Fill out the form below or email us directly.
        </p>

        <form className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
          <button
            type="submit"
            className="rounded-full bg-blue-600 text-white px-6 py-3 font-medium hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
