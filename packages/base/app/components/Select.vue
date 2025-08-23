<template>
  <div class="container">
    <Listbox v-model="modelValue" v-slot="{ open }">
      <ListboxButton class="select" :class="[`select-${props.size}`, { open }]">
        {{ modelValue?.label }}
        <Icon name="material-symbols:expand-more" />
      </ListboxButton>
      <ListboxOptions class="dropdown">
        <ListboxOption
          class="dropdown-item"
          v-for="option in options"
          v-bind="option"
          :value="option"
        >
          {{ option.label }}
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>
</template>

<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

type Option = InstanceType<typeof ListboxOption>["$props"] & {
  label: string;
};

interface Props<T extends Option = Option> {
  options: T[];
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), { size: "md" });
const modelValue = defineModel<Props["options"][number]>();
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: inline-block;
  width: max-content;
}


.select {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-md;
  width: 100%;
  min-width: 10rem;
  border: 2px solid $color-border;
  border-radius: $radius-md;
  transition: border-color 0.2s ease;

  &.open {
    border-color: $color-primary-5;
  }
}

.select-sm {
  font-size: $text-sm;
  padding: $spacing-sm $spacing-md;
  height: calc(2 * $spacing-sm + 1em);
}
.select-md {
  font-size: $text-md;
  padding: $spacing-md $spacing-lg;
  height: calc(2 * $spacing-md + 1em);
}
.select-lg {
  font-size: $text-xl;
  padding: $spacing-xl $spacing-xl;
  height: calc(2 * $spacing-xl + 1em);
}

.dropdown {
  position: absolute;
  top: calc(100% + $spacing-xs);
  left: 0;
  width: max-content;
  min-width: 100%;
  background-color: $color-white;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  overflow: hidden;
  z-index: 1;

  &.hidden {
    display: none;
  }
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: $spacing-md $spacing-lg;
  transition: background-color 0.1s ease;
  cursor: pointer;

  &[aria-selected=true] {
    background-color: $color-primary-1;
  }

  &:hover, &:focus {
    background-color: $color-primary-0;
  }

  &:active {
    background-color: $color-primary-2;
  }
}
</style>
