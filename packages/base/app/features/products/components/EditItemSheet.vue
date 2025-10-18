<template>
  <RSSideSheet v-model="open" parent="#page-root">
    <div class="container">
      <RSLabeledForm label="商品名">
        <RSInput full v-model.trim="newProduct.name" placeholder="商品名" />
      </RSLabeledForm>
      <RSLabeledForm label="単価">
        <RSInput full v-model.number="newProduct.price" type="number" inputmode="numeric" placeholder="単価" :maxlength="RS_MAX_DIGITS">
          <template #prepend>¥</template>
        </RSInput>
      </RSLabeledForm>
      <RSLabeledForm label="商品の画像">
        <RSFileInput
          full
          v-model="newProductImage"
          placeholder="商品の画像を選択"
          accept="image/*"
          clearable
        >
          <template #prepend>
            <Icon name="material-symbols:image" />
          </template>
        </RSFileInput>
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
import { useProductImageStorage } from "~/composables/useProductImageStorage";
import { RS_MAX_DIGITS } from "~~/shared/limits";

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
const newProductImage = ref<File | null>(null);

const {
  products,
  add: addProductToDB,
  update: updateProductInDB,
  delete: deleteProductFromDB,
} = useProductDatabase();
const { imageFiles, setImage, deleteImage } = useProductImageStorage();

watch(
  () => [editingProductId, open.value] as const,
  ([newId]: Readonly<[ProductId | null, boolean]>) => {
    if (newId === null) {
      resetProduct();
      return;
    }
    const product = products.value.find((p) => p.id === newId);
    if (product) {
      newProduct.value = clone(product);
      newProductImage.value = imageFiles.value[newId] || null;
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

    if (newProductImage.value) {
      await setImage(editingProductId, newProductImage.value);
      imageFiles.value[editingProductId] = newProductImage.value;
    } else {
      await deleteImage(editingProductId);
      delete imageFiles.value[editingProductId];
    }
  } else {
    const addedProduct = await addProductToDB(newProduct.value);
    products.value.push(addedProduct);
    if (newProductImage.value) {
      await setImage(addedProduct.id, newProductImage.value);
      imageFiles.value[addedProduct.id] = newProductImage.value;
    }
  }
  open.value = false;
  resetProduct();
};

const deleteProduct = async (productId: ProductId) => {
  const confirmed = confirm("本当に削除しますか？");
  if (!confirmed) return;

  await deleteProductFromDB(productId);
  await deleteImage(productId);
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
