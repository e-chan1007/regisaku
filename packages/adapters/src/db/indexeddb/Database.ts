import { Dexie } from "dexie";
import type { DexieTables } from "./Table.js";

export class Database extends Dexie implements DexieTables {
  discounts!: DexieTables["discounts"];
  paymentMethods!: DexieTables["paymentMethods"];
  products!: DexieTables["products"];
  sales!: DexieTables["sales"];
  saleDiscounts!: DexieTables["saleDiscounts"];
  saleItems!: DexieTables["saleItems"];
  saleItemVariants!: DexieTables["saleItemVariants"];
  variantGroups!: DexieTables["variantGroups"];
  variants!: DexieTables["variants"];

  constructor(dbName: string) {
    super(dbName);
    this.version(1).stores({
      products: "id, name",
      variantGroups: "id, productId",
      variants: "id, variantGroupId",
      discounts: "id, name",
      paymentMethods: "id, name",
      sales: "id, transactionAt",
      saleItems: "id, saleId, productId",
      saleDiscounts: "id, saleId, discountId",
      saleItemVariants: "id, saleItemId",
    });
  }
}
