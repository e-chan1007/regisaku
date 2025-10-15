import type { ProductId } from "@e-chan1007/regisaku-shared/types";
import type { AdapterContext } from "../shared/AdapterContext.js";

export type StorageAdapterConfig = Record<string, any>;

export abstract class AbstractStorageAdapter<
  C extends StorageAdapterConfig = StorageAdapterConfig,
> {
  static readonly defaultConfig: StorageAdapterConfig = {};
  static context: AdapterContext;
  get context(): AdapterContext {
    return (this.constructor as typeof AbstractStorageAdapter).context;
  }
  protected isOnline = true;

  constructor(protected readonly config: C) {}

  async initialize(): Promise<void> {}

  protected setOnline(online: boolean): void {
    this.isOnline = online;
  }

  abstract setProductImage(productId: ProductId, image: Blob): Promise<void>;
  abstract getProductImage(productId: ProductId): Promise<Blob | null>;
  abstract getProductImages(
    productIds: ProductId[],
  ): Promise<Record<ProductId, Blob>>;
  abstract deleteProductImage(productId: ProductId): Promise<void>;
}

export type StorageAdapterConstructor<
  C extends StorageAdapterConfig = StorageAdapterConfig,
> = (new (
  config: C,
) => AbstractStorageAdapter<C>) & {
  readonly context: AdapterContext;
  readonly defaultConfig: C;
};
