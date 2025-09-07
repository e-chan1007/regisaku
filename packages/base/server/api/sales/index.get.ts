export default defineEventHandler(() => {
  return useDatabase().getSales();
});
