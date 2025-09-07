import type { PaymentMethod, SaleId } from "@e-chan1007/regisaku-shared/types";
import { RS_MAX_DIGITS } from "~~/shared/limits";

export const useTransactionStore = defineStore("transaction", () => {
  const { clearOrders } = useOrderStore();
  const { totalAmount } = storeToRefs(useOrderStore());
  const { paymentMethods } = storeToRefs(useShopStore());

  const saleId = ref<SaleId | null>(null);
  const transactionDate = ref(new Date());
  const receivedAmount = ref(0);

  const receivedAmountStr = computed({
    get: () => receivedAmount.value.toString(),
    set: (value: string) => {
      receivedAmount.value = parseInt(value.slice(0, RS_MAX_DIGITS), 10) || 0;
    },
  });

  const paymentMethod = ref<PaymentMethod | undefined>(paymentMethods.value[0]);
  const changeAmount = computed(() => receivedAmount.value - totalAmount.value);
  const isReceivedAmountEnough = computed(
    () => receivedAmount.value >= totalAmount.value,
  );

  function resetTransaction() {
    saleId.value = null;
    clearOrders();
    receivedAmount.value = 0;
  }

  return {
    saleId,
    transactionDate,
    totalAmount,
    receivedAmount,
    receivedAmountStr,
    paymentMethod,
    changeAmount,
    isReceivedAmountEnough,
    resetTransaction,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionStore, import.meta.hot));
}
