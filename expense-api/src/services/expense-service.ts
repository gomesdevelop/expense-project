import { Service } from "typedi";
import ExpenseRepository from "../repositories/expense-repository";
import { Expense } from "../entities/expense";
import ExpenseChannel from "../messages/expense-channel";
import BankingRepository from "../repositories/banking-repository";
import { Status } from "../enums/status";
import { Authorization } from "../entities/authorization";
import { Transaction } from "../entities/transaction";

@Service()
export default class ExpenseService {
  constructor(
    public repository: ExpenseRepository,
    public banking: BankingRepository,
    public channel: ExpenseChannel
  ) {}

  generateVoucher(expense: Expense, transaction?: Transaction): void {
    if (!transaction) return;

    const data: Authorization = {
      transaction,
      expense,
    };

    this.channel.publish(data);
  }

  async get(): Promise<Expense[]> {
    return await this.repository.get();
  }

  async create(value: Expense): Promise<Expense> {
    const transaction = await this.banking.authorization();

    const data = {
      ...value,
      status: !transaction ? Status.REJECTED : value.status,
    };

    const expense = await this.repository.create(data);

    this.generateVoucher(expense, transaction);

    return expense;
  }

  async update(value: Expense): Promise<Expense> {
    return await this.repository.update(value);
  }

  async delete(value: Expense): Promise<Expense> {
    return await this.repository.delete(value);
  }
}
