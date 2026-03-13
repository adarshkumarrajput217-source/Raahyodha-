import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY environment variable is missing.');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function generate() {
  console.log('Generating image...');
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            text: 'A high-resolution, modern Indian truck driver dashboard app hero image. Show a confident Indian truck driver (Sikh or typical desi look, turban optional) sitting in a decorated Indian truck cabin, driving on a highway at sunset, with vibrant Indian truck art (flowers, gods stickers), road ahead, mountains or dhaba in background. Professional, motivational feel, dark moody tones with orange-gold highlights for journey vibe. Realistic style like latest apps (Ola, Uber, Porter style but more Indian road feel). No text on image.',
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "2K"
        }
      }
    });

    let foundImage = false;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir);
        }
        fs.writeFileSync(path.join(publicDir, 'hero-bg.jpg'), Buffer.from(base64Data, 'base64'));
        console.log('Image generated successfully to public/hero-bg.jpg');
        foundImage = true;
        break;
      }
    }
    
    if (!foundImage) {
      console.error('No image data found in the response.');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    process.exit(1);
  }
}

generate();
