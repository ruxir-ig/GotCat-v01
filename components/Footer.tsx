import React from 'react';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
                <span className="font-display font-extrabold text-3xl tracking-tighter text-white">GotCa</span>
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
                    <path d="M82.5 30L92 5L68 22H32L8 5L17.5 30C8 38 8 75 18 85C28 95 72 95 82 85C92 75 92 38 82.5 30Z" fill="#E86C2D"/>
                    {/* Eyes: Cutouts matching footer bg #000000 */}
                    <circle cx="35" cy="52" r="7" fill="#000000"/>
                    <circle cx="65" cy="52" r="7" fill="#000000"/>
                    
                    {/* Nose */}
                    <path d="M50 66L44 60H56L50 66Z" fill="#000000"/>
                    
                    {/* Mouth */}
                    <path d="M50 66V70" stroke="#000000" strokeWidth="4" strokeLinecap="round"/>
                    <path d="M50 70Q42 78 34 70" stroke="#000000" strokeWidth="4" strokeLinecap="round"/>
                    <path d="M50 70Q58 78 66 70" stroke="#000000" strokeWidth="4" strokeLinecap="round"/>
                </svg>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Gamifying MBA preparation for the next generation of leaders. Compete, analyze, and improve every single day.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gotcat-orange transition">Features</a></li>
              <li><a href="#" className="hover:text-gotcat-orange transition">Pricing</a></li>
              <li><a href="#" className="hover:text-gotcat-orange transition">Leaderboard</a></li>
              <li><a href="#" className="hover:text-gotcat-orange transition">Beta Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gotcat-orange transition">FAQ</a></li>
              <li><a href="#" className="hover:text-gotcat-orange transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-gotcat-orange transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gotcat-orange transition">Terms of Service</a></li>
            </ul>
          </div>

          <div>
             <h4 className="font-bold mb-4 text-white">Connect</h4>
             <div className="flex space-x-4">
                <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gotcat-orange hover:text-white text-gray-400 transition"><Twitter size={18} /></a>
                <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gotcat-orange hover:text-white text-gray-400 transition"><Instagram size={18} /></a>
                <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gotcat-orange hover:text-white text-gray-400 transition"><Linkedin size={18} /></a>
                <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gotcat-orange hover:text-white text-gray-400 transition"><Mail size={18} /></a>
             </div>
          </div>
        </div>
        
        <div className="border-t border-gray-900 pt-8 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} GotCat. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;