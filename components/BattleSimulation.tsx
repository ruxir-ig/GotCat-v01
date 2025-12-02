import React, { useEffect, useState } from 'react';
import { User, Cpu, Zap } from 'lucide-react';

const BattleSimulation: React.FC = () => {
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) return 30; // Reset
        return prev - 1;
      });

      // Simulate random score updates
      if (Math.random() > 0.7) {
        setPlayerScore(p => Math.min(p + 10, 100));
      }
      if (Math.random() > 0.6) {
        setBotScore(b => Math.min(b + 10, 100));
      }

      // Reset scores when timer resets
      if (timer === 1) {
        setPlayerScore(0);
        setBotScore(0);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="relative w-full max-w-sm mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
                <div className="bg-gotcat-orange p-1.5 rounded-full">
                    <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-sm">You</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-xs text-purple-200 uppercase tracking-wider font-semibold">VS</span>
                <div className="bg-gray-800/50 px-3 py-1 rounded-full text-white text-xs font-mono mt-1">
                    00:{timer < 10 ? `0${timer}` : timer}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-white font-bold text-sm">Opponent</span>
                <div className="bg-purple-500 p-1.5 rounded-full">
                    <Cpu className="w-4 h-4 text-white" />
                </div>
            </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-6">
            {/* Player */}
            <div className="relative">
                <div className="flex justify-between text-xs text-purple-100 mb-1">
                    <span>Score: {playerScore}</span>
                    {playerScore > botScore && <span className="text-gotcat-orange font-bold flex items-center gap-1"><Zap size={10}/> Winning</span>}
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-gotcat-orange to-yellow-400 transition-all duration-700 ease-out"
                        style={{ width: `${playerScore}%` }}
                    ></div>
                </div>
            </div>

            {/* Bot */}
            <div className="relative">
                 <div className="flex justify-between text-xs text-purple-100 mb-1">
                    <span>Score: {botScore}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-700 ease-out"
                        style={{ width: `${botScore}%` }}
                    ></div>
                </div>
            </div>
        </div>

        {/* Floating elements for effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
           {playerScore > 80 && <div className="absolute top-10 right-10 text-gotcat-orange font-bold animate-bounce">+20 Speed Bonus!</div>}
        </div>
    </div>
  );
};

export default BattleSimulation;