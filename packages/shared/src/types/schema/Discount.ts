import type { Branded } from "../utils/Brand.js";

export type DiscountId = Branded<string, "DiscountId">;
export type DiscountType = "percentage" | "fixed";

export interface Discount {
  id: DiscountId;
  name: string;
  type: DiscountType;
  value: number;
  isHidden: boolean;
}
