<template>
  <div id="page-root" class="root">
    <RSPanelContainer :viewConfigs="viewConfigs">
      <template #item-grid="slotProps">
        <ItemGridPanel v-bind="slotProps" />
      </template>
      <template #order="slotProps">
        <OrderListPanel v-bind="slotProps" />
      </template>
      <template #calc="slotProps">
        <CalcPanel v-bind="slotProps" />
      </template>
      <template #finish="slotProps">
        <FinishPanel v-bind="slotProps" />
      </template>
    </RSPanelContainer>
  </div>
</template>

<script lang="ts" setup>
import CalcPanel from "~/features/cashier/panels/CalcPanel.vue";
import FinishPanel from "~/features/cashier/panels/FinishPanel.vue";
import ItemGridPanel from "~/features/cashier/panels/ItemGridPanel.vue";
import OrderListPanel from "~/features/cashier/panels/OrderListPanel.vue";
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
      id: "order",
      width: "30%",
    },
  ],
  [
    {
      id: "order",
      width: "30%",
    },
    {
      id: "calc",
      width: "70%",
    },
  ],
  [
    {
      id: "finish",
      width: "100%",
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
