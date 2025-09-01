import { Button } from '@/components/ui/button';

export default function FinalCTASection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6 max-w-4xl mx-auto leading-tight">
            Elevate your job search with Get Referral's innovative approach to securing job
            referrals and enhancing your employment prospects.
          </h2>
          <Button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 text-lg">
            Join the Community
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-4xl h-80 lg:h-96">
            <img
              src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Community collaboration illustration"
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-yellow-100/30 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
