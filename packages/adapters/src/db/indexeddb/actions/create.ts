import type { CreateArgs } from "@e-chan1007/regisaku-adapter-sdk";
import type {
  ArrayOrSingle,
  DiscountId,
  Entities,
  MapArrayOrSingle,
  PartialBy,
  PaymentMethodId,
  ProductId,
  RootEntityName,
  SaleId,
} from "@e-chan1007/regisaku-shared/types";
import { createId } from "@e-chan1007/regisaku-shared/utils";
import type { Database } from "../Database.js";
import type { DexieTables, TableName, Tables } from "../Table.js";

type _CreateSchema = {
  discount: PartialBy<Entities["discount"], "id">;
  paymentMethod: PartialBy<Entities["paymentMethod"], "id">;
  product: PartialBy<Entities["product"], "id">;
  sale: PartialBy<Entities["sale"], "id">;
};

export type CreateSchema = {
  [K in RootEntityName]: _CreateSchema[K];
};

async function addTo<
  TN extends TableName,
  Base,
  ID extends Tables[TN]["id"] = Tables[TN]["id"],
>(
  table: DexieTables[TN],
  baseData: ArrayOrSingle<Base>,
  fillFn: (data: Base) => Tables[TN],
): Promise<MapArrayOrSingle<typeof baseData, ID>> {
  const data: Base[] = Array.isArray(baseData) ? baseData : [baseData];
  const filledData = data.map((item) =>
    fillFn ? fillFn(item) : item,
  ) as Tables[TN][];
  const addedIds = await table.bulkAdd(filledData, { allKeys: true });

  return (Array.isArray(baseData) ? addedIds : addedIds[0]) as MapArrayOrSingle<
    typeof baseData,
    ID
  >;
}

export const create = async <T extends CreateArgs<CreateSchema>>(
  db: Database,
  ...[entityName, data]: T
): Promise<MapArrayOrSingle<T[1], Entities[T[0]]["id"]>> => {
  switch (entityName) {
    case "discount": {
      return addTo(db.discounts, data, (item) => ({
        ...item,
        id: createId<DiscountId>(),
      })) as Promise<MapArrayOrSingle<T[1], DiscountId>>;
    }
    case "paymentMethod": {
      return addTo(db.paymentMethods, data, (item) => ({
        ...item,
        id: createId<PaymentMethodId>(),
      })) as Promise<MapArrayOrSingle<T[1], PaymentMethodId>>;
    }
    case "product": {
      return addTo(db.products, data, (item) => ({
        ...item,
        id: createId<ProductId>(),
      })) as Promise<MapArrayOrSingle<T[1], ProductId>>;
    }
    case "sale": {
      return addTo(db.sales, data, (item) => ({
        ...item,
        id: createId<SaleId>(),
      })) as Promise<MapArrayOrSingle<T[1], SaleId>>;
    }
  }
};
