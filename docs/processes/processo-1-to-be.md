### Processo 1 TO-BE – Geração de Orçamento com o PROLAJE

#### Descrição do Processo

Com o PROLAJE, o processo de geração de orçamento passa a ser totalmente centralizado e automatizado. O vendedor acessa o sistema pelo navegador de qualquer computador da empresa, sem necessidade de instalação. Informa os dados do cliente e as dimensões das lajes diretamente na plataforma. O sistema aplica automaticamente a tabela de preços e os parâmetros vigentes, calcula os materiais necessários e o valor total, e gera um PDF padronizado para entrega ao cliente. O orçamento é registrado automaticamente no banco de dados, sem nenhuma ação manual de salvamento.

**Fluxo resumido:**
Cliente solicita → Vendedor acessa PROLAJE → Cadastra cliente e dados da obra → Informa dimensões das lajes → Sistema calcula automaticamente → Vendedor revisa resultado → Sistema gera PDF padronizado → Vendedor entrega PDF ao cliente → Sistema registra orçamento no banco de dados

---

<img width="766" height="423" alt="Image" src="https://github.com/user-attachments/assets/86308b6d-4731-4d18-b4d5-2be5ef57dc4e" />

---

#### Detalhamento das Atividades


**Acessar o PROLAJE**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Endereço do sistema | Link | URL válida do PROLAJE | URL do sistema |
| Dispositivo utilizado | Seleção única | Desktop / Notebook / Tablet | Desktop |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Acessar sistema | Cadastrar cliente e dados da obra | default |

---

**Cadastrar cliente e dados da obra**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Nome do cliente | Caixa de Texto | Obrigatório, mínimo 3 caracteres | — |
| Telefone de contato | Caixa de Texto | Formato (XX) XXXXX-XXXX | — |
| Endereço da obra | Caixa de Texto | Opcional | — |
| Tipo de obra | Seleção única | Residencial / Comercial / Industrial | Residencial |
| Observações | Área de texto | Máximo 500 caracteres | — |
| Data do orçamento | Data | dd-mm-aaaa | Data atual |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Avançar | Informar dimensões das lajes | default |
| Limpar | Cadastrar cliente e dados da obra | cancel |

---

**Informar dimensões das lajes**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Quantidade de ambientes / lajes | Número | Inteiro positivo, mínimo 1 | 1 |
| Comprimento da laje (m) | Número | Decimal, maior que 0 | — |
| Largura da laje (m) | Número | Decimal, maior que 0 | — |
| Tipo de laje | Seleção única | Laje 08 / Laje 10 / Laje 12 / Laje 15 / Laje 20 | — |
| Reforço necessário? | Seleção única | Sim / Não | Não |
| Frete incluso? | Seleção única | Sim / Não | Não |
| Observações técnicas | Área de texto | Máximo 300 caracteres | — |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Adicionar outro ambiente | Informar dimensões das lajes | default |
| Calcular orçamento | Sistema calcula automaticamente | default |
| Voltar | Cadastrar cliente e dados da obra | cancel |

---

**Sistema calcula automaticamente** *(atividade do sistema)*

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Quantitativo de vigotas | Número | Calculado pelo sistema | — |
| Quantitativo de lajotas | Número | Calculado pelo sistema | — |
| Quantitativo de cimento (sc) | Número | Calculado pelo sistema | — |
| Quantitativo de aço (kg) | Número | Calculado pelo sistema | — |
| Valor dos materiais (R$) | Número | Calculado pelo sistema | — |
| Valor do frete (R$) | Número | Calculado pelo sistema | — |
| Valor total do orçamento (R$) | Número | Calculado pelo sistema | — |
| Parâmetros utilizados | Tabela | Preenchida automaticamente | Tabela vigente |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Cálculo concluído (automático) | Revisar orçamento gerado | default |

---

**Revisar orçamento gerado**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Resumo do orçamento | Tabela | Somente leitura | Gerado pelo sistema |
| Valor total (R$) | Número | Somente leitura | Calculado |
| Dados do cliente | Caixa de Texto | Somente leitura | Cadastrado |
| Orçamento aprovado pelo vendedor? | Seleção única | Sim / Não — solicitar ajuste | — |
| Observações do vendedor | Área de texto | Máximo 300 caracteres | — |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Confirmar e gerar PDF | Sistema gera PDF padronizado | default |
| Ajustar dimensões | Informar dimensões das lajes | cancel |

---

**Sistema gera PDF padronizado** *(atividade do sistema)*

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Arquivo PDF gerado | Arquivo | Formato .pdf, somente leitura | — |
| Data e hora de geração | Data e Hora | dd-mm-aaaa, hh:mm:ss | Data e hora atual |
| Número do orçamento | Caixa de Texto | Gerado automaticamente | ORC-[ano]-[sequencial] |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Download do PDF | Entregar orçamento ao cliente | default |
| Visualizar PDF | Revisar orçamento gerado | default |

---

**Entregar orçamento ao cliente**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Forma de entrega | Seleção única | Impresso / WhatsApp / E-mail | — |
| Data da entrega | Data e Hora | dd-mm-aaaa, hh:mm:ss | Data e hora atual |
| Cliente aceitou o orçamento? | Seleção única | Sim / Não / Pendente | Pendente |
| Observações da entrega | Área de texto | Máximo 300 caracteres | — |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Confirmar entrega | Fim do Processo | default |
| Cliente recusou | Fim do Processo | cancel |

---
