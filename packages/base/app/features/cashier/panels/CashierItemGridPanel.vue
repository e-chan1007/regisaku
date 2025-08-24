<template>
  <RSPanelBody no-padding class="container">
    <ItemGridHeader />
    <div class="item-grid">
      <ItemGridCard v-for="item in items" :key="item.id" :item="item" />
    </div>
    <AddItemSheet />
  </RSPanelBody>
</template>

<script setup lang="ts">
import AddItemSheet from "../components/AddItemSheet.vue";
import ItemGridCard from "../components/ItemGridCard.vue";
import ItemGridHeader from "../components/ItemGridHeader.vue";

const items = [
  { id: "1", name: "Item 1", price: 100 },
  { id: "2", name: "Item 2", price: 200 },
  { id: "3", name: "Item 3", price: 300 },
  { id: "4", name: "Item 4", price: 400 },
  { id: "5", name: "Item 5", price: 500 },
  { id: "6", name: "Item 6", price: 600 },
  { id: "7", name: "Item 7", price: 700 },
  { id: "8", name: "Item 8", price: 800 },
];
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
