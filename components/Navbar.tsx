import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-gotcat-bg/95 backdrop-blur-md border-b border-gotcat-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-1 cursor-pointer group">
            <span className="font-display font-extrabold text-4xl tracking-tighter text-white">GotCa</span>
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1 transform group-hover:rotate-6 transition-transform duration-300">
               {/* Cat Head: Smooth geometric shape with ears */}
               <path d="M82.5 30L92 5L68 22H32L8 5L17.5 30C8 38 8 75 18 85C28 95 72 95 82 85C92 75 92 38 82.5 30Z" fill="#E86C2D"/>
               
               {/* Eyes: Cutouts matching bg #212425 */}
               <circle cx="35" cy="52" r="7" fill="#212425"/>
               <circle cx="65" cy="52" r="7" fill="#212425"/>
               
               {/* Nose: Small rounded triangle */}
               <path d="M50 66L44 60H56L50 66Z" fill="#212425"/>
               
               {/* Mouth: 'w' shape */}
               <path d="M50 66V70" stroke="#212425" strokeWidth="4" strokeLinecap="round"/>
               <path d="M50 70Q42 78 34 70" stroke="#212425" strokeWidth="4" strokeLinecap="round"/>
               <path d="M50 70Q58 78 66 70" stroke="#212425" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#dashboard" className="text-gray-400 hover:text-white font-semibold transition">Arena</a>
            <a href="#puzzles" className="text-gray-400 hover:text-white font-semibold transition">Puzzles</a>
            <a href="#leaderboard" className="text-gray-400 hover:text-white font-semibold transition">Leaderboard</a>
            
            <div className="h-6 w-px bg-gray-700 mx-2"></div>
            
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-end mr-2">
                    <span className="text-xs text-gray-400 font-bold">GUEST</span>
                    <span className="text-gotcat-green text-xs font-mono">Level 1</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gotcat-card border-2 border-gotcat-card flex items-center justify-center text-white font-bold">
                    G
                </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gotcat-card border-b border-gray-800 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Arena</a>
            <a href="#puzzles" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Puzzles</a>
            <a href="#leaderboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5">Leaderboard</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;