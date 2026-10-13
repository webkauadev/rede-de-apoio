import { cookies } from "next/headers";
import Link from "next/link";
import { AuthShell } from "@/components/layout/auth-shell";
import { requireIdentity } from "@/server/auth/sessions";
import { LogoutButton } from "@/domains/auth/login/logout-button";
export const dynamic = "force-dynamic";
export default async function IdentityPage() {
  let identity;
  try {
    identity = await requireIdentity((await cookies()).toString());
  } catch {
    return (
      <AuthShell>
        <h1 className="text-title">Acesso não autorizado ou indisponível</h1>
        <Link href="/login" className="flex min-h-12 items-center text-primary">
          Entrar
        </Link>
      </AuthShell>
    );
  }
  return (
    <AuthShell>
      <h1 className="text-title">Sessão autenticada</h1>
      <p className="mt-3">
        Verificação técnica provisória de identidade. Categoria:{" "}
        {identity.category === "PESSOA_IDOSA" ? "Pessoa Idosa" : "Cuidador"}.
      </p>
      <p className="my-4">
        Esta verificação não concede acesso a dados de cuidado. As telas e
        permissões contextuais serão implementadas nas próximas User Stories.
      </p>
      <LogoutButton />
    </AuthShell>
  );
}
