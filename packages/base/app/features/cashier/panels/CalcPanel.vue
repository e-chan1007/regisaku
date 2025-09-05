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

const { isReceivedAmountEnough, transactionDate, paymentMethod } = storeToRefs(
  useTransactionStore(),
);
const panelBody = ref<InstanceType<typeof RSPanelBody> | null>(null);

const finishTransaction = () => {
  if (!panelBody.value) return;
  panelBody.value.next();
  transactionDate.value = new Date();
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
