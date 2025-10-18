import config from "#regisaku-config";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (config.storage.adapter.context === "client" && !import.meta.client)
    return;
  if (config.storage.adapter.context === "server" && import.meta.client) return;
  if (!config.storage.config) throw new Error("Storage config is not provided");
  const adapter = new config.storage.adapter(config.storage.config);
  await adapter.initialize();
  nuxtApp.provide("storage", adapter);
});

declare module "#app" {
  interface NuxtApp {
    $storage?: InstanceType<typeof config.storage.adapter>;
  }
}
