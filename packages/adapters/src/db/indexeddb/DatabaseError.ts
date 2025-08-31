import { DatabaseError } from "@e-chan1007/regisaku-adapter-sdk";

export class IndexedDBError extends DatabaseError {
  constructor(message: string) {
    super(message);
    this.name = "IndexedDBError";
  }
}
