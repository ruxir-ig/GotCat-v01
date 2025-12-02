import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const API_KEY = process.env.API_KEY || '';

// Fallback questions to ensure the 5-question flow always works
const MOCK_QUESTIONS: Question[] = [
  {
    id: "m1", text: "If 30% of A = 0.25 of B = 1/5 of C, then A:B:C is equal to:",
    options: ["10:12:15", "10:15:12", "12:15:10", "15:12:10"],
    correctIndex: 0, explanation: "30/100 A = 25/100 B = 1/5 C => 3/10 A = 1/4 B = 1/5 C. Let = k. A=10k/3, B=4k, C=5k. Ratio 10/3 : 4 : 5 => 10:12:15.",
    topic: "Ratios", difficulty: "Easy"
  },
  {
    id: "m2", text: "A number when divided by 119 leaves remainder 19. If same number is divided by 17, remainder is:",
    options: ["12", "10", "7", "2"],
    correctIndex: 3, explanation: "119 is divisible by 17. So we just divide remainder 19 by 17. 19 = 17*1 + 2. Remainder is 2.",
    topic: "Number System", difficulty: "Easy"
  },
  {
    id: "m3", text: "The average of 7 consecutive numbers is 20. The largest of these numbers is:",
    options: ["20", "23", "24", "26"],
    correctIndex: 1, explanation: "For consecutive numbers (AP), average is the middle term. 4th term is 20. Terms: 17, 18, 19, 20, 21, 22, 23. Largest is 23.",
    topic: "Averages", difficulty: "Easy"
  },
  {
    id: "m4", text: "Two trains 140m and 160m long run at 60km/hr and 40km/hr respectively in opposite directions. Time to cross?",
    options: ["9s", "9.6s", "10.8s", "12s"],
    correctIndex: 2, explanation: "Relative speed = 60+40 = 100km/hr = 100 * 5/18 = 250/9 m/s. Total distance = 300m. Time = 300 / (250/9) = 300*9/250 = 10.8s.",
    topic: "TSD", difficulty: "Easy"
  },
  {
    id: "m5", text: "A sells an item to B at 20% profit, B sells to C at 10% profit. If C pays ₹660, what did A pay?",
    options: ["₹500", "₹550", "₹600", "₹450"],
    correctIndex: 0, explanation: "Let CP for A be x. 1.1 * 1.2 * x = 660. 1.32x = 660. x = 500.",
    topic: "Profit & Loss", difficulty: "Easy"
  }
];

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateQuizBatch = async (): Promise<Question[]> => {
  if (!API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_QUESTIONS;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 5 unique, Easy-to-Medium level Quantitative Aptitude questions for CAT MBA exam. They should be solvable in under 1 minute. Return as a JSON array.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                    text: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    topic: { type: Type.STRING },
                    difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] }
                },
                required: ["text", "options", "correctIndex", "explanation", "topic", "difficulty"]
              }
            }
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      if (data.questions && Array.isArray(data.questions)) {
        return data.questions.map((q: any) => ({
             id: crypto.randomUUID(),
             ...q
        })) as Question[];
      }
    }
    return MOCK_QUESTIONS;
  } catch (error) {
    console.error("Failed to generate questions:", error);
    return MOCK_QUESTIONS;
  }
};

export const generateHint = async (question: Question): Promise<string> => {
   // Keeping hint logic same, but maybe simpler for speed
   if (!API_KEY) return "Look for the pattern in the numbers.";
   
   try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Short hint for: ${question.text}. Max 15 words.`,
    });
    return response.text || "Try approximation.";
  } catch (e) {
    return "Check options carefully.";
  }
};