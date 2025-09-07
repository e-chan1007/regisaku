import {
  type AdapterContext,
  DatabaseAdapter,
} from "@e-chan1007/regisaku-adapter-sdk";
import type {
  DeepOmit,
  PaymentMethod,
  Product,
  ProductId,
  Sale,
  SaleId,
  SaleItem,
  SaleItemId,
  VariantGroup,
  VariantGroupId,
} from "@e-chan1007/regisaku-shared/types";
import { createId } from "@e-chan1007/regisaku-shared/utils";
import { liveQuery } from "dexie";
import * as R from "remeda";
import { Database } from "./Database.js";
import type {
  ProductTableRow,
  SaleDiscountTableRow,
  SaleItemTableRow,
  SaleItemVariantTableRow,
  SaleTableRow,
  VariantGroupTableRow,
  VariantTableRow,
} from "./Table.js";

export interface IndexedDBAdapterConfig {
  databaseName: string;
}

export class IndexedDBAdapter extends DatabaseAdapter<IndexedDBAdapterConfig> {
  static override context = "client" as const satisfies AdapterContext;
  static readonly defaultConfig: IndexedDBAdapterConfig = {
    databaseName: "regisaku",
  };
  private db!: Database;

  override async initialize(): Promise<void> {
    this.db = new Database(this.config.databaseName);
  }

