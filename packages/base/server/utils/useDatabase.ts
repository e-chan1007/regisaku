import config from "#regisaku-config";

export const useDatabase = () => {
  const adapter = config.db.adapter;
  if (adapter.context !== "server") {
    throw new Error("Database adapter could not be used on client side");
  }
  if (!config.db.config) throw new Error("Database config is not provided");
  return new adapter(config.db.config);
};
