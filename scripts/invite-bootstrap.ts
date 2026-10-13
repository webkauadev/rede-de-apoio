import { dirname } from "node:path";
import { open, stat, unlink } from "node:fs/promises";
import { parseArgs } from "node:util";
import { registrationSchema } from "../src/domains/auth/registration/schema";
import {
  issueBootstrapInvitation,
  revokeBootstrapInvitation,
} from "../src/server/auth/invitations";
import { assertLocalRegistrationEnvironment } from "../src/server/security/registration-environment";
import { closeDatabase } from "../src/server/db";

let output: Awaited<ReturnType<typeof open>> | undefined;
let outputPath: string | undefined;
try {
  const { values } = parseArgs({
    options: {
      email: { type: "string" },
      "token-file": { type: "string" },
      "confirm-local-disposable": { type: "boolean" },
      "revoke-previous": { type: "boolean" },
      revoke: { type: "boolean" },
      hours: { type: "string" },
    },
  });
  assertLocalRegistrationEnvironment();
  if (!values["confirm-local-disposable"] || process.getuid?.() === 0)
    throw new Error();
  if (values.revoke) {
    await revokeBootstrapInvitation();
    process.stdout.write("Convite bootstrap revogado.\n");
  } else {
    const email = registrationSchema.shape.email.parse(values.email);
    const path = values["token-file"];
    if (!path) throw new Error();
    const parent = await stat(dirname(path));
    if (
      !parent.isDirectory() ||
      parent.uid !== process.getuid?.() ||
      (parent.mode & 0o077) !== 0
    )
      throw new Error();
    // O_EXCL impede sobrescrita/symlink. Arquivo deve estar em diretorio privado do operador.
    output = await open(path, "wx", 0o600);
    outputPath = path;
    const token = await issueBootstrapInvitation(
      email,
      values["revoke-previous"],
      Number(values.hours ?? 24),
    );
    await output.writeFile(token, "utf8");
    await output.sync();
    outputPath = undefined;
    process.stdout.write(
      "Convite emitido no arquivo privado indicado; nenhum papel foi concedido.\n",
    );
  }
} catch {
  process.stderr.write(
    "Operação de convite não confirmada. Verifique ambiente/invariantes; não repita automaticamente.\n",
  );
  process.exitCode = 1;
} finally {
  await output?.close();
  if (outputPath) await unlink(outputPath);
  await closeDatabase();
}
