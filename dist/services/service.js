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
exports.service = exports.checkExistingReading = exports.createImage = void 0;
const gemini_service_1 = require("./gemini-service"); // Ajuste conforme a localização real do serviço
const createImage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, customer_code, measure_datetime, measure_type } = data;
    const measure_value = yield (0, gemini_service_1.sendPromptToGemini)(image, "image/jpeg");
    // Aqui você pode salvar a imagem em algum serviço de armazenamento e obter a URL
    const image_url = "URL_da_imagem_armazenada"; // Implemente isso conforme sua lógica
    const measure_uuid = "UUID_gerado"; // Gere um UUID único para a medida
    return {
        image_url,
        measure_value,
        measure_uuid,
    };
});
exports.createImage = createImage;
// Função para verificar se já existe uma leitura para o tipo e mês atual
const checkExistingReading = (customer_code, measure_type, measure_datetime) => __awaiter(void 0, void 0, void 0, function* () {
    // Implementar a lógica para verificar se existe uma leitura para o tipo e mês atual
    // Retornar true se já existir, ou false caso contrário
    return false;
});
exports.checkExistingReading = checkExistingReading;
exports.service = {
    createImage: exports.createImage,
    checkExistingReading: exports.checkExistingReading,
};
