import { brNumber, money, parseNumber } from '../lib/formatters.js';

const THEME = {
  primary: '#0d2b45',
  primary2: '#163f63',
  accent: '#f5a623',
  muted: '#66788a',
  border: '#d9e2ec',
  soft: '#f8fafc',
  softBlue: '#e8f1f8',
  white: '#ffffff',
  danger: '#b42318',
};

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  return [0, 2, 4].map((start) => parseInt(normalized.slice(start, start + 2), 16));
}

function setFill(doc, hex) {
  doc.setFillColor(...hexToRgb(hex));
}

function setDraw(doc, hex) {
  doc.setDrawColor(...hexToRgb(hex));
}

function setText(doc, hex) {
  doc.setTextColor(...hexToRgb(hex));
}

function sanitizeFileName(value) {
  return String(value || 'orcamento')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9._-]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function createNumeroOrcamento() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll('-', '');
  const time = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`.padStart(6, '0');
  return `ORC-${date}-${time}`;
}

function addFooter(doc) {
  const pageCount = doc.getNumberOfPages();
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    doc.setPage(pageNumber);
    setDraw(doc, THEME.border);
    doc.setLineWidth(0.2);
    doc.line(14, height - 13, width - 14, height - 13);
    setText(doc, THEME.muted);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('PROLAJE • Casa Lajes', 14, height - 7);
    doc.text(`Página ${pageNumber} de ${pageCount}`, width - 14, height - 7, { align: 'right' });
  }
}

function drawHeader(doc, { numeroOrcamento, generatedAt }) {
  const width = doc.internal.pageSize.getWidth();

  setFill(doc, THEME.primary);
  doc.rect(0, 0, width, 33, 'F');
  setFill(doc, THEME.accent);
  doc.roundedRect(14, 8, 18, 18, 4, 4, 'F');

  setText(doc, THEME.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('PL', 23, 20, { align: 'center' });

  setText(doc, THEME.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('PROLAJE', 38, 15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Orçamento de lajes pré-moldadas • Casa Lajes', 38, 23);

  setText(doc, THEME.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(numeroOrcamento, width - 14, 14, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Gerado em ${generatedAt}`, width - 14, 22, { align: 'right' });
}

function drawCard(doc, x, y, w, h, { fill = THEME.white, stroke = THEME.border } = {}) {
  setFill(doc, fill);
  setDraw(doc, stroke);
  doc.setLineWidth(0.25);
  doc.roundedRect(x, y, w, h, 3, 3, 'FD');
}

