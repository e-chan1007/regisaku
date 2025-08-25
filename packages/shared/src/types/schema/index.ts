export type Tables = {
  products: import("./Product.js").Product;
  transactions: import("./Transaction.js").Transaction;
};

export type TableName = keyof Tables;

export * from "./Product.js";
export * from "./Transaction.js";
