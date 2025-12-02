import React from 'react';
import Button from './Button';
import { Users, Play, Trophy, Brain, Zap, Clock, ChevronRight, Activity } from 'lucide-react';

interface HeroProps {
  onStartDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartDemo }) => {
  return (
    <div id="dashboard" className="relative overflow-hidden bg-gotcat-bg py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Stats Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="bg-gotcat-card px-4 py-2 rounded-full flex items-center gap-2 border border-white/5 shadow-lg">
                <Users size={16} className="text-gotcat-green" />
                <span className="text-white font-bold text-sm">514,204</span>
                <span className="text-gray-400 text-xs font-semibold">Mathletes</span>
            </div>
            <div className="bg-gotcat-card px-4 py-2 rounded-full flex items-center gap-2 border border-white/5 shadow-lg">
                <Activity size={16} className="text-gotcat-orange" />
                <span className="text-white font-bold text-sm">9,616,444</span>
                <span className="text-gray-400 text-xs font-semibold">Battles</span>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Column: Navigation / Menu (Simulated for aesthetics) */}
            <div className="hidden lg:flex flex-col gap-2 w-64 shrink-0">
                {['Arena', 'Puzzles', 'Daily Challenge', 'Compete', 'Leaderboard'].map((item, i) => (
                    <button key={item} className={`text-left px-4 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all ${i === 0 ? 'bg-gotcat-card text-gotcat-green border border-gotcat-green/20' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}>
                        {i === 0 && <Zap size={18} fill="currentColor"/>}
                        {i === 1 && <Brain size={18} />}
                        {i === 2 && <Clock size={18} />}
                        {i === 3 && <Trophy size={18} />}
                        {item}
                    </button>
                ))}
            </div>

            {/* Center: Main Game Cards */}
            <div className="flex-1">
                <h2 className="text-gray-400 font-bold text-sm tracking-wider mb-4 uppercase">Online Duels</h2>
                
                {/* HERO CARD - 1 MIN DUEL */}
                <div 
                    onClick={onStartDemo}
                    className="group relative bg-gradient-to-br from-gotcat-orange to-orange-600 rounded-[2rem] p-8 md:p-12 cursor-pointer shadow-2xl shadow-orange-900/20 hover:shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                >
                    <div className="absolute top-4 right-4 bg-black/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                        Most Played
                    </div>
                    
                    {/* Animated background elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left space-y-4">
                             <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                <div className="animate-float">
                                     <Brain size={48} className="text-white/90" strokeWidth={1.5} />
                                </div>
                                <span className="text-white/50 text-2xl font-black italic">VS</span>
                                <div className="animate-float" style={{animationDelay: '1.5s'}}>
                                     <Zap size={48} className="text-yellow-300" strokeWidth={1.5} fill="currentColor" />
                                </div>
                             </div>
                             <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                5-Question<br/>Blitz Battle
                             </h1>
                             <p className="text-orange-100 font-medium text-lg">
                                Real-time mock bot. Speed bonuses. <br/>Can you beat the average?
                             </p>
                             <div className="pt-2">
                                <span className="inline-flex items-center gap-2 bg-white text-gotcat-orange px-6 py-3 rounded-xl font-bold text-lg group-hover:bg-orange-50 transition-colors">
                                    <Play fill="currentColor" size={20} />
                                    Play Now
                                </span>
                             </div>
                        </div>

                        {/* Decor Image/Icon */}
                        <div className="hidden md:block opacity-80 group-hover:opacity-100 transition-opacity">
                            {/* Abstract decorative shapes */}
                            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="100" cy="100" r="90" stroke="white" strokeOpacity="0.2" strokeWidth="4" strokeDasharray="10 10" className="animate-spin-slow" />
                                <path d="M100 20L120 180L40 60L160 60L80 180L100 20Z" fill="white" fillOpacity="0.1" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Secondary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gotcat-card p-6 rounded-3xl border border-white/5 hover:bg-gotcat-cardHover transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-blue-500/10 p-3 rounded-2xl">
                                <Clock className="text-blue-400" size={24} />
                            </div>
                            <ChevronRight className="text-gray-600 group-hover:text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">Daily Challenge</h3>
                        <p className="text-sm text-gray-400">Solve 3 Geometry questions in 2 mins</p>
                    </div>

                    <div className="bg-gotcat-card p-6 rounded-3xl border border-white/5 hover:bg-gotcat-cardHover transition-colors cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-gotcat-green/10 p-3 rounded-2xl">
                                <Trophy className="text-gotcat-green" size={24} />
                            </div>
                            <ChevronRight className="text-gray-600 group-hover:text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">Weekly League</h3>
                        <p className="text-sm text-gray-400">You are in Top 15%. Push for Gold.</p>
                    </div>
                </div>

            </div>

            {/* Right Column: Stats/Leaderboard */}
            <div className="w-full lg:w-80 space-y-6">
                <div className="bg-gotcat-card p-6 rounded-3xl border border-white/5">
                    <div className="flex justify-between items-center mb-6">
                         <h3 className="text-white font-bold">Your Rating</h3>
                         <Activity size={16} className="text-gray-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-4 rounded-2xl">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-1">Math</p>
                            <p className="text-2xl font-black text-white">1023</p>
                        </div>
                        <div className="bg-black/20 p-4 rounded-2xl">
                            <p className="text-gray-400 text-xs font-bold uppercase mb-1">Verbal</p>
                            <p className="text-2xl font-black text-white">850</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gotcat-card p-6 rounded-3xl border border-white/5">
                    <h3 className="text-white font-bold mb-4">Live Leaderboard</h3>
                    <div className="space-y-4">
                        {[
                            {n: 'Aarav', s: 2400, c: 'text-yellow-400'},
                            {n: 'Priya', s: 2350, c: 'text-gray-300'},
                            {n: 'You', s: 1023, c: 'text-gotcat-green'},
                        ].map((p, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className={`font-mono text-sm ${p.c === 'text-gotcat-green' ? 'text-gotcat-green' : 'text-gray-500'}`}>{i+1}</span>
                                    <span className={`font-bold ${p.c === 'text-gotcat-green' ? 'text-white' : 'text-gray-300'}`}>{p.n}</span>
                                </div>
                                <span className={`font-mono text-sm font-bold ${p.c}`}>{p.s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;