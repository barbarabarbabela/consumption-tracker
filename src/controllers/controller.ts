import { Request, Response } from "express";
import { service } from "../services/service";
import { CreateImage } from "../interfaces/create-image.interface";

const readings: { [key: string]: { confirmed: boolean; value?: number } } = {
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

const createImage = async (req: Request, res: Response) => {
  try {
    const body: CreateImage = req.body;

    if (
      !body.image ||
      !body.customer_code ||
      !body.measure_datetime ||
      !body.measure_type
    ) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description:
          "Dados fornecidos no corpo da requisição são inválidos.",
      });
    }

    const result = await service.createImage(body);

    return res.status(200).json({
      image_url: result.image_url,
      measure_value: result.measure_value,
      measure_uuid: result.measure_uuid,
    });
  } catch (error) {
    console.error("Erro ao criar imagem:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const confirmReading = async (req: Request, res: Response) => {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    if (
      typeof measure_uuid !== "string" ||
      typeof confirmed_value !== "number"
    ) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description:
          "Dados fornecidos no corpo da requisição são inválidos.",
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
  } catch (error) {
    console.error("Erro ao confirmar leitura:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const controller = {
  createImage,
  confirmReading,
};
