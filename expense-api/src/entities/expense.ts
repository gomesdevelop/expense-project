import { Status } from "../enums/status";

export interface Expense extends Document {
  amount: number;
  category: string;
  date: Date;
  description: string;
  status: Status;
  attachments: string[];
}
