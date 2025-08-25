import type { DatabaseAdapterClass } from "@e-chan1007/regisaku-adapter-sdk";
import { IndexedDBAdapter } from "@e-chan1007/regisaku-adapters/db/indexeddb";
import type { DeepPartial } from "@e-chan1007/regisaku-shared/types";
import { defu } from "defu";

export interface RegisakuConfig {
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
  adapters: {
    db: DatabaseAdapterClass;
  };
}

const defaultConfig: RegisakuConfig = {
  appName: "regisaku",
  tabs: ["index", "tab2", "tab3"],
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
  adapters: {
    db: IndexedDBAdapter,
  },
};

let config: RegisakuConfig | null = null;
export const defineRegisakuConfig = (
  newConfig?: DeepPartial<RegisakuConfig>,
): RegisakuConfig => {
  if (config) return config;
  config = defu(newConfig, defaultConfig);
  return config;
};
