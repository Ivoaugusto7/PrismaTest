# PROLAJE Front-end

Front-end em **React + Vite** para o sistema de orçamento de lajes pré-moldadas da Casa Lajes.

A versão atual mantém a mesma interface visual do protótipo, mas o código foi reorganizado para facilitar manutenção, testes e integração com uma API REST.

## O que está implementado

- Tela de novo orçamento baseada no protótipo do Figma.
- Cadastro dos dados do cliente.
- Cadastro de uma ou mais lajes/ambientes.
- Cálculo de lajes regulares e irregulares centralizado na API.
- Cálculo de área, vigotas, EPS/isopor, malha, concreto e valor.
- Prévia do orçamento com detalhamento por ambiente.
- Histórico persistido e consultado pela API REST/PostgreSQL.
- Cadastro, edição, importação, exclusão e listagem de materiais pela API.
- Catálogo separado para adicionar materiais extras ao orçamento.
- Upload, otimização, persistência e exibição de imagem dos materiais.
- Nenhum orçamento ou material fictício é injetado na interface.
- Falhas da API são exibidas ao usuário com fallback local desativado.
- Cadastro manual de itens na lista de materiais.
- Importação simples de materiais por texto.
- Exportação da lista de materiais para Excel `.xlsx` com layout padronizado.
- Geração real de PDF via `jsPDF`, com layout visual alinhado ao tema do sistema.
- Modal de prévia do orçamento antes de gerar o PDF, disponível na prévia e no histórico.
- Layout responsivo em CSS puro.
- Fluxo visual e navegação alinhados ao protótipo Figma PrototipoCasaLajes 1.0:
  - novo orçamento com etapas, dados, resumo, dimensões e parâmetros;
  - prévia do orçamento com métricas, composição e lajes adicionadas;
  - histórico em cartões de orçamento;
  - seleção de materiais extras em catálogo com quantidade e confirmação.
- Validação básica dos campos principais.
- Testes automatizados para regras críticas de cálculo.

## Como executar

```bash
npm install
npm run dev
```

Depois acesse o endereço indicado pelo Vite, normalmente:

```txt
http://localhost:5173
```

## Testes e build

```bash
npm test
npm run build
npm run test:e2e
```

Os testes E2E usam Playwright contra `http://localhost:5173` por padrão e
validam a navegação principal, geometria desktop do protótipo, hierarquia das
quatro telas, responsividade em tablet/mobile, a prévia e o download de um PDF
válido e a exportação de uma planilha XLSX válida. Para outro endereço:

```bash
E2E_BASE_URL=http://localhost:5173 npm run test:e2e
```

## Integração REST

Copie `.env.example` para `.env` e configure a URL da API quando o back-end estiver disponível:

```env
VITE_API_BASE_URL=https://sua-api.com.br
VITE_API_TIMEOUT_MS=8000
VITE_USE_LOCAL_FALLBACK=true
```

Em produção, configure `VITE_API_BASE_URL` e mantenha `VITE_USE_LOCAL_FALLBACK=false`.
Assim, falhas da API são informadas ao usuário e nunca são mascaradas por dados locais.

Contrato sugerido para o back-end: [`docs/REST_API_CONTRACT.md`](docs/REST_API_CONTRACT.md).

## Estrutura principal

```txt
src/
  components/   # Componentes de UI mantendo o mesmo tema visual
  constants/    # Valores iniciais e chaves de storage
  lib/          # Cálculos, validação, formatação e storage
  services/     # Cliente REST, mappers e repositórios
  App.jsx
  main.jsx
  styles.css
```

## Correções importantes

- Frete e reforço agora são somados uma única vez no total do orçamento.
- Laje irregular segue a referência validada: área pela média das larguras, quantidade aproximada pelo intereixo, redução média D/Q e malha = área / 6.
- Tipos disponíveis conforme a planilha Casa e Lajes: `TR8`, `TR10`, `TR12`, `Painel TR8`, `Painel TR12` e `Painel TR16`.
- Enchimentos disponíveis: `Isopor (EPS)` (2,4 peças/m²) e `Tijolo` (11 peças/m²).
- Intereixo padrão: 42 cm para TR com EPS, 45 cm para TR com tijolo e 25 cm para os tipos Painel.
- Dependências não usam mais `latest`; as versões estão fixadas no `package.json` e no `package-lock.json`.

## Importação de materiais

A importação aceita uma linha por material no formato:

```txt
Nome;Unidade;Preço;Categoria
EPS / isopor;un;0;Enchimento
Malha POP;un;0;Ferragem
```

## Catálogo e cadastro de materiais

- **Adicionar materiais** mostra somente o catálogo ativo vindo de
  `GET /materiais`, com imagem, quantidade e subtotal da seleção.
- **Materiais cadastrados** abre a tela administrativa separada para cadastrar,
  editar, remover, importar e exportar materiais.
- O cadastro aceita PNG, JPEG e WebP. A imagem é redimensionada no navegador e
  enviada no campo `imagem` para persistência no PostgreSQL.


## Exportação Excel da lista de materiais

Na aba **Materiais**, o botão **Exportar Excel** gera um arquivo `.xlsx` no navegador com:

- cabeçalho visual PROLAJE/Casa Lajes;
- data de exportação;
- total de itens;
- soma dos preços cadastrados;
- tabela com código, material, unidade, preço unitário e categoria.

A exportação usa `write-excel-file` com importação dinâmica, então a dependência só é carregada quando o usuário aciona o botão.

## PDF de orçamento

Na tela de prévia, o botão **Ver prévia do PDF** abre um modal com a aparência do documento final. O botão **Gerar PDF** cria um arquivo `.pdf` no navegador, sem depender do back-end. O histórico também mostra as ações **Prévia** e **PDF** para orçamentos salvos que tenham os dados completos de cliente, lajes, cálculos, parâmetros e total.

O layout do PDF usa a mesma identidade visual da aplicação: azul institucional, destaque amarelo, cards de indicadores, tabela de ambientes, bloco de totais e observações técnicas. A dependência `jsPDF` é carregada por importação dinâmica apenas quando o usuário gera o arquivo, evitando aumentar o bundle inicial da aplicação.

## Observações

- Os cálculos usados pela prévia são processados por `POST /orcamentos/calcular`.
- A lógica de persistência já está isolada para REST, mas o back-end ainda precisa implementar as rotas.
- No futuro, quando a API centralizar os cálculos, o módulo `src/lib/calculos.js` pode ser movido para o servidor e chamado por uma rota de cálculo.
