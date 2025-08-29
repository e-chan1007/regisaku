import type { Branded } from "../utils/Brand.js";

export type VariantGroupID = Branded<string, "VariantGroupID">;
export type VariantID = Branded<string, "VariantID">;

export type VariantGroupSelectionMode = "single" | "multiple";
export type VariantPriceModifier = "add" | "replace";

export interface VariantGroup {
  id: VariantGroupID;
  name: string;
  required: boolean;
  selectionMode: VariantGroupSelectionMode;
  variants: Variant[];
}

export interface Variant {
  id: VariantID;
  name: string;
  price: number;
  priceModifier: VariantPriceModifier;
}
