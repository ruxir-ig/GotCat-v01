export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface GameState {
  status: 'intro' | 'loading' | 'playing' | 'results' | 'auth';
  questions: Question[];
  currentQuestionIndex: number;
  userScore: number;
  botScore: number;
  history: {
    questionIndex: number;
    userCorrect: boolean;
    botCorrect: boolean;
    timeTaken: number;
    hintUsed: boolean;
  }[];
}

export interface DemoState {
  isOpen: boolean;
  game: GameState;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}