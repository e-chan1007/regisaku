import type { Branded } from "../utils/Brand.js";

export type ProductID = Branded<string, "ProductID">;

export interface Product {
  id: ProductID;
  name: string;
  price: number;
}
