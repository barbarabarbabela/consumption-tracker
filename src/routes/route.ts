import { Router } from "express";
import { controller } from "../controllers/controller";

const router = Router();

router.post("/upload", controller.createImage);

router.patch("/confirm", controller.confirmReading);

export default router;
