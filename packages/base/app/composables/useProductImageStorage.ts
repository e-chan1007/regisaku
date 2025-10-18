import type { ProductId } from "@e-chan1007/regisaku-shared/types";

interface ProductImageStorageComposable {
  setImage: (productId: ProductId, image: File) => Promise<void>;
  deleteImage: (productId: ProductId) => Promise<void>;
  imageFiles: Ref<Record<ProductId, File>>;
  imageUrls: Ref<Record<ProductId, string>>;
}

export function useProductImageStorage(): ProductImageStorageComposable {
  const imageFiles = useState<Record<ProductId, File>>(
    "productImageFiles",
    () => ({}),
  );
  const imageUrls = useState<Record<ProductId, string>>(
    "productImageUrls",
    () => ({}),
  );
  const { $storage } = useNuxtApp();

  if (!$storage) {
    return {
      setImage: async () => {
        throw new Error("Storage adapter is not initialized");
      },
      deleteImage: async () => {
        throw new Error("Storage adapter is not initialized");
      },
      imageFiles,
      imageUrls,
    };
  }

  const setImage = async (productId: ProductId, image: File) => {
    await $storage.setProductImage(productId, image);
    // 画像URLを更新
    if (imageUrls.value[productId]) {
      URL.revokeObjectURL(imageUrls.value[productId]);
    }
    imageUrls.value[productId] = URL.createObjectURL(image);
  };

  const deleteImage = async (productId: ProductId) => {
    await $storage.deleteProductImage(productId);
    if (imageUrls.value[productId]) {
      URL.revokeObjectURL(imageUrls.value[productId]);
      delete imageUrls.value[productId];
    }
  };

  if ($storage.context === "client") {
    callOnce("fetchProductImages", async () => {
      const images = await $storage.getProductImages();
      for (const [productId, image] of Object.entries(images) as [
        ProductId,
        File,
      ][]) {
        imageFiles.value[productId] = image;
        imageUrls.value[productId] = URL.createObjectURL(image);
      }
    });
  }

  return {
    setImage,
    deleteImage,
    imageFiles,
    imageUrls,
  };
}
