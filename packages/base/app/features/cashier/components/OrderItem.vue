<template>
  <div class="order-item">
    <div class="name">{{ item.product.name }}</div>
    <div class="actions">
      <div class="price">{{ formatYen(item.product.price * quantity) }}</div>
      <RSCountInput v-model="quantity" size="sm" :max="999" :min="0" />
      <RSButton variant="text" color="error" type="square" size="sm" @click="quantity = 0" title="削除">
        <Icon name="material-symbols:delete-outline" />
      </RSButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RSCountInput } from "#components";
import { type OrderItem, useOrderStore } from "~/stores/order";

interface Props {
  item: OrderItem;
}

const { item } = defineProps<Props>();
const { quantityOf } = useOrderStore();
const quantity = quantityOf(item.id);
</script>

<style lang="scss" scoped>
.order-item {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  width: 100%;
  padding: $spacing-lg;
}

.name {
  width: 100%;
  font-size: $text-sm;
}

.actions {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: $spacing-xs;

  .price {
    font-weight: $font-medium;
    color: $color-primary-7;
    flex-grow: 1;
  }

  & > * {
    flex-shrink: 0;
  }
}

</style>
