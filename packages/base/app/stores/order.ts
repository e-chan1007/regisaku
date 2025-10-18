import type {
  Branded,
  Product,
  Variant,
  VariantGroup,
} from "@e-chan1007/regisaku-shared/types";
import { createId } from "@e-chan1007/regisaku-shared/utils";
import { clamp } from "remeda";
import { RS_MAX_ITEMS_PER_PRODUCT } from "~~/shared/limits";

export type OrderItemId = Branded<string, "OrderItemId">;

export type SelectedVariant = [VariantGroup, Variant[]];
export interface OrderItem {
  id: OrderItemId;
  product: Product;
  selectedVariants: SelectedVariant[];
  quantity: number;
}

export const useOrderStore = defineStore("orders", () => {
  const orders = ref<OrderItem[]>([]);

  const addOrder = (
    product: Product,
    selectedVariants: SelectedVariant[],
    quantity: number,
  ) => {
    const existingOrder = orders.value.find(
      (order) =>
        order.product.id === product.id &&
        hasSameItems(
          order.selectedVariants.flatMap(([_, v]) => v),
          selectedVariants.flatMap(([_, v]) => v),
        ),
    );
    if (existingOrder) {
      updateOrder(existingOrder.id, existingOrder.quantity + quantity);
    } else {
      orders.value.push({
        id: createId(),
        product,
        selectedVariants,
        quantity,
      });
    }
  };

  const updateOrder = (
    itemId: OrderItemId,
    quantity: number,
    selectedVariants?: SelectedVariant[],
  ) => {
    const existingOrder = orders.value.find((order) => order.id === itemId);
    if (existingOrder) {
      existingOrder.quantity = clamp(quantity, {
        max: RS_MAX_ITEMS_PER_PRODUCT,
      });
      if (selectedVariants) existingOrder.selectedVariants = selectedVariants;
    }
  };

  const removeOrder = (itemId: OrderItemId) => {
    orders.value = orders.value.filter((order) => order.id !== itemId);
  };

  const clearOrders = () => {
    orders.value = [];
  };

  const totalAmount = computed(() =>
    orders.value.reduce(
      (total, order) => total + order.product.price * order.quantity,
      0,
    ),
  );

  const quantityOf = (itemId: OrderItemId) =>
    computed({
      get: () =>
        orders.value.find((order) => order.id === itemId)?.quantity ?? 0,
      set: (value: number) => {
        if (value <= 0) {
          removeOrder(itemId);
        } else {
          updateOrder(itemId, value);
        }
      },
    });

  return {
    orders,
    addOrder,
    updateOrder,
    removeOrder,
    clearOrders,
    quantityOf,
    totalAmount,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
}
