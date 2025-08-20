export interface TabConfig {
  order: number;
  label: string;
  icon: string;
}

declare module "#app" {
  interface PageMeta {
    tab?: TabConfig;
  }
}
