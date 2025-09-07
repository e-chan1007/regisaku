<template>
  <label>
    <span class="label"><slot name="label" />{{ label }}</span>
    <div>
      <slot />
    </div>
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string;
}>();

defineSlots<{
  default: () => unknown;
  label: () => unknown;
}>();
</script>

<style lang="scss" scoped>
label {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: $spacing-xs;
  .label {
    font-weight: $font-medium;
  }
}
</style>
