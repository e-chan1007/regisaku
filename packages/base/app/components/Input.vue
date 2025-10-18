<template>
  <label class="input-group" :class="[`input-${props.size}`, { full }]">
    <slot name="prepend" />
    <input v-model="value" v-bind="$attrs" />
    <slot name="append" />
  </label>
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes, InputTypeHTMLAttribute } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  type?: InputTypeHTMLAttribute;
  full?: boolean;
  size?: "sm" | "md" | "lg";
  modelValue?: string | number;
  maxlength?: number;
}
defineSlots<{
  prepend: () => unknown;
  append: () => unknown;
}>();

const props = withDefaults(defineProps<Props>(), { full: false, size: "md" });
const modelValue = useModel(props, "modelValue");

const value = ref<string | number | undefined>(modelValue.value);

watch(value, (newValue, oldValue) => {
  if (props.maxlength) {
    value.value = newValue = String(newValue).slice(0, props.maxlength);
  }
  if (props.type === "number") {
    const _newValue = Number(newValue);
    if (isNaN(_newValue) && newValue !== "") {
      newValue = oldValue;
    } else {
      newValue = _newValue;
    }
  }
  modelValue.value = newValue;
});
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
