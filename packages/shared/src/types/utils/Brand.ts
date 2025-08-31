declare const brandSymbol: unique symbol;

export type Branded<T, Brand> = T & { readonly [brandSymbol]: Brand };
export const brand = <T, Brand>(value: T): Branded<T, Brand> => {
  return value as Branded<T, Brand>;
};
