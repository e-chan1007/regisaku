import type {
  DatabaseAdapterConfig,
  DatabaseAdapterConstructor,
} from "@e-chan1007/regisaku-adapter-sdk";
import {
  IndexedDBAdapter,
  type IndexedDBAdapterConfig,
} from "@e-chan1007/regisaku-adapters/db/indexeddb";
import type { DeepPartial } from "@e-chan1007/regisaku-shared/types";
import { defu } from "defu";

export interface RegisakuConfig<
  DBAdapterConfig extends DatabaseAdapterConfig = DatabaseAdapterConfig,
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
}

const defaultConfig: RegisakuConfig<IndexedDBAdapterConfig> = {
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
};

let config: RegisakuConfig<any> | null = null;

export function defineRegisakuConfig<AC extends DatabaseAdapterConfig>(
  newConfig?: DeepPartial<RegisakuConfig<AC>>,
): RegisakuConfig<AC> {
  if (config) return config;
  config = defu(newConfig, defaultConfig);
  return config;
}
