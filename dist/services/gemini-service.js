"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPromptToGemini = sendPromptToGemini;
const generative_ai_1 = require("@google/generative-ai");
require("dotenv").config();
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
function createGenerativePart(data, mimeType) {
    return {
        inlineData: {
            data,
            mimeType,
        },
    };
}
function sendPromptToGemini(data, mimeType) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Descreva apenas os números que aparecem na imagem como se fosse uma leitura de água ou gás";
        const imagePart = createGenerativePart(data, mimeType);
        const result = yield model.generateContent([prompt, imagePart]);
        const response = result.response;
        const text = response.text();
        return text;
    });
}
