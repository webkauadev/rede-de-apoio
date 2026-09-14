# T12 + T13 — Material 3 full-state migration — 2026-09-14

Status: **FULL STATE SET MATERIALIZED — AUDITED — PENDING FINAL HUMAN REVIEW**.

Human baseline approval was received before propagation. Approved sibling states were derived under `STATE = PAGE BASE + DELTA MÍNIMO`.

## T12

Migrated approved states: Cadastro `5887:3998`, Edição `5886:3993`, Visualização `5876:3950`, Success `5887:4190`, Validation Error `5892:4365`.

Review board: `5895:27129`.

RF30/US-036 proposal-only states remain outside canonical migration.

## T13

Migrated approved states: Default `5876:3951`, Loading `5887:4227`, Vincular membro `5889:4068`, Validation Error `5889:26908`, Vínculo concluído `5888:4032`, Gerenciar papéis `5889:26976`, Papéis atualizados `5890:4162`, Transferir Principal `5890:4234`, Transferência concluída `5890:4334`, Desvincular membro `5891:4287`, Desvinculado `5891:4379`.

Review board: `5898:4400`.

P06 remains open. Exactly one active Principal is preserved visually after transfer, and unlink removes the member from the active network while retaining historical-record messaging.

## Final audit

Across all 16 migrated approved roots: owner page David = pass; viewport 390×844 = pass; exactly one canonical AppHeader / Back = pass; legacy Mais/compFooter/footer = 0; Inter legacy typography = 0; structural custom text below 14 px = 0; unbound semantic solid colors = 0; undersized audited interactive controls after corrections = 0.

Representative screenshots were manually reviewed for T12 Cadastro/Edição/Validation Error and T13 Vincular membro/Validation Error/Gerenciar papéis/Transferir Principal/Desvincular membro/Transferência concluída/Desvinculado.

Do not merge PR #99 without explicit final human authorization.
