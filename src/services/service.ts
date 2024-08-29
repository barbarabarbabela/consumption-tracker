import { CreateImage } from "../interfaces/create-image.interface";
import { convertBase64ToImageUrl } from "../utils/convert-base-64-to-url";
import { getMimeTypeFromBase64 } from "../utils/get-mime-type-from-base-64";
import { sendPromptToGemini } from "./gemini-service";
import { v4 as uuidv4 } from "uuid";
import { Measures } from "../entity/measure.entity";
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

  const measure = new Measures();
  measure.measure_uuid = uuidv4();
  measure.customer_code = customer_code;
  measure.measure_value = convertMeasureToInteger;
  measure.measure_datetime = measure_datetime;
  measure.measure_type = measure_type;
  measure.has_confirmed = false;
  measure.image_url = convertBase64ToImageUrl(image);

  try {
    await measureRepository.save(measure);

    return measure;
  } catch (error) {
    console.error("Error saving measure:", error);
    throw new Error("Failed to save measure");
  }
};

export const confirmMeasure = async (
  measure_uuid: string,
  confirmed_value: number
) => {
  const measure = await measureRepository.findOne({
    where: { measure_uuid },
  });

  if (measure) {
    measure.has_confirmed = true;
    measure.measure_value = confirmed_value;
    await measureRepository.save(measure);

    return true;
  } else {
    return false;
  }
};

export const getMeasuresByCustomerCode = async (
  customer_code: string,
  measure_type?: string
) => {
  const queryBuilder = measureRepository
    .createQueryBuilder("measure")
    .where("measure.customer_code = :customer_code", { customer_code });

  // Verifica se o parâmetro measure_type foi fornecido e se é válido
  if (measure_type) {
    const type = (measure_type as string).toUpperCase();
    if (!["WATER", "GAS"].includes(type)) {
      throw new Error("Invalid measure type");
    }
    queryBuilder.andWhere("measure.measure_type = :measure_type", {
      measure_type: type,
    });
  }

  return await queryBuilder.getMany();
};

export const service = {
  createImage,
  confirmMeasure,
  getMeasuresByCustomerCode,
};
