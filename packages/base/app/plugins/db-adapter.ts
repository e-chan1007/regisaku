import config from "#regisaku-config";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (config.adapters.db.context === "client" && !import.meta.client) return;
  if (config.adapters.db.context === "server" && import.meta.client) return;
  const adapter = new config.adapters.db();
  await adapter.initialize();
  console.log("initialized on", adapter.context);
  nuxtApp.provide("db", adapter);
});
