import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateHeroImage = async (): Promise<string | null> => {
  if (!ai) {
    console.warn("Gemini API Key is missing. Cannot generate image.");
    return null;
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A high-resolution, modern Indian truck driver dashboard app hero image. Show a confident Indian truck driver (Sikh or typical desi look, turban optional) sitting in a decorated Indian truck cabin, driving on a highway at sunset, with vibrant Indian truck art (flowers, gods stickers), road ahead, mountains or dhaba in background. Professional, motivational feel, dark moody tones with orange-gold highlights for journey vibe. Realistic style like latest apps (Ola, Uber, Porter style but more Indian road feel). No text on image.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error: any) {
    let errorString = '';
    try {
      errorString = typeof error === 'object' ? JSON.stringify(error) : String(error);
    } catch (e) {
      errorString = String(error);
    }
    if (error?.status === 429 || errorString.includes('429') || errorString.toLowerCase().includes('quota')) {
      console.warn('Gemini API quota exceeded. Using fallback image.');
    } else {
      console.error('Error generating hero image:', error);
    }
    return null;
  }
};

export const generateRoleHeroImage = async (prompt: string): Promise<string | null> => {
  if (!ai) {
    console.warn("Gemini API Key is missing. Cannot generate image.");
    return null;
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/jpeg;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error: any) {
    let errorString = '';
    try {
      errorString = typeof error === 'object' ? JSON.stringify(error) : String(error);
    } catch (e) {
      errorString = String(error);
    }
    if (error?.status === 429 || errorString.includes('429') || errorString.toLowerCase().includes('quota')) {
      console.warn('Gemini API quota exceeded. Using fallback image.');
    } else {
      console.error('Error generating role hero image:', error);
    }
    return null;
  }
};

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
  } catch (error: any) {
    let errorString = '';
    try {
      errorString = typeof error === 'object' ? JSON.stringify(error) : String(error);
    } catch (e) {
      errorString = String(error);
    }
    if (error?.status === 429 || errorString.includes('429') || errorString.toLowerCase().includes('quota')) {
      console.warn('Gemini API quota exceeded. Returning fallback response.');
      return 'Aapki daily AI limit khatam ho gayi hai. Kripya kal dobara try karein. (Quota Exceeded)';
    }
    console.error('Error generating AI response:', error);
    return 'Network error. Kripya thodi der baad try karein.';
  }
};
