<template>
  <component :is="tag"><slot/></component>
</template>

<script lang="ts" setup>
interface Props {
  level: "1" | "2" | "3";
}

const { level } = defineProps<Props>();
const tag = `h${level}`;
</script>

<style lang="scss" scoped>
h1 {
  font-size: $text-2xl;
  font-weight: $font-bold;
}

h2 {
  font-size: $text-lg;
  padding-bottom: $spacing-xs;
  border-bottom: 2px solid $color-primary-5;
  font-weight: $font-bold;
}

h3 {
  color: $color-primary-8;
  font-weight: $font-bold;
}
</style>
