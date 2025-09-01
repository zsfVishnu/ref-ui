export default function ConnectingSection() {
  return (
    <section className="bg-yellow-400 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-8">
              Connecting Candidates and Referrers
            </h2>
          </div>

          {/* Right Content */}
          <div>
            <p className="text-lg text-black leading-relaxed">
              Get Referral is a platform designed to connect job seekers with company employees who
              can refer them for job openings. We provide a seamless and efficient way for
              candidates to request referrals and for referrers to post and manage referral events.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
