import { Request, Response } from "express";
import { service } from "../services/service";
import { CreateImage } from "../interfaces/create-image.interface";

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

const confirmMeasure = async (req: Request, res: Response) => {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    if (!measure_uuid || confirmed_value === undefined) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description:
          "Dados fornecidos no corpo da requisição são inválidos.",
      });
    }

    const result = await service.confirmMeasure(measure_uuid, confirmed_value);

    if (result) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ error: "Medição não encontrada" });
    }
  } catch (error) {
    console.error("Erro ao confirmar medição:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getMeasuresByCustomerCode = async (req: Request, res: Response) => {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    if (
      measure_type &&
      !["WATER", "GAS"].includes((measure_type as string).toUpperCase())
    ) {
      return res.status(400).json({
        error_code: "INVALID_TYPE",
        error_description: "Tipo de medição não permitida",
      });
    }

    const measures = await service.getMeasuresByCustomerCode(
      customer_code,
      measure_type as string
    );

    if (measures.length === 0) {
      return res.status(404).json({
        error_code: "MEASURES_NOT_FOUND",
        error_description: "Nenhuma leitura encontrada",
      });
    }

    return res.status(200).json({
      customer_code,
      measures,
    });
  } catch (error) {
    console.error("Erro ao obter medições do cliente:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

export const controller = {
  createImage,
  confirmMeasure,
  getMeasuresByCustomerCode,
};
