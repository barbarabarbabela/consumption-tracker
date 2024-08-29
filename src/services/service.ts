import { CreateImage } from "../interfaces/create-image.interface";
import { convertBase64ToImageUrl } from "../utils/convert-base-64-to-url";
import { getMimeTypeFromBase64 } from "../utils/get-mime-type-from-base-64";
import { sendPromptToGemini } from "./gemini-service";
import { v4 as uuidv4 } from "uuid";

export const createImage = async (data: CreateImage) => {
  const { image } = data;

  const mimeType = getMimeTypeFromBase64(image);

  const measureValue = await sendPromptToGemini(image, mimeType);
  const convertMeasureToInteger = parseInt(measureValue);
  if (isNaN(convertMeasureToInteger)) {
    throw new Error(
      "Não foi possível converter o valor da medida para um número inteiro"
    );
  }

  return {
    image_url: convertBase64ToImageUrl(image),
    measure_value: convertMeasureToInteger,
    measure_uuid: uuidv4(),
  };
};

export const service = {
  createImage,
};
