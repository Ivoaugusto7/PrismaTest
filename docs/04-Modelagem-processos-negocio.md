# Modelagem dos processos de negócio


## Modelagem da situação atual (Modelagem AS IS)

### Descrição do Processo Atual
A Casa Lajes realiza hoje o processo de elaboração de orçamentos de lajes pré-moldadas de forma inteiramente manual, tendo como principal ferramenta uma planilha Excel desenvolvida internamente. Não existe um sistema computacional centralizado, cada computador da empresa possui sua própria versão da planilha, copiada e modificada de forma independente ao longo do tempo.

O processo se inicia quando um cliente solicita um orçamento presencialmente ou por telefone. O vendedor ou operador, ao receber o pedido, localiza a planilha salva em seu próprio computador e tenta abrí-la. Nesse primeiro momento já surge o primeiro gargalo: a planilha frequentemente apresenta travamentos, falhas em fórmulas e erros em macros, exigindo que o vendedor tente reabrir o arquivo ou recorra a outro computador, gerando atrasos no atendimento.

Quando a planilha consegue ser aberta, o vendedor insere manualmente as dimensões das lajes e os dados da obra nos campos correspondentes. A planilha então executa os cálculos por meio de fórmulas e macros. Nesse ponto surge o segundo gargalo: o resultado obtido pode divergir do resultado gerado em outro computador. Não há garantia de que todos os vendedores estejam utilizando os mesmos valores e regras de cálculo.
Após verificar o resultado manualmente (sem qualquer validação automática), o vendedor entrega o orçamento ao cliente de forma verbal ou imprime uma versão simples, sem padronização visual ou estrutura definida.

Do lado do gestor, o processo também apresenta fragilidades. Após cada atendimento, o arquivo é salvo localmente no computador do vendedor. Não há um repositório único ou banco de dados compartilhado. Quando o gestor precisa consultar um orçamento anterior, é necessário buscar manualmente entre os arquivos dispersos nos diferentes computadores da empresa. Em muitos casos, o histórico simplesmente não é encontrado, impossibilitando análises gerenciais, rastreabilidade dos atendimentos e controle de produção.

A atualização de preços e parâmetros também é um processo crítico: quando há necessidade de alteração, o gestor precisa modificar a planilha em cada computador individualmente, o que raramente ocorre de forma sincronizada, perpetuando o problema das versões divergentes.

### Gargalos identificados no processo AS-IS
Processo 1 - Geração de orçamento:

Planilha trava ou apresenta erro ao abrir, causando retrabalho e atraso no atendimento
Fórmulas e macros instáveis geram resultados incorretos sem aviso ao usuário
Cada computador possui uma versão diferente, com preços e parâmetros distintos
Resultado é entregue verbalmente ou impresso sem padrão definido

Processo 2 - Controle e gestão:

Não há histórico centralizado de orçamentos emitidos
Arquivos dispersos em múltiplas máquinas dificultam ou impossibilitam consultas gerenciais
Atualização de preços depende de intervenção manual em cada computador
Ausência de rastreabilidade dos atendimentos realizados


## Descrição geral da proposta (Modelagem TO BE)

O PROLAJE é uma plataforma web centralizada desenvolvida para substituir o uso de planilhas Excel descentralizadas no processo de elaboração de orçamentos de lajes pré-moldadas da Casa Lajes. A solução introduz tecnologia computacional em um processo que hoje depende inteiramente de arquivos locais, intervenção manual e controle informal, promovendo ganhos diretos de eficiência, confiabilidade e organização.
No novo processo, o vendedor acessa o sistema pelo navegador de qualquer computador da empresa, sem necessidade de instalação de software. Ao receber um pedido do cliente, ele cadastra os dados da obra e informa as dimensões das lajes diretamente no sistema. O PROLAJE executa automaticamente o cálculo dos materiais e do valor total, aplicando sempre a tabela de preços e os parâmetros vigentes - que são únicos, centralizados e mantidos pelo gestor. O orçamento gerado é exibido de forma estruturada para revisão do vendedor e, após confirmação, é disponibilizado em PDF padronizado para entrega ao cliente.
No processo de controle e gestão, o gestor passa a ter acesso a um histórico consolidado de todos os orçamentos emitidos, com possibilidade de consulta e filtragem. A atualização de preços e parâmetros é feita uma única vez no sistema e reflete imediatamente para todos os usuários, eliminando o problema das versões divergentes.