  override async addProduct(
    product: DeepOmit<Product, "id">,
  ): Promise<Product> {
    const { variantGroups, ...rest } = product;
    const finalProduct: ProductTableRow = {
      id: createId(),
      ...rest,
    };

    const variantGroupsWithId: VariantGroup[] = variantGroups.map((vg) => {
      const vgId: VariantGroupId = createId();
      return {
        ...vg,
        id: vgId,
        variants: vg.variants.map((variant) => ({
          ...variant,
          id: createId(),
          variantGroupId: vgId,
        })),
      };
    });

    const finalVariantGroups: VariantGroupTableRow[] = variantGroupsWithId.map(
      ({ variants, ...group }) => ({ productId: finalProduct.id, ...group }),
    );

    const finalVariants: VariantTableRow[] = variantGroupsWithId.flatMap(
      ({ id, variants }) =>
        variants.map((variant) => ({
          variantGroupId: id,
          ...variant,
        })),
    );

    await this.db.transaction(
      "rw",
      [this.db.products, this.db.variantGroups, this.db.variants],
      async () => {
        await this.db.products.add(finalProduct);
        await this.db.variantGroups.bulkAdd(finalVariantGroups);
        await this.db.variants.bulkAdd(finalVariants);
      },
    );

    return {
      ...finalProduct,
      variantGroups: variantGroupsWithId,
    };
  }
  override getProducts(): Promise<Product[]> {
    return this.db.transaction(
      "r",
      [this.db.products, this.db.variantGroups, this.db.variants],
      async () => {
        const productRows = await this.db.products.toArray();
        const variantGroupRows = await this.db.variantGroups.toArray();
        const variantRows = await this.db.variants.toArray();
        return productRows.map((row) => ({
          ...row,
          variantGroups: variantGroupRows
            .filter((vg) => vg.productId === row.id)
            .map((vg) => ({
              ...vg,
              variants: variantRows.filter((v) => v.variantGroupId === vg.id),
            })),
        }));
      },
    );
  }
  override async updateProduct(
    id: ProductId,
    updates: Partial<Omit<Product, "id">>,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  override deleteProduct(id: ProductId): Promise<void> {
    return this.db.products.delete(id);
  }
  override async addSale(
    sale: DeepOmit<Sale, "id" | "updatedAt">,
  ): Promise<Sale> {
    const { items, discounts, ...rest } = sale;

    const finalSale: SaleTableRow = {
      id: createId(),
      updatedAt: sale.transactionAt,
      ...rest,
    };

    const saleItemsWithId: SaleItem[] = items.map((item) => {
      const itemId: SaleItemId = createId();
      return {
        ...item,
        id: itemId,
        variants: item.variants.map((variant) => ({
          ...variant,
          id: createId(),
          saleItemId: itemId,
        })),
      };
    });

    const finalSaleItems: SaleItemTableRow[] = saleItemsWithId.map(
      ({ variants, ...item }) => ({
        saleId: finalSale.id,
        ...item,
      }),
    );

    const finalSaleVariants: SaleItemVariantTableRow[] =
      saleItemsWithId.flatMap((item) =>
        item.variants.map((variant) => ({
          saleItemId: item.id,
          ...variant,
        })),
      );

    const finalSaleDiscounts: SaleDiscountTableRow[] = discounts.map(
      ({ discountId, ...discount }) => ({
        id: createId(),
        discountId,
        saleId: finalSale.id,
        ...discount,
      }),
    );

    await this.db.transaction(
      "rw",
      [
        this.db.sales,
        this.db.saleItems,
        this.db.saleItemVariants,
        this.db.saleDiscounts,
      ],
      async () => {
        await this.db.sales.add(finalSale);
        await this.db.saleItems.bulkAdd(finalSaleItems);
        await this.db.saleItemVariants.bulkAdd(finalSaleVariants);
        await this.db.saleDiscounts.bulkAdd(finalSaleDiscounts);
      },
    );

    return {
      ...finalSale,
      items: saleItemsWithId,
      discounts: finalSaleDiscounts,
    };
  }

  override subscribeToProducts(
    onInsert: (product: Product) => void,
    onUpdate: (product: Product) => void,
    onDelete: (productId: ProductId) => void,
  ): () => unknown {
    let prevProducts: Product[] = [];
    const observable = liveQuery(() => this.getProducts());
    const subscription = observable.subscribe({
      next: (currentProducts) => {
        const added = currentProducts.filter(
          (p) => !prevProducts.some((pp) => pp.id === p.id),
        );

        const deleted = prevProducts.filter(
          (pp) => !currentProducts.some((p) => p.id === pp.id),
        );

        const updated = currentProducts.filter((p) =>
          prevProducts.some((pp) => pp.id === p.id && !R.isDeepEqual(p, pp)),
        );

        added.forEach(onInsert);
        updated.forEach(onUpdate);
        deleted.forEach((p) => onDelete(p.id));

        prevProducts = currentProducts;
      },
    });
    return () => subscription.unsubscribe();
  }

  override getSales(): Promise<Sale[]> {
    return this.db.transaction(
      "r",
      [
        this.db.sales,
        this.db.saleItems,
        this.db.saleItemVariants,
        this.db.saleDiscounts,
      ],
      async () => {
        const saleRows = await this.db.sales.toArray();
        const saleItemRows = await this.db.saleItems.toArray();
        const saleDiscountRows = await this.db.saleDiscounts.toArray();
        const saleItemVariantRows = await this.db.saleItemVariants.toArray();

        return saleRows.map((sale) => ({
          ...sale,
          items: saleItemRows
            .filter((item) => item.saleId === sale.id)
            .map((item) => ({
              ...item,
              variants: saleItemVariantRows.filter(
                (v) => v.saleItemId === item.id,
              ),
            })),
          discounts: saleDiscountRows.filter(
            (discount) => discount.saleId === sale.id,
          ),
        }));
      },
    );
  }
  override async updateSale(
    id: SaleId,
    updates: Partial<Omit<Sale, "id" | "transactionAt" | "updatedAt">>,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  override async deleteSale(id: SaleId): Promise<void> {
    return this.db.sales.delete(id);
  }
  override async addPaymentMethod(
    method: Omit<PaymentMethod, "id">,
  ): Promise<PaymentMethod> {
    const finalMethod: PaymentMethod = { id: createId(), ...method };
    await this.db.paymentMethods.add(finalMethod);
    return finalMethod;
  }
  override async getPaymentMethods(): Promise<PaymentMethod[]> {
    return this.db.paymentMethods.toArray();
  }
  override async updatePaymentMethod(
    id: PaymentMethod["id"],
    updates: Partial<Omit<PaymentMethod, "id">>,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  override async deletePaymentMethod(id: PaymentMethod["id"]): Promise<void> {
    return this.db.paymentMethods.delete(id);
  }
}
