import type { TableName, Tables } from "@e-chan1007/regisaku-shared/types";
import {
  type CriteriaBuilder,
  type CriteriaNode,
  createCriteriaBuilder,
} from "./WhereCriteriaBuilder.js";

export abstract class AbstractQueryBuilder<
  TN extends TableName = TableName,
  TR = Tables[TN],
> {
  protected _whereAst?: CriteriaNode<TR>;
  protected _orderBy?: {
    key: keyof TR;
    order: "asc" | "desc";
  };
  protected _limit?: number;
  protected _offset?: number;

  where(builder: (q: CriteriaBuilder<TR>) => CriteriaNode<TR>): this {
    const q = createCriteriaBuilder<TR>();
    this._whereAst = builder(q);
    return this;
  }
  orderBy<K extends keyof TR>(key: K, order: "asc" | "desc"): this {
    this._orderBy = { key, order };
    return this;
  }

  limit(count: number): this {
    this._limit = count;
    return this;
  }

  offset(count: number): this {
    this._offset = count;
    return this;
  }

  abstract execute(): Promise<TR[]>;
}
