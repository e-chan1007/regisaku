export abstract class AbstractStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StorageError";
  }
}
