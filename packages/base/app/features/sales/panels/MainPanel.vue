<template>
  <RSPanelBody no-padding class="container">
    <SaleGridHeader />
    <div v-if="status === 'loading'" class="loading">
      <Icon name="material-symbols:progress-activity" class="icon" />
      読み込み中...
    </div>
    <div v-if="status === 'ready' && sales.length === 0" class="empty">
      <Icon name="material-symbols:bid-landscape-disabled-outline" class="icon" />
      売上がありません
    </div>
    <div class="item-grid">
      <SaleCard v-for="sale in items" :key="sale.id" :sale="sale" @click="editSale(sale.id)" />
    </div>
    <SaleDetailSheet v-model:open="isItemEditSheetOpen" :showingSaleId="(editingSaleId as SaleId)" />
  </RSPanelBody>
</template>

<script setup lang="ts">
import type { SaleId } from "@e-chan1007/regisaku-shared/types";
import SaleCard from "../components/SaleCard.vue";
import SaleDetailSheet from "../components/SaleDetailSheet.vue";
import SaleGridHeader from "../components/SaleGridHeader.vue";

const isItemEditSheetOpen = ref(false);
const editingSaleId = ref<SaleId | null>(null);
const { sales, status } = useSaleDatabase();

const items = computed(() =>
  sales.value.toSorted(
    (a, b) => b.transactionAt.getTime() - a.transactionAt.getTime(),
  ),
);

const editSale = (saleId: SaleId) => {
  editingSaleId.value = saleId;
  isItemEditSheetOpen.value = true;
};
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
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
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
