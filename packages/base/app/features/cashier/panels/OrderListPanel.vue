<template>
  <RSPanelBody #="panelProps" class="container" no-padding ref="panelBody">
    <div class="order-header">
      <h2>オーダー</h2>
      <RSButton variant="text" color="error" type="square" size="sm" @click="cancelAll" :disabled="orders.length <= 0" title="すべてキャンセル">
        <Icon name="material-symbols:delete" />
      </RSButton>
    </div>
    <div class="order-item-list" ref="orderItemList">
      <OrderItem v-for="item in orders" :key="item.id" :item="item" />
      <div v-if="orders.length === 0" class="no-orders">
        <Icon name="material-symbols:shopping-cart-outline" class="icon" />
        商品が選択されていません
      </div>
    </div>
    <div class="order-footer">
      <div class="total">
        <h3>合計</h3>
        <div class="amount">{{ formatYen(totalAmount) }}</div>
      </div>
      <PanelNavigationButton v-bind="panelProps" :toggle-view-index="1" prev-label="商品の再選択" next-label="お会計" :disabled="orders.length <= 0" />
    </div>
  </RSPanelBody>
</template>

<script setup lang="ts">
import type { RSPanelBody } from "#components";
import OrderItem from "../components/OrderItem.vue";
import PanelNavigationButton from "../components/PanelNavigationButton.vue";

const { clearOrders } = useOrderStore();
const { orders, totalAmount } = storeToRefs(useOrderStore());
const panelBody = useTemplateRef<InstanceType<typeof RSPanelBody>>("panelBody");

const cancelAll = () => {
  clearOrders();
  panelBody.value?.setViewIndex(0);
};

const orderItemList = useTemplateRef<HTMLDivElement>("orderItemList");
const { y } = useScroll(orderItemList);
watchArray(orders, async (newValue, oldValue) => {
  if (newValue.length > oldValue.length) {
    await nextTick();
    y.value = orderItemList.value?.scrollHeight ?? 0;
  }
  if (newValue.length === 0) {
    panelBody.value?.setViewIndex(0);
  }
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 0;
}

.order-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md;

  h2 {
    font-size: $text-lg;
    font-weight: $font-medium;
  }
}

.order-item-list {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  border-block: 1px solid $color-border;
  padding-inline: $spacing-sm;
  scroll-behavior: smooth;

  & > *:not(:last-child) {
    border-bottom: 1px solid $color-border;
  }

  .no-orders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: $spacing-sm;
    color: $color-text-secondary;

    .icon {
      font-size: $text-4xl;
    }
  }
}

.order-footer {
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
