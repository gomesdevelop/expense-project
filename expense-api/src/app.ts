import express from "express";
import cors from "cors";
import logger from "morgan";
import { expense } from "./routes";

export const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());

app.use("/expenses", expense);
