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
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ InputHTMLAttributes {
  modelValue?: number;
  min?: number;
  max?: number;
  full?: boolean;
  size?: "sm" | "md" | "lg";
}
const props = withDefaults(defineProps<Props>(), { full: false, size: "md" });
const modelValue = defineModel<Props["modelValue"]>({ default: 0 });

const add = (amount: number) => {
  let value = (modelValue.value ?? 0) + amount;
  if (typeof props.min !== "undefined") {
    value = Math.max(value, props.min);
  }
  if (typeof props.max !== "undefined") {
    value = Math.min(value, props.max);
  }
  modelValue.value = value;
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

.input-sm {
  font-size: $text-sm;
  height: calc(2 * $spacing-sm + 1em);
  border-radius: $radius-sm;
  input {
    font-size: $text-sm;
    padding: $spacing-sm;
  }
}

.btn-decrement {
  border-top-left-radius: $radius-sm;
  border-bottom-left-radius: $radius-sm;
}

.btn-increment {
  border-top-right-radius: $radius-sm;
  border-bottom-right-radius: $radius-sm;
}

.input-md {
  font-size: $text-md;
  height: calc(2 * $spacing-md + 1em);
  input {
    font-size: $text-md;
    padding: $spacing-md;
  }
}

.input-lg {
  font-size: $text-xl;
  height: calc(2 * $spacing-xl + 1em);
  input {
    font-size: $text-xl;
    padding: $spacing-xl;
  }
}
</style>
