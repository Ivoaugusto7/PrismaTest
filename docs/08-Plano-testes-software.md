# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes do PROLAJE foi elaborado a partir dos requisitos funcionais definidos na especificação do projeto e das telas implementadas no sistema. Os cenários selecionados cobrem o fluxo principal da aplicação — cadastro de materiais, geração de orçamento, cálculo automático e consulta ao histórico —, priorizando as funcionalidades de maior impacto para a operação da Casa Lajes.

Os testes foram realizados manualmente pelos integrantes da equipe diretamente no navegador, utilizando o ambiente de produção hospedado na Vercel. O grupo de usuários envolvido nos testes incluiu membros da própria equipe atuando nos perfis de vendedor e gestor, conforme definido nas personas do projeto.

---

| **Caso de teste** | **CT-001 – Cadastrar material** |
|:---:|:---:|
| Requisito associado | RF-001 – Permitir o cadastro e a atualização centralizada de preços e parâmetros dos materiais. |
| Objetivo do teste | Verificar se o gestor consegue cadastrar um novo material com nome, unidade, preço unitário e categoria, e se ele aparece corretamente na lista de materiais cadastrados. |
| Passos | - Acessar o navegador e abrir o PROLAJE <br> - Clicar em "Materiais cadastrados" no menu lateral <br> - Preencher o campo "Material" com o nome do item <br> - Preencher o campo "Unidade" (ex.: un, m²) <br> - Preencher o campo "Preço unitário" <br> - Selecionar a "Categoria" correspondente <br> - Clicar em "Cadastrar material" |
| Critério de êxito | O material cadastrado aparece na tabela "Materiais cadastrados" com nome, unidade, preço e categoria corretos. |
| Responsável pela elaboração do caso de teste | Alice Silva Lisboa |

---

| **Caso de teste** | **CT-002 – Preencher dados do cliente e dimensões da laje** |
|:---:|:---:|
| Requisito associado | RF-002 – Permitir o cadastro dos dados do cliente. RF-003 – Permitir o cadastro de uma ou mais lajes/ambientes com suas dimensões no mesmo orçamento. |
| Objetivo do teste | Verificar se o vendedor consegue preencher os dados do cliente e informar as dimensões de pelo menos um ambiente para geração do orçamento. |
| Passos | - Acessar o PROLAJE no navegador <br> - Clicar em "Novo orçamento" no menu lateral <br> - Preencher os campos "Nome do cliente", "Telefone", "Cidade" e "Endereço da obra" <br> - Na seção "Dimensões da laje", preencher "Comprimento (m)", "Largura (m)" e "Quantidade de lajes" do Ambiente 1 <br> - Selecionar o tipo de laje nos parâmetros de cálculo (ex.: Treliçada Isopor H8) <br> - Clicar em "+ Adicionar ambiente" para incluir um segundo ambiente (opcional) |
| Critério de êxito | Os dados do cliente são aceitos sem erro. Os ambientes cadastrados aparecem na listagem abaixo com as dimensões informadas. O painel "Prévia acumulada" atualiza a área total. |
| Responsável pela elaboração do caso de teste | Alice Silva Lisboa |

---

| **Caso de teste** | **CT-003 – Calcular orçamento automaticamente** |
|:---:|:---:|
| Requisito associado | RF-004 – Calcular automaticamente os quantitativos de materiais da laje com base nas medidas informadas. RF-005 – Calcular automaticamente o valor total do orçamento, considerando materiais, reforços e frete. |
| Objetivo do teste | Verificar se o sistema calcula corretamente os quantitativos e o valor total do orçamento ao clicar em "Calcular prévia", com base nas dimensões informadas e nos parâmetros vigentes. |
| Passos | - Com os dados do cliente e as dimensões preenchidas (CT-002 concluído) <br> - Conferir os parâmetros de cálculo no painel lateral (tipo de laje, enchimento, capa de concreto, intereixo, perda técnica e preço por m²) <br> - Clicar no botão "Calcular prévia" no canto superior direito <br> - Aguardar o sistema processar o cálculo |
| Critério de êxito | O sistema exibe a prévia com área total, concreto estimado e valor visual calculados corretamente. Não são exibidas mensagens de erro. O resultado é consistente com os parâmetros exibidos no painel lateral. |
| Responsável pela elaboração do caso de teste | Alice Silva Lisboa |

---

