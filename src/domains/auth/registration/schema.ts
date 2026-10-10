import { z } from "zod";

/** Mesma normalização no cliente/servidor; não aplica heurísticas de provedores. */
export const registrationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Informe seu nome completo.")
      .max(160, "Use até 160 caracteres."),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(254, "Use até 254 caracteres.")
      .pipe(z.email("Informe um e-mail válido.")),
    password: z
      .string()
      .min(1, "Informe uma senha.")
      .refine(
        (value) => new TextEncoder().encode(value).length <= 1024,
        "Senha excede o limite técnico de 1024 bytes.",
      ),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .strict()
  .refine((value) => value.password === value.confirmPassword, {
    message: "As senhas devem ser iguais.",
    path: ["confirmPassword"],
  });
export type RegistrationInput = z.infer<typeof registrationSchema>;
export type RegistrationField = keyof RegistrationInput;
export type RegistrationErrors = Partial<Record<RegistrationField, string>>;
export function fieldErrors(error: z.ZodError): RegistrationErrors {
  const errors: RegistrationErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (
      key === "name" ||
      key === "email" ||
      key === "password" ||
      key === "confirmPassword"
    ) {
      errors[key] ??= issue.message;
    }
  }
  return errors;
}
