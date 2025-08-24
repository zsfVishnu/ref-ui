import { Button } from '@/components/ui/button';
import { Search, Unlock, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6">
              Get Referral - Your Gateway to Job Referrals
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Join our referral marketplace to discover job referral opportunities from top 
              companies and improve your chances of getting hired.
            </p>
            <Button className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 text-lg mb-12">
              Get Started
            </Button>

            {/* Feature Icons */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white p-2 rounded-lg">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-black">Empower</div>
                  <div className="text-gray-600 text-sm">Your Job Search</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white p-2 rounded-lg">
                  <Unlock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-black">Unlock Job</div>
                  <div className="text-gray-600 text-sm">Opportunities</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-black text-white p-2 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-black">Build Your</div>
                  <div className="text-gray-600 text-sm">Career Network</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              <img 
                src="https://images.pexels.com/photos/3183170/pexels-photo-3183170.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Team collaboration illustration" 
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-yellow-100/30 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}