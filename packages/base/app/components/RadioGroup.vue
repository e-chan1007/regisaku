<template>
  <div class="container">
    <HeadlessRadioGroup v-model="modelValue">
      <slot name="label" />
      <div class="options">
        <HeadlessRadioGroupOption
          v-for="option in options"
          v-bind="option"
          :value="option"
          v-slot="{ checked, disabled }"
        >
          <button
            :class="[
              'btn',
              `btn-${size}`,
              checked && 'btn-checked'
            ]"
            :disabled="disabled"
            type="button"
          >
            <slot :option="option" :checked="checked" />
          </button>
        </HeadlessRadioGroupOption>
      </div>
    </HeadlessRadioGroup>
  </div>
</template>

<script lang="ts" setup>
import {
  RadioGroup as HeadlessRadioGroup,
  RadioGroupOption as HeadlessRadioGroupOption,
} from "@headlessui/vue";

type Option = InstanceType<typeof HeadlessRadioGroupOption>["$props"] & {
  label: string;
};

interface Props<T extends Option = Option> {
  options: T[];
}

withDefaults(defineProps<Props & { size?: "sm" | "md" | "lg" }>(), {
  options: () => [],
  size: "md",
});
const modelValue = defineModel<Props["options"][number]>();

defineSlots<{
  default: ({
    option,
    checked,
  }: {
    option: Props["options"][number];
    checked: boolean;
  }) => unknown;
  label: () => unknown;
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
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  width: auto;
  border: 2px solid $color-border;
  background-color: $color-white;
  font-weight: $font-medium;

  &:disabled {
    cursor: not-allowed;
    background-color: $color-gray-2;
  }

  &.btn-checked {
    background-color: $color-primary-8;
    border-color: $color-primary-8;
    color: $color-text-inverse;
  }

  &:hover, &:focus {
    background-color: $color-primary-7;
    border-color: $color-primary-7;
    color: $color-text-inverse;
  }

  &:active {
    background-color: $color-primary-9;
    border-color: $color-primary-9;
    color: $color-text-inverse;
  }

  & > *:not(.content) {
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

.btn-sm {
  font-size: $text-sm;
  gap: $spacing-md;
  height: calc(2 * $spacing-sm + 1em);
  border-radius: $radius-sm;
  padding: $spacing-sm $spacing-lg;
}

.btn-md {
  font-size: $text-md;
  gap: $spacing-md;
  height: calc(2 * $spacing-md + 1em);
  border-radius: $radius-md;
  padding: $spacing-md $spacing-lg;
}

.btn-lg {
  font-size: $text-xl;
  gap: $spacing-xl;
  height: calc(2 * $spacing-xl + 1em);
  border-radius: $radius-md;
  padding: $spacing-xl $spacing-xl;
}

.container {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.options {
  display: flex;
  gap: $spacing-sm;
}
</style>
