export type Entities = {
  products: import("./Product.js").Product;
  sales: import("./Sale.js").Sale;
  saleItems: import("./Sale.js").SaleItem;
};

export type EntityName = keyof Entities;

export * from "./Discount.js";
export * from "./PaymentMethod.js";
export * from "./Product.js";
export * from "./Sale.js";
export * from "./Variant.js";
