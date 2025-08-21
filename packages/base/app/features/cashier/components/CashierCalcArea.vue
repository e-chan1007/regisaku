<template>
  <div class="calc-area">
    <div class="price-view">
      <div class="total">
        <RSHeading level="3">合計</RSHeading>
        <p class="price">¥{{ total.toLocaleString() }}</p>
      </div>
      <div class="change">
        <RSHeading level="3" v-if="isEnough">お釣り</RSHeading>
        <RSHeading level="3" v-else>不足額</RSHeading>
        <p class="price" :class="isEnough ? 'more' : 'less'">¥{{ Math.abs(change).toLocaleString() }}</p>
      </div>
      <div class="method">
        <RSHeading level="3">支払い方法</RSHeading>
        <RSSelect
          v-model="paymentMethodOption"
          :options="paymentMethods"
        />
      </div>
      <div class="suggestion">
        <RSHeading level="3">入力候補</RSHeading>
        <div class="suggestion-list">
          <RSButton
            v-for="suggestion in receivedPriceSuggestions"
            :key="suggestion"
            @click="received = suggestion"
            size="sm"
            :color="suggestion === total ? 'primary' : 'gray'"
            variant="secondary"
          >
            ¥{{ suggestion.toLocaleString() }}
          </RSButton>
        </div>
      </div>
    </div>

    <div class="price-input">
      <div class="received" :class="isEnough ? 'more' : 'less'">
        <div class="header">
          <h2 class="label">お預かり</h2>
        </div>
        <p class="price">¥{{ received.toLocaleString() }}</p>
      </div>
      <div class="input-container">
        <div class="keypad">
          <RSButton
            type="square"
            size="lg"
            v-for="key in keypadKeys"
            :key="key"
            @click="receivedStr += key"
          >
            {{ key }}
          </RSButton>
          <RSButton type="square" size="lg" variant="secondary" @click="receivedStr = receivedStr.slice(0, -1)">
            <Icon name="material-symbols:backspace" />
          </RSButton>
          <RSButton type="square" size="lg"  color="error" variant="secondary" @click="received = 0">
            <Icon name="material-symbols:delete-forever" />
          </RSButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RSSelect } from "#components";
import { generatePaymentSuggestions } from "../utils/paymentSuggestions";

const { total, received, receivedStr, change, paymentMethod, isEnough } =
  useShopState();

const receivedPriceSuggestions = computed(() =>
  generatePaymentSuggestions(total.value)
    .filter(
      (suggestion) =>
        received.value === 0 ||
        suggestion.toString().startsWith(receivedStr.value),
    )
    .slice(0, 10),
);

const paymentMethods = [
  { label: "現金", id: "cash" },
  { label: "クレジットカード", id: "credit" },
  { label: "電子マネー", id: "e-money" },
] as const satisfies InstanceType<typeof RSSelect>["options"];

const paymentMethodOption = computed({
  get: () => paymentMethods.find((method) => method.id === paymentMethod.value),
  set: (value: (typeof paymentMethods)[number]) => {
    paymentMethod.value = value.id;
  },
});

const keypadKeys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
</script>

<style lang="scss" scoped>
  .calc-area {
    display: flex;
    flex-direction: row;
    gap: $spacing-md;
  }

  .price-view {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
    flex: 1;
  }

  .price-input {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    align-items: end;
  }

  .total, .change, .method, .suggestion {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;

    .price {
      font-size: $text-3xl;

      &.less {
        color: $color-error-7;
      }
      &.more {
        color: $color-success-7;
      }
    }
  }

  .received {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    padding: $spacing-md;
    border-radius: $radius-md;
    transition: background-color 0.3s ease, color 0.3s ease;
    width: 100%;

    .header {
      display: flex;
      flex-direction: row;
      align-items: top;
      justify-content: space-between;
    }

    .label {
      font-size: $text-sm;
    }

    .price {
      font-size: $text-3xl;
      text-align: right;
    }

    &.less {
      background-color: $color-error-0;
      color: $color-error-8;
      .label {
        color: $color-error-8;
      }
    }
    &.more {
      background-color: $color-success-0;
      color: $color-success-8;
      .label {
        color: $color-success-8;
      }
    }
  }

  .input-container {
    position: relative;
  }

  .keypad {
    width: fit-content;
    grid-area: keypad;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-sm;
  }

  .suggestion {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  .suggestion-list {
    display: flex;
    flex-flow: row wrap;
    gap: $spacing-xs;
  }

</style>
