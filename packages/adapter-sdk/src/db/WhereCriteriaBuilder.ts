export type ConditionNode<TR> = {
  type: "condition";
  key: keyof TR;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "notIn";
  value: TR[keyof TR] | TR[keyof TR][];
};

export type SkipCriteriaNode = false | null | undefined;

export type CriteriaNode<TR> =
  | { type: "and"; conditions: CriteriaNode<TR>[] }
  | { type: "or"; conditions: CriteriaNode<TR>[] }
  | ConditionNode<TR>;

export type CriteriaNodeLike<TR> = CriteriaNode<TR> | SkipCriteriaNode;

export type CriteriaBuilder<TR> = {
  eq<K extends keyof TR>(key: K, value: TR[K]): ConditionNode<TR>;
  ne<K extends keyof TR>(key: K, value: TR[K]): ConditionNode<TR>;
  gt<K extends keyof TR>(key: K, value: TR[K]): ConditionNode<TR>;
  gte<K extends keyof TR>(key: K, value: TR[K]): ConditionNode<TR>;
  lt<K extends keyof TR>(key: K, value: TR[K]): ConditionNode<TR>;
  lte<K extends keyof TR>(key: K, value: TR[K]): ConditionNode<TR>;
  in<K extends keyof TR>(key: K, value: TR[K][]): ConditionNode<TR>;
  notIn<K extends keyof TR>(key: K, value: TR[K][]): ConditionNode<TR>;
  and(...conds: CriteriaNodeLike<TR>[]): CriteriaNode<TR>;
  or(...conds: CriteriaNodeLike<TR>[]): CriteriaNode<TR>;
};

export function createCriteriaBuilder<TR>(): CriteriaBuilder<TR> {
  return {
    eq: (key, value) => ({ type: "condition", key, operator: "eq", value }),
    ne: (key, value) => ({ type: "condition", key, operator: "ne", value }),
    gt: (key, value) => ({ type: "condition", key, operator: "gt", value }),
    gte: (key, value) => ({ type: "condition", key, operator: "gte", value }),
    lt: (key, value) => ({ type: "condition", key, operator: "lt", value }),
    lte: (key, value) => ({ type: "condition", key, operator: "lte", value }),
    in: (key, value) => ({ type: "condition", key, operator: "in", value }),
    notIn: (key, value) => ({
      type: "condition",
      key,
      operator: "notIn",
      value,
    }),
    and: (...conds) => ({
      type: "and",
      conditions: conds.filter((v): v is CriteriaNode<TR> => !!v),
    }),
    or: (...conds) => ({
      type: "or",
      conditions: conds.filter((v): v is CriteriaNode<TR> => !!v),
    }),
  };
}

createCriteriaBuilder().and;
