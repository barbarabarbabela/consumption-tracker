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
exports.service = exports.createImage = void 0;
const convert_base_64_to_url_1 = require("../utils/convert-base-64-to-url");
const get_mime_type_from_base_64_1 = require("../utils/get-mime-type-from-base-64");
const gemini_service_1 = require("./gemini-service");
const uuid_1 = require("uuid");
const createImage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { image } = data;
    const mimeType = (0, get_mime_type_from_base_64_1.getMimeTypeFromBase64)(image);
    const measureValue = yield (0, gemini_service_1.sendPromptToGemini)(image, mimeType);
    const convertMeasureToInteger = parseInt(measureValue);
    if (isNaN(convertMeasureToInteger)) {
        throw new Error("Não foi possível converter o valor da medida para um número inteiro");
    }
    return {
        image_url: (0, convert_base_64_to_url_1.convertBase64ToImageUrl)(image),
        measure_value: convertMeasureToInteger,
        measure_uuid: (0, uuid_1.v4)(),
    };
});
exports.createImage = createImage;
exports.service = {
    createImage: exports.createImage,
};
