import { Grid3X3, MessageSquare, Zap } from 'lucide-react';

const features = [
  {
    icon: Grid3X3,
    title: "Simplified Referral Management",
    description: ""
  },
  {
    icon: MessageSquare,
    title: "Seamless Referral Communication",
    description: ""
  },
  {
    icon: Zap,
    title: "Enhanced Job Application Experience",
    description: ""
  }
];

export default function TailoredSection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Illustration */}
          <div className="relative">
            <div className="relative w-full h-80 lg:h-96">
              <img 
                src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Professional networking illustration" 
                className="w-full h-full object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-purple-100/40 rounded-2xl"></div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
              Tailored for Job Seekers and Referrers
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our platform is designed by professionals who understand the challenges 
              of the job search process, ensuring a user-friendly experience for both 
              candidates and referrers.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-black text-white p-2 rounded-lg flex-shrink-0">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black text-lg">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}