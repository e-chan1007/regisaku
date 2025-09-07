export default defineEventHandler(() => {
  return useDatabase().getPaymentMethods();
});
