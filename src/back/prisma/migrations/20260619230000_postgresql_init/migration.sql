CREATE TYPE "TipoObra" AS ENUM ('Residencial', 'Comercial', 'Industrial');
CREATE TYPE "FormaEntrega" AS ENUM ('Impresso', 'WhatsApp', 'Email');
CREATE TYPE "StatusOrcamento" AS ENUM ('Rascunho', 'Pendente', 'Enviado', 'Aprovado', 'Aceito', 'Recusado');

CREATE TABLE "Vendedor" (
  "id_vendedor" SERIAL NOT NULL,
  "nome" VARCHAR(100) NOT NULL,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "Vendedor_pkey" PRIMARY KEY ("id_vendedor")
);

CREATE TABLE "Orcamento" (
  "id_orcamento" SERIAL NOT NULL,
  "numero_orcamento" VARCHAR(32) NOT NULL,
  "data_hora_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "data_hora_pdf" TIMESTAMP(3),
  "nome_cliente" VARCHAR(100) NOT NULL,
  "telefone_cliente" VARCHAR(20),
  "endereco_obra" VARCHAR(200),
  "tipo_obra" "TipoObra" NOT NULL DEFAULT 'Residencial',
  "observacoes" TEXT,
  "forma_entrega" "FormaEntrega",
  "status" "StatusOrcamento" NOT NULL DEFAULT 'Pendente',
  "frete_incluso" BOOLEAN NOT NULL DEFAULT false,
  "valor_total" DECIMAL(10,2),
  "observacoes_entrega" TEXT,
  "id_vendedor" INTEGER NOT NULL DEFAULT 1,
  "cliente_json" JSONB,
  "parametros_json" JSONB,
  "total_json" JSONB,
  "calculos_json" JSONB,
  CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id_orcamento")
);

CREATE TABLE "ItemOrcamento" (
  "id_item" SERIAL NOT NULL,
  "id_orcamento" INTEGER NOT NULL,
  "descricao_ambiente" VARCHAR(100),
  "comprimento" DECIMAL(6,2) NOT NULL,
  "largura" DECIMAL(6,2) NOT NULL,
  "lado_menor" DECIMAL(6,2),
  "irregular" BOOLEAN NOT NULL DEFAULT false,
  "quantidade" INTEGER NOT NULL DEFAULT 1,
  "sentido" VARCHAR(40),
  "tipo_laje" VARCHAR(80) NOT NULL,
  "reforco" BOOLEAN NOT NULL DEFAULT false,
  "qtd_vigotas" INTEGER,
  "qtd_lajotas" INTEGER,
  "qtd_cimento" DECIMAL(10,3),
  "qtd_aco" DECIMAL(10,3),
  "valor_materiais" DECIMAL(10,2),
  "valor_frete" DECIMAL(10,2),
  "valor_subtotal" DECIMAL(10,2),
  "observacoes_tecnicas" TEXT,
  "medidas_progressivas" JSONB,
  CONSTRAINT "ItemOrcamento_pkey" PRIMARY KEY ("id_item")
);

CREATE TABLE "Parametro" (
  "id_parametro" SERIAL NOT NULL,
  "material" VARCHAR(120) NOT NULL,
  "imagem" TEXT,
  "unidade" VARCHAR(20) NOT NULL DEFAULT 'un',
  "categoria" VARCHAR(80) NOT NULL DEFAULT 'Padrão',
  "valor_unitario" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "data_vigencia" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "motivo" TEXT,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "Parametro_pkey" PRIMARY KEY ("id_parametro")
);

CREATE TABLE "ParametroCalculo" (
  "id_param_calculo" SERIAL NOT NULL,
  "tipo_parametro" VARCHAR(80) NOT NULL,
  "tipo_laje" VARCHAR(80) NOT NULL,
  "valor" DECIMAL(10,4) NOT NULL,
  "data_vigencia" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "motivo" TEXT,
  "ativo" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "ParametroCalculo_pkey" PRIMARY KEY ("id_param_calculo")
);

CREATE UNIQUE INDEX "Orcamento_numero_orcamento_key" ON "Orcamento"("numero_orcamento");
CREATE INDEX "Orcamento_nome_cliente_idx" ON "Orcamento"("nome_cliente");
CREATE INDEX "Orcamento_status_idx" ON "Orcamento"("status");
CREATE INDEX "Orcamento_data_hora_cadastro_idx" ON "Orcamento"("data_hora_cadastro");
CREATE INDEX "ItemOrcamento_id_orcamento_idx" ON "ItemOrcamento"("id_orcamento");
CREATE INDEX "Parametro_ativo_idx" ON "Parametro"("ativo");
CREATE INDEX "Parametro_material_idx" ON "Parametro"("material");
CREATE INDEX "ParametroCalculo_ativo_tipo_laje_idx" ON "ParametroCalculo"("ativo", "tipo_laje");

ALTER TABLE "Orcamento"
  ADD CONSTRAINT "Orcamento_id_vendedor_fkey"
  FOREIGN KEY ("id_vendedor") REFERENCES "Vendedor"("id_vendedor")
  ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ItemOrcamento"
  ADD CONSTRAINT "ItemOrcamento_id_orcamento_fkey"
  FOREIGN KEY ("id_orcamento") REFERENCES "Orcamento"("id_orcamento")
  ON DELETE CASCADE ON UPDATE CASCADE;
