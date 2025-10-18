<template>
  <div class="item-grid-header">
    <div>
      合計売上:
      <span class="total">{{ formatYen(totalSales) }}</span>
    </div>
    <RSButton size="sm" color="primary" @click="exportSalesCSV">CSVファイルとして出力</RSButton>
  </div>
</template>

<script lang="ts" setup>
import { exportSalesCSV } from "../utils/exportCSV";

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
  justify-content: space-between;
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
