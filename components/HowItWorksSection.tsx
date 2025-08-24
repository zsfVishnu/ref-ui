import { Workflow, Network, HeadphonesIcon, Search } from 'lucide-react';

const features = [
  {
    icon: Workflow,
    title: "Referral Workflows",
    description: "Explore our efficient and effective workflows that facilitate the referral process and help candidates secure interviews.",
    color: "bg-green-100 border-green-200"
  },
  {
    icon: Network,
    title: "Easy Networking",
    description: "Our platform offers a comprehensive networking solution, connecting candidates and referrers and fostering meaningful professional relationships.",
    color: "bg-blue-100 border-blue-200"
  },
  {
    icon: HeadphonesIcon,
    title: "Support and Guidance",
    description: "We provide dedicated customer support to guide candidates and referrers through the referral process and address any inquiries or concerns.",
    color: "bg-yellow-100 border-yellow-200"
  },
  {
    icon: Search,
    title: "Enhanced Job Search",
    description: "Utilize our smart automation tools to streamline your job search process and increase your chances of landing your dream job.",
    color: "bg-purple-100 border-purple-200"
  }
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how Get Referral streamlines the process of job referrals and 
            empowers candidates to stand out in the job application process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}