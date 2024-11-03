import { Schema, model } from "mongoose";
import { Expense } from "../entities/expense";
import { Status } from "../enums/status";

const schema = new Schema<Expense>(
  {
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
      default: Status.PENDING,
    },
    attachments: { type: [String], default: [] },
  },
  { timestamps: {} }
);

export const ExpenseModel = model<Expense>("Expense", schema);
