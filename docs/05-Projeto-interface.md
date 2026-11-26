# Projeto de interface

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

A interface da aplicação **Casa Lajes** foi desenhada com foco na usabilidade e agilidade, permitindo que o orçamentista insira as medidas das lajes (regulares e irregulares) de forma rápida e gere uma prévia demonstrativa dos materiais.

## User flow

O fluxo de usuário foi projetado para ser linear e intuitivo:
1. **Início (Tela de Orçamento)**: O usuário insere os dados do cliente e as dimensões dos ambientes (incluindo opção para lajes irregulares).
2. **Cálculo e Prévia**: O sistema calcula a quantidade de vigotas, enchimento (isopor/cerâmica), malha e concreto, apresentando uma prévia do resultado.
3. **Geração de Relatório**: O usuário pode visualizar a tabela de materiais e gerar um demonstrativo/PDF.
4. **Consulta (Histórico)**: O usuário pode acessar uma tela de histórico para ver orçamentos anteriores (rascunhos, enviados e aprovados).

> [INSERIR IMAGEM DO DIAGRAMA DE FLUXO (USER FLOW) AQUI]

## Wireframes e Protótipo Interativo

As telas foram desenhadas inicialmente em um wireframe de média fidelidade para alinhar a disposição das informações (inputs, tabelas de resultado e histórico). O protótipo contempla o cálculo de lajes irregulares (trapezoidais), utilizando a interpolação linear para determinar o tamanho regressivo das vigotas.

**Link para o Protótipo Interativo (Figma):**
> https://www.figma.com/proto/6QetIlug763bpQaPm8HJ9P/PrototipoCasaLajes-1.0?node-id=30-65&p=f&t=NVn1BchWyZA5P2kV-1&scaling=contain&content-scaling=responsive&page-id=0%3A1&starting-point-node-id=30%3A65

## Jornada do usuário

A jornada típica do orçamentista da Casa Lajes na aplicação:

1. **Conscientização**: O orçamentista recebe um pedido de orçamento via WhatsApp ou visita técnica.
2. **Interesse/Ação inicial**: Ele abre o sistema, acessa "Novo Orçamento" e insere os dados do cliente e local da obra.
3. **Ação Principal**: Ele adiciona os ambientes um a um. Se for uma **laje irregular**, ele informa a medida do lado maior e do lado menor. O sistema calcula a quantidade e o tamanho regressivo das vigotas usando a constante de intereixo (ex: 0.42m para EPS).
4. **Finalização**: Ele revisa a prévia acumulada dos materiais (m³ de concreto, quantidade de vigotas e enchimento) e salva/gera o documento final para o cliente.

> [INSERIR IMAGEM DO MAPA DA JORNADA DO USUÁRIO AQUI]

## Interface do sistema

Abaixo estão detalhadas as principais interfaces do sistema, refletindo os requisitos levantados.

### 1. Tela de Cadastro e Novo Orçamento
Tela principal onde o usuário inicia o processo. Contém os campos de "Dados do Cliente" e "Dimensões da Laje". Permite adicionar múltiplos ambientes e selecionar parâmetros como Tipo de Laje, Enchimento (EPS/Cerâmica), Altura e Capa de Concreto. Há um switch/checkbox para ativar o modo "Laje Irregular", abrindo um campo extra para o "Lado Menor".

> <img width="1915" height="1068" alt="image" src="https://github.com/user-attachments/assets/53c854f2-1251-4b3e-92c2-756c6b853f4e" />

### 2. Tela de Prévia de Resultado
Esta tela exibe o resultado acumulado dos cálculos. Mostra a área total, volume de concreto estimado e uma tabela detalhada com os itens do orçamento (Vigotas, Peças de Enchimento, Concreto e Malha).

> <img width="1919" height="1021" alt="image" src="https://github.com/user-attachments/assets/02f8a726-69b2-4fc6-bdb0-5d15cdfed407" />

### 3. Tela de Histórico de Orçamentos
Tela de listagem que centraliza todos os orçamentos gerados, permitindo a pesquisa e filtragem por status (Rascunho, Enviado, Aprovado), cliente ou data.

> <img width="1910" height="909" alt="image" src="https://github.com/user-attachments/assets/031fe8a0-4aab-470f-adcc-71c2b9b4c9fc" />

### 4. Tela de Listagem de Materiais
Tela de listagem que centraliza todos os materiais padrões.

> <img width="1910" height="909" alt="image" src="https://github.com/user-attachments/assets/031fe8a0-4aab-470f-adcc-71c2b9b4c9fc" />


