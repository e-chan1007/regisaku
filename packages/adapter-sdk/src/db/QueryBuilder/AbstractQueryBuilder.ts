import type { Entities, EntityName } from "@e-chan1007/regisaku-shared/types";
import type { AbstractDatabaseAdapter } from "../DatabaseAdapter.js";
import {
  type CriteriaBuilder,
  type CriteriaNode,
  createCriteriaBuilder,
} from "./WhereCriteriaBuilder.js";

export type DatabaseOperation =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "exists";

export type Query<EN extends EntityName, EV = Entities[EN]> = {
  entityName: EN;
  where?: CriteriaNode<EV>;
  orderBy?: {
    key: keyof EV;
    order: "asc" | "desc";
  };
  limit?: number;
  offset?: number;
};

export abstract class AbstractQueryBuilder<
  EN extends EntityName = EntityName,
  EV = Entities[EN],
  Result = unknown,
> {
  private _where?: CriteriaNode<EV>;
  private _orderBy?: {
    key: keyof EV;
    order: "asc" | "desc";
  };
  private _limit?: number;
  private _offset?: number;

  constructor(
    protected readonly _adapter: AbstractDatabaseAdapter,
    protected readonly _entityName: EN,
  ) {}

  where(builder: (q: CriteriaBuilder<EV>) => CriteriaNode<EV>): this {
    const q = createCriteriaBuilder<EV>();
    this._where = builder(q);
    return this;
  }

  orderBy<K extends keyof EV>(key: K, order: "asc" | "desc"): this {
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

  build(): Query<EN, EV> {
    return {
      entityName: this._entityName,
      where: this._where,
      orderBy: this._orderBy,
      limit: this._limit,
      offset: this._offset,
    };
  }

  abstract execute(): Promise<Result>;
}