| **Caso de teste** | **CT-004 – Adicionar materiais complementares ao pedido** |
|:---:|:---:|
| Requisito associado | RF-003 – Permitir o cadastro de uma ou mais lajes/ambientes com suas dimensões no mesmo orçamento. RF-006 – Gerar o orçamento de forma estruturada para visualização pelo usuário. |
| Objetivo do teste | Verificar se o vendedor consegue adicionar materiais extras ao orçamento a partir da lista de materiais cadastrados e confirmar a seleção. |
| Passos | - Após gerar a prévia do orçamento, clicar em "Adicionar materiais" no menu lateral <br> - Visualizar os materiais disponíveis (Concreto para capa, EPS/isopor, Vigota treliçada, Malha POP) <br> - Ajustar a quantidade desejada usando os botões "–" e "+" em cada card <br> - Clicar em "+ Adicionar" no material desejado <br> - Verificar o total de materiais extras e itens selecionados no painel superior <br> - Clicar em "Confirmar seleção" |
| Critério de êxito | Os materiais selecionados são incluídos no orçamento. O total de itens selecionados e o valor total dos materiais extras são atualizados corretamente no painel. |
| Responsável pela elaboração do caso de teste | Alice Silva Lisboa |

---

| **Caso de teste** | **CT-005 – Consultar histórico de orçamentos** |
|:---:|:---:|
| Requisito associado | RF-008 – Permitir o registro dos orçamentos gerados para consulta futura. RF-009 – Permitir a consulta e filtragem do histórico de orçamentos. |
| Objetivo do teste | Verificar se o gestor consegue acessar o histórico centralizado de orçamentos registrados e utilizar o campo de filtro para localizar um orçamento específico. |
| Passos | - Acessar o PROLAJE no navegador <br> - Clicar em "Histórico" no menu lateral <br> - Verificar se os orçamentos finalizados aparecem listados <br> - Digitar um termo no campo "Filtrar por número, cliente, cidade, status ou data" <br> - Observar se a lista é filtrada conforme o termo digitado |
| Critério de êxito | Os orçamentos gerados anteriormente aparecem no histórico. O filtro localiza corretamente os registros correspondentes ao termo buscado. A mensagem "Nenhum orçamento encontrado" aparece apenas quando não há resultado para o filtro aplicado. |
| Responsável pela elaboração do caso de teste | Alice Silva Lisboa |

---

| **Caso de teste** | **CT-006 – Gerar prévia e exportar orçamento em PDF** |
|:---:|:---:|
| Requisito associado | RF-006 – Gerar o orçamento de forma estruturada para visualização pelo usuário. RF-007 – Permitir a emissão do orçamento em PDF. |
| Objetivo do teste | Verificar se o sistema exibe corretamente a prévia do orçamento em PDF com todos os dados calculados e se o botão "Gerar PDF" exporta o documento ao usuário. |
| Passos | - Acessar o PROLAJE no navegador <br> - Preencher os dados do cliente e as dimensões da laje (CT-002 concluído) <br> - Clicar em "Calcular prévia" e aguardar o processamento <br> - Na tela "Prévia do resultado", acionar a opção de visualização do PDF <br> - Verificar se o modal "Prévia antes da exportação" abre com as seções: cabeçalho PROLAJE, dados do cliente e da obra, resumo dos quantitativos (área, vigotas, EPS, malha, concreto e total visual), parâmetros aplicados, tabela de ambientes calculados, observações técnicas e totalizador (subtotal, frete, reforço/adicional e total) <br> - Clicar em "Gerar PDF" e verificar se o arquivo é gerado e disponibilizado para download |
| Critério de êxito | O modal de prévia exibe todas as seções corretamente com os dados do orçamento calculado. O botão "Gerar PDF" exporta o documento sem erros. O PDF gerado apresenta layout legível e padronizado para entrega ao cliente. |
| Responsável pela elaboração do caso de teste | Alice Silva Lisboa |

---

## Ferramentas de testes

Os testes foram realizados de forma **manual e exploratória**, diretamente no navegador Google Chrome, com o sistema hospedado em ambiente de produção (Vercel + Railway). Não foram utilizadas ferramentas automatizadas nesta etapa, dado o estágio de desenvolvimento do projeto e o prazo disponível para execução dos testes.

Para registro dos resultados, a equipe utilizou planilha de acompanhamento compartilhada via Google Drive, com colunas para caso de teste, resultado obtido (passou / falhou), observações e data de execução.
