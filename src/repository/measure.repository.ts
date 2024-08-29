import { AppDataSource } from "../data-source";
import { Measures } from "../entity/measure.entity";

export const measureRepository = AppDataSource.getRepository(Measures);
