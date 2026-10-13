"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "./schema";
export function LoginForm() {
  const router = useRouter();
  const pending = useRef(false);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [message, setMessage] = useState("");
  const feedback = useRef<HTMLParagraphElement>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = loginSchema.safeParse({
      email: data.get("email"),
      password: data.get("password"),
    });
    setMessage("");
    if (!parsed.success) {
      const nextErrors = Object.fromEntries(
        parsed.error.issues.map((issue) => [issue.path[0], issue.message]),
      );
      setErrors(nextErrors);
      (nextErrors.email ? email : password).current?.focus();
      return;
    }
    pending.current = true;
    setLoading(true);
    setErrors({});
    let success = false;
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        credentials: "same-origin",
        cache: "no-store",
      });
      const body: unknown = await response.json();
      if (
        response.ok &&
        typeof body === "object" &&
        body !== null &&
        "authenticated" in body &&
        body.authenticated === true
      ) {
        success = true;
        form.reset();
        setVisible(false);
        router.replace("/sessao");
        router.refresh();
      } else {
        // Nenhuma mensagem de servidor desconhecida chega ao formulario.
        setMessage(
          response.status === 401
            ? "E-mail ou senha inválidos."
            : response.status === 429
              ? "Muitas tentativas. Aguarde antes de tentar novamente."
              : "Login indisponível. Não repita automaticamente a solicitação.",
        );
        password.current!.value = "";
        setVisible(false);
      }
    } catch {
      setMessage("Não foi possível confirmar o login. Verifique sua conexão.");
      password.current!.value = "";
      setVisible(false);
    } finally {
      pending.current = false;
      setLoading(false);
      if (!success) requestAnimationFrame(() => feedback.current?.focus());
    }
  }
  return (
    <section
      className="rounded-lg border bg-card px-5 pt-5 pb-2 shadow-card"
      aria-labelledby="login-title"
      data-screen="T01"
    >
      <h1 id="login-title" className="text-center text-title font-semibold">
        Entrar na sua conta
      </h1>
      <p className="mt-1 text-center text-meta text-muted-foreground">
        Acesse sua rede de cuidado e acompanhe as informações da pessoa idosa.
      </p>
      <form onSubmit={submit} noValidate aria-busy={loading} className="mt-4">
        <fieldset disabled={loading} className="min-w-0 space-y-4">
          <legend className="sr-only">Credenciais da conta</legend>
          <div>
            <label htmlFor="login-email" className="mb-2 block text-meta">
              E-mail
            </label>
            <Input
              ref={email}
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="nome@exemplo.com"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "login-email-error" : undefined}
            />
            {errors.email && (
              <p
                id="login-email-error"
                className="mt-1 text-meta text-destructive"
              >
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="login-password" className="mb-2 block text-meta">
              Senha
            </label>
            <div className="relative">
              <Input
                ref={password}
                id="login-password"
                name="password"
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Digite sua senha"
                required
                className="pr-12"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex size-12 items-center justify-center rounded-lg"
                aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                {visible ? (
                  <Eye size={20} aria-hidden="true" />
                ) : (
                  <EyeOff size={20} aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="login-password-error"
                className="mt-1 text-meta text-destructive"
              >
                {errors.password}
              </p>
            )}
          </div>
        </fieldset>
        <div className="flex justify-end">
          <button
            type="button"
            disabled
            className="min-h-12 min-w-12 text-meta text-primary"
            title="Recuperação de senha ainda indisponível"
          >
            Esqueci minha senha
          </button>
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {loading && (
            <LoaderCircle
              className="motion-safe:animate-spin"
              size={18}
              aria-hidden="true"
            />
          )}
          {loading ? "Entrando…" : "Entrar"}
        </Button>
        <p
          ref={feedback}
          role="alert"
          tabIndex={-1}
          className={message ? "mt-3 text-meta text-destructive" : "sr-only"}
        >
          {message}
        </p>
      </form>
      <p className="mt-1 flex min-h-12 items-center gap-1 text-meta text-muted-foreground">
        Ainda não tem uma conta?{" "}
        <Link
          className="flex min-h-12 min-w-12 items-center text-primary"
          href="/cadastro"
          title="Cadastro restrito por convite individual"
        >
          Criar conta
        </Link>
      </p>
    </section>
  );
}
