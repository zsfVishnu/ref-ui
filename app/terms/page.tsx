import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-gray-400 text-lg">Last updated: January 30, 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <div className="mb-12">
            <p className="text-xl text-gray-300 leading-relaxed">
              Welcome to Get Referral. These terms and conditions outline the rules and regulations
              for the use of our job referral marketplace platform and services.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Acceptance of Terms</h2>
            <p className="text-gray-300">
              By accessing and using Get Referral, you accept and agree to be bound by the terms and
              provision of this agreement. If you do not agree to abide by the above, please do not
              use this service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Platform Description</h2>
            <p className="text-gray-300 mb-6">
              Get Referral is a job referral marketplace that connects job seekers with company
              employees who can provide referrals. Our platform facilitates:
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>Job seekers discovering referral opportunities from top companies</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>Company employees posting and managing referral events</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>Secure communication between candidates and referrers</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>Analytics and tracking for referral performance</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              User Accounts and Responsibilities
            </h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Account Creation</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>
                    You must provide accurate and complete information when creating an account
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>
                    You are responsible for maintaining the confidentiality of your account
                    credentials
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>You must be at least 18 years old to use our services</span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">User Conduct</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>
                    Provide truthful and accurate information in your profile and applications
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>Respect other users and maintain professional communication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>Do not spam, harass, or engage in fraudulent activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>
                    Do not share login credentials or allow unauthorized access to your account
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Referral Process</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                For Job Seekers (Candidates)
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>Referral requests do not guarantee job interviews or employment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>
                    You may apply to multiple referral events but must meet the specified
                    requirements
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>
                    You are responsible for following up on referrals and maintaining professional
                    relationships
                  </span>
                </li>
              </ul>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">For Referrers</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>
                    You must be a current employee of the company for which you're offering
                    referrals
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>Referral events must be for legitimate job openings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <span>
                    You are responsible for managing your referral events and communicating with
                    applicants
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Intellectual Property</h2>
            <p className="text-gray-300 mb-6">
              The Get Referral platform, including its design, features, and content, is owned by us
              and protected by intellectual property laws. You may not:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  Copy, modify, or distribute our platform or its content without permission
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>Use our trademarks, logos, or branding without authorization</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>Reverse engineer or attempt to extract source code from our platform</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Limitation of Liability</h2>
            <p className="text-gray-300 mb-6">
              Get Referral provides a platform for connecting job seekers with referrers. We do not:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>Guarantee job interviews, offers, or employment outcomes</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>Control hiring decisions made by companies</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>
                  Take responsibility for the accuracy of job postings or user-provided information
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-3 mt-1">•</span>
                <span>Assume liability for disputes between users</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Termination</h2>
            <p className="text-gray-300">
              We reserve the right to terminate or suspend your account at any time for violations
              of these terms, fraudulent activity, or other reasons we deem necessary. You may also
              terminate your account at any time by contacting us or using the account deletion
              feature in your profile settings.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Changes to Terms</h2>
            <p className="text-gray-300">
              We may update these terms and conditions from time to time to reflect changes in our
              services or legal requirements. Any changes will be posted on this page, and we
              encourage you to review them periodically. Continued use of our platform after changes
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Governing Law</h2>
            <p className="text-gray-300">
              These terms and conditions are governed by and construed in accordance with the laws
              of the United States. Any disputes arising from these terms will be subject to the
              exclusive jurisdiction of the courts in our operating jurisdiction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these terms and conditions, please use our feedback
              form on the main page or reach out through our social media channels.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
