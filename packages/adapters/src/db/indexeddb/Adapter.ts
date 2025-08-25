import { DatabaseAdapter } from "@e-chan1007/regisaku-adapter-sdk";
import type { TableName, Tables } from "@e-chan1007/regisaku-shared/types";
import { IndexedDBQueryBuilder } from "./QueryBuilder.js";

export class IndexedDBAdapter extends DatabaseAdapter {
  static context = "client" as const;

  async initialize(): Promise<void> {
    super.initialize();
    console.info("Initialized IndexedDB");
  }

  query<TN extends TableName>(_tableName: TN): IndexedDBQueryBuilder<TN> {
    return new IndexedDBQueryBuilder();
  }
  exists<TN extends TableName>(
    _tableName: TN,
    _id: Tables[TN]["id"],
  ): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  insert<TN extends TableName>(
    _tableName: TN,
    _data: Tables[TN] | Tables[TN][],
  ): Promise<
    typeof _data extends Tables[TN][] ? Tables[TN]["id"][] : Tables[TN]["id"]
  > {
    throw new Error("Method not implemented.");
  }
  update<TN extends TableName>(
    _tableName: TN,
    _id: Tables[TN]["id"],
    _data: Partial<Tables[TN]>,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete<TN extends TableName>(
    _tableName: TN,
    _id: Tables[TN]["id"],
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  upsert<TN extends TableName>(
    _tableName: TN,
    _id: Tables[TN]["id"],
    _data: Tables[TN],
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
