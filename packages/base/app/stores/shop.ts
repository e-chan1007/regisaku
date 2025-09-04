import type {
  PaymentMethod,
  PaymentMethodId,
} from "@e-chan1007/regisaku-shared/types";

export const useShopStore = defineStore("shop", () => {
  const paymentMethods = ref<PaymentMethod[]>([
    {
      id: "cash" as PaymentMethodId,
      name: "現金",
      isHidden: false,
    },
    {
      id: "card" as PaymentMethodId,
      name: "クレジットカード",
      isHidden: false,
    },
    {
      id: "qr" as PaymentMethodId,
      name: "QRコード決済",
      isHidden: false,
    },
  ]);

  return { paymentMethods };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useShopStore, import.meta.hot));
}
