import type {
  DeepOmit,
  PaymentMethod,
} from "@e-chan1007/regisaku-shared/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<DeepOmit<PaymentMethod, "id">>(event);
  return await useDatabase().addPaymentMethod(body);
});
