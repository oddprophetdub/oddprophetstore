import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse } from '../types';

// Helper to handle the API call
export const getTarotReading = async (cardName: string): Promise<GeminiResponse> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return {
      reading: "NOISE FLOOR CRITICAL.",
      blessing: "CHECK CONNECTIONS."
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      I have drawn the tarot card: ${cardName}.
      
      Your Task: Re-interpret this card as a specific Dubstep/Tearout sound design concept.
      
      CRITICAL RULES:
      1. KEEP IT SHORT. Maximum 15 words for the reading.
      2. STYLE: Abstract, glitchy, system-log style, fragmented sentences.
      3. VOCABULARY: Comb filters, phase cancellation, formants, ott, distortion, transient shaping, resampling, lfo rates.
      4. NO mystical fluff. ONLY audio engineering.
      
      Output Format:
      1. "reading": A very short, punchy description of the sound texture. (e.g., "Hollow formant vowels detecting via comb filter.")
      2. "blessing": A 3-5 word command. (e.g., "CRANK THE DRIVE.")
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a ruthless audio processing algorithm. Output is minimal, capitalized, and aggressive.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reading: { type: Type.STRING },
            blessing: { type: Type.STRING },
          }
        }
      },
    });

    const text = response.text;
    if (!text) throw new Error("No text returned");
    
    return JSON.parse(text) as GeminiResponse;

  } catch (error) {
    console.error("Error fetching reading:", error);
    return {
      reading: "SIGNAL CORRUPTED.",
      blessing: "RESET PHASE."
    };
  }
};