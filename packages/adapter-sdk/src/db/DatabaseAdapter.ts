import type {
  Product,
  ProductId,
  Sale,
} from "@e-chan1007/regisaku-shared/types";
import type { AdapterContext } from "../shared/AdapterContext.js";

export type DatabaseAdapterConfig = Record<string, any>;

export abstract class AbstractDatabaseAdapter<
  C extends DatabaseAdapterConfig = DatabaseAdapterConfig,
> {
  static readonly defaultConfig: DatabaseAdapterConfig = {};
  static context: AdapterContext;
  get context(): AdapterContext {
    return (this.constructor as typeof AbstractDatabaseAdapter).context;
  }

  constructor(protected readonly config: C) {}

  async initialize(): Promise<void> {}

  abstract addProduct(product: Omit<Product, "id">): Promise<void>;
  abstract getProducts(): Promise<Product[]>;
  abstract updateProduct(
    id: ProductId,
    updates: Partial<Omit<Product, "id">>,
  ): Promise<void>;
  abstract deleteProduct(id: ProductId): Promise<void>;

  abstract addSale(sale: Omit<Sale, "id" | "transactionAt">): Promise<void>;
  abstract getSales(): Promise<Sale[]>;
  abstract deleteSale(id: Sale["id"]): Promise<void>;
}

export type DatabaseAdapterConstructor<
  C extends DatabaseAdapterConfig = DatabaseAdapterConfig,
> = (new (
  config: C,
) => AbstractDatabaseAdapter<C>) & {
  readonly context: AdapterContext;
  readonly defaultConfig: C;
};
