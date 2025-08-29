import type { Branded } from "../utils/Brand.js";
import type { DiscountID } from "./Discount.js";
import type { Product, ProductID } from "./Product.js";
import type {
  VariantGroupID,
  VariantID,
  VariantPriceModifier,
} from "./Variant.js";

export type SaleID = Branded<string, "SaleID">;
export type SaleItemID = Branded<string, "SaleItemID">;

export interface Sale {
  id: SaleID;
  totalPrice: number;
  currency: string;
  paymentMethod: string;
  transactionAt: Date;
  discountId: DiscountID | null;
  discountAmount: number;
  items: SaleItem[];
}

export interface SaleItem {
  id: SaleItemID;
  productId: ProductID;
  productName: string;
  quantity: number;
  totalPrice: number;
  variants: SaleItemVariant[];
}

export interface SaleItemVariant {
  id: VariantID;
  name: string;
  price: number;
  priceModifier: VariantPriceModifier;
  groupId: VariantGroupID;
  groupName: string;
}
