import { z } from "zod";
/** Somente campos pessoais mapeados em T12/001; sem conta titular, rede, papel ou ator do cliente. */
export const pendingProfileSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Informe o nome completo.")
      .max(160, "Nome excede o limite permitido.")
      .refine(
        (v) => !/[\u0000-\u001f\u007f]/.test(v),
        "Nome contém caracteres inválidos.",
      ),
    birthDate: z
      .string()
      .refine(
        (v) =>
          v === "" ||
          (/^\d{4}-\d{2}-\d{2}$/.test(v) &&
            v >= "1000-01-01" &&
            v <= "9999-12-31" &&
            !Number.isNaN(Date.parse(v + "T00:00:00Z")) &&
            new Date(v + "T00:00:00Z").toISOString().slice(0, 10) === v),
        "Informe uma data válida.",
      )
      .transform((v) => v || null),
  })
  .strict();
export interface PendingProfileInput {
  name: string;
  birthDate: string | null;
}
