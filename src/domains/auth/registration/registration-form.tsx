"use client";
import { useRef, useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  registrationSchema,
  fieldErrors,
  type RegistrationErrors,
  type RegistrationField,
} from "./schema";

const fields = [
  {
    name: "name",
    label: "Nome completo",
    placeholder: "Ex.: Ana Ferreira",
    autoComplete: "name",
    type: "text",
  },
  {
    name: "email",
    label: "E-mail",
    placeholder: "nome@exemplo.com",
    autoComplete: "email",
    type: "email",
  },
  {
    name: "password",
    label: "Senha",
    placeholder: "Crie uma senha",
    autoComplete: "new-password",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirmar senha",
    placeholder: "Digite a senha novamente",
    autoComplete: "new-password",
    type: "password",
  },
] as const;

export function RegistrationForm() {
  const form = useRef<HTMLFormElement>(null);
  const pending = useRef(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [message, setMessage] = useState("");
  const [created, setCreated] = useState(false);
  const [visible, setVisible] = useState<
    Partial<Record<RegistrationField, boolean>>
  >({});
  function focusError(nextErrors: RegistrationErrors) {
    const first = fields.find((field) => nextErrors[field.name]);
    if (first)
      (
        form.current?.elements.namedItem(first.name) as HTMLInputElement | null
      )?.focus();
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || created) return;
    const data = new FormData(event.currentTarget);
    const input = Object.fromEntries(
      fields.map(({ name }) => [name, data.get(name)]),
    );
    const parsed = registrationSchema.safeParse(input);
    setMessage("");
    if (!parsed.success) {
      const nextErrors = fieldErrors(parsed.error);
      setErrors(nextErrors);
      focusError(nextErrors);
      return;
    }
    pending.current = true;
    setLoading(true);
    setErrors({});
    try {
      const result = await fetch("/api/auth/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body: unknown = await result.json();
      if (
        result.status === 201 &&
        typeof body === "object" &&
        body !== null &&
        "created" in body &&
        body.created === true
      ) {
        setCreated(true);
        form.current?.reset();
        setMessage("Conta criada. O acesso depende das permissões atribuídas.");
      } else {
        setMessage(
          typeof body === "object" &&
            body !== null &&
            "message" in body &&
            typeof body.message === "string"
            ? body.message
            : "Não foi possível confirmar o cadastro.",
        );
      }
    } catch {
      setMessage(
        "Não foi possível confirmar o cadastro. Verifique sua conexão antes de tentar novamente.",
      );
    } finally {
      pending.current = false;
      setLoading(false);
    }
  }
  return (
    <section
      className="rounded-lg border bg-card px-5 pt-5 pb-2 shadow-card"
      aria-labelledby="cadastro-title"
      data-screen="T02"
    >
      <h1 id="cadastro-title" className="text-center text-title font-semibold">
        Criar sua conta
      </h1>
      <p className="mt-1 text-center text-meta text-muted-foreground">
        Cadastre seus dados para acessar a Rede de Apoio.
      </p>
      <form
        ref={form}
        onSubmit={submit}
        noValidate
        aria-busy={loading}
        className="mt-4"
      >
        <fieldset disabled={loading || created} className="min-w-0 space-y-4">
          <legend className="sr-only">Dados da conta</legend>
          {fields.map((field) => {
            const password = field.type === "password";
            const error = errors[field.name];
            return (
              <div key={field.name}>
                <label htmlFor={field.name} className="mb-1 block text-meta">
                  {field.label}
                </label>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={password && visible[field.name] ? "text" : field.type}
                    autoComplete={field.autoComplete}
                    autoCapitalize={field.name === "email" ? "none" : undefined}
                    spellCheck={
                      password || field.name === "email" ? false : undefined
                    }
                    placeholder={field.placeholder}
                    required
                    aria-invalid={!!error}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                    className={password ? "pr-12" : undefined}
                  />
                  {password && (
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex size-12 items-center justify-center rounded-lg"
                      aria-label={`${visible[field.name] ? "Ocultar" : "Mostrar"} ${field.label.toLowerCase()}`}
                      aria-pressed={!!visible[field.name]}
                      onClick={() =>
                        setVisible((current) => ({
                          ...current,
                          [field.name]: !current[field.name],
                        }))
                      }
                    >
                      {visible[field.name] ? (
                        <Eye size={20} aria-hidden="true" />
                      ) : (
                        <EyeOff size={20} aria-hidden="true" />
                      )}
                    </button>
                  )}
                </div>
                {error && (
                  <p
                    id={`${field.name}-error`}
                    className="mt-1 text-meta text-destructive"
                  >
                    {error}
                  </p>
                )}
              </div>
            );
          })}
          <Button type="submit" className="w-full">
            {loading && (
              <LoaderCircle
                className="motion-safe:animate-spin"
                size={18}
                aria-hidden="true"
              />
            )}
            {loading ? "Criando conta…" : "Criar conta"}
          </Button>
        </fieldset>
        {message && (
          <p
            role={created ? "status" : "alert"}
            className="mt-3 text-meta text-muted-foreground"
          >
            {message}
          </p>
        )}
      </form>
      <p className="mt-1 flex min-h-12 items-center gap-1 text-meta text-muted-foreground">
        Já tem uma conta?{" "}
        <button
          type="button"
          disabled
          className="min-h-12 min-w-12 text-primary"
          title="Login disponível após implementação da US-002"
        >
          Entrar<span className="sr-only"> — login ainda indisponível</span>
        </button>
      </p>
    </section>
  );
}
