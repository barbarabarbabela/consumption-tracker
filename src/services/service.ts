import { CreateImage } from "../interfaces/create-image.interface";
import { convertBase64ToImageUrl } from "../utils/convert-base-64-to-url";
import { getMimeTypeFromBase64 } from "../utils/get-mime-type-from-base-64";
import { sendPromptToGemini } from "./gemini-service";
import { v4 as uuidv4 } from "uuid";
import { Measure } from "../entity/measure.entity";
import { measureRepository } from "../repository/measure.repository";

export const createImage = async (data: CreateImage) => {
  const { image, customer_code, measure_datetime, measure_type } = data;

  const mimeType = getMimeTypeFromBase64(image);

  const measureValue = await sendPromptToGemini(image, mimeType);
  const convertMeasureToInteger = parseInt(measureValue);
  if (isNaN(convertMeasureToInteger)) {
    throw new Error(
      "Não foi possível converter o valor da medida para um número inteiro"
    );
  }

  const measure = new Measure();
  measure.measure_uuid = uuidv4();
  measure.customer_code = customer_code;
  measure.image_url = convertBase64ToImageUrl(image);
  measure.measure_value = convertMeasureToInteger;
  measure.measure_datetime = measure_datetime;
  measure.measure_type = measure_type;
  measure.has_confirmed = false;

  try {
    await measureRepository.save(measure);
    console.log("Measure saved successfully:", measure);

    return measure;
  } catch (error) {
    console.error("Error saving measure:", error);
    throw new Error("Failed to save measure");
  }
};

export const service = {
  createImage,
};
