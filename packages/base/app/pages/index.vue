<template>
  <div id="page-root" class="root">
    <RSPanelContainer :viewConfigs="viewConfigs">
      <template #item-grid="slotProps">
        <CashierItemGridPanel v-bind="slotProps" />
      </template>
      <template #cart="slotProps">
        <CashierCartPanel v-bind="slotProps" />
      </template>
      <template #calc="slotProps">
        <CashierCalcPanel v-bind="slotProps" />
      </template>
      <template #panel-4="slotProps">
        <RSPanel4 v-bind="slotProps" />
      </template>
    </RSPanelContainer>
  </div>
</template>

<script lang="ts" setup>
import CashierCalcPanel from "~/features/cashier/panels/CashierCalcPanel.vue";
import CashierCartPanel from "~/features/cashier/panels/CashierCartPanel.vue";
import CashierItemGridPanel from "~/features/cashier/panels/CashierItemGridPanel.vue";
import type { PanelView } from "~/types/Panel";

definePageMeta({
  tab: {
    label: "会計",
    icon: "material-symbols:contextual-token-add",
  },
  keepalive: true,
});

const viewConfigs: PanelView[] = [
  [
    {
      id: "item-grid",
      width: "70%",
    },
    {
      id: "cart",
      width: "30%",
    },
  ],
  [
    {
      id: "cart",
      width: "30%",
    },
    {
      id: "calc",
      width: "70%",
    },
  ],
  [
    {
      id: "calc",
      width: "70%",
    },
    {
      id: "panel-4",
      width: "30%",
    },
  ],
];
</script>

<style lang="scss" scoped>
.root {
  position: relative;
  height: 100%;
}
</style>
