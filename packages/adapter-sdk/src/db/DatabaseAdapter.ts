import type {
  ArrayOrSingle,
  MapArrayOrSingle,
  PartialDynamicField,
  TableName,
  Tables,
} from "@e-chan1007/regisaku-shared/types";
import type { AdapterContext } from "../shared/AdapterContext.js";
import {
  CreateQueryBuilder,
  DeleteQueryBuilder,
  GetQueryBuilder,
  type Query,
  UpdateQueryBuilder,
} from "./QueryBuilder/index.js";

export type OperationArgDataMap<TN extends TableName, TR = Tables[TN]> = {
  create: ArrayOrSingle<PartialDynamicField<TR>>;
  get: never;
  update: Partial<TR>;
  delete: never;
};

export abstract class AbstractDatabaseAdapter {
  static context: AdapterContext;
  get context(): AdapterContext {
    return (this.constructor as typeof AbstractDatabaseAdapter).context;
  }

  async initialize(): Promise<void> {}

  abstract exists<TN extends TableName>(
    tableName: TN,
    id: Tables[TN]["id"],
  ): Promise<boolean>;

  create<TN extends TableName, D extends OperationArgDataMap<TN>["create"]>(
    tableName: TN,
    data: D,
  ) {
    return new CreateQueryBuilder(this, tableName, data);
  }

  get<TN extends TableName>(tableName: TN) {
    return new GetQueryBuilder(this, tableName);
  }

  update<TN extends TableName, D extends OperationArgDataMap<TN>["update"]>(
    tableName: TN,
    data: D,
  ) {
    return new UpdateQueryBuilder(this, tableName, data);
  }

  delete<TN extends TableName>(tableName: TN) {
    return new DeleteQueryBuilder(this, tableName);
  }

  abstract subscribe<T extends TableName, R = Tables[T]>(
    tableName: T,
    callback: (data: R[]) => void,
  ): () => void;

  /** @internal */
  abstract _executeCreate<
    TN extends TableName,
    Data extends OperationArgDataMap<TN, TR>["create"],
    TR = Tables[TN],
  >(
    query: Query<TN, TR>,
    data: Data,
  ): Promise<MapArrayOrSingle<Data, Tables[TN]["id"]>>; // MapArrayOrSingle に TData を渡す

  /** @internal */
  abstract _executeGet<TN extends TableName, TR = Tables[TN]>(
    query: Query<TN, TR>,
  ): Promise<TR[]>;

  /** @internal */
  abstract _executeUpdate<
    TN extends TableName,
    Data extends OperationArgDataMap<TN, TR>["update"],
    TR = Tables[TN],
  >(query: Query<TN, TR>, data: Data): Promise<TR[]>;

  /** @internal */
  abstract _executeDelete<TN extends TableName, TR = Tables[TN]>(
    query: Query<TN, TR>,
  ): Promise<void>;
}

export type DatabaseAdapterClass = (new () => AbstractDatabaseAdapter) & {
  readonly context: AdapterContext;
};
