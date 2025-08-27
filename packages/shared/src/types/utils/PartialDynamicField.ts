import type { PartialBy } from "./Partial.js";

export type DefaultPartialFields = "id" | "createdAt" | "updatedAt";

export type PartialDynamicField<T> = PartialBy<
  T,
  Extract<DefaultPartialFields, keyof T>
>;
