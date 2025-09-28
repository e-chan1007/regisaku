<template>
  <div class="item-grid-header">
    合計売上:
    <span class="total">{{ formatYen(totalSales) }}</span>
  </div>
</template>

<script lang="ts" setup>
const { sales } = useSaleDatabase();
const totalSales = computed(() =>
  sales.value.reduce((acc, sale) => acc + sale.totalPrice, 0),
);
</script>

<style lang="scss" scoped>
.item-grid-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: $spacing-md;
  border-bottom: 1px solid $color-border;
  padding: $spacing-md;
  background-color: $color-white;

  .total {
    font-size: $text-2xl;
    font-weight: $font-bold;
    color: $color-primary-7;
  }
}
</style>
