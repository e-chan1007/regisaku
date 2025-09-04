<template>
  <label class="input-group" :class="[`input-${props.size}`, { full }]">
    <slot name="prepend" />
    <input v-model="modelValue" v-bind="$attrs" />
    <slot name="append" />
  </label>
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  full?: boolean;
  size?: "sm" | "md" | "lg";
  modelValue?: string | number;
}
defineSlots<{
  prepend: () => unknown;
  append: () => unknown;
}>();

const props = withDefaults(defineProps<Props>(), { full: false, size: "md" });
const modelValue = useModel(props, "modelValue");
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
  transition: border-color 0.2s, background-color 0.2s;

  &:hover, &:focus-within {
    background-color: $color-gray-0;
  }

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


@mixin input-size($name, $font, $pad-y, $pad-x, $height) {
  .input-#{$name} {
    font-size: $font;
    padding: $pad-y $pad-x;
    height: $height;
    input {
      font-size: $font;
    }
  }
}

@include input-size(sm, $text-sm, $spacing-sm, $spacing-md, calc(2 * $spacing-sm + 1em));
@include input-size(md, $text-md, $spacing-md, $spacing-lg, calc(2 * $spacing-md + 1em));
@include input-size(lg, $text-xl, $spacing-xl, $spacing-xl, calc(2 * $spacing-xl + 1em));
</style>
