import { NextFunction, Request, Response } from "express";
import { service } from "../services/service";
import { CreateImage } from "../interfaces/create-image.interface";
import InvalidData from "../errors/invalid-data";
import NotFound from "../errors/not-found";
import InvalidType from "../errors/invalid-type";
import { ConfirmMeasure } from "../interfaces/confirm-measure";
import { validate as uuidValidate } from "uuid";
import { isBase64 } from "../utils/base-64-validation";

const createImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const body: CreateImage = req.body;

    if (
      !body.image ||
      !body.customer_code ||
      !body.measure_datetime ||
      !body.measure_type ||
      !isBase64(body.image)
    ) {
      throw new InvalidData();
    }

    const result = await service.createImage(body);

    return res.status(200).json({
      image_url: result.image_url,
      measure_value: result.measure_value,
      measure_uuid: result.measure_uuid,
    });
  } catch (error) {
    next(error);
  }
};

const confirmMeasure = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { measure_uuid, confirmed_value }: ConfirmMeasure = req.body;

    if (
      !measure_uuid ||
      !uuidValidate(measure_uuid) ||
      confirmed_value === undefined
    ) {
      throw new InvalidData();
    }

    await service.confirmMeasure(measure_uuid, confirmed_value);

    return res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
};

const getMeasuresByCustomerCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    // Conversão para maiúsculas para comparação case insensitive
    const formattedMeasureType = measure_type
      ? (measure_type as string).toUpperCase()
      : undefined;

    if (
      formattedMeasureType &&
      !["WATER", "GAS"].includes(formattedMeasureType)
    ) {
      throw new InvalidType();
    }

    const measures = await service.getMeasuresByCustomerCode(
      customer_code,
      formattedMeasureType
    );

    if (measures.length === 0) {
      throw new NotFound();
    }

    return res.status(200).json({
      customer_code,
      measures,
    });
  } catch (error) {
    next(error);
  }
};

export const controller = {
  createImage,
  confirmMeasure,
  getMeasuresByCustomerCode,
};
