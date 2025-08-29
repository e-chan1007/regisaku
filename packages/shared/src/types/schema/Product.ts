import type { Branded } from "../utils/Brand.js";
import type { VariantGroup } from "./Variant.js";

export type ProductID = Branded<string, "ProductID">;

export interface Product {
  id: ProductID;
  name: string;
  price: number;
  stock: number;
  isHidden: boolean;
  variantGroups: VariantGroup[];
}
