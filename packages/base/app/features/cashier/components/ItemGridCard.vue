<template>
  <button class="item-grid-card">
    <div class="thumbnail">
      <Icon name="material-symbols:shopping-cart" class="fallback-icon" />
    </div>
    <div class="details">
      <div class="name">{{ item.name }}</div>
      <div class="price">¥{{ item.price }}</div>
    </div>
  </button>
</template>

<script lang="ts" setup>
interface Props {
  item: {
    id: string;
    name: string;
    price: number;
  };
}

const props = defineProps<Props>();
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
    outline-color: $color-primary-5;
  }
}

.thumbnail {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
