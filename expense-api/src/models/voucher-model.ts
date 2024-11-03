import { Schema, model } from "mongoose";
import { Status } from "../enums/status";
import { Voucher } from "../entities/voucher";

const schema = new Schema<Voucher>(
  {
    expense: { type: Schema.Types.ObjectId, ref: "Expense", required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
      default: Status.PENDING,
    },
    approvalLevel: { type: Number, required: true, default: 0 },
    attachments: { type: [String], default: [] },
    authorizationCode: { type: String },
  },
  { timestamps: {} }
);

export const VoucherModel = model<Voucher>("Voucher", schema);
