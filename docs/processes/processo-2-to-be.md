### Processo 2 TO-BE – Controle e Gestão de Orçamentos com o PROLAJE

#### Descrição do Processo

Com o PROLAJE, o processo de controle e gestão de orçamentos passa a ser centralizado e acessível a qualquer momento pelo gestor. Todos os orçamentos gerados são registrados automaticamente no banco de dados do sistema. O gestor acessa o histórico completo pelo navegador, filtra por período, cliente ou vendedor, e consulta qualquer orçamento emitido sem depender de buscas manuais em computadores. A atualização de preços e parâmetros é feita uma única vez no sistema e reflete imediatamente para todos os usuários, eliminando definitivamente o problema das versões divergentes.

**Fluxo resumido:**
Sistema registra orçamento automaticamente → Gestor acessa histórico centralizado → Filtra e consulta orçamentos → Atualiza preços e parâmetros no sistema → Alteração reflete para todos os usuários imediatamente

---

<img width="927" height="403" alt="Image" src="https://github.com/user-attachments/assets/11b778f2-c8a3-48be-b69d-d972cc8e9897" />

---

#### Detalhamento das Atividades


**Sistema registra orçamento automaticamente** *(atividade do sistema)*

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Número do orçamento | Caixa de Texto | Gerado automaticamente | ORC-[ano]-[sequencial] |
| Data e hora de emissão | Data e Hora | dd-mm-aaaa, hh:mm:ss | Data e hora atual |
| Nome do cliente | Caixa de Texto | Obrigatório | — |
| Vendedor responsável | Caixa de Texto | Obrigatório | Usuário logado |
| Valor total (R$) | Número | Calculado pelo sistema | — |
| Materiais calculados | Tabela | Gerada pelo sistema | — |
| Parâmetros utilizados | Tabela | Versão vigente no momento | — |
| PDF gerado | Arquivo | Formato .pdf | — |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Registro concluído (automático) | Histórico disponível para consulta | default |

---

**Acessar histórico centralizado**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Período de busca — início | Data | dd-mm-aaaa | Primeiro dia do mês atual |
| Período de busca — fim | Data | dd-mm-aaaa | Data atual |
| Nome do cliente | Caixa de Texto | Opcional | — |
| Vendedor responsável | Caixa de Texto | Opcional | — |
| Status do orçamento | Seleção única | Todos / Aceito / Recusado / Pendente | Todos |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Buscar | Filtrar e consultar orçamentos | default |
| Limpar filtros | Acessar histórico centralizado | cancel |

---

**Filtrar e consultar orçamentos**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Lista de orçamentos encontrados | Tabela | Somente leitura | — |
| Total de orçamentos no período | Número | Somente leitura | — |
| Valor total orçado no período (R$) | Número | Somente leitura | — |
| Orçamento selecionado | Seleção única | Orçamentos listados | — |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Visualizar orçamento | Exibir detalhes do orçamento selecionado | default |
| Baixar PDF | Download do PDF do orçamento | default |
| Exportar relatório | Gerar relatório de produção | default |
| Voltar | Acessar histórico centralizado | cancel |

---

**Gerar relatório de produção**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Período do relatório | Data | dd-mm-aaaa | Mês atual |
| Total de vigotas calculadas | Número | Somente leitura | — |
| Total de lajotas calculadas | Número | Somente leitura | — |
| Total de cimento (sc) | Número | Somente leitura | — |
| Total de aço (kg) | Número | Somente leitura | — |
| Valor total orçado (R$) | Número | Somente leitura | — |
| Formato de exportação | Seleção única | PDF / Excel | PDF |
| Arquivo gerado | Arquivo | Formato .pdf ou .xlsx | — |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Exportar | Download do relatório | default |
| Voltar | Filtrar e consultar orçamentos | cancel |

---

**Atualizar preços e parâmetros**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Material | Seleção única | Vigota / Lajota / Cimento / Aço / Frete | — |
| Valor unitário atual (R$) | Número | Somente leitura | Valor vigente |
| Novo valor unitário (R$) | Número | Decimal, maior que 0 | — |
| Data de vigência | Data | dd-mm-aaaa | Data atual |
| Motivo da atualização | Área de texto | Máximo 300 caracteres | — |
| Confirmação da alteração | Seleção única | Confirmar / Cancelar | — |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Salvar alterações | Atualização reflete para todos os usuários | default |
| Cancelar | Atualizar preços e parâmetros | cancel |

---

**Atualizar regras e parâmetros de cálculo**

| **Campo** | **Tipo** | **Restrições** | **Valor default** |
| --- | --- | --- | --- |
| Parâmetro | Seleção única | Consumo por m² / Reforço / Frete por km | — |
| Valor atual | Número | Somente leitura | Valor vigente |
| Novo valor | Número | Decimal, maior que 0 | — |
| Tipo de laje relacionado | Seleção múltipla | Laje 08 / Laje 10 / Laje 12 / Laje 15 / Laje 20 | Todas |
| Data de vigência | Data | dd-mm-aaaa | Data atual |
| Motivo da alteração | Área de texto | Máximo 300 caracteres | — |

| **Comandos** | **Destino** | **Tipo** |
| --- | --- | --- |
| Salvar parâmetros | Atualização reflete para todos os usuários | default |
| Cancelar | Atualizar regras e parâmetros de cálculo | cancel |
