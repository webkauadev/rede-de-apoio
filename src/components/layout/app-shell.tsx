import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen, CalendarDays, Heart, House } from "lucide-react";
import { cn } from "@/lib/utils";
export type PrimaryDestination = "home" | "agenda" | "diario" | "saude";
const destinations = [
  { id: "home", label: "Home", icon: House },
  { id: "agenda", label: "Agenda", icon: CalendarDays },
  { id: "diario", label: "Diário", icon: BookOpen },
  { id: "saude", label: "Saúde", icon: Heart },
] as const;
type AppShellProps = {
  title: string;
  context?: string;
  children: ReactNode;
  localSubnav?: ReactNode;
  activeDestination?: PrimaryDestination;
  destinationHrefs?: Partial<Record<PrimaryDestination, string>>;
};
/** Rotas só são habilitadas quando fornecidas; isto não concede autorização. */
export function AppShell({
  title,
  context,
  children,
  localSubnav,
  activeDestination,
  destinationHrefs = {},
}: AppShellProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="app-header">
        <p className="text-heading font-semibold">{title}</p>
        {context && (
          <p className="text-meta text-muted-foreground">{context}</p>
        )}
      </header>
      {localSubnav && (
        <div className="shrink-0 border-b border-border bg-card">
          {localSubnav}
        </div>
      )}
      <main id="conteudo" tabIndex={-1} className="content-viewport">
        {children}
      </main>
      <nav aria-label="Navegação principal" className="primary-navigation">
        {destinations.map(({ id, label, icon: Icon }) => {
          const href = destinationHrefs[id];
          const content = (
            <>
              <span
                className={cn(
                  "nav-indicator",
                  activeDestination === id &&
                    "bg-secondary text-secondary-foreground",
                )}
              >
                <Icon size={24} aria-hidden="true" />
              </span>
              <span>{label}</span>
            </>
          );
          return href ? (
            <Link
              key={id}
              className="nav-item"
              href={href}
              aria-current={activeDestination === id ? "page" : undefined}
            >
              {content}
            </Link>
          ) : (
            <span
              key={id}
              className="nav-item text-muted-foreground"
              aria-disabled="true"
            >
              {content}
              <span className="sr-only"> — ainda não implementado</span>
            </span>
          );
        })}
      </nav>
    </div>
  );
}
