<template>
  <RSSideSheet v-model="open" parent="#page-root">
    <div class="container">
      <RSLabeledForm label="商品名">
        <RSInput full v-model.trim="newProduct.name" placeholder="商品名" />
      </RSLabeledForm>
      <RSLabeledForm label="単価">
        <RSInput full v-model.number="newProduct.price" type="number" placeholder="単価">
          <template #prepend>¥</template>
        </RSInput>
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
          @click="saveProduct"
          :disabled="newProduct.name.length === 0">
          {{ editingProductId ? "更新" : "追加" }}
        </RSButton>
      </div>
      <RSButton
        v-if="editingProductId"
        variant="text"
        color="error"
        size="sm"
        @click="deleteProduct(editingProductId)"
        :disabled="!editingProductId">
        削除
      </RSButton>
    </div>
  </RSSideSheet>
</template>

<script lang="ts" setup>
import type { Product, ProductId } from "@e-chan1007/regisaku-shared/types";
import { clone } from "remeda";

interface Props {
  editingProductId: ProductId | null;
  open: boolean;
}
const { editingProductId } = defineProps<Props>();

const open = defineModel<boolean>("open", { default: false });

const newProduct = ref<Omit<Product, "id">>({
  name: "",
  price: 0,
  isHidden: false,
  variantGroups: [],
});

const {
  products,
  add: addProductToDB,
  update: updateProductInDB,
  delete: deleteProductFromDB,
} = useProductDatabase();

watch(
  () => [editingProductId, open.value],
  ([newId]) => {
    if (newId === null) {
      resetProduct();
      return;
    }
    const product = products.value.find((p) => p.id === newId);
    if (product) {
      newProduct.value = clone(product);
    }
  },
);

const saveProduct = async () => {
  if (editingProductId) {
    await updateProductInDB(editingProductId, newProduct.value);
    const index = products.value.findIndex((p) => p.id === editingProductId);
    if (index !== -1) {
      products.value[index] = {
        id: editingProductId,
        ...products.value[index],
        ...newProduct.value,
      };
    }
  } else {
    const addedProduct = await addProductToDB(newProduct.value);
    products.value.push(addedProduct);
  }
  open.value = false;
  resetProduct();
};

const deleteProduct = async (productId: ProductId) => {
  const confirmed = confirm("本当に削除しますか？");
  if (!confirmed) return;

  await deleteProductFromDB(productId);
  open.value = false;
  const index = products.value.findIndex((p) => p.id === productId);
  if (index !== -1) {
    products.value.splice(index, 1);
  }
  resetProduct();
};

const resetProduct = () => {
  newProduct.value = {
    name: "",
    price: 0,
    isHidden: false,
    variantGroups: [],
  };
};
</script>

<style lang="scss" scoped>
.container {
  padding: $spacing-xl;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.actions {
  display: flex;
  flex-direction: row;
  gap: $spacing-sm;
}
</style>
