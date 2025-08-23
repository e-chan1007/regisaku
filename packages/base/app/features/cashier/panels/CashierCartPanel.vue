<template>
  <RSPanelBody title="会計リスト" #="panelProps" class="container" no-padding>
    <div class="cart-header">
      <h2>オーダー</h2>
    </div>
    <div class="cart-item-list">
      <CartItem v-for="item in items" :key="item.id" :item="item" />
    </div>
    <div class="cart-footer">
      <div class="total">
        <h3>合計</h3>
        <div class="amount">¥{{ (99999).toLocaleString() }}</div>
      </div>
      <PanelNavigationButton v-bind="panelProps" :toggle-view-index="1" prev-label="商品の再選択" next-label="お会計" />
      <RSButton variant="text" color="gray" size="sm" full>すべてキャンセル</RSButton>
    </div>
  </RSPanelBody>
</template>

<script setup lang="ts">
import CartItem from "../components/CartItem.vue";
import PanelNavigationButton from "../components/PanelNavigationButton.vue";

const items = [
  { id: "1", name: "Item 1", price: 100 },
  { id: "2", name: "Item 2", price: 200 },
  { id: "3", name: "Item 3", price: 300 },
];
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 0;
}

.cart-header {
  padding: $spacing-md;

  h2 {
    font-size: $text-lg;
    font-weight: $font-medium;
  }
}

.cart-item-list {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  border-block: 1px solid $color-border;
  padding-inline: $spacing-sm;

  & > *:not(:last-child) {
    border-bottom: 1px solid $color-border;
  }
}

.cart-footer {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: $spacing-md;
  gap: $spacing-sm;
}

.total {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: $text-md;
    font-weight: $font-medium;
  }

  .amount {
    font-size: $text-xl;
    font-weight: $font-bold;
    color: $color-primary-7;
  }
}
</style>
