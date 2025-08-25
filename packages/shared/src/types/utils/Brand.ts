declare const brandSymbol: unique symbol;

export type Branded<T, Brand> = T & { readonly [brandSymbol]: Brand };
