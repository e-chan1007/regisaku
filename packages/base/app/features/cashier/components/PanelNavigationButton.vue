<template>
  <RSButton full v-bind="btnProps" @click="showingGoPrev ? prev() : next()">
    <template #prepend>
      <Icon name="material-symbols:chevron-left" :class="['icon', !showingGoPrev && 'hidden']" />
    </template>
    {{ showingGoPrev ? props.prevLabel : props.nextLabel }}
    <template #append>
      <Icon name="material-symbols:chevron-right" :class="['icon', showingGoPrev && 'hidden']" />
    </template>
  </RSButton>
</template>

<script lang="ts" setup>
import type { RSButton } from "#components";

interface Props {
  toggleViewIndex: number;
  currentViewIndex: number;
  prev: () => void;
  next: () => void;
  prevLabel: string;
  nextLabel: string;
}

const props = defineProps<Props>();

const showingGoPrev = computed(
  () => props.toggleViewIndex <= props.currentViewIndex,
);

const btnProps = computed<InstanceType<typeof RSButton>["$props"]>(() => {
  if (showingGoPrev.value) {
    return {
      color: "gray",
      variant: "outlined",
    };
  }
  return {
    color: "primary",
    variant: "primary",
  };
});
</script>

<style lang="scss" scoped>
.icon {
  transition: opacity 0.2s ease, width 0.2s ease;
  &.hidden {
    opacity: 0;
    width: 0;
  }
}
</style>
