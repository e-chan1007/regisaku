import {
  AbstractStorageAdapter,
  type AdapterContext,
  type StorageAdapterConfig,
} from "@e-chan1007/regisaku-adapter-sdk";
import type { ProductId } from "@e-chan1007/regisaku-shared/types";
import type { Collection, Table } from "dexie";
import { Database } from "./Database.js";

export interface IndexedDBStorageAdapterConfig extends StorageAdapterConfig {
  databaseName: string;
}

export class IndexedDBStorageAdapter extends AbstractStorageAdapter<IndexedDBStorageAdapterConfig> {
  static override context = "client" as const satisfies AdapterContext;
  static readonly defaultConfig: IndexedDBStorageAdapterConfig = {
    databaseName: "regisaku-storage",
  };
  private db!: Database;

  override async initialize(): Promise<void> {
    this.db = new Database(this.config.databaseName);
  }

  async setProductImage(productId: ProductId, image: File): Promise<void> {
    await this.db.productImages.put({ productId, image });
  }

  async getProductImage(productId: ProductId): Promise<File | null> {
    const row = await this.db.productImages.get(productId);
    return row?.image ?? null;
  }

  async getProductImages(
    productIds?: ProductId[],
  ): Promise<Record<ProductId, File>> {
    let query: Table | Collection = this.db.productImages;
    if (productIds && productIds.length > 0) {
      query = query.where("productId").anyOf(productIds);
    }
    const rows: Array<{ productId: ProductId; image: File }> = await query.toArray();

    return rows.reduce(
      (acc, row) => {
        acc[row.productId] = row.image;
        return acc;
      },
      {} as Record<ProductId, File>,
    );
  }

  async deleteProductImage(productId: ProductId): Promise<void> {
    await this.db.productImages.delete(productId);
  }
}
