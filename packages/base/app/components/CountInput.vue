<template>
  <div class="input-group" :class="[`input-${size}`, { full }]">
    <button class="btn-decrement" @click="add(-1)">
      <Icon name="material-symbols:remove" />
    </button>
    <input v-bind="$attrs" v-model.number="modelValue" />
    <button class="btn-increment" @click="add(1)">
      <Icon name="material-symbols:add" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { clamp } from "remeda";
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  modelValue?: number;
  min?: number;
  max?: number;
  full?: boolean;
  size?: "sm" | "md" | "lg";
}
const { min, max } = withDefaults(defineProps<Props>(), {
  full: false,
  size: "md",
});
const modelValue = defineModel<Props["modelValue"]>({ default: 0 });

const add = (amount: number) => {
  modelValue.value = clamp((modelValue.value ?? 0) + amount, { min, max });
};
</script>

<style lang="scss" scoped>
.input-group {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
  background-color: $color-white;
  border: 2px solid $color-border;
  border-radius: $radius-md;
  transition: border-color 0.2s;
  overflow: hidden;

  &:focus-within {
    border: 2px solid $color-primary-5;
  }

  &.full {
    width: 100%;
  }

  input {
    border-block: none;
    border-inline: 1px solid $color-border;
    outline: none;
    flex: 1;
    padding: 0;
    width: 4em;
    min-width: 2rem;
    background: transparent;
    text-align: center;

    &:focus {
      outline: none;
    }
  }

  button {
    display: grid;
    place-items: center;
    height: 100%;
    aspect-ratio: 1;
    transition: background-color 0.2s ease;
    overflow: hidden;

    &:hover, &:focus {
      background-color: $color-gray-1;
    }

    &:active {
      background-color: $color-gray-2;
    }
  }
}


@mixin countinput-size($name, $font, $height, $radius, $pad) {
  .input-#{$name} {
    font-size: $font;
    height: $height;
    border-radius: $radius;
    input {
      font-size: $font;
      padding: $pad;
    }
  }
  .btn-decrement {
    border-top-left-radius: $radius;
    border-bottom-left-radius: $radius;
  }
  .btn-increment {
    border-top-right-radius: $radius;
    border-bottom-right-radius: $radius;
  }
}

@include countinput-size(sm, $text-sm, calc(2 * $spacing-sm + 1em), $radius-sm, $spacing-sm);
@include countinput-size(md, $text-md, calc(2 * $spacing-md + 1em), $radius-md, $spacing-md);
@include countinput-size(lg, $text-xl, calc(2 * $spacing-xl + 1em), $radius-md, $spacing-xl);
</style>
