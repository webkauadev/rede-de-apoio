import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, UserRound } from "lucide-react";
import { ProfileRegistrationForm } from "@/domains/pessoa-idosa/registration-form";
export const metadata: Metadata = {
  title: "Pessoa Idosa | Rede de Apoio",
  referrer: "no-referrer",
};
/** T12 registration = baseline + campos vazios. Nenhuma consulta/exposicao de perfil pendente. */
export default function ProfileRegistrationPage() {
  return (
    <div className="profile-shell" data-screen="T12">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="flex h-[calc(4rem+env(safe-area-inset-top))] shrink-0 items-center gap-3 bg-card px-4 pt-[env(safe-area-inset-top)]">
        <Link
          href="/sessao"
          className="flex size-12 items-center justify-center"
          aria-label="Voltar"
        >
          <ArrowLeft size={24} aria-hidden="true" />
        </Link>
        <p className="text-heading font-semibold">Pessoa Idosa</p>
      </header>
      <main
        id="conteudo"
        tabIndex={-1}
        className="content-viewport pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
      >
        <section aria-labelledby="profile-heading">
          <div className="mb-5 text-center">
            <span className="mx-auto mb-3 flex size-[88px] items-center justify-center rounded-full border bg-surface-low text-muted-foreground">
              <UserRound size={44} aria-hidden="true" />
            </span>
            <h1 id="profile-heading" className="text-title font-semibold">
              Cadastrar pessoa idosa
            </h1>
            <p className="mt-1 text-meta text-muted-foreground">
              Perfil da pessoa idosa
            </p>
          </div>
          <ProfileRegistrationForm />
        </section>
      </main>
    </div>
  );
}
