const testimonials = [
  {
    quote:
      'Discover what our users have to say about their experiences with Get Referral and how it has transformed their job search journey.',
    author: 'Emily Watson,',
    title: 'Software Engineer',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    quote:
      'Get Referral has been instrumental in helping me secure interviews at top tech companies. The platform is intuitive and has expanded my professional network.',
    author: 'Michael Patel,',
    title: 'Marketing Professional',
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    quote:
      'I highly recommend Get Referral to job seekers and referrers. It has simplified the referral process and connected me with talented candidates.',
    author: 'Hannah Carter,',
    title: 'HR Manager',
    avatar:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export default function SuccessStoriesSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">Success Stories</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group hover:shadow-xl transition-all duration-300">
              <div className="bg-white rounded-2xl border-2 border-yellow-300 p-8 h-full relative overflow-hidden">
                {/* Browser-like header */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                <blockquote className="text-gray-700 leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-black">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.title}</div>
                  </div>
                </div>

                {/* Decorative leaf */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-20">
                  <img
                    src="https://images.pexels.com/photos/3401956/pexels-photo-3401956.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Decorative leaf"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
