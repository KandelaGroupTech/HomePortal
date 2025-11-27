import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: API Key must be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateDailyBriefing = async (guestName: string, timeOfDay: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return `Welcome to Casa Springville, ${guestName}. We hope you have a wonderful stay!`;
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are the concierge of a luxury home called "Casa Springville".
      The hosts are from both the USA and Ghana.
      Write a short, warm, sophisticated welcome message for a guest named "${guestName}".
      It is currently ${timeOfDay}.
      Include a brief, interesting fun fact connecting American and Ghanaian culture or geography, or a philosophical quote about hospitality.
      Keep it under 60 words.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Welcome to your home away from home.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `Welcome back, ${guestName}. We hope you are enjoying your stay at Casa Springville.`;
  }
};

export const getLocalRecommendation = async (): Promise<{ title: string; description: string }> => {
  if (!process.env.API_KEY) {
    return {
      title: "Explore the Garden",
      description: "Take a moment to relax in our backyard garden, featuring native plants."
    };
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Suggest a generic but delightful activity for a guest staying at a luxury home.
      The activity should be relaxing and suitable for a home setting or a quiet neighborhood.
      Return the response as JSON with two fields: "title" (max 5 words) and "description" (max 20 words).
      Do not use markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const text = response.text || '{}';
    return JSON.parse(text);
  } catch (error) {
    return {
      title: "Relax by the Fire",
      description: "Feel free to use the fireplace in the living room for a cozy evening."
    };
  }
};
