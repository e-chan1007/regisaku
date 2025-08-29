import type { Branded } from "../utils/Brand.js";

export type DiscountID = Branded<string, "DiscountID">;

export interface Discount {
  id: DiscountID;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  isHidden: boolean;
}
