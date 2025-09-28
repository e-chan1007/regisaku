<template>
  <label class="input-group" :class="[`input-${props.size}`, { full }]">
    <textarea v-model="modelValue" v-bind="$attrs" />
  </label>
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  full?: boolean;
  size?: "sm" | "md" | "lg";
  modelValue?: string | number;
}

const props = withDefaults(defineProps<Props>(), { full: false, size: "md" });
const modelValue = useModel(props, "modelValue");
</script>

<style lang="scss" scoped>

.input-group {
  display: block;
  min-width: 10rem;
  background-color: $color-white;
  border: 2px solid $color-border;
  border-radius: $radius-md;
  transition: border-color 0.2s, background-color 0.2s;
  overflow: hidden;

  &:hover, &:focus-within {
    background-color: $color-gray-0;
  }

  &:focus-within {
    border: 2px solid $color-primary-5;
  }

  &.full {
    width: 100%;
  }

  textarea {
    border: none;
    outline: none;
    flex: 1;
    padding: 0;
    background: transparent;
    resize: vertical;
    min-height: 4em;
    line-height: 1.5;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}


@mixin input-size($name, $font, $pad) {
  .input-#{$name} {
    textarea {
      font-size: $font;
      padding: $pad;
      font-size: $font;
    }
  }
}

@include input-size(sm, $text-sm, $spacing-xs);
@include input-size(md, $text-md, $spacing-sm);
@include input-size(lg, $text-xl, $spacing-lg);
</style>
