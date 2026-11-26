import { useEffect } from 'react';
import { brNumber, money, parseNumber } from '../lib/formatters.js';

function getMetricItems(total, parametros) {
  return [
    ['Área total', `${brNumber(total?.area)} m²`],
    ['Vigotas', total?.vigotas ?? 0],
    [parametros?.enchimento || total?.tipoEnchimento || 'Isopor (EPS)', total?.pecasEnchimento ?? total?.isopor ?? 0],
    ['Malha', brNumber(total?.malha)],
    ['Concreto', `${brNumber(total?.concreto)} m³`],
    ['Total visual', money(total?.valor)],
  ];
}

function getParameterItems(parametros) {
  return [
    ['Tipo de laje', parametros?.tipoLaje || '—'],
    ['Enchimento', parametros?.enchimento || '—'],
    ['Capa concreto', `${brNumber(parseNumber(parametros?.capaConcreto))} cm`],
    ['Intereixo', `${brNumber(parseNumber(parametros?.intereixo))} cm`],
    ['Perda técnica', `${brNumber(parseNumber(parametros?.perdaTecnica))}%`],
  ];
}

export function OrcamentoPreviewModal({
  open,
  onClose,
  onGeneratePdf,
  isGeneratingPdf = false,
  cliente = {},
  lajes = [],
  calculos = [],
  total = {},
  parametros = {},
  numeroOrcamento,
}) {
  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const generatedAt = new Date().toLocaleString('pt-BR');
  const irregularRows = lajes
    .map((laje, index) => ({ laje, calc: calculos[index], index }))
    .filter(({ calc }) => calc?.medidasProgressivas?.length > 0);

  return (
    <div className="modalOverlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modalDialog" role="dialog" aria-modal="true" aria-labelledby="orcamento-preview-title">
        <header className="modalHeader">
          <div>
            <small>Prévia antes da exportação</small>
            <h2 id="orcamento-preview-title">Prévia do orçamento em PDF</h2>
            <p>Confira o documento com o mesmo visual usado no arquivo PDF final.</p>
          </div>
          <div className="modalActions">
            <button className="secondary" type="button" onClick={onClose}>Fechar</button>
            <button className="primary" type="button" onClick={onGeneratePdf} disabled={isGeneratingPdf}>
              {isGeneratingPdf ? 'Gerando PDF...' : 'Gerar PDF'}
            </button>
          </div>
        </header>

        <div className="pdfPreviewViewport">
          <article className="pdfPreviewSheet">
            <div className="pdfPreviewBrandBar">
              <div className="pdfPreviewBrand">
                <span className="pdfPreviewBrandMark">
                  <img src="/prolaje-mark.png" alt="" />
                </span>
                <div>
                  <strong>PROLAJE</strong>
                  <small>Orçamento de lajes pré-moldadas • Casa Lajes</small>
                </div>
              </div>
              <div className="pdfPreviewMeta">
                <strong>{numeroOrcamento || 'Prévia não salva'}</strong>
                <span>Gerado em {generatedAt}</span>
              </div>
            </div>

            <section className="pdfPreviewSection">
              <div className="pdfPreviewTitle">Dados do cliente e da obra</div>
              <div className="pdfPreviewClientGrid">
                <div><span>Cliente</span><strong>{cliente.nome || '—'}</strong></div>
                <div><span>Telefone</span><strong>{cliente.telefone || '—'}</strong></div>
                <div><span>Cidade</span><strong>{cliente.cidade || '—'}</strong></div>
                <div><span>Endereço da obra</span><strong>{cliente.endereco || '—'}</strong></div>
              </div>
            </section>

            <section className="pdfPreviewMetricGrid">
                {getMetricItems(total, parametros).map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </section>

            <section className="pdfPreviewSection">
              <div className="pdfPreviewTitle">Parâmetros aplicados</div>
              <div className="pdfPreviewPills">
                {getParameterItems(parametros).map(([label, value]) => (
                  <span key={label}>{label}: <strong>{value}</strong></span>
                ))}
              </div>
            </section>

            <section className="pdfPreviewSection">
              <div className="pdfPreviewTitle">Ambientes calculados</div>
              <div className="tableWrap previewModalTableWrap">
                <table className="pdfPreviewTable">
                  <thead>
                    <tr>
                      <th>Ambiente</th>
                      <th>Tipo</th>
                      <th>Medidas</th>
                      <th>Área</th>
                      <th>Vigotas</th>
                      <th>{parametros?.enchimento || total?.tipoEnchimento || 'Isopor (EPS)'}</th>
                      <th>Malha</th>
                      <th>Concreto</th>
                      <th>Materiais</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lajes.map((laje, index) => {
                      const calc = calculos[index] || {};
                      const comprimento = parseNumber(laje.comprimento);
                      const largura = parseNumber(laje.largura);
                      const ladoMenor = parseNumber(laje.ladoMenor);
                      const medidas = laje.irregular
                        ? `${brNumber(comprimento)} × ${brNumber(largura)} / ${brNumber(ladoMenor)} m`
                        : `${brNumber(comprimento)} × ${brNumber(largura)} m`;

                      return (
                        <tr key={`${laje.ambiente}-${index}`}>
                          <td>{laje.ambiente || `Ambiente ${index + 1}`} ({laje.quantidade || 1}x)</td>
                          <td>{laje.irregular ? 'Irregular' : 'Regular'}</td>
                          <td>{medidas}</td>
                          <td>{brNumber(calc.areaTotal)} m²</td>
                          <td>{calc.vigotas ?? 0}</td>
                          <td>{calc.pecasEnchimento ?? calc.isopor ?? 0}</td>
                          <td>{brNumber(calc.malha)}</td>
                          <td>{brNumber(calc.concreto)} m³</td>
                          <td>{money(calc.valorMateriais)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="pdfPreviewBottomGrid">
              <div className="pdfPreviewNotes">
                <div className="pdfPreviewTitle">Observações técnicas</div>
                <p>Orçamento calculado a partir dos parâmetros vigentes informados no sistema.</p>
                <p>Lajes irregulares usam média das larguras e redução progressiva D/Q entre as vigotas.</p>
                <p>Frete e reforço/adicional são aplicados uma única vez no total do orçamento.</p>
              </div>
              <div className="pdfPreviewTotals">
                <div><span>Subtotal materiais</span><strong>{money(total.materiais)}</strong></div>
                <div><span>Frete</span><strong>{money(total.frete)}</strong></div>
                <div><span>Reforço / adicional</span><strong>{money(total.reforco)}</strong></div>
                <div className="pdfPreviewGrandTotal"><span>Total</span><strong>{money(total.valor)}</strong></div>
              </div>
            </section>

            {irregularRows.length > 0 && (
              <section className="pdfPreviewSection">
                <div className="pdfPreviewTitle">Progressão das vigotas em lajes irregulares</div>
                <div className="progressionList">
                  {irregularRows.map(({ laje, calc, index }) => (
                    <div key={`${laje.ambiente}-progression-${index}`}>
                      <strong>{laje.ambiente || `Ambiente ${index + 1}`}</strong>
                      <span>{calc.medidasProgressivas.map((item) => `${brNumber(item)}m`).join(' • ')}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      </section>
    </div>
  );
}
