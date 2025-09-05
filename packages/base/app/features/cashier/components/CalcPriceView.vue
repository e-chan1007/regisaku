<template>
  <div class="price-view" :class="{ rotated }" @click="rotated = !rotated">
    <div class="total-container">
      <RSHeading level="2">合計</RSHeading>
      <p class="price">{{ formatYen(totalAmount) }}</p>
    </div>
    <div class="received-container">
      <RSHeading level="3">お預かり</RSHeading>
      <p class="price">{{ formatYen(receivedAmount) }}</p>
    </div>
    <div class="change-container">
      <RSHeading level="3" v-if="isReceivedAmountEnough">お釣り</RSHeading>
      <RSHeading level="3" v-else>不足額</RSHeading>
      <p class="price" :class="isReceivedAmountEnough ? 'more' : 'less'">{{ formatYen(Math.abs(changeAmount)) }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { totalAmount, receivedAmount, changeAmount, isReceivedAmountEnough } =
  storeToRefs(useTransactionStore());

const rotated = ref(true);
</script>

<style lang="scss" scoped>
.price-view {
  display: grid;
  grid-template:
    "total total" auto
    "received change" auto / 1fr 1fr;
  background-color: $color-primary-0;
  border-radius: $radius-md;
  transition: transform ease-in-out 0.4s;

  &.rotated {
    transform: rotate(180deg);
  }
}

.total-container, .received-container, .change-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  justify-content: center;
  padding: $spacing-xl;
  text-align: center;
}

.price {
  color: $color-primary-9;
}

.total-container {
  grid-area: total;
  border-bottom: 1px solid $color-primary-1;

  h2 {
    color: $color-primary-8;
  }

  .price {
    font-size: $text-5xl;
  }
}

.received-container {
  grid-area: received;
  border-right: 1px solid $color-primary-1;

  .price {
    font-size: $text-3xl;
  }
}

.change-container {
  grid-area: change;

  .price {
    font-size: $text-3xl;

    &.less {
      color: $color-error-7;
    }
  }
}
</style>
