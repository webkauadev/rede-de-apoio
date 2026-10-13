"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export function LogoutButton() {
  const router = useRouter();
  const pending = useRef(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    if (pending.current) return;
    pending.current = true;
    setLoading(true);
    setError("");
    try {
      const result = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
      });
      if (!result.ok) throw new Error();
      router.replace("/login");
      router.refresh();
    } catch {
      setError(
        "Não foi possível confirmar a saída. Tente novamente quando a conexão estiver disponível.",
      );
    } finally {
      pending.current = false;
      setLoading(false);
    }
  }
  return (
    <>
      <Button onClick={signOut} disabled={loading}>
        {loading ? "Saindo…" : "Sair"}
      </Button>
      <p role="alert">{error}</p>
    </>
  );
}
