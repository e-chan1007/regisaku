export type ConditionNode<EV> = {
  type: "condition";
  key: keyof EV;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "notIn";
  value: EV[keyof EV] | EV[keyof EV][];
};

export type SkipCriteriaNode = false | null | undefined;

export type CriteriaNode<EV> =
  | { type: "and"; conditions: CriteriaNode<EV>[] }
  | { type: "or"; conditions: CriteriaNode<EV>[] }
  | ConditionNode<EV>;

export type CriteriaNodeLike<EV> = CriteriaNode<EV> | SkipCriteriaNode;

export type CriteriaBuilder<EV> = {
  eq<K extends keyof EV>(key: K, value: EV[K]): ConditionNode<EV>;
  ne<K extends keyof EV>(key: K, value: EV[K]): ConditionNode<EV>;
  gt<K extends keyof EV>(key: K, value: EV[K]): ConditionNode<EV>;
  gte<K extends keyof EV>(key: K, value: EV[K]): ConditionNode<EV>;
  lt<K extends keyof EV>(key: K, value: EV[K]): ConditionNode<EV>;
  lte<K extends keyof EV>(key: K, value: EV[K]): ConditionNode<EV>;
  in<K extends keyof EV>(key: K, value: EV[K][]): ConditionNode<EV>;
  notIn<K extends keyof EV>(key: K, value: EV[K][]): ConditionNode<EV>;
  and(...conds: CriteriaNodeLike<EV>[]): CriteriaNode<EV>;
  or(...conds: CriteriaNodeLike<EV>[]): CriteriaNode<EV>;
};

export function createCriteriaBuilder<EV>(): CriteriaBuilder<EV> {
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
      conditions: conds.filter((v): v is CriteriaNode<EV> => !!v),
    }),
    or: (...conds) => ({
      type: "or",
      conditions: conds.filter((v): v is CriteriaNode<EV> => !!v),
    }),
  };
}
