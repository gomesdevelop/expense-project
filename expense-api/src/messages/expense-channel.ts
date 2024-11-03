import { Channel, connect, ConsumeMessage } from "amqplib";
import { Server as HttpServer } from "http";
import { Service } from "typedi";
import { Expense } from "../entities/expense";
import { Authorization } from "../entities/authorization";

@Service()
export default class ExpenseChannel {
  private channel: Channel | undefined;

  constructor() {}

  async channelInit() {
    const connection = await connect(process.env.RABBITMQ_SERVER || "");
    this.channel = await connection.createChannel();

    await this.channel.assertQueue(process.env.RABBITMQ_QUEUE || "", {
      durable: true,
    });

    console.log("Created expense channel");
    return Promise.resolve(this.channel);
  }

  async publish(value: Authorization) {
    console.log("Publishing expense channel...");
    return await this.channel?.sendToQueue(
      process.env.RABBITMQ_QUEUE || "",
      Buffer.from(JSON.stringify(value))
    );
  }

  async close() {
    return await this.channel?.close();
  }
}
