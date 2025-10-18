import { toCSV } from "@e-chan1007/regisaku-shared/utils";

const exportSalesSummaryCSV = () => {
  const { sales } = useSaleDatabase();
  const sortedSales = sales.value.toSorted(
    (a, b) => b.transactionAt.getTime() - a.transactionAt.getTime(),
  );
  const rows: (string | number)[][] = [];
  rows.push(["日時", "取引ID", "支払い方法", "合計金額", "備考"]);

  for (const sale of sortedSales) {
    rows.push([
      formatDate(sale.transactionAt),
      sale.id,
      sale.paymentMethod,
      sale.totalPrice,
      sale.note,
    ]);
  }

  return toCSV(rows);
};

const exportSalesDetailsCSV = () => {
  const { sales } = useSaleDatabase();
  const sortedSales = sales.value.toSorted(
    (a, b) => b.transactionAt.getTime() - a.transactionAt.getTime(),
  );
  const rows: (string | number)[][] = [];
  rows.push(["日時", "取引ID", "商品名", "数量", "単価", "小計"]);

  for (const sale of sortedSales) {
    rows.push(
      ...sale.items.map((item) => [
        formatDate(sale.transactionAt),
        sale.id,
        item.productName,
        item.quantity,
        item.unitPrice,
        item.totalPrice,
      ]),
    );
  }

  return toCSV(rows);
};

const downloadFile = (value: string, fileName: string) => {
  const file = new Blob([value], { type: "text/csv" });
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportSalesCSV = () => {
  const summaryCSV = exportSalesSummaryCSV();
  const detailsCSV = exportSalesDetailsCSV();

  const summaryFileName = `sales_summary_${formatDate(new Date()).replace(/[/:]/g, "-").replace(/\s/, "_")}.csv`;
  const detailsFileName = `sales_details_${formatDate(new Date()).replace(/[/:]/g, "-").replace(/\s/, "_")}.csv`;

  downloadFile(summaryCSV, summaryFileName);
  downloadFile(detailsCSV, detailsFileName);
};
