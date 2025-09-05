<template>
  <RSPanelBody class="wrapper" ref="panelBody">
    <div class="view-container">
      <FinishCustomerView />
      <FinishCashierView />
    </div>
    <RSButton
      full
      color="primary"
      variant="primary"
      @click="startNextTransaction"
    >
      次のお会計を始める
    </RSButton>
  </RSPanelBody>
</template>

<script lang="ts" setup>
import type { RSPanelBody } from "#components";
import FinishCashierView from "../components/FinishCashierView.vue";
import FinishCustomerView from "../components/FinishCustomerView.vue";

const { resetTransaction } = useTransactionStore();
const panelBody = useTemplateRef<InstanceType<typeof RSPanelBody>>("panelBody");

const startNextTransaction = () => {
  resetTransaction();
  panelBody.value?.setViewIndex(0, true);
};
</script>


<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.view-container {
  flex-grow: 1;
  display: flex;
  flex-direction: row;

  flex-direction: column;

  > :first-child {
    border-bottom: 1px solid $color-border;
  }
}
</style>
