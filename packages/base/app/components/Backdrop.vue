<template>
  <div class="backdrop" :class="{ active, absolute }" @click.self="$emit('clickBackdrop')" :aria-hidden="!active">
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  active?: boolean;
  absolute?: boolean;
}

withDefaults(defineProps<Props>(), { active: true, absolute: true });
defineEmits<(e: "clickBackdrop") => void>();
</script>

<style lang="scss" scoped>
.backdrop {
  background-color: rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  overflow: hidden;
  user-select: none;

  &.absolute {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
  }

  &.active {
    opacity: 1;
    pointer-events: all;
    user-select: all;
  }
}
</style>
