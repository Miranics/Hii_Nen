export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <section className="w-full max-w-3xl text-center flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold">Terms of Service</h1>
        <p className="text-gray-600 dark:text-gray-400">
          By using HiiNen, you agree to use our platform responsibly and only for lawful
          purposes. You may not misuse the services to harm others or disrupt operations.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          We reserve the right to update or modify these terms at any time. Continued use
          of the platform means you accept any changes to our Terms of Service.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          For questions about these terms,{" "}
          <a
            href="mailto:hiinen@example.com"
            className="text-blue-600 underline hover:text-blue-700"
          >
            contact us
          </a>.
        </p>
      </section>
    </main>
  );
}
