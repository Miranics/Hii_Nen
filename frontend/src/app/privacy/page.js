export default function PrivacyPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <section className="w-full max-w-3xl text-center flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400">
          At HiiNen, we value your privacy. We do not share your data with third
          parties without consent and use industry-standard practices to keep
          your information safe.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          By using HiiNen, you agree to our terms of use and acknowledge how your
          information may be collected and used to improve your experience.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          For any questions about your privacy or data usage, please{" "}
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
