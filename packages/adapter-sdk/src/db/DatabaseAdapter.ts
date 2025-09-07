import type {
  DeepOmit,
  PaymentMethod,
  Product,
  ProductId,
  Sale,
  SaleId,
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
  protected isOnline = true;

  constructor(protected readonly config: C) {}

  async initialize(): Promise<void> {}

  protected setOnline(online: boolean): void {
    this.isOnline = online;
  }

  abstract addProduct(product: DeepOmit<Product, "id">): Promise<Product>;
  abstract getProducts(): Promise<Product[]>;
  abstract updateProduct(
    id: ProductId,
    updates: Partial<Omit<Product, "id">>,
  ): Promise<void>;
  abstract deleteProduct(id: ProductId): Promise<void>;

  abstract subscribeToProducts(
    onInsert: (product: Product) => void,
    onUpdate: (product: Product) => void,
    onDelete: (productId: ProductId) => void,
  ): () => void;

  abstract addSale(sale: DeepOmit<Sale, "id" | "updatedAt">): Promise<Sale>;
  abstract getSales(): Promise<Sale[]>;
  abstract updateSale(
    id: SaleId,
    updates: Partial<Omit<Sale, "id" | "transactionAt" | "updatedAt">>,
  ): Promise<void>;
  abstract deleteSale(id: SaleId): Promise<void>;

  abstract addPaymentMethod(
    method: Omit<PaymentMethod, "id">,
  ): Promise<PaymentMethod>;
  abstract getPaymentMethods(): Promise<PaymentMethod[]>;
  abstract updatePaymentMethod(
    id: PaymentMethod["id"],
    updates: Partial<Omit<PaymentMethod, "id">>,
  ): Promise<void>;
  abstract deletePaymentMethod(id: PaymentMethod["id"]): Promise<void>;
}

export type DatabaseAdapterConstructor<
  C extends DatabaseAdapterConfig = DatabaseAdapterConfig,
> = (new (
  config: C,
) => AbstractDatabaseAdapter<C>) & {
  readonly context: AdapterContext;
  readonly defaultConfig: C;
};
