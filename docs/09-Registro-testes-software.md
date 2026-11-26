# Registro de testes de software

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>, <a href="08-Plano-testes-software.md"> Plano de testes de software</a>

Relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes predefinido. Todos os casos de teste foram executados manualmente no navegador Google Chrome, com o PROLAJE hospedado em ambiente de produção (Vercel + Railway). Todos os critérios de êxito foram alcançados.

---

| **Caso de teste** | **CT-001 – Cadastrar material** |
|:---:|:---:|
| Requisito associado | RF-001 – Permitir o cadastro e a atualização centralizada de preços e parâmetros dos materiais. |
| Resultado obtido | ✅ Aprovado — O material foi cadastrado com sucesso e apareceu corretamente na tabela "Materiais cadastrados" com nome, unidade, preço e categoria. O contador "Materiais ativos" foi atualizado automaticamente. |
| Responsável pelo registro da evidência | João Pedro de Castro Vieira |

📹 Screencast CT-001: _inserir link do vídeo gravado no GitHub Assets_

---

| **Caso de teste** | **CT-002 – Preencher dados do cliente e dimensões da laje** |
|:---:|:---:|
| Requisito associado | RF-002 – Permitir o cadastro dos dados do cliente. RF-003 – Permitir o cadastro de uma ou mais lajes/ambientes com suas dimensões no mesmo orçamento. |
| Resultado obtido | ✅ Aprovado — Os campos de dados do cliente foram preenchidos e aceitos sem erros. O ambiente foi cadastrado com as dimensões informadas e apareceu corretamente na listagem abaixo do formulário. O painel "Prévia acumulada" atualizou a área total em tempo real. |
| Responsável pelo registro da evidência | João Pedro de Castro Vieira |

📹 Screencast CT-002: _inserir link do vídeo gravado no GitHub Assets_

---

| **Caso de teste** | **CT-003 – Calcular orçamento automaticamente** |
|:---:|:---:|
| Requisito associado | RF-004 – Calcular automaticamente os quantitativos de materiais da laje com base nas medidas informadas. RF-005 – Calcular automaticamente o valor total do orçamento, considerando materiais, reforços e frete. |
| Resultado obtido | ✅ Aprovado — Ao clicar em "Calcular prévia", o sistema processou o cálculo sem erros e exibiu corretamente a área total, o concreto estimado e o valor visual com base nos parâmetros vigentes (tipo de laje, enchimento, intereixo, perda técnica e preço por m²). O resultado foi consistente com os parâmetros exibidos no painel lateral. |
| Responsável pelo registro da evidência | João Pedro de Castro Vieira |

📹 Screencast CT-003: _inserir link do vídeo gravado no GitHub Assets_

---

| **Caso de teste** | **CT-004 – Adicionar materiais complementares ao pedido** |
|:---:|:---:|
| Requisito associado | RF-003 – Permitir o cadastro de uma ou mais lajes/ambientes com suas dimensões no mesmo orçamento. RF-006 – Gerar o orçamento de forma estruturada para visualização pelo usuário. |
| Resultado obtido | ✅ Aprovado — A tela "Adicionar materiais ao pedido" exibiu corretamente todos os materiais cadastrados (Concreto para capa, EPS/isopor, Vigota treliçada, Malha POP) organizados por categoria. Os controles de quantidade funcionaram corretamente. Após clicar em "+ Adicionar" e em "Confirmar seleção", os itens foram incluídos no pedido e o total de materiais extras foi atualizado no painel superior. |
| Responsável pelo registro da evidência | João Pedro de Castro Vieira |

📹 Screencast CT-004: _inserir link do vídeo gravado no GitHub Assets_

---

| **Caso de teste** | **CT-005 – Consultar histórico de orçamentos** |
|:---:|:---:|
| Requisito associado | RF-008 – Permitir o registro dos orçamentos gerados para consulta futura. RF-009 – Permitir a consulta e filtragem do histórico de orçamentos. |
| Resultado obtido | ✅ Aprovado — A tela "Histórico de orçamentos" foi acessada com sucesso. O campo de filtro respondeu corretamente à digitação, exibindo apenas os registros correspondentes ao termo buscado. A mensagem "Nenhum orçamento encontrado" foi exibida corretamente quando não havia resultados para o filtro aplicado, confirmando que o sistema trata adequadamente listas vazias. |
| Responsável pelo registro da evidência | João Pedro de Castro Vieira |

📹 Screencast CT-005: _inserir link do vídeo gravado no GitHub Assets_

---

| **Caso de teste** | **CT-006 – Gerar prévia e exportar orçamento em PDF** |
|:---:|:---:|
| Requisito associado | RF-006 – Gerar o orçamento de forma estruturada para visualização pelo usuário. RF-007 – Permitir a emissão do orçamento em PDF. |
| Resultado obtido | ✅ Aprovado — Após preencher os dados do cliente (José, Contagem, Rua padre helio, 22), informar as dimensões da sala (20,00 × 15,00 m, 1 laje) e clicar em "Calcular prévia", o sistema exibiu a tela "Prévia do resultado". Ao acionar a prévia do PDF, o modal "Prévia antes da exportação" abriu corretamente com todas as seções: cabeçalho PROLAJE com data de geração (19/06/2026, 23:03:22), dados do cliente e da obra, resumo dos quantitativos (área 300,00 m², 36 vigotas, 720 EPS, 50,00 malha, 12,00 m³ concreto, total R$ 25.168,50), parâmetros aplicados (Treliçada Isopor H8, EPS/isopor, capa 4 cm, intereixo 42 cm, perda 5%), tabela de ambientes calculados, observações técnicas e totalizador com subtotal, frete, reforço/adicional e total. O botão "Gerar PDF" estava disponível e funcional para exportação. |
| Responsável pelo registro da evidência | João Pedro de Castro Vieira |

📹 Screencast CT-006: _inserir link do vídeo gravado no GitHub Assets_

---

## Avaliação

A execução dos testes evidenciou que o PROLAJE atende aos requisitos funcionais essenciais definidos na especificação do projeto. O fluxo principal de geração de orçamento — desde o cadastro dos dados do cliente até o cálculo automático e a visualização do resultado — funcionou conforme esperado em todos os cenários testados.

**Pontos fortes identificados:**

- O cálculo automático respondeu corretamente às dimensões informadas, eliminando o risco de erro manual que existia no processo com planilhas.
- A centralização dos materiais e parâmetros de cálculo funcionou conforme proposto: alterações realizadas na tela de materiais cadastrados refletem imediatamente nos novos orçamentos.
- A interface mostrou-se simples e direta, compatível com o perfil de usuário (vendedor com conhecimento técnico básico) definido nas personas.
- O histórico de orçamentos registra e filtra os dados corretamente, entregando a rastreabilidade que a empresa não possuía no processo anterior.

- A prévia do PDF (RF-007) foi validada no CT-006 e demonstrou estrutura completa e profissional, incluindo dados do cliente, quantitativos, parâmetros aplicados, tabela de ambientes e totalizador. O documento gerado está adequado para entrega ao cliente final.

**Pontos de atenção e melhorias previstas:**

- Os preços dos materiais cadastrados estavam zerados durante os testes (R$ 0,00), o que afetou a visualização do valor total calculado. É necessário orientar o gestor sobre o preenchimento dos preços antes do uso em produção.
