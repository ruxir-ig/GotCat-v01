import React, { useState, useEffect, useRef } from 'react';
import { X, Clock, Brain, CheckCircle, XCircle, Zap, Shield, Play, Lightbulb, Loader2 } from 'lucide-react';
import Button from './Button';
import { generateQuizBatch, generateHint } from '../services/geminiService';
import { Question, GameState } from '../types';

interface DemoQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOTAL_QUESTIONS = 5;

const DemoQuizModal: React.FC<DemoQuizModalProps> = ({ isOpen, onClose }) => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'intro',
    questions: [],
    currentQuestionIndex: 0,
    userScore: 0,
    botScore: 0,
    history: []
  });

  const [timer, setTimer] = useState(60);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [botStatus, setBotStatus] = useState<'thinking' | 'answered'>('thinking');
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  
  // Hint State
  const [currentHint, setCurrentHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const botTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Game Loop Management ---

  useEffect(() => {
    if (isOpen) {
        resetGame();
    } else {
        stopTimers();
    }
    return () => stopTimers();
  }, [isOpen]);

  const resetGame = () => {
      setGameState({
          status: 'intro',
          questions: [],
          currentQuestionIndex: 0,
          userScore: 0,
          botScore: 0,
          history: []
      });
      setResultMessage(null);
      resetQuestionState();
  };

  const resetQuestionState = () => {
      setSelectedOption(null);
      setCurrentHint(null);
      setLoadingHint(false);
      setHintUsed(false);
  };

  const loadQuestions = async () => {
      setGameState(prev => ({ ...prev, status: 'loading' }));
      const questions = await generateQuizBatch();
      setGameState(prev => ({ ...prev, questions, status: 'playing' }));
      startRound(0);
  };

  const startRound = (index: number) => {
      setTimer(60);
      resetQuestionState();
      setBotStatus('thinking');
      setResultMessage(null);
      
      // Start User Timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
          setTimer(t => {
              if (t <= 1) {
                  handleTimeUp();
                  return 0;
              }
              return t - 1;
          });
      }, 1000);

      // Bot Logic: Random time between 5s and 45s.
      // Bot Accuracy: 70% chance to be correct.
      const botTime = Math.random() * 20000 + 5000; // 5s to 25s for "easy" feel
      if (botTimerRef.current) clearTimeout(botTimerRef.current);
      
      botTimerRef.current = setTimeout(() => {
          setBotStatus('answered');
          // We don't reveal bot correctness until user answers or round ends
      }, botTime);
  };

  const handleGetHint = async () => {
      if (currentHint || loadingHint) return;
      setLoadingHint(true);
      
      const currentQ = gameState.questions[gameState.currentQuestionIndex];
      const hintText = await generateHint(currentQ);
      
      setCurrentHint(hintText);
      setHintUsed(true);
      setLoadingHint(false);
  };

  const handleTimeUp = () => {
      stopTimers();
      resolveRound(null); // User didn't answer
  };

  const handleOptionClick = (idx: number) => {
      if (selectedOption !== null) return; // Already answered
      stopTimers();
      setSelectedOption(idx);
      resolveRound(idx);
  };

  const resolveRound = (userChoice: number | null) => {
      const currentQ = gameState.questions[gameState.currentQuestionIndex];
      const isUserCorrect = userChoice === currentQ.correctIndex;
      
      // Bot Logic Result
      const isBotCorrect = Math.random() > 0.3; // 70% accuracy
      const botPoints = (botStatus === 'answered' && isBotCorrect) ? 10 : 0;
      
      // User Score Logic: 10 points base, 9 if hint used
      const maxPoints = hintUsed ? 9 : 10;
      const userPoints = isUserCorrect ? maxPoints : 0;

      setGameState(prev => ({
          ...prev,
          userScore: prev.userScore + userPoints,
          botScore: prev.botScore + botPoints,
          history: [...prev.history, {
              questionIndex: prev.currentQuestionIndex,
              userCorrect: isUserCorrect,
              botCorrect: isBotCorrect,
              timeTaken: 60 - timer,
              hintUsed: hintUsed
          }]
      }));

      // Show immediate feedback
      if (isUserCorrect) {
          setResultMessage(hintUsed ? `Correct! +${maxPoints} pts` : `Perfect! +${maxPoints} pts`);
      } else {
          setResultMessage("Missed It!");
      }

      // Delay before next question
      setTimeout(() => {
          if (gameState.currentQuestionIndex < TOTAL_QUESTIONS - 1) {
              setGameState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
              startRound(gameState.currentQuestionIndex + 1);
          } else {
              setGameState(prev => ({ ...prev, status: 'results' }));
          }
      }, 2000);
  };

  const stopTimers = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (botTimerRef.current) clearTimeout(botTimerRef.current);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gotcat-bg/90 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-gotcat-bg rounded-[2rem] border border-gotcat-card shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white z-20 p-2 bg-black/20 rounded-full transition">
            <X size={20} />
        </button>

        {/* --- INTRO SCREEN --- */}
        {gameState.status === 'intro' && (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                <div className="bg-gotcat-orange/10 p-6 rounded-full mb-6 animate-pulse-fast">
                    <Zap size={64} className="text-gotcat-orange" fill="currentColor" />
                </div>
                <h2 className="text-3xl font-black text-white mb-2">Ready for Battle?</h2>
                <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                    5 Questions. <br/>You vs Bot. <br/>Speed wins.
                </p>
                <Button size="lg" onClick={loadQuestions} className="w-full max-w-xs text-lg rounded-2xl">
                    <Play fill="currentColor" className="mr-2" size={20} /> Start Quiz
                </Button>
            </div>
        )}

        {/* --- LOADING SCREEN --- */}
        {gameState.status === 'loading' && (
            <div className="flex flex-col items-center justify-center h-[500px] p-12">
                <div className="w-16 h-16 border-4 border-gotcat-orange border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-white font-bold text-lg animate-pulse">Finding Opponent...</p>
                <p className="text-gray-500 text-sm mt-2">Preparing questions</p>
            </div>
        )}

        {/* --- GAME SCREEN --- */}
        {gameState.status === 'playing' && gameState.questions.length > 0 && (
            <div className="flex flex-col h-full relative">
                {/* Header: Scores & Timer */}
                <div className="bg-gotcat-card p-6 flex items-center justify-between border-b border-white/5">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">You</span>
                        <span className="text-3xl font-black text-gotcat-green">{gameState.userScore}</span>
                    </div>

                    <div className="flex flex-col items-center">
                         <div className={`text-2xl font-mono font-bold ${timer < 10 ? 'text-red-500' : 'text-white'}`}>
                            00:{timer < 10 ? `0${timer}` : timer}
                         </div>
                         <div className="flex gap-1 mt-1">
                            {Array.from({length: TOTAL_QUESTIONS}).map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full ${i === gameState.currentQuestionIndex ? 'bg-white' : i < gameState.currentQuestionIndex ? 'bg-gray-600' : 'bg-gray-800'}`}></div>
                            ))}
                         </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Bot</span>
                        <div className="flex items-center gap-2">
                             {botStatus === 'answered' && <span className="text-xs text-gotcat-orange font-bold animate-pulse">Done</span>}
                             <span className="text-3xl font-black text-gotcat-orange">{gameState.botScore}</span>
                        </div>
                    </div>
                </div>

                {/* Question Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-gotcat-card text-gray-400 text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                {gameState.questions[gameState.currentQuestionIndex].topic}
                            </span>
                            
                            {/* HINT BUTTON */}
                            <button 
                                onClick={handleGetHint}
                                disabled={!!currentHint || loadingHint || selectedOption !== null}
                                className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                                    currentHint 
                                        ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' 
                                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {loadingHint ? (
                                    <Loader2 size={12} className="animate-spin" />
                                ) : (
                                    <Lightbulb size={12} fill={currentHint ? "currentColor" : "none"} />
                                )}
                                {currentHint ? "Hint Used (-10%)" : "Get Hint (-1 pt)"}
                            </button>
                        </div>
                        
                        {/* HINT DISPLAY */}
                        {currentHint && (
                            <div className="mb-4 bg-yellow-900/20 border border-yellow-500/30 p-3 rounded-xl animate-in fade-in slide-in-from-top-2">
                                <p className="text-yellow-200 text-sm font-medium flex gap-2">
                                    <Lightbulb size={16} className="shrink-0 mt-0.5" />
                                    {currentHint}
                                </p>
                            </div>
                        )}

                        <h3 className="text-xl md:text-2xl font-bold text-white mt-4 leading-relaxed">
                            {gameState.questions[gameState.currentQuestionIndex].text}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {gameState.questions[gameState.currentQuestionIndex].options.map((opt, idx) => {
                            let statusClass = "bg-gotcat-card border-white/5 hover:bg-white/5 text-gray-300";
                            if (selectedOption !== null) {
                                // Reveal phase
                                if (idx === gameState.questions[gameState.currentQuestionIndex].correctIndex) {
                                    statusClass = "bg-green-500/20 border-green-500 text-green-400 font-bold";
                                } else if (idx === selectedOption) {
                                    statusClass = "bg-red-500/20 border-red-500 text-red-400";
                                } else {
                                    statusClass = "opacity-50";
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    disabled={selectedOption !== null}
                                    onClick={() => handleOptionClick(idx)}
                                    className={`p-5 rounded-2xl text-left border-2 transition-all duration-200 flex items-center justify-between group ${statusClass}`}
                                >
                                    <span className="text-lg">{opt}</span>
                                    {selectedOption !== null && idx === gameState.questions[gameState.currentQuestionIndex].correctIndex && <CheckCircle size={20} />}
                                    {selectedOption === idx && idx !== gameState.questions[gameState.currentQuestionIndex].correctIndex && <XCircle size={20} />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Feedback */}
                {resultMessage && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-full backdrop-blur-xl font-bold animate-slide-up z-10 whitespace-nowrap">
                        {resultMessage}
                    </div>
                )}
            </div>
        )}

        {/* --- RESULTS SCREEN --- */}
        {gameState.status === 'results' && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gotcat-bg">
                <TrophyIcon className={`w-24 h-24 mb-6 ${gameState.userScore >= gameState.botScore ? 'text-yellow-400' : 'text-gray-600'}`} />
                
                <h2 className="text-4xl font-black text-white mb-2">
                    {gameState.userScore > gameState.botScore ? "VICTORY!" : gameState.userScore === gameState.botScore ? "DRAW!" : "DEFEAT"}
                </h2>
                
                <div className="flex gap-8 my-8">
                    <div className="text-center">
                        <p className="text-sm text-gray-500 font-bold uppercase">You</p>
                        <p className="text-4xl font-black text-gotcat-green">{gameState.userScore}</p>
                    </div>
                    <div className="w-px bg-gray-700"></div>
                    <div className="text-center">
                        <p className="text-sm text-gray-500 font-bold uppercase">Bot</p>
                        <p className="text-4xl font-black text-gotcat-orange">{gameState.botScore}</p>
                    </div>
                </div>

                <div className="bg-gotcat-card p-6 rounded-3xl w-full max-w-sm border border-white/5 mb-6">
                    <p className="text-gray-300 font-medium mb-4">You're in the top <span className="text-white font-bold">12%</span> of guests today.</p>
                    <div className="w-full bg-black/50 h-3 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-gotcat-orange to-yellow-500 h-full w-[88%]"></div>
                    </div>
                </div>

                <Button variant="primary" size="lg" className="w-full max-w-sm rounded-2xl shadow-gotcat-orange/50" onClick={() => setGameState({...gameState, status: 'auth'})}>
                    Join Beta for Full Analysis
                </Button>
                <button onClick={() => setGameState({ ...gameState, status: 'intro' })} className="mt-4 text-gray-500 hover:text-white text-sm font-bold">
                    Play Again
                </button>
            </div>
        )}

        {/* --- AUTH SCREEN (Embedded for Quiz Flow) --- */}
        {gameState.status === 'auth' && (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gotcat-bg animate-in fade-in slide-in-from-right">
                <h2 className="text-3xl font-black text-white mb-2">Claim Your Spot</h2>
                <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                    Save your score of {gameState.userScore} and see where you rank globally.
                </p>

                <div className="w-full max-w-sm space-y-4">
                     <button className="w-full bg-white text-black font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>
                    
                     <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase font-bold tracking-wider">Or with Email</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>

                    <div className="space-y-3">
                         <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full bg-black/30 border border-gray-700 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:border-gotcat-orange transition-colors"
                        />
                        <Button fullWidth onClick={() => alert("Registration Coming Soon!")}>
                            Create Account
                        </Button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

const TrophyIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h14.625c.414 0 .75-.336.75-.75a2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.348Zm13.668 8.086a5.201 5.201 0 0 1-1.325 3.314V11.16a20.52 20.52 0 0 0 1.325 2.177ZM7.5 10.83c.03-.54.5-1.08 1.05-1.58.55-.5 1.25-.83 1.95-.83s1.4.33 1.95.83c.55.5 1.02 1.04 1.05 1.58H7.5Zm-1.83 5.34c-1.16.5-2.22 1.14-3.17 1.92V15.5c0-.82.68-1.5 1.5-1.5h1.67Zm12.66 0c.82 0 1.5.68 1.5 1.5v2.59a14.52 14.52 0 0 1-3.17-1.92h1.67Zm-1.67-2.67h-9.32a.75.75 0 0 1-.75-.75V11.5h10.82v1.25a.75.75 0 0 1-.75.75Z" clipRule="evenodd" />
    </svg>
)

export default DemoQuizModal;