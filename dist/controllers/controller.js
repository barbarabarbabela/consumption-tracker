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
exports.controller = void 0;
const service_1 = require("../services/service");
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        console.log(body);
        // Validação dos dados recebidos
        if (!body.image ||
            !body.customer_code ||
            !body.measure_datetime ||
            !body.measure_type) {
            return res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Dados fornecidos no corpo da requisição são inválidos.",
            });
        }
        // Verificar se já existe uma leitura para o tipo e mês atual
        const existingReading = yield service_1.service.checkExistingReading(body.customer_code, body.measure_type, body.measure_datetime);
        if (existingReading) {
            return res.status(409).json({
                error_code: "DOUBLE_REPORT",
                error_description: "Leitura do mês já realizada.",
            });
        }
        // Chamar serviço para processar a imagem e obter a leitura
        const result = yield service_1.service.createImage(body);
        // Retornar resposta de sucesso
        return res.status(200).json({
            message: "Operação realizada com sucesso",
            image_url: result.image_url,
            measure_value: result.measure_value,
            measure_uuid: result.measure_uuid,
        });
    }
    catch (error) {
        console.error("Erro ao criar imagem:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
exports.controller = {
    createImage,
};
