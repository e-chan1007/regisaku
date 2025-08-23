<template>
  <label class="input-group" :class="[`input-${props.size}`, { full }]">
    <slot name="prepend" />
    <input v-bind="$attrs" />
    <slot name="append" />
  </label>
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  full?: boolean;
  size?: "sm" | "md" | "lg";
}
defineSlots<{
  prepend: () => unknown;
  append: () => unknown;
}>();

const props = withDefaults(defineProps<Props>(), { full: false, size: "md" });
</script>

<style lang="scss" scoped>

.input-group {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-sm;
  min-width: 10rem;
  background-color: $color-white;
  border: 2px solid $color-border;
  border-radius: $radius-md;
  transition: border-color 0.2s;

  &:focus-within {
    border: 2px solid $color-primary-5;
  }

  &.full {
    width: 100%;
  }

  input {
    border: none;
    outline: none;
    flex: 1;
    padding: 0;
    background: transparent;
    font: inherit;
    &:focus {
      outline: none;
    }
  }
}

.input-sm {
  font-size: $text-sm;
  padding: $spacing-sm $spacing-md;
  height: calc(2 * $spacing-sm + 1em);
  input {
    font-size: $text-sm;
  }
}

.input-md {
  font-size: $text-md;
  padding: $spacing-md $spacing-lg;
  height: calc(2 * $spacing-md + 1em);
  input {
    font-size: $text-md;
  }
}

.input-lg {
  font-size: $text-xl;
  padding: $spacing-xl $spacing-xl;
  height: calc(2 * $spacing-xl + 1em);
  input {
    font-size: $text-xl;
  }
}
</style>
