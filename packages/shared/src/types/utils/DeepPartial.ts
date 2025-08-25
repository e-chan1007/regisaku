export type DeepPartial<T> = T extends Array<infer U>
  ? Array<U>
  : T extends object
    ? {
        // biome-ignore lint/complexity/noBannedTypes: its type is too complex
        [P in keyof T]?: T[P] extends Function ? T[P] : DeepPartial<T[P]>;
      }
    : T;
