"use client";
import { useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { pendingProfileSchema } from "./schema";
export function ProfileRegistrationForm() {
  const pending = useRef(false),
    form = useRef<HTMLFormElement>(null),
    feedback = useRef<HTMLParagraphElement>(null);
  const [loading, setLoading] = useState(false),
    [message, setMessage] = useState(""),
    [errors, setErrors] = useState<Record<string, string>>({});
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const data = new FormData(event.currentTarget),
      input = { name: data.get("name"), birthDate: data.get("birthDate") },
      parsed = pendingProfileSchema.safeParse(input);
    setMessage("");
    if (!parsed.success) {
      const fields = Object.fromEntries(
        parsed.error.issues.map((i) => [i.path[0], i.message]),
      );
      setErrors(fields);
      (
        form.current?.elements.namedItem(
          fields.name ? "name" : "birthDate",
        ) as HTMLInputElement
      )?.focus();
      return;
    }
    pending.current = true;
    setLoading(true);
    setErrors({});
    try {
      const r = await fetch("/api/pessoas-idosas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
        cache: "no-store",
        credentials: "same-origin",
      });
      // Consumir o body antes de concluir feedback/loading; nao deixar resposta fetch pendente.
      await r.json();
      setMessage(
        r.status === 403
          ? "Cadastro ainda não liberado para esta conta."
          : "Não foi possível confirmar a operação. Não repita automaticamente a solicitação.",
      );
    } catch {
      setMessage(
        "Não foi possível confirmar a operação. Verifique sua conexão.",
      );
    } finally {
      pending.current = false;
      setLoading(false);
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }
  return (
    <form
      ref={form}
      onSubmit={submit}
      noValidate
      aria-busy={loading}
      className="space-y-5"
      data-state="registration"
    >
      <p className="text-meta text-muted-foreground">
        Cadastro ainda indisponível: a autorização deste fluxo está pendente.
      </p>
      <fieldset disabled={loading} className="min-w-0 space-y-5">
        <legend className="mb-4 text-subheading font-semibold">
          Informações pessoais
        </legend>
        <div>
          <label htmlFor="profile-name" className="mb-2 block text-meta">
            Nome completo
          </label>
          <Input
            id="profile-name"
            name="name"
            autoComplete="off"
            maxLength={160}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "profile-name-error" : undefined}
          />
          {errors.name && (
            <p
              id="profile-name-error"
              className="mt-1 text-meta text-destructive"
            >
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="profile-birth" className="mb-2 block text-meta">
            Data de nascimento
          </label>
          <Input
            id="profile-birth"
            name="birthDate"
            type="date"
            autoComplete="off"
            aria-invalid={!!errors.birthDate}
            aria-describedby="birth-help"
          />
          <p id="birth-help" className="mt-1 text-meta text-muted-foreground">
            {errors.birthDate || "Preencha quando disponível."}
          </p>
        </div>
        <Button type="submit" className="w-full">
          {loading ? "Verificando autorização…" : "Cadastrar pessoa idosa"}
        </Button>
      </fieldset>
      <p
        ref={feedback}
        role="alert"
        tabIndex={-1}
        className={message ? "text-meta text-destructive" : "sr-only"}
      >
        {message}
      </p>
      <p className="text-meta text-muted-foreground">
        O cadastro depende de autorização. Não cria uma rede de cuidado nem
        concede papéis automaticamente.
      </p>
    </form>
  );
}