function drawSectionTitle(doc, title, x, y) {
  setText(doc, THEME.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(title, x, y);
  setFill(doc, THEME.accent);
  doc.rect(x, y + 2.2, 18, 1.2, 'F');
}

function drawLabelValue(doc, label, value, x, y, maxWidth = 70) {
  setText(doc, THEME.muted);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(label.toUpperCase(), x, y);
  setText(doc, THEME.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const lines = doc.splitTextToSize(String(value || '—'), maxWidth);
  doc.text(lines.slice(0, 2), x, y + 5);
}

function drawMetricCard(doc, x, y, w, h, label, value) {
  drawCard(doc, x, y, w, h, { fill: THEME.white });
  setText(doc, THEME.muted);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text(label.toUpperCase(), x + 5, y + 7);
  setText(doc, THEME.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(String(value), x + 5, y + 16);
}

function drawParameterPill(doc, x, y, text) {
  setFill(doc, THEME.softBlue);
  setDraw(doc, THEME.border);
  doc.roundedRect(x, y, 56, 9, 4, 4, 'FD');
  setText(doc, THEME.primary2);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text(doc.splitTextToSize(text, 48)[0], x + 4, y + 5.7);
}

function drawTableHeader(doc, columns, x, y) {
  setFill(doc, THEME.primary2);
  setDraw(doc, THEME.primary2);
  doc.roundedRect(x, y, columns.reduce((sum, col) => sum + col.width, 0), 9, 2, 2, 'F');
  setText(doc, THEME.white);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);

  let cursorX = x;
  columns.forEach((column) => {
    doc.text(column.label, cursorX + 2, y + 5.8);
    cursorX += column.width;
  });
}

function drawTableRow(doc, columns, row, x, y, height, index) {
  setFill(doc, index % 2 === 0 ? THEME.white : THEME.soft);
  setDraw(doc, THEME.border);
  doc.rect(x, y, columns.reduce((sum, col) => sum + col.width, 0), height, 'FD');
  setText(doc, THEME.primary);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.2);

  let cursorX = x;
  columns.forEach((column) => {
    const value = String(row[column.key] ?? '—');
    const lines = doc.splitTextToSize(value, column.width - 4);
    doc.text(lines.slice(0, 2), cursorX + 2, y + 5);
    cursorX += column.width;
  });
}

function drawTotalsBox(doc, total, x, y, w) {
  drawCard(doc, x, y, w, 43, { fill: THEME.soft });
  const rows = [
    ['Subtotal materiais', money(total.materiais)],
    ['Frete', money(total.frete)],
    ['Reforço / adicional', money(total.reforco)],
  ];

  rows.forEach(([label, value], index) => {
    setText(doc, THEME.muted);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(label, x + 6, y + 8 + index * 8);
    setText(doc, THEME.primary);
    doc.text(value, x + w - 6, y + 8 + index * 8, { align: 'right' });
  });

  setDraw(doc, THEME.border);
  doc.line(x + 6, y + 29, x + w - 6, y + 29);
  setText(doc, THEME.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Total', x + 6, y + 38);
  doc.text(money(total.valor), x + w - 6, y + 38, { align: 'right' });
}

function addNewPage(doc, context) {
  doc.addPage();
  drawHeader(doc, context);
  return 43;
}

export async function generateOrcamentoPdf({ cliente, lajes, calculos, total, parametros, numeroOrcamento }) {
  const { jsPDF } = await import('jspdf');
  const resolvedNumero = numeroOrcamento || createNumeroOrcamento();
  const generatedAt = new Date().toLocaleString('pt-BR');
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const margin = 14;
  const maxY = height - 20;

  doc.setProperties({
    title: `${resolvedNumero} - ${cliente.nome || 'Cliente'}`,
    subject: 'Orçamento de lajes pré-moldadas',
    author: 'PROLAJE',
    creator: 'PROLAJE Front-end',
  });

  const context = { numeroOrcamento: resolvedNumero, generatedAt };
  drawHeader(doc, context);

  let y = 43;
  const contentWidth = width - margin * 2;

  drawCard(doc, margin, y, contentWidth, 31);
  drawSectionTitle(doc, 'Dados do cliente e da obra', margin + 6, y + 9);
  drawLabelValue(doc, 'Cliente', cliente.nome, margin + 6, y + 18, 70);
  drawLabelValue(doc, 'Telefone', cliente.telefone, margin + 82, y + 18, 42);
  drawLabelValue(doc, 'Cidade', cliente.cidade, margin + 130, y + 18, 42);
  drawLabelValue(doc, 'Endereço da obra', cliente.endereco, margin + 178, y + 18, 86);

  y += 39;
  const metricGap = 5;
  const metricW = (contentWidth - metricGap * 5) / 6;
  const nomeEnchimento = parametros.enchimento || total.tipoEnchimento || 'Isopor (EPS)';
  const metrics = [
    ['Área total', `${brNumber(total.area)} m²`],
    ['Vigotas', total.vigotas],
    [nomeEnchimento, total.pecasEnchimento ?? total.isopor],
    ['Malha', brNumber(total.malha)],
    ['Concreto', `${brNumber(total.concreto)} m³`],
    ['Total visual', money(total.valor)],
  ];
  metrics.forEach(([label, value], index) => {
    drawMetricCard(doc, margin + index * (metricW + metricGap), y, metricW, 24, label, value);
  });

  y += 34;
  drawCard(doc, margin, y, contentWidth, 23);
  drawSectionTitle(doc, 'Parâmetros aplicados', margin + 6, y + 9);
  const pills = [
    `Tipo: ${parametros.tipoLaje || '—'}`,
    `Enchimento: ${parametros.enchimento || '—'}`,
    `Capa: ${brNumber(parseNumber(parametros.capaConcreto))} cm`,
    `Intereixo: ${brNumber(parseNumber(parametros.intereixo))} cm`,
    `Perda: ${brNumber(parseNumber(parametros.perdaTecnica))}%`,
  ];
  pills.forEach((pill, index) => drawParameterPill(doc, margin + 6 + index * 59, y + 12, pill));

  y += 35;
  drawSectionTitle(doc, 'Ambientes calculados', margin, y);
  y += 7;

  const columns = [
    { key: 'ambiente', label: 'Ambiente', width: 43 },
    { key: 'tipo', label: 'Tipo', width: 26 },
    { key: 'medidas', label: 'Medidas', width: 46 },
    { key: 'area', label: 'Área', width: 24 },
    { key: 'vigotas', label: 'Vigotas', width: 22 },
    { key: 'enchimento', label: nomeEnchimento, width: 20 },
    { key: 'malha', label: 'Malha', width: 20 },
    { key: 'concreto', label: 'Concreto', width: 25 },
    { key: 'materiais', label: 'Materiais', width: 43 },
  ];

  const tableRows = lajes.map((laje, index) => {
    const calc = calculos[index];
    const comprimento = parseNumber(laje.comprimento);
    const largura = parseNumber(laje.largura);
    const ladoMenor = parseNumber(laje.ladoMenor);
    const medidas = laje.irregular
      ? `${brNumber(comprimento)} × ${brNumber(largura)} / ${brNumber(ladoMenor)} m`
      : `${brNumber(comprimento)} × ${brNumber(largura)} m`;

    return {
      ambiente: `${laje.ambiente || `Ambiente ${index + 1}`} (${laje.quantidade || 1}x)`,
      tipo: laje.irregular ? 'Irregular' : 'Regular',
      medidas,
      area: `${brNumber(calc.areaTotal)} m²`,
      vigotas: calc.vigotas,
      enchimento: calc.pecasEnchimento ?? calc.isopor,
      malha: brNumber(calc.malha),
      concreto: `${brNumber(calc.concreto)} m³`,
      materiais: money(calc.valorMateriais),
      observacao: calc.observacao,
      medidasProgressivas: calc.medidasProgressivas,
    };
  });

  drawTableHeader(doc, columns, margin, y);
  y += 9;

  tableRows.forEach((row, index) => {
    if (y + 12 > maxY) {
      y = addNewPage(doc, context);
      drawSectionTitle(doc, 'Ambientes calculados', margin, y);
      y += 7;
      drawTableHeader(doc, columns, margin, y);
      y += 9;
    }
    drawTableRow(doc, columns, row, margin, y, 10.5, index);
    y += 10.5;
  });

  y += 8;
  if (y + 51 > maxY) {
    y = addNewPage(doc, context);
  }

  const totalsWidth = 94;
  drawTotalsBox(doc, total, width - margin - totalsWidth, y, totalsWidth);

  drawCard(doc, margin, y, contentWidth - totalsWidth - 8, 43, { fill: '#fffaf0' });
  drawSectionTitle(doc, 'Observações técnicas', margin + 6, y + 9);
  setText(doc, THEME.muted);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  const notes = [
    'Orçamento calculado a partir dos parâmetros vigentes informados no sistema.',
    'Lajes irregulares usam média das larguras e redução progressiva D/Q entre as vigotas.',
    'Frete e reforço/adicional são aplicados uma única vez no total do orçamento.',
  ];
  doc.text(notes, margin + 6, y + 17);

  y += 55;
  const irregularRows = tableRows.filter((row) => row.medidasProgressivas?.length > 0);
  if (irregularRows.length > 0) {
    if (y + 35 > maxY) {
      y = addNewPage(doc, context);
    }
    drawSectionTitle(doc, 'Progressão das vigotas em lajes irregulares', margin, y);
    y += 9;
    irregularRows.forEach((row) => {
      if (y + 15 > maxY) {
        y = addNewPage(doc, context);
      }
      drawCard(doc, margin, y, contentWidth, 13, { fill: THEME.soft });
      setText(doc, THEME.primary);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.2);
      doc.text(row.ambiente, margin + 5, y + 5.2);
      setText(doc, THEME.muted);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const sequence = row.medidasProgressivas.map((item) => `${brNumber(item)}m`).join(' • ');
      doc.text(doc.splitTextToSize(sequence, contentWidth - 60), margin + 5, y + 10);
      y += 15;
    });
  }

  addFooter(doc);
  const fileName = `${sanitizeFileName(resolvedNumero)}-${sanitizeFileName(cliente.nome || 'cliente')}.pdf`;
  doc.save(fileName);

  return { fileName, numeroOrcamento: resolvedNumero };
}
