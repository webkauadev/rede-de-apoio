import type { ReactNode } from "react";
import { HandHeart, Shield } from "lucide-react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="auth-shell">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="auth-header">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent text-brand">
          <HandHeart size={36} aria-hidden="true" />
        </span>
        <p className="mt-1 text-[36px] leading-[44px] font-normal text-brand">
          Rede de Apoio
        </p>
        <p className="mt-1 text-meta text-muted-foreground">
          Cuidado compartilhado, informação organizada
        </p>
      </header>
      <main id="conteudo" tabIndex={-1} className="auth-content">
        {children}
        <aside className="mt-4 flex items-center gap-2 rounded-lg bg-surface-low p-3 text-meta text-muted-foreground">
          <Shield className="shrink-0" size={18} aria-hidden="true" />
          <p>
            Suas informações são protegidas e acessíveis apenas por pessoas
            autorizadas.
          </p>
        </aside>
      </main>
    </div>
  );
}
