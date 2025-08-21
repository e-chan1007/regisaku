<template>
  <div class="addsub-btn">
    <RSButton type="circle" variant="secondary" color="error" size="sm">
      <Icon name="material-symbols:remove" />
    </RSButton>
    <span>{{ amount }}</span>
    <RSButton type="circle" variant="secondary" color="success"  size="sm">
      <Icon name="material-symbols:add" />
    </RSButton>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  amount: number;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.addsub-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-xs;
  padding: $spacing-sm;
  background-color: $color-gray-0;
  border-radius: $radius-md;
  font-size: $text-sm;
}
</style>
