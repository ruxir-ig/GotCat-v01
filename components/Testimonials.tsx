import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Arjun K.",
    role: "IIM A (Convert)",
    content: "The timer pressure in GotCat is exactly what I needed. Regular mocks made me complacent. This kept me on my toes.",
    rating: 5
  },
  {
    name: "Neha S.",
    role: "CAT 99.8%iler",
    content: "I love the analytics. It told me I was wasting 40 seconds on easy geometry questions. Fixed it and my score jumped.",
    rating: 5
  },
  {
    name: "Rahul M.",
    role: "SNAP Aspirant",
    content: "Addictive. I actually look forward to solving questions now because I want to beat my friend's high score.",
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gotcat-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-white">Student Stories</h2>
          <p className="mt-2 text-gray-400">Don't take our word for it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gotcat-card p-8 rounded-[2rem] border border-white/5">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < t.rating ? "currentColor" : "none"} className={i < t.rating ? "" : "text-gray-600"} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">"{t.content}"</p>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-sm text-gotcat-orange font-bold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;