# Metodologia

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A metodologia adotada pelo grupo combina organização ágil, documentação contínua e controle de versão, com o objetivo de apoiar o desenvolvimento de uma solução web para a empresa parceira **Casa Lajes**. O trabalho foi estruturado a partir do levantamento inicial do problema, da análise da planilha atualmente utilizada pela empresa e da definição gradual do escopo da aplicação.

Por se tratar de um projeto acadêmico com caráter **extensionista**, a equipe buscou manter alinhamento entre a necessidade real identificada na empresa e as entregas exigidas pela disciplina, organizando as atividades em três sprints ao longo do semestre, com entregas formais em março, maio e junho de 2026.

## Controle de versão

A ferramenta de controle de versão adotada no projeto foi o [Git](https://git-scm.com/), sendo que o [GitHub](https://github.com) foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

- `main`: versão estável já testada do software
- `testing`: versão em testes do software
- `dev`: versão de desenvolvimento do software

Quanto à gerência de issues, o projeto adota a seguinte convenção para etiquetas:

- `documentation`: melhorias ou acréscimos à documentação
- `bug`: uma funcionalidade encontra-se com problemas
- `enhancement`: uma funcionalidade precisa ser melhorada
- `feature`: uma nova funcionalidade precisa ser introduzida

A branch `dev` foi utilizada como base principal para o desenvolvimento, enquanto a `main` representa a versão mais estável do projeto. Os commits foram realizados de forma objetiva, descrevendo claramente a alteração feita, e funcionalidades específicas foram desenvolvidas em branches separadas antes de serem integradas ao fluxo principal.

## Planejamento do projeto

### Divisão de papéis

#### Sprint 1 — Levantamento, especificação e modelagem de processos
**Período:** 13/02/2026 a 27/03/2026 | **Entrega:** 27/03/2026

- **Scrum master:** Italo Ritchello Batista
- **Desenvolvimento do código:** João Pedro de Castro Vieira, Italo Ritchello Batista
- **Documentação e especificação:** Alice Silva Lisboa, Rafael Costa Fiorentini
- **Levantamento do problema e processos AS IS / TO BE:** João Pedro de Castro Vieira, Samuel Elias Alves Quirino
- **Análise da planilha e regras de cálculo:** Eric Abreu Gualberto de Moura
- **Apoio geral e organização do material:** Maria Eduarda Soares Coelho

#### Sprint 2 — Prototipação, arquitetura e banco de dados
**Período:** 03/04/2026 a 15/05/2026 | **Entrega:** 15/05/2026

- **Scrum master:** Samuel Elias Alves Quirino
- **Desenvolvimento do código:** João Pedro de Castro Vieira, Italo Ritchello Batista
- **Modelagem BPMN e diagrama de entidades:** Eric Abreu Gualberto de Moura
- **Protótipo interativo (Figma) e validação com o cliente:** Samuel Elias Alves Quirino, Maria Eduarda Soares Coelho
- **Documentação de arquitetura e tecnologias:** Alice Silva Lisboa, Rafael Costa Fiorentini

#### Sprint 3 — Desenvolvimento, testes e entrega final
**Período:** 15/05/2026 a 19/06/2026 | **Entrega:** 19/06/2026

- **Scrum master:** Alice Silva Lisboa
- **Desenvolvimento do código (front-end, back-end, integração e deploy):** João Pedro de Castro Vieira, Italo Ritchello Batista
- **Plano de testes, registro de testes e documentação técnica:** Alice Silva Lisboa
- **Testes de funcionalidade e suporte à validação com o cliente:** Eric Abreu Gualberto de Moura, Samuel Elias Alves Quirino
- **Revisão dos requisitos e rastreabilidade das entregas:** Rafael Costa Fiorentini
- **Apoio aos testes e ao registro da validação com o cliente:** Maria Eduarda Soares Coelho

---

### Quadro de tarefas

#### Sprint 1

Atualizado em: 27/03/2026

| Responsável | Tarefa | Iniciado em | Prazo | Status | Terminado em |
| :---- | :---- | :----: | :----: | :----: | :----: |
| Alice Silva Lisboa | Modelagem TO BE e organização das informações para apresentação, Levantamento dos processos e participantes, modelagem AS IS  | 06/03/2026 | 20/03/2026 | ✔️ | 19/03/2026 |
| Eric Abreu Gualberto de Moura | A | 13/03/2026 | 27/03/2026 | ✔️ | 27/03/2026 |
| Italo Ritchello Batista | Definição inicial do projeto e alinhamento com o parceiro | 06/03/2026 | 13/03/2026 | ✔️ | 12/03/2026 |
| João Pedro de Castro Vieira | Análise da planilha da empresa e mapeamento das regras de cálculo| 13/03/2026 | 20/03/2026 | ✔️ | 20/03/2026 |
| Maria Eduarda Soares Coelho | Apoio ao levantamento inicial e organização das informações | 20/03/2026 | 27/03/2026 | ✔️ | 27/03/2026 |
| Rafael Costa Fiorentini | Estruturação da documentação de contexto e requisitos | 13/03/2026 | 27/03/2026 | ✔️ | 27/03/2026 |
| Samuel Elias Alves Quirino | Estruturação da documentação de contexto e requisitos | 20/03/2026 | 27/03/2026 | ✔️ | 27/03/2026 |

#### Sprint 2

Atualizado em: 15/05/2026

| Responsável | Tarefa | Iniciado em | Prazo | Status | Terminado em |
| :---- | :---- | :----: | :----: | :----: | :----: |
| Alice Silva Lisboa | Atualização da documentação técnica | 17/04/2026 | 15/05/2026 | ✔️ | 14/05/2026 |
| Eric Abreu Gualberto de Moura | Atualização da documentação técnica | 03/04/2026 | 24/04/2026 | ✔️ | 24/04/2026 |
| Italo Ritchello Batista | Estruturação do back-end e definição das rotas da API | 08/05/2026 | 15/05/2026 | ✔️ | 15/05/2026 |
| João Pedro de Castro Vieira | Estruturação das telas e fluxo principal do protótipo | 08/05/2026 | 15/05/2026 | ✔️ | 15/05/2026 |
| Maria Eduarda Soares Coelho |Atualização da documentação técnica | 17/04/2026 | 15/05/2026 | ✔️ | 14/05/2026 |
| Rafael Costa Fiorentini | Atualização da documentação técnica | 03/04/2026 | 15/05/2026 | ✔️ | 15/05/2026 |
| Samuel Elias Alves Quirino | Documentação técnica | 17/04/2026 | 24/04/2026 | ✔️ | 24/04/2026 |

#### Sprint 3

Atualizado em: 19/06/2026

| Responsável | Tarefa | Iniciado em | Prazo | Status | Terminado em |
| :---- | :---- | :----: | :----: | :----: | :----: |
| Alice Silva Lisboa | Plano de testes, registro de testes, conclusão e revisão documental | 05/06/2026 | 19/06/2026 | ✔️ | 19/06/2026 |
| Eric Abreu Gualberto de Moura | Atualização da documentação técnica | 05/06/2026 | 19/06/2026 | ✔️ | 18/06/2026 |
| Italo Ritchello Batista | Desenvolvimento do back-end, integração geral e deploy no Railway | 15/05/2026 | 19/06/2026 | ✔️ | 19/06/2026 |
| João Pedro de Castro Vieira | Desenvolvimento do front-end, integração com a API e deploy na Vercel | 15/05/2026 | 19/06/2026 | ✔️ | 19/06/2026 |
| Maria Eduarda Soares Coelho | Atualização da documentação técnica | 12/06/2026 | 19/06/2026 | ✔️ | 18/06/2026 |
| Rafael Costa Fiorentini | Atualização da documentação técnica | 05/06/2026 | 19/06/2026 | ✔️ | 19/06/2026 |
| Samuel Elias Alves Quirino | Apoio à validação com o cliente parceiro | 05/06/2026 | 19/06/2026 | ✔️ | 18/06/2026 |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

---

### Processo

O grupo adotou uma organização inspirada em **Scrum**, com três sprints estruturadas ao longo do semestre, cada uma correspondendo a uma entrega formal da disciplina. Essa abordagem permitiu acompanhar a evolução do projeto de forma incremental, com revisões e ajustes contínuos a cada ciclo.

O gerenciamento das atividades foi realizado com apoio do **GitHub Projects** e das **issues** do repositório, permitindo registrar tarefas, priorizar demandas e acompanhar o andamento da execução. A equipe realizou reuniões de alinhamento ao longo do semestre para discutir o progresso, redistribuir tarefas e manter aderência entre as decisões técnicas e a necessidade real da empresa parceira Casa Lajes.

## Ferramentas

Os artefatos do projeto foram desenvolvidos a partir de diversas plataformas. A relação dos ambientes com seus respectivos propósitos é apresentada na tabela a seguir.

| Ambiente | Plataforma | Link de acesso |
|---|---|---|
| Repositório de código fonte | GitHub | https://github.com/ICEI-PUC-Minas-PCO-SI/2026-1-p2-tiapn-grupo5-tiapn/tree/main/src |
| Documentos do projeto | GitHub / Markdown | https://github.com/ICEI-PUC-Minas-PCO-SI/2026-1-p2-tiapn-grupo5-tiapn/tree/main/docs |
| Gerenciamento do projeto | GitHub Projects | https://github.com/orgs/ICEI-PUC-Minas-PCO-SI/projects/152 |
| Desenvolvimento da aplicação | React + Node.js + MySQL | Ambiente local e Vercel / Railway |
| Editor de código | Visual Studio Code | https://code.visualstudio.com/ |
| Projeto de interface | Figma | https://www.figma.com/proto/6QetIlug763bpQaPm8HJ9P/PrototipoCasaLajes-1.0?node-id=30-65&p=f&t=zphOMu31sAr4wdVg-1&scaling=contain&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=30%3A65 |
| Modelagem de processos e diagramas | draw.io | https://app.diagrams.net |
| Documento de referência do processo | Planilha Excel da Casa Lajes | Arquivo disponibilizado pela empresa |
| Comunicação da equipe | WhatsApp / encontros presenciais | Uso interno do grupo |

Além das plataformas listadas, a planilha atualmente utilizada pela empresa parceira foi adotada como documento de referência para entendimento do processo atual, das regras de cálculo e da estrutura básica da solução. Esse material foi fundamental para garantir que o sistema proposto estivesse alinhado à realidade operacional da **Casa Lajes**.
