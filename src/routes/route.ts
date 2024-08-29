import { Router } from "express";
import { controller } from "../controllers/controller";
import { AppDataSource } from "../data-source";
import { Measure } from "../entity/measure.entity";

const router = Router();

router.post("/upload", controller.createImage);

router.patch("/confirm", controller.confirmMeasure);

router.get("/:customer_code/list", controller.getMeasuresByCustomerCode);

router.get("/test", async (req, res) => {
  try {
    const measureRepository = AppDataSource.getRepository(Measure);
    const measures = await measureRepository.find();
    res.status(200).json(measures);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data from database" });
  }
});

export default router;
