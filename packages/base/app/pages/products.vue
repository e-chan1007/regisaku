<template>
  <div class="container">
    <h1>商品管理</h1>
    <RSLabeledForm label="商品名">
      <RSInput full v-model.trim="newProduct.name" placeholder="商品名" />
    </RSLabeledForm>
    <RSLabeledForm label="価格">
      <RSInput full v-model.number="newProduct.price" type="number" placeholder="価格" />
    </RSLabeledForm>
    <RSButton @click="addProduct" :disabled="newProduct.name.length === 0">追加</RSButton>
    <hr>
    <div v-if="status === 'loading'">読み込み中...</div>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.price }}円
        <RSButton @click="deleteProduct(product.id)">削除</RSButton>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Product, ProductId } from "@e-chan1007/regisaku-shared/types";
import { RSButton, RSInput } from "#components";

definePageMeta({
  tab: {
    label: "商品管理",
    icon: "material-symbols:two-pager",
  },
  keepalive: true,
});

const newProduct = ref<Omit<Product, "id">>({
  name: "",
  price: 0,
  isHidden: false,
  variantGroups: [],
});

const {
  products,
  status,
  add: addProductToDB,
  delete: deleteProductFromDB,
} = useProductDatabase();

const addProduct = async () => {
  const addedProduct = await addProductToDB(newProduct.value);
  products.value.push(addedProduct);
  resetProduct();
};

const deleteProduct = async (productId: ProductId) => {
  const confirmed = confirm("本当に削除しますか？");
  if (!confirmed) return;

  await deleteProductFromDB(productId);
  const index = products.value.findIndex((p) => p.id === productId);
  if (index !== -1) {
    products.value.splice(index, 1);
  }
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
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  padding: $spacing-md;
}
</style>
