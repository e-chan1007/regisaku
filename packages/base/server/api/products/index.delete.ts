export default defineEventHandler(() => {
  return useDatabase().deleteAllProducts();
});
