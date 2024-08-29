"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
const router = (0, express_1.Router)();
router.post("/upload", controller_1.controller.createImage);
router.patch("/confirm", controller_1.controller.confirmReading);
exports.default = router;
