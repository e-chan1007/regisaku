import type { TableName, Tables } from "@e-chan1007/regisaku-shared/types";
import type { AdapterContext } from "../shared/AdapterContext.js";
import type { AbstractQueryBuilder } from "./QueryBuilder.js";

export abstract class AbstractDatabaseAdapter {
  static context: AdapterContext;
  get context(): AdapterContext {
    return (this.constructor as typeof AbstractDatabaseAdapter).context;
  }

  async initialize(): Promise<void> {}

  abstract query<TN extends TableName>(tableName: TN): AbstractQueryBuilder<TN>;

  abstract exists<TN extends TableName>(
    tableName: TN,
    id: Tables[TN]["id"],
  ): Promise<boolean>;

  abstract insert<TN extends TableName>(
    tableName: TN,
    data: Tables[TN] | Tables[TN][],
  ): Promise<
    typeof data extends Tables[TN][] ? Tables[TN]["id"][] : Tables[TN]["id"]
  >;

  abstract update<TN extends TableName>(
    tableName: TN,
    id: Tables[TN]["id"],
    data: Partial<Tables[TN]>,
  ): Promise<void>;

  abstract upsert<TN extends TableName>(
    tableName: TN,
    id: Tables[TN]["id"],
    data: Tables[TN],
  ): Promise<void>;

  abstract delete<TN extends TableName>(
    tableName: TN,
    id: Tables[TN]["id"],
  ): Promise<void>;
}

export type DatabaseAdapterClass = (new () => AbstractDatabaseAdapter) & {
  readonly context: AdapterContext;
};
