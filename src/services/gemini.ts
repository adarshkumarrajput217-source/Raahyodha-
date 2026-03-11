import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateAIResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key is missing. Returning fallback response.");
    return "Maaf karna, abhi AI system offline hai. Kripya baad mein try karein.";
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: 'You are Yodha Assistant, a helpful AI for Indian truck drivers, mechanics, owners, and dhaba owners. Respond in a mix of Hindi and English (Hinglish), be polite, and provide useful information related to roads, trucks, health, and dhabas.',
      }
    });
    
    return response.text || 'Maaf karna, abhi main samajh nahi paaya. Kripya dobara puchiye.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Network error. Kripya thodi der baad try karein.';
  }
};
