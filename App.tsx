import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import LeaderboardPreview from './components/LeaderboardPreview';

import Footer from './components/Footer';
import DemoQuizModal from './components/DemoQuizModal';
import AuthModal from './components/AuthModal';
import Button from './components/Button';

const App: React.FC = () => {
   const [isDemoOpen, setIsDemoOpen] = useState(false);
   const [isAuthOpen, setIsAuthOpen] = useState(false);

   const handleStartDemo = () => {
      setIsDemoOpen(true);
   };

   const handleOpenAuth = () => {
      setIsAuthOpen(true);
   };

   return (
      <div className="min-h-screen flex flex-col font-sans bg-gotcat-bg">
         <Navbar />

         <main className="flex-grow">
            <Hero onStartDemo={handleStartDemo} />
            <HowItWorks />
            <Features />
            <LeaderboardPreview />


            {/* CTA Section */}
            <section className="bg-black py-24 relative overflow-hidden">
               {/* Abstract lines */}
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black"></div>

               <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                     Ready to Crush the Percentile?
                  </h2>
                  <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                     Join the beta waitlist. Be among the first 1,000 users to get free access to Premium Analytics.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Button
                        size="lg"
                        variant="primary"
                        onClick={handleOpenAuth}
                        className="rounded-2xl text-lg px-8 py-4 shadow-gotcat-orange/40 hover:scale-105 transition-transform"
                     >
                        Get Early Access
                     </Button>
                  </div>
               </div>
            </section>
         </main>

         <Footer />

         <DemoQuizModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
         <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
   );
};

export default App;