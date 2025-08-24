<template>
  <button :class="['btn', `btn-${variant}`, `btn-${color}`, `btn-${size}`, `btn-${type}`, full && 'btn-full']" :disabled="disabled">
    <slot name="prepend" />
    <span class="content">
      <slot />
    </span>
    <slot name="append" />
  </button>
</template>

<script lang="ts" setup>
import type { ColorKey } from "~/types/Color";

interface Props {
  color?: ColorKey;
  variant?: "primary" | "secondary" | "outlined" | "text";
  size?: "sm" | "md" | "lg";
  type?: "normal" | "square" | "rounded" | "circle";
  full?: boolean;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  color: "gray",
  variant: "primary",
  size: "md",
  type: "normal",
  disabled: false,
});

defineSlots<{
  default: () => unknown;
  prepend: () => unknown;
  append: () => unknown;
}>();
</script>

<style lang="scss" scoped>
.btn {
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  width: auto;
  border: 2px solid transparent;
  font-weight: $font-medium;

  &:disabled {
    cursor: not-allowed;
  }

  *:not(.content) {
    flex-shrink: 0;
  }
}

.content {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: $spacing-xs;
  flex-grow: 1;
}

.btn-rounded, .btn-circle {
  border-radius: $radius-full;
}

.btn-square, .btn-circle {
  aspect-ratio: 1;
}

.btn-full {
  width: 100%;
}

@mixin btn-size($name, $font, $gap, $height, $pad-y, $pad-x, $radius) {
  .btn-#{$name} {
    font-size: $font;
    gap: $gap;
    height: $height;
    &.btn-normal, &.btn-square {
      border-radius: $radius;
    }
    &.btn-normal, &.btn-rounded {
      padding: $pad-y $pad-x;
    }
    &.btn-square, &.btn-circle {
      padding: $pad-y;
    }
  }
}

@include btn-size(sm, $text-sm, $spacing-md, calc(2 * $spacing-sm + 1em), $spacing-sm, $spacing-lg, $radius-sm);
@include btn-size(md, $text-md, $spacing-md, calc(2 * $spacing-md + 1em), $spacing-md, $spacing-lg, $radius-md);
@include btn-size(lg, $text-xl, $spacing-xl, calc(2 * $spacing-xl + 1em), $spacing-xl, $spacing-xl, $radius-md);

.btn-sm {
  &.btn-square, &.btn-circle {
    font-size: $text-md;
  }
}

@include each-color using ($color, $palette) {
  .btn-#{$color} {
    &.btn-primary {
      background: list.nth($palette, 9);
      color: $color-text-inverse;

      &:hover, &:focus {
        background-color: list.nth($palette, 8);
      }

      &:active {
        background-color: list.nth($palette, 10);
      }

      &:disabled {
        background-color: $color-gray-3;
      }
    }

    &.btn-secondary {
      background-color: list.nth($palette, 2);
      color: list.nth($palette, 9);

      &:hover, &:focus {
        background-color: list.nth($palette, 3);
      }

      &:active {
        background-color: list.nth($palette, 4);
      }

      &:disabled {
        background-color: $color-gray-2;
      }
    }

    &.btn-outlined {
      border: 2px solid list.nth($palette, 4);
      background-color: transparent;
      color: list.nth($palette, 8);

      &:hover, &:focus {
        background-color: list.nth($palette, 1);
      }

      &:active {
        background-color: list.nth($palette, 2);
      }

      &:disabled {
        background-color: $color-gray-2;
      }
    }

    &.btn-text {
      background-color: transparent;
      color: list.nth($palette, 8);

      &:hover, &:focus {
        background-color: list.nth($palette, 2);
        border: 2px solid list.nth($palette, 2);
      }

      &:active {
        background-color: list.nth($palette, 3);
        border: 2px solid list.nth($palette, 3);
      }

      &:disabled {
        color: $color-text-secondary;
      }
    }
  }
}
</style>
