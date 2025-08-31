import type { Query } from "@e-chan1007/regisaku-adapter-sdk";
import type {
  Entities,
  RootEntityName,
} from "@e-chan1007/regisaku-shared/types";
import type { Database } from "../Database.js";

export const read = async <EN extends RootEntityName, EV = Entities[EN]>(
  db: Database,
  query: Query<EN, EV>,
): Promise<EV[]> => {};
