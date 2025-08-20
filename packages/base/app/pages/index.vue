<template>
  <PanelContainer v-bind="{ panels, viewConfigs }" />
</template>

<script lang="ts" setup>
import Panel1 from "~/components/Panel1.vue";
import Panel2 from "~/components/Panel2.vue";
import Panel3 from "~/components/Panel3.vue";
import Panel4 from "~/components/Panel4.vue";

import type { PanelConfig, ViewConfig } from "~/types/Panel";

definePageMeta({
  tab: {
    order: 0,
    label: "Home",
    icon: "material-symbols:home",
  },
});

const panels: PanelConfig[] = [
  {
    id: "panel-1",
    component: Panel1,
  },
  {
    id: "panel-2",
    component: Panel2,
  },
  {
    id: "panel-3",
    component: Panel3,
  },
  {
    id: "panel-4",
    component: Panel4,
  },
];

const viewConfigs: ViewConfig[] = [
  {
    panels: [
      {
        id: "panel-1",
        width: "70%",
      },
      {
        id: "panel-2",
        width: "30%",
      },
    ],
  },
  {
    panels: [
      {
        id: "panel-2",
        width: "30%",
      },
      {
        id: "panel-3",
        width: "70%",
      },
    ],
  },
  {
    panels: [
      {
        id: "panel-3",
        width: "50%",
      },
      {
        id: "panel-4",
        width: "50%",
      },
    ],
  },
];
</script>
