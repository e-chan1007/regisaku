<template>
  <div class="container">
    <h1>売上管理</h1>
    <div>
      <RSButton @click="deleteAllSales" :disabled="sales.length === 0">全て削除</RSButton>
    </div>
    <hr>
    <div v-if="status === 'loading'">読み込み中...</div>
    <div v-else>
      <p>合計売上: {{ formatYen(totalSales) }}</p>
    <ul>
      <li v-for="sale in sortedSales" :key="sale.id">
        {{ sale.id }}: {{ sale.transactionAt }} - {{ formatYen(sale.totalPrice) }}
        ({{ sale.items.map(item => item.productName).join(", ") }})
        <RSButton @click="deleteSale(sale.id)">削除</RSButton>
      </li>
    </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SaleId } from "@e-chan1007/regisaku-shared/types";
import * as R from "remeda";
import { RSButton } from "#components";

definePageMeta({
  tab: {
    label: "売上管理",
    icon: "material-symbols:bid-landscape",
  },
  keepalive: true,
});

const {
  sales,
  status,
  delete: deleteSaleFromDB,
  deleteAll: deleteAllSalesFromDB,
} = useSaleDatabase();
const totalSales = computed(() =>
  R.sumBy(sales.value, (sale) => sale.totalPrice),
);
const sortedSales = computed(() =>
  R.sortBy(sales.value, [R.prop("transactionAt"), "desc"]),
);

const deleteSale = async (saleId: SaleId) => {
  const confirmed = confirm("本当に削除しますか？");
  if (!confirmed) return;

  await deleteSaleFromDB(saleId);
  const index = sales.value.findIndex((s) => s.id === saleId);
  if (index !== -1) {
    sales.value.splice(index, 1);
  }
};

const deleteAllSales = async () => {
  const confirmed = confirm("本当に全ての売上を削除しますか？");
  if (!confirmed) return;

  await deleteAllSalesFromDB();
  sales.value = [];
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-md;
}
</style>
