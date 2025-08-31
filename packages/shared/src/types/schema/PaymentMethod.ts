import type { Branded } from "../utils/Brand.js";

export type PaymentMethodId = Branded<string, "PaymentMethodId">;

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  isHidden: boolean;
}
