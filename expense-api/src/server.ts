import "reflect-metadata";
import { config } from "dotenv";
import { app } from "./app";
import { connectDatabase, disconnectDatabase } from "./config/mongo";
import ExpenseChannel from "./messages/expense-channel";
import Container from "typedi";
import VoucherService from "./services/voucher-service";

config();

const createServer = async () => {
  console.log("Creating server...");
  connectDatabase()
    .then(() => {
      console.log("Connected to MongoDB");

      const server = app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT} 🚀`);
      });

      const voucherService = Container.get(VoucherService);
      const expenseChannel = Container.get(ExpenseChannel);
      expenseChannel.channelInit().then((channel) => {
        channel.consume(process.env.RABBITMQ_QUEUE || "", (msg) =>
          voucherService.approve(channel, msg)
        );
      });

      process.on("SIGINT", async () => {
        await disconnectDatabase();
        expenseChannel.close();
        console.log("Application closed");
      });
    })
    .catch((error) => {
      console.log("Failed to connect to MongoDB", error);
    });
};

createServer();
