import type {
  ConditionNode,
  CriteriaNode,
  Query,
} from "@e-chan1007/regisaku-adapter-sdk";
import type { DexieTables, TableName, Tables } from "./Table.js";

type TData<TN extends TableName> = Tables[TN];

/**
 * CriteriaNodeを、JavaScriptのfilterで使える述語関数((item) => boolean)に変換する
 */
function createPredicate<TN extends TableName>(
  node: CriteriaNode<TData<TN>>,
): (item: TData<TN>) => boolean {
  switch (node.type) {
    case "condition": {
      const { key, operator, value } = node;
      return (item: TData<TN>): boolean => {
        const itemValue = item[key];
        switch (operator) {
          case "eq":
            return itemValue === value;
          case "ne":
            return itemValue !== value;
          // valueの型が比較可能であると仮定
          case "gt":
            return itemValue > value;
          case "gte":
            return itemValue >= value;
          case "lt":
            return itemValue < value;
          case "lte":
            return itemValue <= value;
          case "in":
            return Array.isArray(value) && value.includes(itemValue);
          case "notIn":
            return Array.isArray(value) && !value.includes(itemValue);
          default:
            return false;
        }
      };
    }
    case "and": {
      const predicates = node.conditions.map((c) => createPredicate<TN>(c));
      return (item: TData<TN>) => predicates.every((p) => p(item));
    }
    case "or": {
      const predicates = node.conditions.map((c) => createPredicate<TN>(c));
      return (item: TData<TN>) => predicates.some((p) => p(item));
    }
  }
}

/**
 * 1つの条件(eq, gtなど)をDexieのCollectionに適用する (インデックスを利用)
 */
function applyCondition<TN extends TableName>(
  collection: DexieTables[TN],
  node: ConditionNode<TData<TN>>,
): DexieTables[TN] {
  const { key, operator, value } = node;
  const k = key as string;

  switch (operator) {
    case "eq":
      return collection.where(k).equals(value);
    case "ne":
      return collection.where(k).notEqual(value);
    case "gt":
      return collection.where(k).above(value);
    case "gte":
      return collection.where(k).aboveOrEqual(value);
    case "lt":
      return collection.where(k).below(value);
    case "lte":
      return collection.where(k).belowOrEqual(value);
    case "in":
      if (!Array.isArray(value)) {
        console.warn(
          `'in' operator used with non-array value for key "${k}". Query will be ignored.`,
        );
        return collection;
      }
      return collection.where(k).anyOf(value);
    case "notIn":
      if (!Array.isArray(value)) {
        console.warn(
          `'notIn' operator used with non-array value for key "${k}". Query will be ignored.`,
        );
        return collection;
      }
      return collection.where(k).noneOf(value);
    default:
      return collection;
  }
}

/**
 * CriteriaNodeを再帰的に解析し、Dexieのクエリを構築する
 */
function applyCriteriaNode<TN extends TableName>(
  collection: DexieTables[TN],
  node: CriteriaNode<TData<TN>>,
): DexieTables[TN] {
  switch (node.type) {
    case "condition":
      return applyCondition<TN>(collection, node);
    case "and":
      return node.conditions.reduce(
        (currentCollection, conditionNode) =>
          applyCriteriaNode<TN>(currentCollection, conditionNode),
        collection,
      );
    case "or": {
      const predicate = createPredicate<TN>(node);
      return collection.filter(predicate);
    }
  }
}

/**
 * 汎用的なQueryオブジェクトを、Dexieのクエリに変換するメイン関数
 * @param tableName 操作対象のテーブル名
 * @param initialCollection クエリを適用する最初のCollection
 * @param query クエリビルダーが生成したQueryオブジェクト
 * @returns すべての条件が適用された最終的なCollection
 */
export function buildDexieQuery<TN extends TableName>(
  initialCollection: DexieTables[TN],
  query: Query<TN, TData<TN>>,
): DexieTables[TN] {
  let collection: DexieTables[TN] = initialCollection;

  // 1. where句を適用
  if (query.where) {
    collection = applyCriteriaNode<TN>(collection, query.where);
  }

  // 2. orderByを適用
  if (query.orderBy) {
    const { key, order } = query.orderBy;
    // `keyof TData<TN>`をstringにキャスト
    collection = collection.orderBy(key as string);
    if (order === "desc") {
      collection = collection.reverse();
    }
  }

  // 3. offsetを適用
  if (query.offset) {
    collection = collection.offset(query.offset);
  }

  // 4. limitを適用
  if (query.limit) {
    collection = collection.limit(query.limit);
  }

  return collection;
}
