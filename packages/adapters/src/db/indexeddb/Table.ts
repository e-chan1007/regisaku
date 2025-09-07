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

export type DiscountTableRow = Discount;
export type PaymentMethodTableRow = PaymentMethod;
export type ProductTableRow = Omit<Product, "variantGroups">;
export type SaleTableRow = Omit<Sale, "discounts" | "items">;
export type SaleDiscountTableRow = SaleDiscount & {
  saleId: SaleId;
};
export type SaleItemTableRow = Omit<SaleItem, "variants"> & {
  saleId: SaleId;
};
export type SaleItemVariantTableRow = SaleItemVariant & {
  saleItemId: SaleItemId;
};
export type VariantGroupTableRow = Omit<VariantGroup, "variants"> & {
  productId: ProductId;
};
export type VariantTableRow = Variant & {
  variantGroupId: VariantGroupId;
};

export type TableRow = {
  discounts: DiscountTableRow;
  paymentMethods: PaymentMethodTableRow;
  products: ProductTableRow;
  sales: SaleTableRow;
  saleDiscounts: SaleDiscountTableRow;
  saleItems: SaleItemTableRow;
  saleItemVariants: SaleItemVariantTableRow;
  variantGroups: VariantGroupTableRow;
  variants: VariantTableRow;
};

export type TableName = keyof TableRow;

export type DexieTables = {
  [K in TableName]: DexieTable<TableRow[K], TableRow[K]["id"]>;
};
