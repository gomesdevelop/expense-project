import { Service } from "typedi";
import { Transaction } from "../entities/transaction";

@Service()
export default class BankingRepository {
  async authorization(): Promise<Transaction | undefined> {
    return await fetch(process.env.BANKING_API_URL ?? "")
      .then((response) => response.json())
      .then((data) => data)
      .catch(() => undefined);
  }
}
