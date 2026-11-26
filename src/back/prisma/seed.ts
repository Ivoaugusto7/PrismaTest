import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultMaterials = [
  { material: 'Vigota treliçada', unidade: 'un', categoria: 'Estrutura', valorUnitario: 0 },
  { material: 'EPS / isopor', unidade: 'un', categoria: 'Enchimento', valorUnitario: 0 },
  { material: 'Concreto para capa', unidade: 'm³', categoria: 'Concreto', valorUnitario: 0 },
  { material: 'Malha POP', unidade: 'un', categoria: 'Ferragem', valorUnitario: 0 },
];

const defaultParametrosCalculo = [
  { tipoParametro: 'Intereixo', tipoLaje: 'Treliçada Isopor H8', valor: 42, motivo: '0,42 m para EPS/isopor' },
  { tipoParametro: 'Consumo_isopor_m2', tipoLaje: 'Treliçada Isopor H8', valor: 2.4, motivo: 'Referência de cálculo do projeto' },
  { tipoParametro: 'Malha_m2', tipoLaje: 'Treliçada Isopor H8', valor: 6, motivo: 'Uma malha padrão a cada 6 m²' },
];

async function main() {
  await prisma.vendedor.upsert({
    where: { idVendedor: 1 },
    update: { nome: process.env.DEFAULT_SELLER_NAME || 'Casa Lajes', ativo: true },
    create: { idVendedor: 1, nome: process.env.DEFAULT_SELLER_NAME || 'Casa Lajes', ativo: true },
  });

  for (const material of defaultMaterials) {
    const existing = await prisma.parametro.findFirst({ where: { material: material.material } });

    if (!existing) {
      await prisma.parametro.create({ data: material });
    }
  }

  for (const parametro of defaultParametrosCalculo) {
    const existing = await prisma.parametroCalculo.findFirst({
      where: {
        tipoParametro: parametro.tipoParametro,
        tipoLaje: parametro.tipoLaje,
        ativo: true,
      },
    });

    if (!existing) {
      await prisma.parametroCalculo.create({ data: parametro });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
