import type {
  ArrayOrSingle,
  Entities,
  EntityName,
  MapArrayOrSingle,
  PartialDynamicField,
  RootEntityName,
} from "@e-chan1007/regisaku-shared/types";
import type { AdapterContext } from "../shared/AdapterContext.js";
import {
  DeleteQueryBuilder,
  type Query,
  ReadQueryBuilder,
  UpdateQueryBuilder,
} from "./QueryBuilder/index.js";

export type OperationArgDataMap<EN extends EntityName, EV = Entities[EN]> = {
  create: ArrayOrSingle<PartialDynamicField<EV>>;
  read: never;
  update: Partial<EV>;
  delete: never;
  exists: never;
};

export type DatabaseAdapterConfig = Record<string, any>;

export type CreateArgs<
  CreateSchema extends Record<RootEntityName, any> = Record<
    RootEntityName,
    any
  >,
> = {
  [K in RootEntityName]: [entityName: K, data: ArrayOrSingle<CreateSchema[K]>];
}[RootEntityName];

export abstract class AbstractDatabaseAdapter<
  C extends DatabaseAdapterConfig = DatabaseAdapterConfig,
  CS extends Record<RootEntityName, any> = Record<RootEntityName, any>,
> {
  static readonly defaultConfig: DatabaseAdapterConfig = {};
  static context: AdapterContext;
  get context(): AdapterContext {
    return (this.constructor as typeof AbstractDatabaseAdapter).context;
  }

  constructor(protected readonly config: C) {}

  async initialize(): Promise<void> {}

  create<T extends CreateArgs<CS>>(...args: T) {
    return this._executeCreate<T>(...args);
  }

  read<EN extends EntityName>(entityName: EN) {
    return new ReadQueryBuilder(this, entityName);
  }

  update<EN extends EntityName, D extends OperationArgDataMap<EN>["update"]>(
    entityName: EN,
    data: D,
  ) {
    return new UpdateQueryBuilder(this, entityName, data);
  }

  delete<EN extends EntityName>(entityName: EN) {
    return new DeleteQueryBuilder(this, entityName);
  }

  abstract subscribe<T extends EntityName, R = Entities[T]>(
    entityName: T,
    callback: (data: R[]) => void,
  ): () => void;

  /** @internal */
  abstract _executeCreate<T extends CreateArgs<CS>>(
    ...args: T
  ): Promise<MapArrayOrSingle<T[1], Entities[T[0]]["id"]>>;

  /** @internal */
  abstract _executeRead<EN extends EntityName, EV = Entities[EN]>(
    query: Query<EN, EV>,
  ): Promise<EV[]>;

  /** @internal */
  abstract _executeUpdate<
    EN extends EntityName,
    Data extends OperationArgDataMap<EN, EV>["update"],
    EV = Entities[EN],
  >(query: Query<EN, EV>, data: Data): Promise<EV[]>;

  /** @internal */
  abstract _executeDelete<EN extends EntityName, EV = Entities[EN]>(
    query: Query<EN, EV>,
  ): Promise<void>;

  /** @internal */
  abstract _executeExists<EN extends EntityName, EV = Entities[EN]>(
    query: Query<EN, EV>,
  ): Promise<boolean>;
}

export type DatabaseAdapterConstructor<
  C extends DatabaseAdapterConfig = DatabaseAdapterConfig,
  CS extends Record<EntityName, any> = Record<EntityName, any>,
> = (new (
  config: C,
) => AbstractDatabaseAdapter<C, CS>) & {
  readonly context: AdapterContext;
  readonly defaultConfig: C;
};
