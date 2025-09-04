import * as R from "remeda";

export const hasSameItems = <T>(
  compareFnOrFirst: ((a: T, b: T) => number) | T[],
  ...arrays: T[][]
): boolean => {
  if (Array.isArray(compareFnOrFirst)) arrays.push(compareFnOrFirst);
  if (arrays.length < 2) return true;
  const compareFn =
    typeof compareFnOrFirst === "function"
      ? compareFnOrFirst
      : (a: T, b: T) => {
          if (a === b) return 0;
          if (typeof a === "string" && typeof b === "string")
            return a.localeCompare(b);
          return a < b ? -1 : 1;
        };
  const [first, ...rest] = R.map(arrays, R.sort(compareFn));
  return rest.every(R.isDeepEqual(first));
};
