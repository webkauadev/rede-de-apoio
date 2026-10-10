import "server-only";
import { argon2id, hash } from "argon2";

/** OWASP: Argon2id, 19 MiB, duas iterações, paralelismo 1. Salt aleatório da biblioteca. */
export function hashPassword(password: string): Promise<string> {
  return hash(password, {
    type: argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
    hashLength: 32,
  });
}
