import { Dexie } from "dexie";
import type { DexieTables } from "./Table.js";

export class Database extends Dexie implements DexieTables {
  productImages!: DexieTables["productImages"];

  constructor(dbName: string) {
    super(dbName);
    this.version(1).stores({
      productImages: "productId",
    });
  }
}
