import { nanoid } from "nanoid";

export const createId = <T extends string>(): T => nanoid<T>();
