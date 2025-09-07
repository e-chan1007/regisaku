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
  receivedAmount: number;
  changeAmount: number;
  currency: string;
  paymentMethodId: PaymentMethodId;
  paymentMethod: string;
  transactionAt: Date;
  updatedAt: Date;
  discounts: SaleDiscount[];
  items: SaleItem[];
  note: string;
}

export interface SaleDiscount {
  id: SaleDiscountId;
  discountId: DiscountId;
  name: string;
  type: DiscountType;
  value: number;
}

export interface SaleItem {
  id: SaleItemId;
  productId: ProductId;
  productName: string;
  quantity: number;
  /** 商品の単価 */
  unitPrice: number;
  /** 商品の合計金額 ((unitPrice + sum(variants.price)) * quantity) */
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
