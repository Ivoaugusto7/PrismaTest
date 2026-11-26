# Conclusão

O desenvolvimento do PROLAJE permitiu aplicar, em um contexto real e com impacto direto na operação de uma empresa parceira, os conhecimentos construídos ao longo da disciplina nas áreas de levantamento de requisitos, modelagem de processos, projeto de interface, arquitetura de software e desenvolvimento de aplicações web. O projeto partiu de um problema concreto — a dependência de planilhas Excel descentralizadas para geração de orçamentos de lajes pré-moldadas — e resultou em uma solução funcional, acessível via navegador e centralizada em banco de dados, que atende aos principais requisitos levantados junto à empresa Casa Lajes.

## Síntese dos resultados obtidos

A comparação entre o processo AS IS e o processo TO BE evidencia os ganhos mais significativos alcançados com a solução. No processo anterior, o vendedor precisava localizar a planilha em seu computador local, lidar com travamentos e fórmulas instáveis, inserir os dados manualmente e entregar o resultado de forma verbal ou impressa sem padronização. Com o PROLAJE, o mesmo fluxo passou a ser executado inteiramente pelo navegador, com cálculo automático baseado nos parâmetros vigentes cadastrados pelo gestor, geração de resultado estruturado e registro automático do orçamento na base de dados centralizada.

Os testes realizados confirmaram que os requisitos funcionais essenciais foram atendidos: o cadastro e a atualização de materiais e parâmetros funcionam corretamente; os dados do cliente e as dimensões das lajes são registrados sem inconsistências; o cálculo automático responde de forma consistente às entradas informadas; os materiais complementares podem ser adicionados ao pedido; e o histórico de orçamentos é registrado e pode ser consultado e filtrado pelo gestor. Esses resultados demonstram que a solução cumpre seu objetivo principal de substituir as planilhas descentralizadas por uma plataforma web confiável e padronizada.

Do ponto de vista extensionista, o projeto também cumpriu seu papel ao aproximar a universidade de uma demanda real do setor produtivo, permitindo que uma empresa de pequeno porte da construção civil tenha acesso a uma solução tecnológica desenvolvida sem custo como parte de uma atividade acadêmica.

## Limitações da solução proposta

Apesar dos resultados positivos, a solução apresenta limitações que devem ser reconhecidas. A ausência de controle de acesso por perfil de usuário é a mais relevante: na versão atual, todos os usuários acessam o sistema de forma compartilhada, sem distinção entre vendedor e gestor. Isso significa que qualquer pessoa com acesso à URL pode alterar preços, parâmetros e materiais cadastrados, o que representa um risco operacional em um ambiente de uso real.

A dependência de conexão com a internet é outra limitação importante. Em situações de instabilidade de rede, o sistema fica indisponível, o que pode comprometer o atendimento ao cliente — exatamente o tipo de interrupção que o projeto visava eliminar.

Por fim, a precisão dos cálculos gerados pelo sistema depende diretamente da correta manutenção dos preços e parâmetros pelo gestor. 

## Sugestões de novas linhas de estudo e desenvolvimento

Com base na experiência adquirida durante o projeto e nas limitações identificadas, sugere-se como próximos passos e linhas de evolução da solução:

**Notificações e integração com WhatsApp:** considerando que a forma de entrega predominante na operação da empresa é o WhatsApp, uma evolução natural seria integrar a plataforma com a API do WhatsApp Business para envio automatizado do orçamento em PDF diretamente ao cliente a partir do sistema.

**Modo offline parcial:** investigar a viabilidade de implementar um modo de funcionamento offline utilizando Service Workers e armazenamento local no navegador (IndexedDB), permitindo que o vendedor realize orçamentos mesmo em situações de instabilidade de rede, com sincronização posterior ao banco de dados central.

**Expansão do escopo:** o modelo de dados e a arquitetura do PROLAJE foram projetados de forma a permitir evolução. Funcionalidades como controle de estoque, gestão de clientes recorrentes, histórico de negociações e integração com sistemas de nota fiscal são extensões viáveis que agregariam valor significativo à operação da Casa Lajes sem demandar reestruturação completa da solução.
