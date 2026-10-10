import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/auth-shell";
import { RegistrationForm } from "@/domains/auth/registration/registration-form";
export const metadata: Metadata = {
  title: "Criar conta | Rede de Apoio",
  description: "Cadastro de conta da Rede de Apoio.",
};
export default function RegistrationPage() {
  return (
    <AuthShell>
      <RegistrationForm />
    </AuthShell>
  );
}
