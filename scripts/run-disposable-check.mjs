import { readFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
try {
  const [path, ...command] = process.argv.slice(2);
  const { name, id, env } = JSON.parse(await readFile(path, "utf8"));
  if (
    !name.startsWith("rede-apoio-us001-") ||
    env.DATABASE_HOST !== "127.0.0.1" ||
    env.US001_INTEGRATION !== "authorized-disposable"
  )
    throw new Error("Ambiente nao autorizado.");
  const inspect = spawnSync(
    "podman",
    [
      "inspect",
      "--format",
      '{{.Name}} {{index .Config.Labels "rede-apoio.us001.disposable"}}',
      id,
    ],
    { encoding: "utf8" },
  );
  if (inspect.status !== 0 || inspect.stdout.trim() !== `${name} true`)
    throw new Error("Container descartavel identificado nao esta disponivel.");
  const child = spawn(command[0], command.slice(1), {
    stdio: "inherit",
    env: { ...process.env, ...env },
  });
  child.on("exit", (code) => {
    process.exitCode = code ?? 1;
  });

  child.on("error", () => {
    process.stderr.write("Comando local nao iniciado.\n");
    process.exitCode = 1;
  });
} catch {
  process.stderr.write(
    "Estado privado ou recurso descartavel nao confirmado.\n",
  );
  process.exitCode = 1;
}
