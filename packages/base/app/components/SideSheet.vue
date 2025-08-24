<template>
  <ClientOnly>
    <Teleport :to="parent" :disabled="!parent">
      <RSBackdrop :active="active" @click-backdrop="active = false">
        <div class="side-sheet" :class="{ active }" v-bind="$attrs">
          <slot />
        </div>
      </RSBackdrop>
    </Teleport>
  </ClientOnly>
</template>

<script lang="ts" setup>
interface Props {
  /** 開いているかどうか */
  modelValue: boolean;
  parent?: string | null;
  width?: string;
}

withDefaults(defineProps<Props>(), {
  parent: null,
  width: "50%",
});
const active = defineModel<boolean>();
</script>

<style lang="scss" scoped>
.side-sheet {
  position: absolute;
  top: 0;
  right: 0;
  width: v-bind(width);
  height: 100%;
  background-color: white;
  transform: translateX(100%);
  transition: transform 0.3s ease;

  &.active {
    transform: translateX(0);
  }
}
</style>
