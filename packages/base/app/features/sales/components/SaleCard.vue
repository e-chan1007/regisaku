
<template>
  <div class="sale-card">
    <div class="row">
      <span class="label">合計金額</span>
      <span class="value price">{{ formatYen(sale.totalPrice) }}</span>
    </div>
    <div class="row">
      <span class="label">取引ID</span>
      <span class="value id">{{ sale.id }}</span>
    </div>
    <div class="row">
      <span class="label">支払い方法</span>
      <span class="value">{{ sale.paymentMethod }}</span>
    </div>
    <div class="row">
      <span class="label">日時</span>
      <span class="value">{{ formatDate(sale.transactionAt) }}</span>
    </div>
    <div class="row">
      <span class="label">購入数</span>
      <span class="value">{{ sale.items.reduce((sum, item) => sum + item.quantity, 0) }}点</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Sale } from "@e-chan1007/regisaku-shared/types";
import { formatDate } from "~/utils/formatDate";
import { formatYen } from "~/utils/formatYen";

interface Props {
  sale: Sale;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.sale-card {
  width: 100%;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background-color: $color-white;
  padding: $spacing-md;
  transition: border-color 0.2s ease, outline 0.2s ease;
  outline: 2px solid transparent;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  cursor: pointer;

  &:hover, &:focus {
    border-color: transparent;
    outline-color: $color-primary-4;
  }
  &:active {
    border-color: transparent;
    outline-color: $color-primary-6;
  }
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: $color-text-secondary;
  font-size: $text-xs;
}
.value {
  color: #222;
  font-size: $text-sm;

  &.price {
    color: $color-primary-7;
    font-size: $text-lg;
    font-weight: $font-bold;
  }
}
</style>
