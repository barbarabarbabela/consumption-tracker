"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./routes/route"));
const mongoose = require("mongoose");
require("dotenv").config();
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(route_1.default);
const url = process.env.DB_URL;
try {
    mongoose.connect(url);
    console.log("DB is connected");
}
catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
