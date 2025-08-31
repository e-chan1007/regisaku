import type { Branded } from "../utils/Brand.js";
import type { VariantGroup } from "./Variant.js";

export type ProductId = Branded<string, "ProductId">;

export interface Product {
  id: ProductId;
  name: string;
  price: number;
  stock: number;
  isHidden: boolean;
  variantGroups: VariantGroup[];
}
