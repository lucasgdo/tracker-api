import { AppDataSource } from "#data-source.js";
import express from "express";
const app = express();
const port = process.env.PORT ?? "9001";

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Express server has started on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.log(error);
  });
