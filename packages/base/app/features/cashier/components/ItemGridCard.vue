<template>
  <button class="item-grid-card" @click="addToOrder">
    <div class="thumbnail">
      <Icon name="material-symbols:shopping-cart" class="fallback-icon" />
      <img v-if="item.id in imageUrls" :src="imageUrls[item.id]" :alt="item.name" @error="hideImage = true" @loadeddata="hideImage = false" />
    </div>
    <div class="details">
      <div class="name">{{ item.name }}</div>
      <div class="price">{{ formatYen(item.price) }}</div>
    </div>
  </button>
</template>

<script lang="ts" setup>
import type { Product } from "@e-chan1007/regisaku-shared/types";

interface Props {
  item: Product;
}

const { addOrder } = useOrderStore();
const { imageUrls } = useProductImageStorage();
const props = defineProps<Props>();

const hideImage = ref(false);

const addToOrder = () => {
  addOrder(props.item, [], 1);
};
</script>

<style lang="scss" scoped>
.item-grid-card {
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background-color: $color-white;
  transition: border-color 0.2s ease, outline 0.2s ease;
  outline: 2px solid transparent;

  &:hover, &:focus {
    border-color: transparent;
    outline-color: $color-primary-4;
  }

  &:active {
    border-color: transparent;
    outline-color: $color-primary-6;
  }
}

.thumbnail {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  overflow: hidden;
  & > img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: $color-white;
  }
  border-top-left-radius: $radius-md;
  border-top-right-radius: $radius-md;
  border-bottom: 1px solid $color-border;
  background-color: $color-primary-0;

  .fallback-icon {
    color: $color-primary-7;
    font-size: $text-4xl;
  }
}

.details {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
  padding: $spacing-md;

  .name {
    font-size: $text-sm;
  }

  .price {
    font-weight: $font-medium;
    font-size: $text-lg;
    color: $color-primary-7;
  }
}

</style>
