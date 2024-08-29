import "reflect-metadata";
import { DataSource } from "typeorm";
import { Measures } from "./entity/measure.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT!),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Measures],
  synchronize: false,
  logging: true,
});
