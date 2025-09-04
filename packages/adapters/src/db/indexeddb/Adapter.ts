import {
  type AdapterContext,
  DatabaseAdapter,
} from "@e-chan1007/regisaku-adapter-sdk";
import { Database } from "./Database.js";

export interface IndexedDBAdapterConfig {
  databaseName: string;
}

export class IndexedDBAdapter extends DatabaseAdapter<IndexedDBAdapterConfig> {
  static override context = "client" as const satisfies AdapterContext;
  static readonly defaultConfig: IndexedDBAdapterConfig = {
    databaseName: "regisaku",
  };
  private db!: Database;

  override async initialize(): Promise<void> {
    this.db = new Database(this.config.databaseName);
  }
}
