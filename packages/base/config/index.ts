import type {
  DatabaseAdapterConfig,
  DatabaseAdapterConstructor,
  StorageAdapterConfig,
  StorageAdapterConstructor,
} from "@e-chan1007/regisaku-adapter-sdk";
import {
  IndexedDBAdapter,
  type IndexedDBAdapterConfig,
} from "@e-chan1007/regisaku-adapters/db/indexeddb";
import {
  IndexedDBStorageAdapter,
  type IndexedDBStorageAdapterConfig,
} from "@e-chan1007/regisaku-adapters/storage/indexeddb";
import type { DeepPartial } from "@e-chan1007/regisaku-shared/types";
import { defu } from "defu";

export interface RegisakuConfig<
  DBAdapterConfig extends DatabaseAdapterConfig = DatabaseAdapterConfig,
  SAdapterConfig extends StorageAdapterConfig = StorageAdapterConfig,
> {
  appName: string;
  tabs: string[];
  theme: {
    colors: {
      primary: string;
      gray: string;
      info: string;
      success: string;
      error: string;
      warning: string;
    };
  };
  db: {
    adapter: DatabaseAdapterConstructor<DBAdapterConfig>;
    config?: DBAdapterConfig;
  };
  storage: {
    adapter: StorageAdapterConstructor<SAdapterConfig>;
    config?: SAdapterConfig;
  };
}

const defaultConfig: RegisakuConfig<
  IndexedDBAdapterConfig,
  IndexedDBStorageAdapterConfig
> = {
  appName: "regisaku",
  tabs: ["/", "/products", "/sales"],
  theme: {
    colors: {
      primary: "#0063b2",
      gray: "#28292c",
      info: "#3babf6",
      success: "#22a06b",
      error: "#b91c3a",
      warning: "#c58a1c",
    },
  },
  db: {
    adapter: IndexedDBAdapter,
    config: IndexedDBAdapter.defaultConfig,
  },
  storage: {
    adapter: IndexedDBStorageAdapter,
    config: IndexedDBStorageAdapter.defaultConfig,
  },
};

let config: RegisakuConfig<DatabaseAdapterConfig, StorageAdapterConfig> | null =
  null;

export function defineRegisakuConfig<
  AC extends DatabaseAdapterConfig = IndexedDBAdapterConfig,
  SC extends StorageAdapterConfig = IndexedDBStorageAdapterConfig,
>(newConfig?: DeepPartial<RegisakuConfig<AC, SC>>): RegisakuConfig<AC, SC> {
  if (config) return config as RegisakuConfig<AC, SC>;
  config = defu(newConfig, defaultConfig) as RegisakuConfig<
    DatabaseAdapterConfig,
    StorageAdapterConfig
  >;
  return config as RegisakuConfig<AC, SC>;
}
