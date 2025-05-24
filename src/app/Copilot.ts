"use server";
import { GoogleGenAI } from "@google/genai";

interface CopilotProps {
  query: string;
}

export const AskCopilot = async ({
  query,
}: CopilotProps): Promise<
  { success: boolean; data: string | null } | undefined
> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: query,
      config: {
        maxOutputTokens: 500,
        temperature: 0.2,
        systemInstruction: `you are support chat bot if you dont get the resource for answering qeury,
           just answer in genral terms like any customer supoprt. make response accoring to the tone query asks then only make a tone. `,
      },
    });
    if (!response.text) {
      return { success: false, data: null };
    } else {
      return {
        success: true,
        data: response.text,
      };
    }
  } catch (error) {
    console.log(error);
    return { success: false, data: null };
  }
};
