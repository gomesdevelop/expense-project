import { Service } from "typedi";
import ExpenseService from "../services/expense-service";
import { Expense } from "../entities/expense";

@Service()
export default class ExpenseController {
  constructor(public service: ExpenseService) {}

  async create(value: Expense) {
    return await this.service.create(value);
  }

  async get() {
    return await this.service.get();
  }
}
