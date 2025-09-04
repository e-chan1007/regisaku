<template>
  <div class="wrapper" @click="rotated = !rotated">
    <div class="container" :class="{ rotated }">
      <h2 class="title">
        <Icon name="material-symbols:check-circle" class="icon" />
        ありがとうございました
      </h2>
      <div class="details">
        <div class="detail-item total">
          <span class="label">合計金額</span>
          <span class="value">{{ formatYen(totalAmount) }}</span>
        </div>
        <div class="detail-item received">
          <span class="label">お預かり</span>
          <span class="value">{{ formatYen(receivedAmount) }}</span>
        </div>
        <div class="detail-item change">
          <span class="label">お釣り</span>
          <span class="value">{{ formatYen(changeAmount) }}</span>
        </div>
      </div>
      <div class="time" data-allow-mismatch>
        {{ transactionDate?.toLocaleString("ja-JP") }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTransactionStore } from "~/stores/transaction";

const { transactionDate, totalAmount, receivedAmount, changeAmount } =
  storeToRefs(useTransactionStore());

const rotated = ref(true);
</script>


<style lang="scss" scoped>
.wrapper {
  flex: 3;
  display: grid;
  place-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 100%;
  gap: $spacing-xl;

  transition: transform ease-in-out 0.4s;
  &.rotated {
    transform: rotate(180deg);
  }
}

.title {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  font-size: $text-4xl;
  font-weight: $font-bold;
  color: $color-success-6;
}

.details {
  display: grid;
  grid-template: "total total" auto
    "received change" auto / 1fr 1fr;
  width: 100%;
  gap: $spacing-sm;

  .detail-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-lg;
    gap: $spacing-sm;
    background-color: $color-gray-0;
    border-radius: $radius-md;

    .label {
      color: $color-text-secondary;
    }

    .value {
      font-size: $text-4xl;
      font-weight: $font-medium;
      color: $color-info-9;
    }
  }

  .total {
    grid-area: total;
  }

  .received {
    grid-area: received;
  }

  .change {
    grid-area: change;
  }
}

.time {
  color: $color-text-secondary;
}
</style>
