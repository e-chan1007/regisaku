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
}

export type DatabaseAdapterConstructor<
  C extends DatabaseAdapterConfig = DatabaseAdapterConfig,
> = (new (
  config: C,
) => AbstractDatabaseAdapter<C>) & {
  readonly context: AdapterContext;
  readonly defaultConfig: C;
};
