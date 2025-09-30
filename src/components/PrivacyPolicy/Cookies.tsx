import React from "react";

const CookiePolicy = () => {
  return (
    <main className="2xl:max-w-screen-screen-1400 text-lg">
      {/* top section */}
      <h1 className="text-3xl py-5 font-bold text-center">Cookie Policy</h1>
      <p className="text-center text-sm text-gray-500">
        Last updated: 22 Sep 2025
      </p>

      <div className="p-5">
        {/* section 1 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help us remember your preferences, improve
            functionality, and analyze usage.
          </p>
        </section>

        {/* section 2 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">
            2. Types of Cookies We Use
          </h2>
          <p className="text-gray-600 font-medium text-xl">
            We use the following categories of cookies:
          </p>
          <ul className="pl-10 mt-5 space-y-2 list-disc">
            <li>
              <strong>Strictly Necessary Cookies:</strong> Required for the
              website to function (e.g., login sessions, security). These do not
              require consent.
            </li>
            <li>
              <strong>Performance & Analytics Cookies:</strong> Help us
              understand how visitors use the site (e.g., Google Analytics). We
              only use these with your consent.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Remember your preferences
              (e.g., favorite teams, language). These may require consent
              depending on your region.
            </li>
            <li>
              <strong>Advertising / Marketing Cookies:</strong> Used to deliver
              relevant ads. We only set these with your explicit consent.
            </li>
          </ul>
        </section>

        {/* section 3 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">3. How We Use Cookies</h2>
          <ul className="pl-10 mt-5 space-y-2 list-disc">
            <li>To keep you logged in and secure your session.</li>
            <li>
              To remember your preferences (favorite leagues, theme settings).
            </li>
            <li>To measure traffic and improve performance.</li>
            <li>To provide personalized offers or ads (if you consent).</li>
          </ul>
        </section>

        {/* section 4 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">4. Managing Cookies</h2>
          <p>You can control cookies via:</p>
          <ul className="pl-10 mt-5 space-y-2 list-disc">
            <li>
              Our cookie banner, where you can accept/reject non-essential
              cookies.
            </li>
            <li>
              Your browser settings (to block, delete, or restrict cookies).
            </li>
          </ul>
          <p className="mt-3 text-gray-600 italic">
            Note: Blocking cookies may affect your site experience.
          </p>
        </section>

        {/* section 5 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">5. Third-Party Cookies</h2>
          <p>
            Some cookies are placed by third-party services (e.g., Google
            Analytics, advertising partners). These providers have their own
            privacy policies.
          </p>
        </section>

        {/* section 6 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">6. Updates</h2>
          <p>
            We may update this Cookie Policy from time to time. Updates will be
            posted here with a new “Last updated” date.
          </p>
        </section>

        {/* section 7 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">7. Contact</h2>
          <p>
            For questions about cookies, contact us at:{" "}
            <a
              href="mailto:support@pitchside.app"
              className="underline text-blue-400"
            >
              support@pitchside.app
            </a>
          </p>
        </section>
      </div>
    </main>
  );
};

export default CookiePolicy;
