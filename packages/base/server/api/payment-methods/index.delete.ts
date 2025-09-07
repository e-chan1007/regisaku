export default defineEventHandler(() => {
  return useDatabase().deleteAllPaymentMethods();
});
