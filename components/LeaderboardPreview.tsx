import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Trophy, Medal, Award } from 'lucide-react';

const data = [
  { name: 'Rohan', score: 2400 },
  { name: 'Priya', score: 2100 },
  { name: 'Amit', score: 1800 },
  { name: 'Sarah', score: 1600 },
  { name: 'Vikram', score: 1400 },
];

const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#E86C2D', '#E86C2D'];

const LeaderboardPreview: React.FC = () => {
  return (
    <section id="leaderboard" className="py-20 bg-gotcat-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="w-full md:w-1/2">
             <div className="bg-gotcat-card p-8 rounded-[2rem] border border-white/5 h-[400px]">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Trophy className="text-gotcat-orange" size={20} />
                    Weekly Top Battlers
                </h3>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={60} tick={{fill: '#9CA3AF', fontSize: 14, fontWeight: 700}} axisLine={false} tickLine={false} />
                        <Tooltip 
                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#212425', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                        />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24} background={{ fill: '#00000020' }}>
                             {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index] || '#E86C2D'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white">
                Climb the Ranks. <br/>
                <span className="text-gotcat-orange">Win Real Rewards.</span>
            </h2>
            <p className="text-lg text-gray-400">
                Every battle earns you XP. Consistent wins unlock badges, streaks, and even discounts on premium CAT study material.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-4 bg-gotcat-card p-5 rounded-2xl border border-white/5">
                    <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-400">
                        <Medal size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-white">Weekly League</p>
                        <p className="text-sm text-gray-400">Top 10 win merchandise</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-gotcat-card p-5 rounded-2xl border border-white/5">
                    <div className="bg-purple-500/20 p-3 rounded-full text-purple-400">
                        <Award size={24} />
                    </div>
                    <div>
                        <p className="font-bold text-white">Streak Bonus</p>
                        <p className="text-sm text-gray-400">2x XP for 7-day streak</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeaderboardPreview;