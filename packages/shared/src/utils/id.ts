import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ACDEFGHJKMNPQRTUVWXY", 8);
export const createId = <T extends string>(): T => nanoid() as T;
