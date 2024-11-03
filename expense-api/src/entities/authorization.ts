import { Expense } from "./expense";
import { Transaction } from "./transaction";

export interface Authorization {
  expense: Expense;
  transaction?: Transaction;
}
