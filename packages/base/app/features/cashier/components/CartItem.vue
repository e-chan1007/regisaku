<template>
  <div class="cart-item">
    <div class="name">{{ item.name }}</div>
    <div class="actions">
      <div class="price">¥{{ (item.price * count).toLocaleString() }}</div>
      <RSCountInput v-model="count" size="sm" :max="999" :min="0" />
      <RSButton variant="text" color="error" type="square" size="sm">
        <Icon name="material-symbols:delete-outline" />
      </RSButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RSCountInput } from "#components";

interface Props {
  item: {
    id: string;
    name: string;
    price: number;
  };
}

const props = defineProps<Props>();
const count = ref(1);
</script>

<style lang="scss" scoped>
.cart-item {
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
