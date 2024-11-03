import { Status } from "../enums/status";
import { Expense } from "./expense";

export interface Voucher extends Document {
  expense: Expense;
  status: Status;
  approvalLevel: number;
  attachments: string[];
  authorizationCode: string;
}
