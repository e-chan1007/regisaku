<template>
  <PanelContainer :viewConfigs="viewConfigs">
    <template #panel-1="slotProps">
      <Panel1 v-bind="slotProps" />
    </template>
    <template #panel-2="slotProps">
      <Panel2 v-bind="slotProps" />
    </template>
    <template #panel-3="slotProps">
      <Panel3 v-bind="slotProps" />
    </template>
    <template #panel-4="slotProps">
      <Panel4 v-bind="slotProps" />
    </template>
  </PanelContainer>
</template>

<script lang="ts" setup>
import type { PanelView } from "~/types/Panel";

definePageMeta({
  tab: {
    label: "Home",
    icon: "material-symbols:home",
  },
});

const viewConfigs: PanelView[] = [
  [
    {
      id: "panel-1",
      width: "70%",
    },
    {
      id: "panel-2",
      width: "30%",
    },
  ],
  [
    {
      id: "panel-2",
      width: "30%",
    },
    {
      id: "panel-3",
      width: "70%",
    },
  ],
  [
    {
      id: "panel-3",
      width: "50%",
    },
    {
      id: "panel-4",
      width: "50%",
    },
  ],
];
</script>
