import type { Branded } from "../utils/Brand.js";

export type VariantGroupId = Branded<string, "VariantGroupId">;
export type VariantId = Branded<string, "VariantId">;

export type VariantGroupSelectionMode = "single" | "multiple";
export type VariantPriceModifier = "add" | "replace";

export interface VariantGroup {
  id: VariantGroupId;
  name: string;
  required: boolean;
  selectionMode: VariantGroupSelectionMode;
  variants: Variant[];
}

export interface Variant {
  id: VariantId;
  name: string;
  price: number;
  priceModifier: VariantPriceModifier;
}
