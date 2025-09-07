import type { DatabaseAdapter } from "@e-chan1007/regisaku-adapter-sdk";
import type {
  PaymentMethod,
  PaymentMethodId,
} from "@e-chan1007/regisaku-shared/types";

interface PaymentMethodDatabaseComposable {
  add: DatabaseAdapter["addPaymentMethod"];
  update: DatabaseAdapter["updatePaymentMethod"];
  delete: DatabaseAdapter["deletePaymentMethod"];
  deleteAll: DatabaseAdapter["deleteAllPaymentMethods"];
  paymentMethods: Ref<PaymentMethod[]>;
  status: Ref<"loading" | "ready" | "error">;
}

export function usePaymentMethodDatabase(): PaymentMethodDatabaseComposable {
  const status = useState<"loading" | "ready" | "error">(
    "paymentMethods.status",
    () => "loading",
  );
  const paymentMethods = useState<PaymentMethod[]>("paymentMethods", () => []);
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
      paymentMethods,
      status,
    };

  const onInserted = (paymentmethod: PaymentMethod) => {
    if (!paymentMethods.value.find((p) => p.id === paymentmethod.id)) {
      paymentMethods.value.push(paymentmethod);
    }
  };
  const onUpdated = (updatedPaymentMethod: PaymentMethod) => {
    paymentMethods.value[
      paymentMethods.value.findIndex((p) => p.id === updatedPaymentMethod.id)
    ] = updatedPaymentMethod;
  };
  const onDeleted = (deletedPaymentMethodId: PaymentMethodId) => {
    paymentMethods.value = paymentMethods.value.filter(
      (p) => p.id !== deletedPaymentMethodId,
    );
  };

  if ($db.context === "client") {
    callOnce("fetchPaymentMethods", () => {
      $db
        .getPaymentMethods()
        .then((fetchedPaymentMethods) => {
          paymentMethods.value = fetchedPaymentMethods;
          status.value = "ready";
        })
        .catch((e) => {
          console.error("Failed to fetch paymentMethods:", e);
          status.value = "error";
        });
    });
    onMounted(() => {
      const unsubscribe = $db.subscribeToPaymentMethods(
        onInserted,
        onUpdated,
        onDeleted,
      );
      onUnmounted(() => {
        unsubscribe();
      });
    });
    return {
      add: $db.addPaymentMethod.bind($db),
      update: $db.updatePaymentMethod.bind($db),
      delete: $db.deletePaymentMethod.bind($db),
      deleteAll: $db.deleteAllPaymentMethods.bind($db),
      paymentMethods,
      status,
    };
  }

  callOnce("fetchPaymentMethods", () => {
    $fetch("/api/payment-methods")
      .then((fetchedPaymentMethods) => {
        paymentMethods.value = fetchedPaymentMethods;
        status.value = "ready";
      })
      .catch((e) => {
        console.error("Failed to fetch paymentMethods:", e);
        status.value = "error";
      });
  });

  onMounted(() => {
    const { data, close } = useWebSocket("/ws/payment-methods", {
      autoReconnect: true,
    });
    const unwatch = watch(data, (newData) => {
      if (newData) {
        const { type, paymentmethod, paymentmethodId } = newData as {
          type: "insert" | "update" | "delete";
          paymentmethod?: PaymentMethod;
          paymentmethodId?: PaymentMethodId;
        };
        if (type === "insert" && paymentmethod) {
          onInserted(paymentmethod);
        } else if (type === "update" && paymentmethod) {
          onUpdated(paymentmethod);
        } else if (type === "delete" && paymentmethodId) {
          onDeleted(paymentmethodId);
        }
      }
    });
    onUnmounted(() => {
      unwatch();
      close();
    });
  });

  return {
    add: (paymentmethod) =>
      $fetch("/api/payment-methods", {
        method: "POST",
        body: paymentmethod,
      }),
    update: (id, updates) =>
      $fetch(`/api/payment-methods/${id}`, {
        method: "PATCH",
        body: updates,
      }),
    delete: (id) =>
      $fetch(`/api/payment-methods/${id}`, {
        method: "DELETE",
      }),
    deleteAll: () =>
      $fetch(`/api/payment-methods`, {
        method: "DELETE",
      }),
    paymentMethods,
    status,
  };
}
