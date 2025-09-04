<template>
  <div class="wrapper">
    <h2 class="title">
      <Icon name="material-symbols:check-circle" class="icon" />
      お会計が完了しました
    </h2>
    <div class="details-price">
      <div class="detail-item">
        <span class="label">合計金額</span>
        <span class="value">{{ formatYen(totalAmount) }}</span>
      </div>
      <div class="detail-item">
        <span class="label">お預かり金額</span>
        <span class="value">{{ formatYen(receivedAmount) }}</span>
      </div>
      <div class="detail-item">
        <span class="label">お釣り金額</span>
        <span class="value">{{ formatYen(changeAmount) }}</span>
      </div>
    </div>
    <div class="details-info">
      <div class="detail-item">
        <span class="label">お会計日時:</span>
        <span class="value" data-allow-mismatch>{{ transactionDate?.toLocaleString("ja-JP") }}</span>
      </div>
      <div class="detail-item">
        <span class="label">取引ID:</span>
        <span class="value">{{ saleId }}</span>
      </div>
      <div class="detail-item">
        <span class="label">お支払い方法:</span>
        <span class="value">{{ paymentMethod?.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTransactionStore } from "~/stores/transaction";

const {
  saleId,
  transactionDate,
  totalAmount,
  receivedAmount,
  changeAmount,
  paymentMethod,
} = storeToRefs(useTransactionStore());
</script>

<style lang="scss" scoped>
.wrapper {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: $spacing-md;
}

.title {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  font-size: $text-2xl;
  font-weight: $font-bold;
  color: $color-success-6;
}

.details-price {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: $spacing-sm;

  .detail-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-lg;
    gap: $spacing-sm;
    background-color: $color-gray-0;
    border-radius: $radius-md;

    .label {
      font-size: $text-sm;
      color: $color-text-secondary;
    }

    .value {
      font-size: $text-2xl;
      font-weight: $font-medium;
      color: $color-info-9;
    }
  }
}

.details-info {
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: $spacing-sm;

  .detail-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: $spacing-2xl;

    .label {
      color: $color-text-secondary;
    }

    .value {
      font-weight: $font-medium;
      color: $color-info-9;
    }
  }
}

</style>
