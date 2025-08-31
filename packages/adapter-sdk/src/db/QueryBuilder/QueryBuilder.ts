import type { Entities, EntityName } from "@e-chan1007/regisaku-shared/types";
import type {
  AbstractDatabaseAdapter,
  OperationArgDataMap,
} from "../DatabaseAdapter.js";
import { AbstractQueryBuilder } from "./AbstractQueryBuilder.js";

export class ReadQueryBuilder<
  EN extends EntityName = EntityName,
  EV = Entities[EN],
> extends AbstractQueryBuilder<EN, EV> {
  execute() {
    return this._adapter._executeRead(this.build());
  }
}

export class UpdateQueryBuilder<
  EN extends EntityName = EntityName,
  EV = Entities[EN],
  Data extends OperationArgDataMap<EN, EV>["update"] = OperationArgDataMap<
    EN,
    EV
  >["update"],
> extends AbstractQueryBuilder<EN, EV> {
  constructor(
    adapter: AbstractDatabaseAdapter,
    entityName: EN,
    private _data: Data,
  ) {
    super(adapter, entityName);
  }

  execute() {
    return this._adapter._executeUpdate(this.build(), this._data);
  }
}

export class DeleteQueryBuilder<
  EN extends EntityName = EntityName,
  EV = Entities[EN],
> extends AbstractQueryBuilder<EN, EV> {
  execute() {
    return this._adapter._executeDelete(this.build());
  }
}

export class ExistsQueryBuilder<
  EN extends EntityName = EntityName,
  EV = Entities[EN],
> extends AbstractQueryBuilder<EN, EV, boolean> {
  execute() {
    return this._adapter._executeExists(this.build());
  }
}
