import type { DeepOmit, Sale } from "@e-chan1007/regisaku-shared/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<DeepOmit<Sale, "id">>(event);
  return await useDatabase().addSale(body);
});
