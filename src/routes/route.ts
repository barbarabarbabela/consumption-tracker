import { Router } from "express";
import { controller } from "../controllers/controller";
import { AppDataSource } from "../data-source";
import { Measures } from "../entity/measure.entity";

const router = Router();

router.post("/upload", controller.createImage);

router.patch("/confirm", controller.confirmMeasure);

router.get("/:customer_code/list", controller.getMeasuresByCustomerCode);

export default router;
