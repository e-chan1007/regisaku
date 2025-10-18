<template>
  <label class="file-input-group" :class="[`input-${props.size}`, { full }]">
    <slot name="prepend" />
    <input
      ref="fileInputRef"
      type="file"
      v-bind="$attrs"
      @change="handleFileChange"
      class="file-input-hidden"
    />
    <div class="file-input-display">
      <span v-if="fileName" class="file-name">{{ fileName }}</span>
      <span v-else class="placeholder">{{ placeholder }}</span>
    </div>
    <slot name="append">
      <button
        v-if="clearable && modelValue"
        type="button"
        class="file-input-clear"
        @click="handleClear"
        title="選択解除"
      >
        <Icon name="material-symbols:close" />
      </button>
    </slot>
  </label>
</template>

<script lang="ts" setup>
import type { InputHTMLAttributes } from "vue";

interface Props extends /* @vue-ignore */ Omit<InputHTMLAttributes, "type"> {
  full?: boolean;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  modelValue?: File | null;
  clearable?: boolean;
}

defineSlots<{
  prepend?: () => unknown;
  append?: () => unknown;
}>();

const props = withDefaults(defineProps<Props>(), {
  full: false,
  size: "md",
  placeholder: "ファイルを選択",
  clearable: false,
});

const modelValue = defineModel<File | null>("modelValue");
const fileInputRef = ref<HTMLInputElement | null>(null);

const fileName = computed(() => {
  if (modelValue.value) {
    return modelValue.value.name;
  }
  return "";
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] || null;
  modelValue.value = file;
};

const handleButtonClick = () => {
  fileInputRef.value?.click();
};

const handleClear = () => {
  modelValue.value = null;
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};
</script>

<style lang="scss" scoped>
.file-input-group {
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
  cursor: pointer;

  &:hover,
  &:focus-within {
    background-color: $color-gray-0;
  }

  &:focus-within {
    border: 2px solid $color-primary-5;
  }

  &.full {
    width: 100%;
  }

  .file-input-hidden {
    display: none;
  }

  .file-input-display {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .file-name {
      color: $color-text;
    }

    .placeholder {
      color: $color-gray-5;
    }
  }

  .file-input-button {
    flex-shrink: 0;
    background-color: $color-primary-5;
    color: $color-white;
    border: none;
    border-radius: $radius-sm;
    padding: $spacing-xs $spacing-md;
    cursor: pointer;
    font-size: inherit;
    font-weight: $font-medium;
    transition: background-color 0.2s;

    &:hover {
      background-color: $color-primary-6;
    }

    &:active {
      background-color: $color-primary-7;
    }
  }

  .file-input-clear {
    flex-shrink: 0;
    background-color: transparent;
    color: $color-gray-6;
    border: none;
    border-radius: $radius-sm;
    width: 2em;
    height: 2em;
    cursor: pointer;
    font-size: 1.2em;
    font-weight: bold;
    line-height: 1;
    transition: color 0.2s, background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: $color-gray-1;
      color: $color-error;
    }

    &:active {
      background-color: $color-gray-2;
    }
  }
}

@mixin input-size($name, $font, $pad-y, $pad-x, $height) {
  .input-#{$name} {
    font-size: $font;
    padding: $pad-y $pad-x;
    height: $height;
  }
}

@include input-size(
  sm,
  $text-sm,
  $spacing-sm,
  $spacing-md,
  calc(2 * $spacing-sm + 1em)
);
@include input-size(
  md,
  $text-md,
  $spacing-md,
  $spacing-lg,
  calc(2 * $spacing-md + 1em)
);
@include input-size(
  lg,
  $text-xl,
  $spacing-xl,
  $spacing-xl,
  calc(2 * $spacing-xl + 1em)
);
</style>
