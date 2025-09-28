<template>
  <RSSideSheet v-model="open" parent="#page-root">
    <div class="container">
      <div v-if="editingSaleId && sale" class="receipt">
        <div class="receipt-header">
          <div>{{ formatDate(sale.transactionAt) }}</div>
          <div>取引ID: <span>{{ sale.id }}</span></div>
        </div>
        <div class="receipt-items">
          <div v-for="item in sale.items" :key="item.id" class="receipt-item">
            <div class="item-name">{{ item.productName }}</div>
            <div class="item-quantity">{{ formatYen(item.unitPrice) }} × {{ item.quantity }}</div>
            <div class="item-price">{{ formatYen(item.totalPrice) }}</div>
          </div>
        </div>
        <div class="receipt-summary">
          <div class="summary-row total">
            <span>合計</span>
            <span>{{ formatYen(sale.totalPrice) }}</span>
          </div>
          <div class="summary-row">
            <span>お預かり</span>
            <span>{{ formatYen(sale.receivedAmount) }}</span>
          </div>
          <div class="summary-row">
            <span>お釣り</span>
            <span>{{ formatYen(sale.changeAmount) }}</span>
          </div>
          <div class="summary-row">
            <span>支払い方法</span>
            <span>{{ sale.paymentMethod }}</span>
          </div>
        </div>
        <div v-if="sale.note" class="receipt-note">備考: {{ sale.note }}</div>
      </div>
      <RSLabeledForm label="備考">
        <RSTextarea full v-model.trim="newSale.note" placeholder="備考" />
      </RSLabeledForm>
      <div class="actions">
        <RSButton
          full
          variant="secondary"
          color="gray"
          @click="open = false">
          閉じる
        </RSButton>
        <RSButton
          full
          color="primary"
          @click="saveSale">
          保存
        </RSButton>
      </div>
      <RSButton
        v-if="editingSaleId"
        variant="text"
        color="error"
        size="sm"
        @click="deleteSale(editingSaleId)"
        :disabled="!editingSaleId">
        削除
      </RSButton>
    </div>
  </RSSideSheet>
</template>

<script lang="ts" setup>
import type { SaleId } from "@e-chan1007/regisaku-shared/types";
import { clone } from "remeda";
import { formatDate } from "~/utils/formatDate";
import { formatYen } from "~/utils/formatYen";

interface Props {
  editingSaleId: SaleId;
  open: boolean;
}
const { editingSaleId } = defineProps<Props>();

const open = defineModel<boolean>("open", { default: false });

const newSale = ref<{
  note: string;
}>({
  note: "",
});

const {
  sales,
  update: updateSaleInDB,
  delete: deleteSaleFromDB,
} = useSaleDatabase();

const sale = computed(() =>
  editingSaleId ? sales.value.find((s) => s.id === editingSaleId) : null,
);

watch(
  () => [editingSaleId, open.value],
  ([newId]) => {
    if (newId === null) {
      resetSale();
      return;
    }
    const sale = sales.value.find((s) => s.id === newId);
    if (sale) {
      newSale.value = clone(sale);
    }
  },
);

const saveSale = async () => {
  await updateSaleInDB(editingSaleId, { note: newSale.value.note });
  const index = sales.value.findIndex((s) => s.id === editingSaleId);
  if (index !== -1) {
    const original = sales.value[index];
    if (original) {
      sales.value[index] = {
        ...original,
        note: newSale.value.note,
        id: original.id,
        totalPrice: original.totalPrice,
        receivedAmount: original.receivedAmount,
        changeAmount: original.changeAmount,
        currency: original.currency,
        paymentMethodId: original.paymentMethodId,
        paymentMethod: original.paymentMethod,
        transactionAt: original.transactionAt,
        updatedAt: original.updatedAt,
        discounts: original.discounts,
        items: original.items,
      };
    }
  }
  open.value = false;
  resetSale();
};

const deleteSale = async (saleId: SaleId) => {
  const confirmed = confirm("本当に削除しますか？");
  if (!confirmed) return;

  await deleteSaleFromDB(saleId);
  open.value = false;
  const index = sales.value.findIndex((s) => s.id === saleId);
  if (index !== -1) {
    sales.value.splice(index, 1);
  }
  resetSale();
};

const resetSale = () => {
  newSale.value = {
    note: "",
  };
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: $spacing-2xl;
  padding: $spacing-xl;

  .actions {
    display: flex;
    flex-direction: row;
    gap: $spacing-sm;
  }

  .receipt {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    font-size: $text-sm;
  }
  .receipt-header {
    display: flex;
    justify-content: space-between;
    font-size: $text-xs;
  }
  .receipt-items {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    border-block: 2px dashed $color-border;
    padding-block: $spacing-md;
  }
  .receipt-item {
    display: flex;
    gap: $spacing-xs;
    align-items: center;
  }
  .item-name {
    flex: 2 1 0%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-quantity {
    flex: 1 1 0%;
    text-align: right;
    color: $color-text-secondary;
    white-space: nowrap;
  }
  .item-price {
    flex: 1 1 0%;
    text-align: right;
    white-space: nowrap;
  }
  .receipt-summary {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }
  .summary-row {
    display: flex;
    justify-content: space-between;
  }
  .summary-row.total {
    font-size: $text-lg;
    font-weight: $font-bold;
  }
  .summary-row span:last-child {
    color: $color-primary-7;
  }
}
</style>
