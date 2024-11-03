import { Service } from "typedi";
import { ExpenseModel } from "../models/expense-model";
import { Expense } from "../entities/expense";
import BankingRepository from "./banking-repository";
import { Status } from "../enums/status";

@Service()
export default class ExpenseRepository {
  constructor() {}

  delete(value: Expense): Expense | PromiseLike<Expense> {
    throw new Error("Method not implemented.");
  }
  update(value: Expense): Expense | PromiseLike<Expense> {
    throw new Error("Method not implemented.");
  }
  async get(): Promise<Expense[]> {
    return await ExpenseModel.find();
  }

  async create(value: Expense): Promise<Expense> {
    return await ExpenseModel.create(value);
  }
}
