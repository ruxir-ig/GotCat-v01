import React from 'react';
import { Timer, Brain, Lightbulb, Target } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Timer,
      title: "Real-Time Engine",
      description: "Synchronized questions. Live score updates. See your opponent's progress bar move as you think."
    },
    {
      icon: Lightbulb,
      title: "Smart Hints",
      description: "Stuck? Unlock a 'Smart Hint' powered by Gemini AI that nudges you without giving the answer."
    },
    {
      icon: Target,
      title: "Exam Intelligence",
      description: "Questions curated based on actual past year paper patterns of CAT, XAT, and NMAT."
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Get a breakdown of 'Time Wasted' vs 'Time Invested' for every question you attempt."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gotcat-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Why Top Rankers Love <span className="text-gotcat-orange">GotCat</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Traditional mocks are boring and lonely. GotCat brings the adrenaline of the exam hall to your daily practice sessions.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col gap-3 p-6 rounded-3xl bg-gotcat-card hover:bg-gotcat-cardHover transition-colors border border-white/5">
                  <div className="w-12 h-12 rounded-2xl bg-gotcat-orange/10 flex items-center justify-center text-gotcat-orange">
                    <feature.icon size={24} />
                  </div>
                  <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Abstract decorative graphic */}
            <div className="absolute inset-0 bg-gradient-to-br from-gotcat-orange to-purple-900 rounded-[2rem] transform rotate-3 opacity-20 blur-2xl"></div>
            <div className="relative bg-black rounded-[2rem] p-8 shadow-2xl border border-white/10">
               {/* Mock Dashboard UI */}
               <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-6">
                  <h3 className="text-white font-bold text-lg">Post-Match Analysis</h3>
                  <span className="bg-gotcat-green/20 text-gotcat-green px-3 py-1 rounded-full text-xs font-bold uppercase">Top 1%</span>
               </div>
               
               <div className="space-y-6">
                  <div className="bg-gotcat-card rounded-2xl p-5 border border-white/5">
                     <div className="flex justify-between text-gray-400 text-xs font-bold uppercase mb-2">
                        <span>Accuracy</span>
                        <span className="text-white">92%</span>
                     </div>
                     <div className="h-3 bg-black rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-gotcat-green"></div>
                     </div>
                  </div>
                  
                  <div className="bg-gotcat-card rounded-2xl p-5 border border-white/5">
                     <div className="flex justify-between text-gray-400 text-xs font-bold uppercase mb-2">
                        <span>Speed (Avg per Q)</span>
                        <span>45s <span className="text-gotcat-green">(-15s vs Avg)</span></span>
                     </div>
                     <div className="h-3 bg-black rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-blue-500"></div>
                     </div>
                  </div>

                  <div className="bg-gotcat-orange/10 rounded-2xl p-5 border border-gotcat-orange/30">
                     <div className="flex items-start gap-4">
                        <Brain className="text-gotcat-orange shrink-0 mt-1" size={24} />
                        <div>
                           <p className="text-white font-bold mb-1">AI Insight</p>
                           <p className="text-gray-400 text-sm">
                              You spent 2.5 minutes on Q4 (Algebra). Next time, try the substitution method. It would have taken 45 seconds.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;