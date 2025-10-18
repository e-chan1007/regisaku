import type { ProductId } from "@e-chan1007/regisaku-shared/types";
import type { Table as DexieTable } from "dexie";

export interface ImageTableRow {
  productId: ProductId;
  image: File;
}

export interface DexieTables {
  productImages: DexieTable<ImageTableRow, ProductId>;
}
