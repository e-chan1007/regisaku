import type { Branded } from "../utils/Brand.js";

export type TransactionID = Branded<string, "TransactionID">;

export interface Transaction {
  id: TransactionID;
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}
