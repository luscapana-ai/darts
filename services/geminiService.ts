import { GoogleGenAI, Type } from "@google/genai";
import { INITIAL_ENCYCLOPEDIA_PROMPT } from "../constants";

// Initialize Gemini
// NOTE: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchDartsContent = async (topic: string): Promise<string> => {
  try {
    const prompt = `${INITIAL_ENCYCLOPEDIA_PROMPT}\n\nTOPIC: ${topic}`;
    
    // Using gemini-3-flash-preview for fast text generation
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No content generated. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch content from the oracle.");
  }
};

export const fetchCheckoutAdvice = async (score: number): Promise<string> => {
  try {
    const prompt = `You are a professional darts coach. A player has ${score} points remaining. 
    Suggest the optimal path to finish (checkout) in 3 darts or less if possible. 
    If a checkout isn't possible, suggest the best setup shot.
    Format the response as a clear, bold path (e.g., **T20 - T19 - D12**).
    Keep the explanation very brief (1-2 sentences).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Focus, breathe, and aim for the treble.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to contact the coach right now.";
  }
};

export const fetchDailyTip = async (): Promise<string> => {
  try {
    const prompt = `Give me one short, actionable, and unique "Pro Tip" for playing darts. 
    Focus on specific mechanics like stance, grip, release, or mental calculation. 
    Maximum 2 sentences. Be inspiring.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Consistency is key. Keep your elbow up!";
  } catch (error) {
    return "Practice makes perfect.";
  }
};

export const fetchTrainingTip = async (gameMode: string): Promise<string> => {
  try {
    const prompt = `Give me one specific, advanced tip for the darts training game "${gameMode}". 
    For "Bob's 27", focus on pressure management or doubles accuracy.
    For "Around the Clock", focus on rhythm and board navigation.
    Keep it under 30 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Stay focused on the target.";
  } catch (error) {
    return "Visualize the dart hitting the target.";
  }
};

export interface NewsArticle {
  headline: string;
  summary: string;
  category: string;
  date: string;
}

export const fetchNews = async (): Promise<NewsArticle[]> => {
  try {
    const prompt = `You are a dedicated Darts journalist. Generate 6 distinct, realistic, and engaging news headlines and short summaries for the current week in the world of professional darts. 
    Include a mix of:
    1. A major tournament result or upset.
    2. A player transfer rumor or interview quote.
    3. New equipment technology announcement.
    4. A rising star feature.
    
    Ensure the dates are recent (current year).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING },
              date: { type: Type.STRING },
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini News Error:", error);
    return [];
  }
};

export interface CalendarEvent {
  title: string;
  dates: string;
  location: string;
  type: string;
  prizeFund: string;
  description: string;
}

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const prompt = `You are a Darts tournament organizer. Generate a JSON list of 5 major upcoming professional darts tournaments for the next 6 months.
    Make them realistic based on the standard PDC/WDF calendar (e.g., World Matchplay, Premier League, Grand Slam).
    
    Each event must have:
    - title: Name of the tournament
    - dates: Date range (e.g. "July 15 - July 23")
    - location: City and Venue
    - type: "Major", "World Series", or "European Tour"
    - prizeFund: Total prize money (e.g. "£800,000")
    - description: A one sentence hype description.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              dates: { type: Type.STRING },
              location: { type: Type.STRING },
              type: { type: Type.STRING },
              prizeFund: { type: Type.STRING },
              description: { type: Type.STRING },
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Calendar Error:", error);
    return [];
  }
};