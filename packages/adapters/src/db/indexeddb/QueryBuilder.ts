import { QueryBuilder } from "@e-chan1007/regisaku-adapter-sdk";
import type { TableName, Tables } from "@e-chan1007/regisaku-shared/types";

export class IndexedDBQueryBuilder<
  TN extends TableName = TableName,
  TR extends Tables[TN] = Tables[TN],
> extends QueryBuilder<TN> {
  execute(): Promise<TR[]> {
    console.log("IndexedDB: executed. ", this._whereAst);
    return Promise.resolve([]);
  }
}
