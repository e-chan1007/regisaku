import type {
  MapArrayOrSingle,
  TableName,
  Tables,
} from "@e-chan1007/regisaku-shared/types";
import type {
  AbstractDatabaseAdapter,
  OperationArgDataMap,
} from "../DatabaseAdapter.js";
import { AbstractQueryBuilder } from "./AbstractQueryBuilder.js";

export class CreateQueryBuilder<
  TN extends TableName = TableName,
  TR = Tables[TN],
  Data extends OperationArgDataMap<TN, TR>["create"] = OperationArgDataMap<
    TN,
    TR
  >["create"],
> extends AbstractQueryBuilder<TN, TR> {
  constructor(
    adapter: AbstractDatabaseAdapter,
    tableName: TN,
    private _data: Data,
  ) {
    super(adapter, tableName);
  }

  execute(): Promise<MapArrayOrSingle<Data, Tables[TN]["id"]>> {
    return this._adapter._executeCreate(this.build(), this._data);
  }
}

export class GetQueryBuilder<
  TN extends TableName = TableName,
  TR = Tables[TN],
> extends AbstractQueryBuilder<TN, TR> {
  execute() {
    return this._adapter._executeGet(this.build());
  }
}

export class UpdateQueryBuilder<
  TN extends TableName = TableName,
  TR = Tables[TN],
  Data extends OperationArgDataMap<TN, TR>["update"] = OperationArgDataMap<
    TN,
    TR
  >["update"],
> extends AbstractQueryBuilder<TN, TR> {
  constructor(
    adapter: AbstractDatabaseAdapter,
    tableName: TN,
    private _data: Data,
  ) {
    super(adapter, tableName);
  }

  execute() {
    return this._adapter._executeUpdate(this.build(), this._data);
  }
}

export class DeleteQueryBuilder<
  TN extends TableName = TableName,
  TR = Tables[TN],
> extends AbstractQueryBuilder<TN, TR> {
  execute() {
    return this._adapter._executeDelete(this.build());
  }
}
