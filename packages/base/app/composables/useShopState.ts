const MAX_DIGITS = 8;

export const useShopState = () => {
  const shopState = useState("shop", () => ({
    total: 6984,
    received: 0,
    paymentMethod: "cash",
  }));
  return {
    total: computed({
      get: () => shopState.value.total,
      set: (value: number) => {
        shopState.value.total = value;
      },
    }),
    received: computed({
      get: () => shopState.value.received,
      set: (value: number) => {
        shopState.value.received = value;
      },
    }),
    receivedStr: computed({
      get: () => shopState.value.received.toString(),
      set: (value: string) => {
        shopState.value.received =
          parseInt(value.slice(0, MAX_DIGITS), 10) || 0;
      },
    }),
    paymentMethod: computed({
      get: () => shopState.value.paymentMethod,
      set: (value: string) => {
        shopState.value.paymentMethod = value;
      },
    }),
    change: computed(() => shopState.value.received - shopState.value.total),
    isEnough: computed(() => shopState.value.received >= shopState.value.total),
  };
};
