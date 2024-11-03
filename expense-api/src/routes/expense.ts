import { Router } from "express";
import ExpenseController from "../controllers/expense-controller";
import Container from "typedi";

export const router = Router();

const controller = Container.get(ExpenseController);

router.get("/", async (req, res) => {
  res.send(await controller.get());
});

router.post("/", async (req, res) => {
  res.send(await controller.create(req.body));
});
