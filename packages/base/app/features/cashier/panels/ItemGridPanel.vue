<template>
  <RSPanelBody no-padding class="container">
    <ItemGridHeader v-model:searchQuery="itemSearchQuery" />
    <div v-if="status === 'loading'" class="loading">
      <Icon name="material-symbols:progress-activity" class="icon" />
      読み込み中...
    </div>
    <div v-if="status === 'ready' && products.length === 0" class="empty">
      <Icon name="material-symbols:home-storage-outline" class="icon" />
      商品が登録されていません
      <RSButton color="primary" variant="outlined" size="md" @click="navigateTo('/products')">
        商品管理ページを開く
      </RSButton>
    </div>
    <div v-if="status === 'ready' && products.length > 0 && items.length === 0" class="empty">
      <Icon name="material-symbols:search-off" class="icon" />
      検索条件に一致する商品はありません
    </div>
    <div class="item-grid">
      <ItemGridCard v-for="item in items" :key="item.id" :item="item" />
    </div>
    <!-- <AddItemSheet /> -->
  </RSPanelBody>
</template>

<script setup lang="ts">
import ItemGridCard from "../components/ItemGridCard.vue";
import ItemGridHeader from "../components/ItemGridHeader.vue";

const itemSearchQuery = ref("");

const { products, status } = useProductDatabase();

const items = computed(() => {
  if (!itemSearchQuery.value) {
    return products.value;
  }
  return products.value.filter((item) => {
    const itemName = item.name.toLowerCase();
    return itemSearchQuery.value
      .toLowerCase()
      .split(/\s+/)
      .every((term) => itemName.includes(term));
  });
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $color-gray-0;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  align-content: start;
  gap: $spacing-md;
  padding: $spacing-md;
  overflow-y: auto;
  min-height: 0;
  flex: 1;
}

.loading,
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: $spacing-sm;
  color: $color-text-secondary;

  .icon {
    font-size: 4rem;
  }
}

.loading .icon {
  animation: spin 1s linear infinite;
}
</style>