### Oportunidades de Melhoria por Processo

Processo 1 - Geração de orçamento com o PROLAJE

A eliminação da planilha local remove completamente os gargalos de travamento e falhas em macros, pois a lógica de cálculo passa a rodar no servidor, de forma estável e controlada.
O cálculo automático reduz o tempo de atendimento, que antes dependia da disponibilidade e estabilidade da planilha, e elimina o risco de erro por inserção incorreta de fórmulas.
Todos os vendedores passam a utilizar exatamente os mesmos preços e parâmetros de cálculo, garantindo consistência nos orçamentos independentemente de quem realiza o atendimento.
A geração do PDF padronizado profissionaliza a entrega ao cliente, substituindo o orçamento verbal ou impresso sem padrão que era utilizado anteriormente.
O registro automático de cada orçamento no banco de dados dispensa qualquer ação manual de salvamento por parte do vendedor.

Processo 2 - Controle e gestão com o PROLAJE

O histórico centralizado permite ao gestor consultar qualquer orçamento emitido a qualquer momento, sem depender de buscas manuais em arquivos dispersos entre computadores.
A atualização de preços e parâmetros passa a ser feita em um único lugar e reflete instantaneamente para todos os usuários do sistema, eliminando definitivamente o problema das versões divergentes.
O gestor passa a ter visibilidade sobre o volume de atendimentos, os materiais calculados e os valores orçados, apoiando a tomada de decisão e o planejamento da produção.
A rastreabilidade dos orçamentos emitidos permite identificar inconsistências, analisar o histórico de um cliente e apoiar futuras negociações.


### Limites da Solução
Apesar dos benefícios propostos, o PROLAJE possui limitações que devem ser consideradas:

Dependência de conexão com internet: o sistema requer acesso à rede para funcionar. Em situações de queda de conexão, o atendimento pode ser interrompido. Essa limitação pode ser contornada futuramente com o desenvolvimento de uma versão com funcionamento offline parcial.
Ausência de controle de acesso por perfil: na versão inicial, o sistema não possui autenticação diferenciada entre vendedor e gestor. Todos os usuários acessam o sistema de forma compartilhada, seguindo a mesma lógica da planilha atual. O controle de acesso por perfil é uma evolução prevista para versões futuras.
Armazenamento persistente em análise: o armazenamento definitivo do histórico de orçamentos ainda está sendo avaliado pela equipe. Os requisitos relacionados ao histórico foram mantidos com prioridade menor nesta versão inicial, podendo ser implementados de forma completa em uma próxima entrega.
Dependência de parametrização correta: a precisão dos cálculos gerados pelo sistema depende diretamente da correta manutenção dos preços e parâmetros pelo gestor responsável. Dados desatualizados ou incorretamente cadastrados resultarão em orçamentos imprecisos.
Escopo limitado ao processo de orçamento: o PROLAJE não cobre outros processos da empresa, como controle de estoque, gestão financeira ou emissão de notas fiscais. Sua função é restrita ao dimensionamento e orçamentação de lajes pré-moldadas.


### Alinhamento com as Estratégias e Objetivos do Negócio
A proposta do PROLAJE está diretamente alinhada com as três prioridades identificadas na Casa Lajes durante o levantamento com a empresa parceira:
Agilidade no atendimento: o sistema reduz o tempo de elaboração de um orçamento, que antes dependia da abertura de uma planilha instável e da inserção manual de dados sem validação. Com o PROLAJE, o vendedor acessa o sistema, informa as dimensões e recebe o resultado calculado em segundos.
Confiabilidade dos cálculos: ao centralizar a lógica de cálculo e a tabela de preços em um único sistema, o PROLAJE garante que todos os orçamentos sigam as mesmas regras. Isso elimina o risco de divergências entre atendimentos realizados em computadores diferentes e aumenta a confiança tanto da empresa quanto do cliente no resultado apresentado.
Melhoria da organização interna: o histórico centralizado, a atualização unificada de parâmetros e a padronização dos documentos gerados contribuem diretamente para a organização dos processos internos da empresa. O gestor passa a ter controle real sobre o que está sendo orçado, por quem e com quais valores.
Além disso, o projeto possui caráter extensionista, sendo desenvolvido sem custo para a empresa parceira como parte de uma atividade acadêmica. Isso representa uma oportunidade concreta de modernização tecnológica para uma empresa de pequeno porte do setor da construção civil, com potencial de expansão futura da solução para outras funcionalidades, como controle de produção e gestão de clientes.

