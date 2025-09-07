export declare const brandSymbol: unique symbol;

export type Branded<T extends string | number, Brand> = T & {
  readonly [brandSymbol]: Brand;
};
export const brand = <T extends string | number, Brand>(
  value: T,
): Branded<T, Brand> => {
  return value as Branded<T, Brand>;
};
