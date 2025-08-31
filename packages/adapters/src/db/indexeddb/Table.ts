import type {
  Discount,
  PaymentMethod,
  Product,
  ProductId,
  Sale,
  SaleDiscount,
  SaleId,
  SaleItem,
  SaleItemId,
  SaleItemVariant,
  Variant,
  VariantGroup,
  VariantGroupId,
} from "@e-chan1007/regisaku-shared/types";
import type { Table as DexieTable } from "dexie";

export type DiscountTable = Discount;
export type PaymentMethodTable = PaymentMethod;
export type ProductTable = Omit<Product, "variantGroups">;
export type SaleTable = Omit<Sale, "discount" | "items">;
export type SaleDiscountTable = SaleDiscount & {
  saleId: SaleId;
};
export type SaleItemTable = Omit<SaleItem, "variants"> & {
  saleId: SaleId;
};
export type SaleItemVariantTable = SaleItemVariant & {
  saleItemId: SaleItemId;
};
export type VariantGroupTable = Omit<VariantGroup, "variants"> & {
  productId: ProductId;
};
export type VariantTable = Variant & {
  variantGroupId: VariantGroupId;
};

export type Tables = {
  discounts: DiscountTable;
  paymentMethods: PaymentMethodTable;
  products: ProductTable;
  sales: SaleTable;
  saleDiscounts: SaleDiscountTable;
  saleItems: SaleItemTable;
  saleItemVariants: SaleItemVariantTable;
  variantGroups: VariantGroupTable;
  variants: VariantTable;
};

export type TableName = keyof Tables;

export type DexieTables = {
  [K in TableName]: DexieTable<Tables[K], Tables[K]["id"]>;
};
