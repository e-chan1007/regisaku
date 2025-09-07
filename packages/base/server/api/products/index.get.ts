export default defineEventHandler(() => {
  return useDatabase().getProducts();
});
