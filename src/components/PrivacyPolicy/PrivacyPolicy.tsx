import React from "react";

const PrivacyPolicies = () => {
  return (
    <main className="2xl:max-w-screen-screen-1400 text-lg">
      {/* top section */}
      <h1 className="text-3xl py-5 font-bold text-center">Privacy Policy</h1>
      <p className="text-center text-sm text-gray-500">
        Last updated: 22 Sep 2025
      </p>
      <div className="p-5">
        <p>
          <strong className="font-bold italic">PITCHSIDE</strong> (“we”, “our”,
          “us”) values your privacy. This Privacy Policy explains how we
          collect, use, and protect your personal data when you use our website{" "}
          <a href="/pitchside.app" className="underline text-primary">
            www.pitchside.app
          </a>
        </p>

        {/* section 1  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">1. Information We Collect</h1>
          <p className="text-gray-600 font-medium text-xl">
            We may collect the following personal data:
          </p>
          <ul className="pl-10 mt-5">
            <li className="list-disc">
              Account Information: email address, username, password
              (encrypted).
            </li>
            <li className="list-disc">
              Preferences: favorite teams, leagues, settings you choose.
            </li>
            <li className="list-disc">
              Technical Data: IP address, browser type, device information (for
              security and analytics).
            </li>
            <li className="list-disc">
              Cookies and Tracking: only with your consent, for personalization
              and analytics.
            </li>
          </ul>
        </section>
        {/* section 2  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">
            2. How We Use Your Information
          </h1>
          <p className="text-gray-600 font-medium text-xl">
            We use your information to:
          </p>
          <ul className="pl-10 mt-5">
            <li className="list-disc">Provide and maintain your account.</li>
            <li className="list-disc">
              Personalize your experience (favorite teams, leagues).
            </li>
            <li className="list-disc">
              Ensure website security and prevent fraud.
            </li>
            <li className="list-disc">
              Send service-related notifications (account verification, password
              reset).
            </li>
            <li className="list-disc">
              Send marketing communications only if you have opted in.
            </li>
          </ul>
        </section>
        {/* section 3  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">
            3. Legal Bases for Processing
          </h1>
          <p className="text-gray-600 font-medium text-xl">
            We process your data under:
          </p>
          <ul className="pl-10 mt-5">
            <li className="list-disc">
              Contract: to provide account functionality.
            </li>
            <li className="list-disc">
              Legitimate Interest: security, fraud prevention.
            </li>
            <li className="list-disc">
              Consent: marketing emails, cookies, analytics.
            </li>
          </ul>
        </section>
        {/* section 4  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">4. Data Sharing</h1>
          <p className="text-gray-600 font-medium text-xl">
            We may share your data with:
          </p>
          <ul className="pl-10 mt-5">
            <li className="list-disc">
              Hosting providers, analytics services, and authentication
              providers.
            </li>
            <li className="list-disc">
              Legal authorities, if required by law.
            </li>
            <li className="list-disc">We never sell your personal data.</li>
          </ul>
        </section>
        {/* section 5  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">5. Data Retention</h1>
          <p>
            We keep your personal data only as long as necessary to provide our
            services, or as required by law. Inactive accounts are deleted after
            12 months.
          </p>
        </section>
        {/* section 6  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">6. Your Rights</h1>
          <p className="text-gray-600 font-medium text-xl">
            You have the right to:
          </p>
          <ul className="pl-10 mt-5">
            <li className="list-disc">Access your data.</li>
            <li className="list-disc">Correct or update it.</li>
            <li className="list-disc">
              Request deletion (“right to be forgotten”).
            </li>{" "}
            <li className="list-disc">Request a copy (“data portability”).</li>
            <li className="list-disc">
              Withdraw consent for marketing at any time.
            </li>
            <li className="list-disc">
              To exercise your rights, contact us at:{" "}
              <a
                href="mailto:support@pitchside.app"
                className="underline text-blue-400"
              >
                support@pitchside.app
              </a>
            </li>
          </ul>
        </section>
        {/* section 7  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">7. Cookies</h1>
          <p>
            We use cookies for authentication, personalization, and analytics.
            Non-essential cookies require your consent. You can manage cookies
            via our cookie banner.
          </p>
        </section>
        {/* section 8  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">8. Security</h1>
          <p>
            We use encryption and other safeguards to protect your data.
            However, no system is 100% secure.
          </p>
        </section>
        {/* section 9  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">
            9. International Transfers
          </h1>
          <p>
            If your data is processed outside the EU/EEA, we ensure adequate
            protection via Standard Contractual Clauses or equivalent
            safeguards.
          </p>
        </section>
        {/* section 10  */}
        <section>
          <h1 className="text-2xl py-5 font-bold">10. Contact</h1>
          <p>
            If you have questions, contact us at:{" "}
            <a href="mailto:support@pitchside.app">support@pitchside.app</a>. If
            you are in the EU, you may also lodge a complaint with your local
            Data Protection Authority.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicies;
