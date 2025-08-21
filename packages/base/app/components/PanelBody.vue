<template>
  <div class="panel-body">
    <RSHeading level="1" v-if="title">{{ title }}</RSHeading>
    <slot v-bind="props" />
  </div>
</template>

<script lang="ts" setup>
import type { PanelChildProps } from "~/types/Panel";

interface Props extends Partial<PanelChildProps> {
  title?: string;
}

const props = defineProps<Props>() as Required<Props>;
defineSlots<{ default: (props: PanelChildProps) => unknown }>();
</script>

<style lang="scss" scoped>
.panel-body {
  width: 100%;
  padding: $spacing-lg;
  background-color: $color-white;
  border-radius: $radius-md;
}
</style>
