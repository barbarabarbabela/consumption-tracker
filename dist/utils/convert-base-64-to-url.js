"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBase64ToImageUrl = convertBase64ToImageUrl;
function convertBase64ToImageUrl(base64String) {
    if (!base64String) {
        throw new Error("Base64 string is required.");
    }
    let mimeType = "";
    if (base64String.startsWith("/9j/")) {
        mimeType = "image/jpeg";
    }
    else if (base64String.startsWith("iVBOR")) {
        mimeType = "image/png";
    }
    else {
        mimeType = "image/jpeg";
    }
    return `data:${mimeType};base64,${base64String}`;
}
