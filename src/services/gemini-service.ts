import { GoogleGenerativeAI, Part } from "@google/generative-ai";
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

function createGenerativePart(data: string, mimeType: string): Part {
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
}

export async function sendPromptToGemini(
  data: string,
  mimeType: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "Descreva apenas os números que aparecem na imagem como se fosse uma leitura de água ou gás";

  const imagePart: Part = createGenerativePart(data, mimeType);

  const result = await model.generateContent([prompt, imagePart]);
  const response = result.response;
  const text = response.text();

  return text;
}