## Modelagem dos processos

[PROCESSO 1 AS IS - Geração de Orçamento de Lajes Pré-Moldadas](./processes/processo-1-as-is.md "Detalhamento do processo 1 AS IS.")

[PROCESSO 1 TO BE - Controle e Gestão de Orçamentos](./processes/processo-1-to-be.md "Detalhamento do processo 1 TO BE.")

[PROCESSO 2 AS IS - Geração de Orçamento com o PROLAJE](./processes/processo-2-as-is.md "Detalhamento do processo 2 AS IS.")

[PROCESSO 2 TO BE - Controle e Gestão de Orçamentos com o PROLAJE](./processes/processo-2-to-be.md "Detalhamento do processo 2 TO BE.")

## Indicadores de Desempenho

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| --- | --- | --- | --- | --- |
| Taxa de orçamentos gerados por período | Monitorar o volume de atendimentos realizados pelo sistema | Mede a quantidade de orçamentos emitidos em um determinado período, permitindo acompanhar a evolução do uso do PROLAJE | Tabela Orçamento | (número de orçamentos gerados no período / número total de orçamentos acumulados) * 100 |
| Taxa de orçamentos aceitos pelo cliente | Avaliar a efetividade comercial dos orçamentos emitidos | Mede o percentual de orçamentos que resultaram em aceitação pelo cliente em relação ao total emitido | Tabela Orçamento | (número de orçamentos com status "Aceito" / número total de orçamentos emitidos) * 100 |
| Tempo médio de geração de orçamento | Reduzir o tempo de atendimento ao cliente | Mede o tempo médio decorrido entre o cadastro do cliente e a geração do PDF do orçamento, avaliando a agilidade do processo | Tabela Orçamento | soma dos tempos (data_hora_pdf − data_hora_cadastro) / número total de orçamentos gerados |
| Taxa de atualização de preços e parâmetros | Garantir que os cálculos utilizem sempre os valores vigentes | Mede a frequência com que o gestor realiza atualizações na tabela de preços e parâmetros de cálculo dentro do mês | Tabela Parâmetro | número de atualizações realizadas no mês / meta de atualizações mensais definida pela empresa |
| Valor médio dos orçamentos emitidos | Acompanhar o ticket médio dos atendimentos realizados | Mede o valor médio dos orçamentos gerados em um período, permitindo identificar variações no perfil das obras atendidas | Tabela Orçamento | soma dos valores totais dos orçamentos do período / número de orçamentos emitidos no período |
| Percentual de orçamentos com frete incluso | Entender o perfil de atendimento e o impacto do frete no valor final | Mede a proporção de orçamentos que incluíram frete em relação ao total emitido | Tabela Orçamento | (número de orçamentos com frete = Sim / número total de orçamentos emitidos) * 100 |
| Taxa de utilização por tipo de laje | Identificar os tipos de laje mais demandados pelos clientes | Mede a frequência de uso de cada tipo de laje nos orçamentos gerados, apoiando decisões de estoque e produção | Tabela ItemOrcamento | (número de itens com tipo_laje = X / número total de itens de orçamento) * 100 |
| Quantidade média de ambientes por orçamento | Compreender o porte médio das obras atendidas | Mede a média de ambientes ou lajes cadastrados por orçamento, indicando a complexidade média dos projetos | Tabela ItemOrcamento / Tabela Orçamento | número total de itens de orçamento / número total de orçamentos gerados |
