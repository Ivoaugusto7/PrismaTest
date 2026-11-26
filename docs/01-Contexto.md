# Introdução

Este projeto interdisciplinar tem como objetivo desenvolver um **sistema web centralizado para dimensionamento de materiais e geração de orçamentos de lajes pré-moldadas** para a empresa parceira **Casa Lajes**, representada por **Marco Tulio**.

A proposta surgiu a partir de um problema real enfrentado pela empresa: o uso de planilhas Excel descentralizadas, com versões diferentes em cada computador, o que gera divergência de preços, inconsistências nos cálculos, travamentos frequentes e dificuldade no controle do histórico de orçamentos. Esse cenário impacta diretamente a produtividade, a confiabilidade das informações e a qualidade do atendimento ao cliente.

Como solução, o grupo pretende desenvolver uma plataforma web com dados centralizados, padronização dos cálculos e armazenamento do histórico de orçamentos. A proposta possui caráter **extensionista**, pois aplica conhecimentos acadêmicos em uma situação real, contribuindo para a melhoria dos processos da empresa parceira e aproximando a universidade das demandas da comunidade.

## Cliente

A **Casa Lajes** é a empresa parceira deste projeto e atua no setor da **construção civil**, com foco em **lajes pré-moldadas**. Seu trabalho depende de cálculos precisos, rapidez na elaboração de orçamentos e atualização constante de preços e materiais, fatores essenciais para um atendimento eficiente.

Com base nas informações levantadas até o momento, a empresa enfrenta desafios relacionados à descentralização das informações, à instabilidade das planilhas utilizadas e à ausência de um histórico consolidado de orçamentos. Embora não tenham sido formalmente definidos missão, visão e valores institucionais, é possível identificar como prioridades da empresa a agilidade no atendimento, a confiabilidade dos cálculos e a melhoria da organização interna.

Nesse contexto, o projeto busca atender uma necessidade real da Casa Lajes, promovendo mais padronização, segurança das informações e apoio à gestão do negócio.

## Problema

O principal problema identificado é a dependência de planilhas Excel para realizar cálculos e gerar orçamentos. Como cada computador pode possuir uma versão diferente da planilha, não existe uma base única e confiável de informações, o que provoca divergências entre orçamentos e risco de erros no processo.

Além disso, a ferramenta atual apresenta travamentos frequentes e falhas em fórmulas e macros, prejudicando o atendimento e aumentando o retrabalho. Outro problema importante é a fragmentação do histórico de orçamentos, já que os registros ficam distribuídos entre diferentes máquinas, dificultando o acompanhamento gerencial e a análise dos dados da empresa.

Portanto, trata-se de um problema não apenas tecnológico, mas também operacional e organizacional, que afeta a eficiência do serviço, a padronização dos processos e a tomada de decisão.

## Objetivos

### Objetivo Geral

Desenvolver um software web para centralizar o dimensionamento de materiais e a geração de orçamentos de lajes pré-moldadas na empresa Casa Lajes.

### Objetivos Específicos

- Centralizar a lógica de cálculo em uma única aplicação.
- Armazenar preços, parâmetros técnicos e histórico de orçamentos em banco de dados.
- Criar uma interface simples para vendedores e operadores utilizarem no atendimento.
- Permitir a atualização centralizada de preços e materiais.
- Disponibilizar um histórico consolidado para acompanhamento gerencial.
- Gerar orçamentos padronizados para entrega aos clientes.

## Justificativa

Este projeto se justifica pela necessidade de substituir um processo manual, descentralizado e sujeito a falhas por uma solução mais confiável, organizada e eficiente. A digitalização desse processo pode reduzir erros de cálculo, eliminar divergências entre planilhas, melhorar o atendimento ao cliente e facilitar o controle das informações da empresa.

Além disso, o trabalho possui relevância acadêmica e extensionista, pois permite aplicar conhecimentos de desenvolvimento de software, banco de dados e modelagem de processos em uma demanda real. Dessa forma, o projeto gera benefícios tanto para a formação dos estudantes quanto para a empresa parceira, que poderá contar com uma ferramenta mais adequada às suas necessidades.

## Público-alvo

O público-alvo da aplicação é formado principalmente por **vendedores/operadores** e **gestores/administradores** da Casa Lajes.

Os vendedores e operadores utilizarão o sistema para inserir dados das obras e gerar orçamentos com mais rapidez e segurança, sem depender de planilhas complexas. Já os gestores e administradores utilizarão a aplicação para atualizar preços, acompanhar o histórico de orçamentos e obter uma visão mais ampla da operação da empresa.

De forma indireta, os **clientes da Casa Lajes** também serão beneficiados, pois receberão orçamentos mais rápidos, padronizados e confiáveis.

## Mapa de Stakeholders

```mermaid
flowchart LR
    A[Casa Lajes] --> B[Vendedores / Operadores]
    A --> C[Gestor / Administrador]
    B --> D[Sistema Web]
    C --> D
    D --> E[Cliente Final]
    F[Equipe do Projeto] --> D
    G[Professor / Disciplina] --> F
    H[Marco Tulio - Representante da Empresa] --> A
