import express from "express";
import router from "./routes/route";
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

const url = process.env.DB_URL;

try {
  mongoose.connect(url);
  console.log("DB is connected");
} catch (error) {
  console.error("Erro ao conectar ao MongoDB:", error);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
