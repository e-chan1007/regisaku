export interface TabConfig {
  label: string;
  icon: string;
  disabled?: boolean;
}

declare module "#app" {
  interface PageMeta {
    tab?: TabConfig;
  }
}
