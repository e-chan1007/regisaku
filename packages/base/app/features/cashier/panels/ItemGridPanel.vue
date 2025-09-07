<template>
  <RSPanelBody no-padding class="container">
    <ItemGridHeader v-model:searchQuery="itemSearchQuery" />
    <div class="item-grid">
      <div v-if="status === 'loading'">読み込み中...</div>
      <ItemGridCard v-for="item in items" :key="item.id" :item="item" />
    </div>
    <AddItemSheet />
  </RSPanelBody>
</template>

<script setup lang="ts">
import AddItemSheet from "../components/AddItemSheet.vue";
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
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  align-content: start;
  gap: $spacing-md;
  background-color: $color-gray-0;
  padding: $spacing-md;
  overflow-y: auto;
  min-height: 0;
  flex: 1;
}
</style>
