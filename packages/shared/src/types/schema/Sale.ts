import type { Branded } from "../utils/Brand.js";
import type { DiscountId, DiscountType } from "./Discount.js";
import type { PaymentMethodId } from "./PaymentMethod.js";
import type { ProductId } from "./Product.js";
import type { VariantGroupId, VariantId } from "./Variant.js";

export type SaleId = Branded<string, "SaleId">;
export type SaleDiscountId = Branded<string, "SaleDiscountId">;
export type SaleItemId = Branded<string, "SaleItemId">;
export type SaleItemVariantId = Branded<string, "SaleItemVariantId">;

export interface Sale {
  id: SaleId;
  totalPrice: number;
  currency: string;
  paymentMethodId: PaymentMethodId;
  paymentMethod: string;
  transactionAt: Date;
  discounts: SaleDiscount[];
  items: SaleItem[];
}

export interface SaleDiscount {
  id: SaleDiscountId;
  name: string;
  type: DiscountType;
  value: number;
}

export interface SaleItem {
  id: SaleItemId;
  productId: ProductId;
  productName: string;
  quantity: number;
  unitPrice: number;
  variantUnitPrice: number;
  totalPrice: number;
  variants: SaleItemVariant[];
}

export interface SaleItemVariant {
  id: SaleItemVariantId;
  variantId: VariantId;
  name: string;
  price: number;
  groupId: VariantGroupId;
  groupName: string;
}
