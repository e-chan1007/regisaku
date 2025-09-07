import type { DatabaseAdapter } from "@e-chan1007/regisaku-adapter-sdk";
import type { Sale, SaleId } from "@e-chan1007/regisaku-shared/types";

interface SaleDatabaseComposable {
  add: DatabaseAdapter["addSale"];
  update: DatabaseAdapter["updateSale"];
  delete: DatabaseAdapter["deleteSale"];
  deleteAll: DatabaseAdapter["deleteAllSales"];
  sales: Ref<Sale[]>;
  status: Ref<"loading" | "ready" | "error">;
}

export function useSaleDatabase(): SaleDatabaseComposable {
  const status = useState<"loading" | "ready" | "error">(
    "sales.status",
    () => "loading",
  );
  const sales = useState<Sale[]>("sales", () => []);
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
      sales,
      status,
    };

  const onInserted = (sale: Sale) => {
    if (!sales.value.find((p) => p.id === sale.id)) {
      sales.value.push(sale);
    }
  };
  const onUpdated = (updatedSale: Sale) => {
    sales.value[sales.value.findIndex((p) => p.id === updatedSale.id)] =
      updatedSale;
  };
  const onDeleted = (deletedSaleId: SaleId) => {
    sales.value = sales.value.filter((p) => p.id !== deletedSaleId);
  };

  if ($db.context === "client") {
    callOnce("fetchSales", () => {
      $db
        .getSales()
        .then((fetchedSales) => {
          sales.value = fetchedSales;
          status.value = "ready";
        })
        .catch((e) => {
          console.error("Failed to fetch sales:", e);
          status.value = "error";
        });
    });
    onMounted(() => {
      const unsubscribe = $db.subscribeToSales(
        onInserted,
        onUpdated,
        onDeleted,
      );
      onUnmounted(() => {
        unsubscribe();
      });
    });
    return {
      add: $db.addSale.bind($db),
      update: $db.updateSale.bind($db),
      delete: $db.deleteSale.bind($db),
      deleteAll: $db.deleteAllSales.bind($db),
      sales,
      status,
    };
  }

  callOnce("fetchSales", () => {
    $fetch("/api/sales")
      .then((fetchedSales) => {
        sales.value = fetchedSales.map((s) => ({
          ...s,
          transactionAt: new Date(s.transactionAt),
          updatedAt: new Date(s.updatedAt),
        }));
        status.value = "ready";
      })
      .catch((e) => {
        console.error("Failed to fetch sales:", e);
        status.value = "error";
      });
  });

  onMounted(() => {
    const { data, close } = useWebSocket("/ws/sales", {
      autoReconnect: true,
    });
    const unwatch = watch(data, (newData) => {
      if (newData) {
        const { type, sale, saleId } = newData as {
          type: "insert" | "update" | "delete";
          sale?: Sale;
          saleId?: SaleId;
        };
        if (type === "insert" && sale) {
          onInserted(sale);
        } else if (type === "update" && sale) {
          onUpdated(sale);
        } else if (type === "delete" && saleId) {
          onDeleted(saleId);
        }
      }
    });
    onUnmounted(() => {
      unwatch();
      close();
    });
  });

  return {
    add: (sale) =>
      $fetch("/api/sales", {
        method: "POST",
        body: sale,
      }),
    update: (id, updates) =>
      $fetch(`/api/sales/${id}`, {
        method: "PATCH",
        body: updates,
      }),
    delete: (id) =>
      $fetch(`/api/sales/${id}`, {
        method: "DELETE",
      }),
    deleteAll: () =>
      $fetch(`/api/sales`, {
        method: "DELETE",
      }),
    sales,
    status,
  };
}
