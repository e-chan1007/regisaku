<template>
  <RSPanelBody #="{ currentViewIndex }" class="wrapper" ref="panelBody">
    <CalcPriceView class="calc-price-view" />
    <CalcArea class="calc-area" />
    <RSButton
      full
      color="primary"
      variant="primary"
      :disabled="currentViewIndex >= 2 || !isReceivedAmountEnough || !paymentMethod"
      @click="finishTransaction"
    >
      お会計を完了する
    </RSButton>
  </RSPanelBody>
</template>

<script lang="ts" setup>
import type { RSPanelBody } from "#components";
import CalcArea from "../components/CalcArea.vue";
import CalcPriceView from "../components/CalcPriceView.vue";

const { orders } = storeToRefs(useOrderStore());
const {
  isReceivedAmountEnough,
  transactionDate,
  paymentMethod,
  totalAmount,
  receivedAmount,
  changeAmount,
  saleId,
} = storeToRefs(useTransactionStore());
const panelBody = ref<InstanceType<typeof RSPanelBody> | null>(null);

const { add: addSaleToDB } = useSaleDatabase();

const finishTransaction = async () => {
  if (!panelBody.value || !paymentMethod.value) return;
  transactionDate.value = new Date();
  const { id } = await addSaleToDB({
    items: orders.value.map((order) => ({
      productId: order.product.id,
      productName: order.product.name,
      quantity: order.quantity,
      unitPrice: order.product.price,
      totalPrice: order.quantity * order.product.price,
      variants: order.selectedVariants.flatMap(([variantGroup, variants]) =>
        variants.map(({ id: variantId, ...variant }) => ({
          ...variant,
          variantId,
          groupId: variantGroup.id,
          groupName: variantGroup.name,
        })),
      ),
    })),
    totalPrice: totalAmount.value,
    receivedAmount: receivedAmount.value,
    changeAmount: changeAmount.value,
    paymentMethod: paymentMethod.value.name,
    paymentMethodId: paymentMethod.value.id,
    transactionAt: transactionDate.value,
    currency: "JPY",
    discounts: [],
    note: "",
  });
  saleId.value = id;
  panelBody.value.next();
};
</script>


<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .calc-price-view {
    z-index: 0;
  }

  .calc-area {
    flex-grow: 1;
    overflow-y: auto;
    z-index: 1;
  }
}
</style>
