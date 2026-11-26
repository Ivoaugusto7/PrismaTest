import { money, parseNumber } from '../lib/formatters.js';

const THEME = {
  primary: '#0D2B45',
  primary2: '#163F63',
  accent: '#F5A623',
  muted: '#66788A',
  border: '#D9E2EC',
  soft: '#F8FAFC',
  softBlue: '#E8F1F8',
  white: '#FFFFFF',
};

function sanitizeFileName(value) {
  return String(value || 'materiais')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9._-]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function createTextCell(value, overrides = {}) {
  return {
    value: String(value ?? ''),
    type: String,
    wrap: true,
    alignVertical: 'center',
    borderColor: THEME.border,
    ...overrides,
  };
}

function createNumberCell(value, overrides = {}) {
  return {
    value: Number(value || 0),
    type: Number,
    format: '#,##0.00',
    align: 'right',
    alignVertical: 'center',
    borderColor: THEME.border,
    ...overrides,
  };
}

function headerCell(value) {
  return createTextCell(value, {
    fontWeight: 'bold',
    textColor: THEME.white,
    backgroundColor: THEME.primary2,
    align: 'center',
  });
}

function summaryCell(label, value, backgroundColor = THEME.softBlue) {
  return [
    createTextCell(label, {
      fontWeight: 'bold',
      textColor: THEME.primary,
      backgroundColor,
      height: 22,
    }),
    createTextCell(value, {
      fontWeight: 'bold',
      textColor: THEME.primary,
      backgroundColor,
      columnSpan: 4,
      height: 22,
    }),
    null,
    null,
    null,
  ];
}

function getMaterialPrice(material) {
  return parseNumber(material.preco ?? material.valorUnitario ?? 0);
}

function getTotalValue(materials) {
  return materials.reduce((sum, material) => sum + getMaterialPrice(material), 0);
}

export async function exportMateriaisExcel(materials = []) {
  const { default: writeExcelFile } = await import('write-excel-file/universal');
  const exportDate = new Date();
  const normalizedMaterials = materials.map((material, index) => ({
    id: material.id ?? index + 1,
    nome: material.nome ?? material.material ?? '',
    unidade: material.unidade ?? 'un',
    preco: getMaterialPrice(material),
    categoria: material.categoria ?? 'Padrão',
    ativo: material.ativo === false ? 'Inativo' : 'Ativo',
  }));

  const data = [
    [
      createTextCell('PROLAJE • Casa Lajes', {
        columnSpan: 5,
        height: 28,
        fontWeight: 'bold',
        fontSize: 16,
        textColor: THEME.white,
        backgroundColor: THEME.primary,
        align: 'center',
      }),
      null,
      null,
      null,
      null,
    ],
    [
      createTextCell('Lista padrão de materiais', {
        columnSpan: 5,
        height: 24,
        fontWeight: 'bold',
        fontSize: 13,
        textColor: THEME.primary,
        backgroundColor: THEME.accent,
        align: 'center',
      }),
      null,
      null,
      null,
      null,
    ],
    summaryCell('Exportado em', exportDate.toLocaleString('pt-BR')),
    summaryCell('Total de itens', `${normalizedMaterials.length} item(ns)`),
    summaryCell('Soma dos preços cadastrados', money(getTotalValue(normalizedMaterials))),
    [null, null, null, null, null],
    [
      headerCell('Código'),
      headerCell('Material'),
      headerCell('Unidade'),
      headerCell('Preço unitário'),
      headerCell('Categoria'),
    ],
    ...normalizedMaterials.map((material, index) => {
      const backgroundColor = index % 2 === 0 ? THEME.white : THEME.soft;
      return [
        createTextCell(material.id, { backgroundColor }),
        createTextCell(material.nome, { backgroundColor }),
        createTextCell(material.unidade, { backgroundColor, align: 'center' }),
        createNumberCell(material.preco, { backgroundColor, format: 'R$ #,##0.00' }),
        createTextCell(material.categoria, { backgroundColor }),
      ];
    }),
  ];

  const fileName = `${sanitizeFileName('prolaje-lista-materiais')}-${exportDate.toISOString().slice(0, 10)}.xlsx`;
  const blob = await writeExcelFile(data, {
    sheet: 'Materiais',
    columns: [
      { width: 16 },
      { width: 36 },
      { width: 14 },
      { width: 18 },
      { width: 24 },
    ],
    stickyRowsCount: 7,
    showGridLines: false,
    orientation: 'landscape',
  }, {
    fontFamily: 'Calibri',
    fontSize: 11,
  }).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { fileName, count: normalizedMaterials.length };
}
