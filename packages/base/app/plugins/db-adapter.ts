import config from "#regisaku-config";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (config.db.adapter.context === "client" && !import.meta.client) return;
  if (config.db.adapter.context === "server" && import.meta.client) return;
  if (!config.db.config) throw new Error("Database config is not provided");
  const adapter = new config.db.adapter(config.db.config);
  await adapter.initialize();
  console.log("initialized on", adapter.context);
  nuxtApp.provide("db", adapter);
});
