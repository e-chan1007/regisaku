export default defineEventHandler(() => {
  return useDatabase().deleteAllSales();
});
