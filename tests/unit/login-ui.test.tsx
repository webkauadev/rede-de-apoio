import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn() }),
}));
import LoginPage from "@/app/login/page";
import { LogoutButton } from "@/domains/auth/login/logout-button";
describe("RF02 → US-002 → T01/E01 → AuthShell", () => {
  it("renderiza campos semanticamente associados sem backend/segredo", () => {
    const html = renderToStaticMarkup(<LoginPage />);
    for (const expected of [
      'data-screen="T01"',
      "Entrar na sua conta",
      'autoComplete="username"',
      'autoComplete="current-password"',
      'id="login-email"',
      'for="login-email"',
      'id="login-password"',
      'for="login-password"',
      'role="alert"',
      'href="/cadastro"',
    ])
      expect(html).toContain(expected);
    expect(html).not.toContain("Navegação principal");
    expect(html).not.toContain("senha_hash");
    expect(html).not.toContain("token_hash");
  });
  it("recuperacao permanece desabilitada, sem endpoint inventado", () => {
    const html = renderToStaticMarkup(<LoginPage />);
    expect(html).toMatch(
      /disabled=""[^>]*title="Recuperação de senha ainda indisponível"/,
    );
  });
  it("logout possui acao acessivel e feedback de falha", () => {
    const html = renderToStaticMarkup(<LogoutButton />);
    expect(html).toContain("Sair</button>");
    expect(html).toContain('role="alert"');
  });
});
