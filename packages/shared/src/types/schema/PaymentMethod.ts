import type { Branded } from "../utils/Brand.js";

export type PaymentMethodID = Branded<string, "PaymentMethodID">;

export interface PaymentMethod {
  id: PaymentMethodID;
  name: string;
  isHidden: boolean;
}
