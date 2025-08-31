import {
  type CreateArgs,
  DatabaseAdapter,
  type Query,
} from "@e-chan1007/regisaku-adapter-sdk";
import type {
  Entities,
  EntityName,
  MapArrayOrSingle,
} from "@e-chan1007/regisaku-shared/types";
import { type CreateSchema, create } from "./actions/create.js";
import { Database } from "./Database.js";

export interface IndexedDBAdapterConfig {
  databaseName: string;
}

export class IndexedDBAdapter extends DatabaseAdapter<
  IndexedDBAdapterConfig,
  CreateSchema
> {
  static readonly defaultConfig: IndexedDBAdapterConfig = {
    databaseName: "regisaku",
  };
  private db!: Database;

  override async initialize(): Promise<void> {
    this.db = new Database(this.config.databaseName);
  }

  override subscribe<T extends EntityName, R = Entities[T]>(
    entityName: T,
    _callback: (data: R[]) => void,
  ): () => void {
    console.warn(`subscribe(${entityName}): Not implemented`);
    return () => {};
  }

  override async _executeCreate<T extends CreateArgs<CreateSchema>>(
    ...args: T
  ): Promise<MapArrayOrSingle<T[1], Entities[T[0]]["id"]>> {
    return create<T>(this.db, ...args);
  }

  override _executeRead<EN extends EntityName, EV = Entities[EN]>(
    query: Query<EN, EV>,
  ): Promise<EV[]> {
    throw new Error("Method not implemented.");
  }

  override _executeUpdate<
    EN extends EntityName,
    Data extends Partial<EV>,
    EV = Entities[EN],
  >(query: Query<EN, EV>, data: Data): Promise<EV[]> {
    throw new Error("Method not implemented.");
  }

  override _executeDelete<EN extends EntityName, EV = Entities[EN]>(
    query: Query<EN, EV>,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  _executeExists<EN extends EntityName, EV = Entities[EN]>(
    query: Query<EN, EV>,
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
