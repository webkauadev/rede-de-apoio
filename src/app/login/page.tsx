import type { Metadata } from "next";
import { AuthShell } from "@/components/layout/auth-shell";
import { LoginForm } from "@/domains/auth/login/login-form";
export const metadata: Metadata = {
  title: "Entrar | Rede de Apoio",
  referrer: "no-referrer",
};
export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
