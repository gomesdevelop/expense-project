import { Service } from "typedi";
import { VoucherModel } from "../models/voucher-model";
import { Voucher } from "../entities/voucher";

@Service()
export default class VoucherRepository {
  delete(value: Voucher): Voucher | PromiseLike<Voucher> {
    throw new Error("Method not implemented.");
  }
  update(value: Voucher): Voucher | PromiseLike<Voucher> {
    throw new Error("Method not implemented.");
  }
  async get(): Promise<Voucher[]> {
    return await VoucherModel.find();
  }

  async create(value: Voucher): Promise<Voucher> {
    return await VoucherModel.create(value);
  }
}
