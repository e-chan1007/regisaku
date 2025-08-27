import type { TableName, Tables } from "@e-chan1007/regisaku-shared/types";
import type { AbstractDatabaseAdapter } from "../DatabaseAdapter.js";
import {
  type CriteriaBuilder,
  type CriteriaNode,
  createCriteriaBuilder,
} from "./WhereCriteriaBuilder.js";

export type DatabaseOperation = "create" | "get" | "update" | "delete";

export type Query<TN extends TableName, TR = Tables[TN]> = {
  tableName: TN;
  where?: CriteriaNode<TR>;
  orderBy?: {
    key: keyof TR;
    order: "asc" | "desc";
  };
  limit?: number;
  offset?: number;
};

export abstract class AbstractQueryBuilder<
  TN extends TableName = TableName,
  TR = Tables[TN],
  Result = unknown,
> {
  private _where?: CriteriaNode<TR>;
  private _orderBy?: {
    key: keyof TR;
    order: "asc" | "desc";
  };
  private _limit?: number;
  private _offset?: number;

  constructor(
    protected _adapter: AbstractDatabaseAdapter,
    protected _tableName: TN,
  ) {}

  where(builder: (q: CriteriaBuilder<TR>) => CriteriaNode<TR>): this {
    const q = createCriteriaBuilder<TR>();
    this._where = builder(q);
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

  build(): Query<TN, TR> {
    return {
      tableName: this._tableName,
      where: this._where,
      orderBy: this._orderBy,
      limit: this._limit,
      offset: this._offset,
    };
  }

  abstract execute(): Promise<Result>;
}
