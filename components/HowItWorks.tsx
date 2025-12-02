import React from 'react';
import { Swords, Zap, BarChart3 } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Swords,
      title: "Match & Battle",
      description: "Get matched with a student of similar skill level. Both solve the same set of questions in real-time."
    },
    {
      icon: Zap,
      title: "Speed Matters",
      description: "It's not just about being right. Being fast earns you bonus multiplier points. Pressure mimics the real exam."
    },
    {
      icon: BarChart3,
      title: "Deep Analytics",
      description: "Post-battle, see where you lagged. Our AI analyzes if you took the long method or the shortcut."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gotcat-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How GotCat Works</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">Mastering the CAT isn't just about knowledge, it's about strategy and speed. We gamify the grind.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gotcat-card rounded-[2rem] transform transition-transform group-hover:-translate-y-2 duration-300 border border-white/5"></div>
              <div className="relative p-8 z-10 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gotcat-bg rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gotcat-orange transition-colors duration-300 shadow-xl border border-white/5">
                  <step.icon className="w-8 h-8 text-gotcat-orange group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
                <div className="absolute top-4 right-4 text-6xl font-black text-white/5 -z-10 select-none">
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;