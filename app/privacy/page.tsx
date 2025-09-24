import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">Last updated: January 30, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="mb-12">
            <p className="text-xl text-gray-300 leading-relaxed">
              Your privacy is important to us. This privacy policy explains how Get Referral
              collects, uses, and protects your personal information when you use our job referral
              marketplace platform and services.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Information We Collect</h2>
            <p className="text-gray-300 mb-6">
              We may collect the following types of information when you use Get Referral:
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>Personal identification information</strong> (Name, email address, phone
                  number, LinkedIn profile, professional experience, education details)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>Professional information</strong> (Resume, work history, skills, job
                  preferences, referral requests)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>Usage data</strong> (How you interact with our platform, pages visited,
                  time spent on features)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>Communication data</strong> (Messages between candidates and referrers,
                  feedback, support inquiries)
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">How We Use Your Information</h2>
            <p className="text-gray-300 mb-6">
              Your information is used for the following purposes:
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>To provide and maintain our job referral marketplace services</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>To facilitate connections between job seekers and company referrers</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>To process referral requests and manage referral events</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  To send relevant notifications about referral opportunities and application status
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>To improve our platform features and user experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>To comply with legal obligations and prevent fraudulent activity</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Information Sharing</h2>
            <p className="text-gray-300 mb-6">
              We may share your information in the following circumstances:
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>With referrers:</strong> When you apply for a referral, we share your
                  profile information and application materials with the relevant referrer
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>With service providers:</strong> Third-party services that help us operate
                  our platform (hosting, analytics, email services)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>For legal compliance:</strong> When required by law or to protect our
                  rights and the safety of our users
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Security</h2>
            <p className="text-gray-300">
              We are committed to ensuring that your information is secure. We implement appropriate
              technical and organizational measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction. This includes encryption,
              secure data transmission, regular security audits, and access controls.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Cookies</h2>
            <p className="text-gray-300">
              Our website may use cookies to enhance your experience and provide personalized
              features. Cookies help us remember your preferences, analyze site usage, and improve
              our services. You can choose to accept or decline cookies through your browser
              settings, though some features may not function properly without them.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Third-Party Links</h2>
            <p className="text-gray-300">
              Our website may contain links to other websites, including company career pages and
              job postings. We are not responsible for the privacy practices or the content of these
              external sites. We encourage you to review the privacy policies of any third-party
              sites you visit.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Your Rights</h2>
            <p className="text-gray-300 mb-6">
              You have the right to access, correct, or delete your personal data. Additional rights
              include:
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>Right to access:</strong> Request a copy of the personal data we hold
                  about you
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>Right to rectification:</strong> Request correction of inaccurate or
                  incomplete data
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>Right to erasure:</strong> Request deletion of your personal data
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  <strong>Right to portability:</strong> Request transfer of your data to another
                  service
                </span>
              </li>
            </ul>
            <p className="text-gray-300 mt-6">
              To exercise these rights, please contact us at privacy@getreferral.com.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Data Retention</h2>
            <p className="text-gray-300">
              We retain your personal information only for as long as necessary to provide our
              services and fulfill the purposes outlined in this policy. When you delete your
              account, we will remove your personal data within 30 days, except where we are
              required to retain certain information for legal or regulatory purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Changes to This Policy</h2>
            <p className="text-gray-300">
              We may update this privacy policy from time to time to reflect changes in our
              practices or for legal, operational, or regulatory reasons. Any changes will be posted
              on this page, and we encourage you to review it periodically. For significant changes,
              we will notify you via email or through a prominent notice on our platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this privacy policy or our data practices, please use
              our feedback form on the main page or reach out through our social media channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
