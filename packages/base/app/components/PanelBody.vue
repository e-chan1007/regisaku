<template>
  <div class="panel-body" :class="{ 'no-padding': noPadding }">
    <slot v-bind="props" />
  </div>
</template>

<script lang="ts" setup>
import type { PanelChildProps } from "~/types/Panel";

interface Props extends Partial<PanelChildProps> {
  noPadding?: boolean;
}

const props = defineProps<Props>() as Required<Props>;
defineSlots<{ default: (props: PanelChildProps) => unknown }>();
defineExpose(props);
</script>

<style lang="scss" scoped>
.panel-body {
  width: 100%;
  padding: $spacing-lg;
  background-color: $color-white;
  border-radius: $radius-md;

  &.no-padding {
    padding: 0;
  }
}
</style>
