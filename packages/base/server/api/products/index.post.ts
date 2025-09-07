import type { DeepOmit, Product } from "@e-chan1007/regisaku-shared/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<DeepOmit<Product, "id">>(event);
  return await useDatabase().addProduct(body);
});
