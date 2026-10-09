import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function TechnicalHome() {
  return (
    <AppShell title="Rede de Apoio" context="Base técnica V1 · Issue #117">
      <div className="space-y-6">
        <section aria-labelledby="titulo">
          <p className="text-meta font-semibold text-primary">
            DEMONSTRAÇÃO TÉCNICA PROVISÓRIA
          </p>
          <h1 id="titulo" className="mt-2 text-title font-semibold">
            Base pronta para desenvolvimento
          </h1>
          <p className="mt-3 text-muted-foreground">
            Esta página verifica a inicialização e o estilo do projeto. As telas
            de cuidado serão implementadas nas User Stories aprovadas.
          </p>
        </section>
        <Card>
          <CardHeader>
            <CardTitle>Estrutura inicial</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Layout reutilizável, tokens da Rede de Apoio e conteúdo com
              rolagem contida.
            </p>
            <p className="mt-3 text-muted-foreground">
              Home, Agenda, Diário e Saúde aparecem como referência de
              navegação, ainda indisponível.
            </p>
          </CardContent>
        </Card>
        <section aria-labelledby="limites">
          <h2 id="limites" className="text-heading font-semibold">
            Sem dados de cuidado
          </h2>
          <p className="mt-3 text-muted-foreground">
            Não há autenticação, cadastro ou conexão MySQL nesta demonstração.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
