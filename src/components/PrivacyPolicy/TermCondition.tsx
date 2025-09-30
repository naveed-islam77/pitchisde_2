import React from "react";

const TermsAndConditions = () => {
  return (
    <main className="2xl:max-w-screen-screen-1400 text-lg">
      {/* top section */}
      <h1 className="text-3xl py-5 font-bold text-center">
        Terms & Conditions
      </h1>
      <p className="text-center text-sm text-gray-500">
        Last updated: 22 Sep 2025
      </p>

      <div className="p-5">
        {/* section 1 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">1. Use of the Website</h2>
          <ul className="pl-10 mt-5 space-y-2 list-disc">
            <li>
              You must be at least 13 years old (or the minimum age in your
              country) to create an account.
            </li>
            <li>You agree to use the Website only for lawful purposes.</li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account.
            </li>
          </ul>
        </section>

        {/* section 2 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">2. Accounts</h2>
          <ul className="pl-10 mt-5 space-y-2 list-disc">
            <li>
              You must provide accurate and complete information when creating
              an account.
            </li>
            <li>You are responsible for all activities under your account.</li>
            <li>
              We may suspend or terminate accounts that violate these Terms.
            </li>
          </ul>
        </section>

        {/* section 3 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">3. Content</h2>
          <ul className="pl-10 mt-5 space-y-2 list-disc">
            <li>
              We provide football scores, statistics, and related content for
              personal use.
            </li>
            <li>
              You may not copy, distribute, or resell our content without
              permission.
            </li>
            <li>
              User-generated content (e.g., comments, profiles) must not be
              offensive, unlawful, or infringe third-party rights.
            </li>
          </ul>
        </section>

        {/* section 4 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">4. Privacy</h2>
          <p className="text-gray-600 font-medium text-xl">
            Our use of your data is governed by our{" "}
            <a href="/privacy-policy" className="underline text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        {/* section 5 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">
            5. Limitation of Liability
          </h2>
          <p>
            We provide our services “as is” and make no guarantees of accuracy
            or availability. We are not liable for losses resulting from use of
            the Website.
          </p>
        </section>

        {/* section 6 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">6. Changes</h2>
          <p>
            We may update these Terms from time to time. Continued use of the
            Website means you accept the new Terms.
          </p>
        </section>

        {/* section 7 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">7. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Netherlands. Disputes
            will be handled in the courts of Rotterdam, Netherlands.
          </p>
        </section>

        {/* section 8 */}
        <section>
          <h2 className="text-2xl py-5 font-bold">8. Contact</h2>
          <p>
            For questions about these Terms, contact us at:{" "}
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

export default TermsAndConditions;
