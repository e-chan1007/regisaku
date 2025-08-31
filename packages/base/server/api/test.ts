import type { DatabaseAdapter } from "@e-chan1007/regisaku-adapter-sdk";
import { IndexedDBAdapter } from "@e-chan1007/regisaku-adapters/db/indexeddb";
import type { ProductId } from "@e-chan1007/regisaku-shared/types";

export default defineEventHandler(async (event) => {
  const adapter: DatabaseAdapter = new IndexedDBAdapter();

  const v = await adapter
    .create("products", { name: "", price: 100 })
    .where((q) => q.eq("name", "qv"))
    .execute();

  const products = await adapter
    .query("products")
    .where((q) => q.eq("id", "hoge" as ProductId))
    .execute();

  const transactions = await adapter
    .query("transactions")
    .where((q) =>
      q.and(
        q.eq("currency", "JPY"),
        q.lte("amount", 100),
        q.in("id", ["100", "200"]),
      ),
    )
    .execute();
});
