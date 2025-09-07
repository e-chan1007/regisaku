import { brandSymbol } from "./Brand.js";

export type DeepPartial<T> = T extends Array<infer U>
  ? Array<U>
  : T extends object
    ? {
        // biome-ignore lint/complexity/noBannedTypes: its type is too complex
        [P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>;
      }
    : T;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DeepOmit<T, K> = T extends Array<infer U>
  ? Array<DeepOmit<U, K>>
  : T extends { [brandSymbol]: unknown }
    ? T
    : T extends Date
      ? T
      : T extends object
        ? {
            [P in keyof T as P extends K ? never : P]: DeepOmit<T[P], K>;
          }
        : T;
