import type { DatabaseAdapter } from "@e-chan1007/regisaku-adapter-sdk";
import type { Product, ProductId } from "@e-chan1007/regisaku-shared/types";

interface ProductDatabaseComposable {
  add: DatabaseAdapter["addProduct"];
  update: DatabaseAdapter["updateProduct"];
  delete: DatabaseAdapter["deleteProduct"];
  deleteAll: DatabaseAdapter["deleteAllProducts"];
  products: Ref<Product[]>;
  status: Ref<"loading" | "ready" | "error">;
}

export function useProductDatabase(): ProductDatabaseComposable {
  const status = useState<"loading" | "ready" | "error">(
    "products.status",
    () => "loading",
  );
  const products = useState<Product[]>("products", () => []);
  const { $db } = useNuxtApp();
  if (!$db)
    return {
      add: async () => {
        throw new Error("Database adapter is not initialized");
      },
      update: async () => {
        throw new Error("Database adapter is not initialized");
      },
      delete: async () => {
        throw new Error("Database adapter is not initialized");
      },
      deleteAll: async () => {
        throw new Error("Database adapter is not initialized");
      },
      products,
      status,
    };

  const onInserted = (product: Product) => {
    if (!products.value.find((p) => p.id === product.id)) {
      products.value.push(product);
    }
  };
  const onUpdated = (updatedProduct: Product) => {
    products.value[
      products.value.findIndex((p) => p.id === updatedProduct.id)
    ] = updatedProduct;
  };
  const onDeleted = (deletedProductId: ProductId) => {
    products.value = products.value.filter((p) => p.id !== deletedProductId);
  };

  if ($db.context === "client") {
    callOnce("fetchProducts", () => {
      $db
        .getProducts()
        .then((fetchedProducts) => {
          products.value = fetchedProducts;
          status.value = "ready";
        })
        .catch((e) => {
          console.error("Failed to fetch products:", e);
          status.value = "error";
        });
    });
    onMounted(() => {
      const unsubscribe = $db.subscribeToProducts(
        onInserted,
        onUpdated,
        onDeleted,
      );
      onUnmounted(() => {
        unsubscribe();
      });
    });
    return {
      add: $db.addProduct.bind($db),
      update: $db.updateProduct.bind($db),
      delete: $db.deleteProduct.bind($db),
      deleteAll: $db.deleteAllProducts.bind($db),
      products,
      status,
    };
  }

  callOnce("fetchProducts", () => {
    $fetch("/api/products")
      .then((fetchedProducts) => {
        products.value = fetchedProducts;
        status.value = "ready";
      })
      .catch((e) => {
        console.error("Failed to fetch products:", e);
        status.value = "error";
      });
  });

  onMounted(() => {
    const { data, close } = useWebSocket("/ws/products", {
      autoReconnect: true,
    });
    const unwatch = watch(data, (newData) => {
      if (newData) {
        const { type, product, productId } = newData as {
          type: "insert" | "update" | "delete";
          product?: Product;
          productId?: ProductId;
        };
        if (type === "insert" && product) {
          onInserted(product);
        } else if (type === "update" && product) {
          onUpdated(product);
        } else if (type === "delete" && productId) {
          onDeleted(productId);
        }
      }
    });
    onUnmounted(() => {
      unwatch();
      close();
    });
  });

  return {
    add: (product) =>
      $fetch("/api/products", {
        method: "POST",
        body: product,
      }),
    update: (id, updates) =>
      $fetch(`/api/products/${id}`, {
        method: "PATCH",
        body: updates,
      }),
    delete: (id) =>
      $fetch(`/api/products/${id}`, {
        method: "DELETE",
      }),
    deleteAll: () =>
      $fetch(`/api/products`, {
        method: "DELETE",
      }),
    products,
    status,
  };
}
