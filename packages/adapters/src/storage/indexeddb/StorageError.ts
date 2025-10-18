import { StorageError } from "@e-chan1007/regisaku-adapter-sdk";

export class IndexedDBStorageError extends StorageError {
  constructor(message: string) {
    super(message);
    this.name = "IndexedDBStorageError";
  }
}
