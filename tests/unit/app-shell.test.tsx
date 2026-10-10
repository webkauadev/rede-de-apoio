import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { AppShell } from "@/components/layout/app-shell";
import TechnicalHome from "@/app/page";
describe("scaffold sem backend", () => {
  it("renderiza a página provisória sem formularios ou dados de cuidado", () => {
    const html = renderToStaticMarkup(<TechnicalHome />);
    expect(html).toContain("DEMONSTRAÇÃO TÉCNICA PROVISÓRIA");
    expect(html).toContain("Não há autenticação, cadastro ou conexão MySQL");
    expect(html).not.toContain("<form");
    expect(html.match(/aria-disabled="true"/g)).toHaveLength(4);
  });
  it("habilita somente destinos fornecidos e conserva seleção semântica", () => {
    const html = renderToStaticMarkup(
      <AppShell
        title="Teste"
        activeDestination="home"
        destinationHrefs={{ home: "/" }}
        localSubnav={<nav aria-label="Local">Local</nav>}
      >
        <p>Conteúdo</p>
      </AppShell>,
    );
    expect(html).toContain('aria-current="page"');
    expect(html.match(/aria-disabled="true"/g)).toHaveLength(3);
    expect(html.indexOf("Local</nav>")).toBeLessThan(html.indexOf("<main"));
    expect(html.indexOf("</main>")).toBeLessThan(
      html.indexOf('aria-label="Navegação principal"'),
    );
  });
});
