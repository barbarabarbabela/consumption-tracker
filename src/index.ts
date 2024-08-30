import express from "express";
import router from "./routes/route";
import { AppDataSource } from "./data-source";
import { errorHandler } from "./errors-handler";

require("dotenv").config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);
app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
