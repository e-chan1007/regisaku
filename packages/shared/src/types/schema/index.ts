export type Entities = {
  discount: import("./Discount.js").Discount;
  paymentMethod: import("./PaymentMethod.js").PaymentMethod;
  product: import("./Product.js").Product;
  sale: import("./Sale.js").Sale;
  saleDiscount: import("./Sale.js").SaleDiscount;
  saleItem: import("./Sale.js").SaleItem;
  saleItemVariant: import("./Sale.js").SaleItemVariant;
  variantGroup: import("./Variant.js").VariantGroup;
  variant: import("./Variant.js").Variant;
};

export type RootEntities = Pick<
  Entities,
  "discount" | "paymentMethod" | "product" | "sale"
>;

export type EntityName = keyof Entities;
export type RootEntityName = keyof RootEntities;

export * from "./Discount.js";
export * from "./PaymentMethod.js";
export * from "./Product.js";
export * from "./Sale.js";
export * from "./Variant.js";
