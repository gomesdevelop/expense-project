import { Service } from "typedi";
import { Voucher } from "../entities/voucher";
import VoucherRepository from "../repositories/voucher-repository";
import { Channel, ConsumeMessage } from "amqplib";
import { VoucherModel } from "../models/voucher-model";
import { Authorization } from "../entities/authorization";

@Service()
export default class VoucherService {
  constructor(public repository: VoucherRepository) {}

  async get(): Promise<Voucher[]> {
    return await this.repository.get();
  }

  async create(value: Voucher): Promise<Voucher> {
    return await this.repository.create(value);
  }

  async update(value: Voucher): Promise<Voucher> {
    return await this.repository.update(value);
  }

  async delete(value: Voucher): Promise<Voucher> {
    return await this.repository.delete(value);
  }

  async approve(channel: Channel, msg: ConsumeMessage | null): Promise<void> {
    if (!msg) return;

    const data = JSON.parse(msg?.content.toString() || "") as Authorization;

    console.log("approve", data);

    const voucher = new VoucherModel({
      expense: data.expense,
      authorizationCode: data.transaction?.code,
    });
    voucher.save();
    channel.ack(msg);
  }
}
