// Refuse tests/capture/cleanup against any resource other than this disposable harness.
import { readFile, realpath, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
export async function loadState(path) {
  const actual = await realpath(path);
  if (
    !/^\/tmp\/rede-apoio-sql-eer-[^/]+\/state\.json$/.test(actual) ||
    (await stat(actual)).mode & 0o077
  )
    throw Error("Private disposable state required");
  const state = JSON.parse(await readFile(actual, "utf8"));
  if (!/^rede-apoio-sql-eer-[0-9a-f]{12}$/.test(state.name))
    throw Error("Ownership mismatch");
  const result = spawnSync("podman", ["inspect", state.id], {
    encoding: "utf8",
  });
  if (result.status !== 0) throw Error("Own disposable resource missing");
  const [resource] = JSON.parse(result.stdout);
  const binding = resource.HostConfig.PortBindings["3306/tcp"];
  if (
    resource.Name !== state.name ||
    resource.Config.Labels["rede-apoio.sql-eer.disposable"] !== "true" ||
    binding.length !== 1 ||
    binding[0].HostIp !== "127.0.0.1" ||
    Number(binding[0].HostPort) !== state.port
  )
    throw Error("Disposable loopback ownership mismatch");
  return state;
}
