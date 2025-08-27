export type ArrayOrSingle<T> = T | T[];
export type MapArrayOrSingle<
  T extends ArrayOrSingle<V>,
  U = unknown,
  V = unknown,
> = T extends V[] ? U[] : U;
