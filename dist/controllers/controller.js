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
const readings = {
    "uuid-1234": {
        confirmed: false,
        value: 100,
    },
    "uuid-5678": {
        confirmed: true,
        value: 200,
    },
    "uuid-9101": {
        confirmed: false,
        value: 300,
    },
};
const createImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (!body.image ||
            !body.customer_code ||
            !body.measure_datetime ||
            !body.measure_type) {
            return res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Dados fornecidos no corpo da requisição são inválidos.",
            });
        }
        const result = yield service_1.service.createImage(body);
        return res.status(200).json({
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
const confirmReading = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { measure_uuid, confirmed_value } = req.body;
        if (typeof measure_uuid !== "string" ||
            typeof confirmed_value !== "number") {
            return res.status(400).json({
                error_code: "INVALID_DATA",
                error_description: "Dados fornecidos no corpo da requisição são inválidos.",
            });
        }
        const reading = readings[measure_uuid];
        if (!reading) {
            return res.status(404).json({
                error_code: "MEASURE_NOT_FOUND",
                error_description: "Leitura não encontrada.",
            });
        }
        if (reading.confirmed) {
            return res.status(409).json({
                error_code: "CONFIRMATION_DUPLICATE",
                error_description: "Leitura já confirmada.",
            });
        }
        readings[measure_uuid] = { confirmed: true, value: confirmed_value };
        return res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Erro ao confirmar leitura:", error);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
exports.controller = {
    createImage,
    confirmReading,
};
