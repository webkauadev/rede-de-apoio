import { z } from "zod";
import { registrationSchema } from "@/domains/auth/registration/schema";
export const loginSchema = z
  .object({
    email: registrationSchema.shape.email,
    password: z
      .string()
      .min(1, "Informe sua senha.")
      .refine(
        (v) => new TextEncoder().encode(v).length <= 1024,
        "Senha excede o limite permitido.",
      ),
  })
  .strict();
export type LoginInput = z.infer<typeof loginSchema>;
/** Contrato reservado: recuperação requer outra definição de fluxo; nenhum endpoint nesta US. */
export interface PasswordRecoveryRequest {
  email: string;
}
