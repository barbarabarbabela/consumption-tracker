import { AppDataSource } from "../data-source";
import { Measure } from "../entity/measure.entity";

export const measureRepository = AppDataSource.getRepository(Measure);
