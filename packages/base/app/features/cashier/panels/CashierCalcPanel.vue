<template>
  <RSPanelBody #="{ next, currentViewIndex }" class="wrapper">
    <CashierCalcPriceReversedView />
    <CashierCalcArea class="calc-area" />
    <RSButton
      full
      color="primary"
      variant="primary"
      :disabled="currentViewIndex >= 2 || !isEnough"
      @click="next"
    >
      お会計を終了する
    </RSButton>
  </RSPanelBody>
</template>

<script lang="ts" setup>
import CashierCalcArea from "../components/CashierCalcArea.vue";
import CashierCalcPriceReversedView from "../components/CashierCalcPriceReversedView.vue";

const { isEnough } = useShopState();
</script>


<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .calc-area {
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>
