# Execucao orientada por GitHub para Codex

Esta pasta informa **como um agente executa**, sem depender do contexto privado de uma conversa.

1. [CODEX_PLAYBOOK.md](CODEX_PLAYBOOK.md): fontes, ordem de leitura, seguranca, Definition of Done, criterios de bloqueio e fluxo de PR.
2. [../09_BANCO_DE_DADOS/README.md](../09_BANCO_DE_DADOS/README.md): analise e ADRs estruturais; distinguir decisao do solicitante e estudo.
3. [../../database/mysql/README.md](../../database/mysql/README.md): script SQL V0.1 para MySQL Workbench e EER.
4. [../../database/mysql/DECISOES_E_LIMITES.md](../../database/mysql/DECISOES_E_LIMITES.md): hipoteses de prototipacao que NAO sao decisoes de produto.

O Codex deve iniciar por uma **Issue/US concreta**. Se o trabalho exige alternativa funcional ainda nao escolhida, apontar `BLOCKED_BY_DECISION`; nao concluir que banco prototipo e fonte superior aos requisitos canônicos.

O app ainda nao tem stack, backend/frontend, migrations ou auth definidos/implementados. SQL fisico publicado serve para importar e desenhar, **nao** para afirmar sistema funcional. Nao executar em producao e nao fazer merge automatico.
