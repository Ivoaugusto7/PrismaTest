import { useState } from 'react';
import { brNumber, money } from '../lib/formatters.js';
import { generateOrcamentoPdf } from '../services/pdfService.js';
import { OrcamentoPreviewModal } from './OrcamentoPreviewModal.jsx';

export function PreviewPage({
  cliente,
  lajes,
  calculos,
  total,
  parametros,
  saveOrcamento,
  isSaving,
  editOrcamento,
}) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const composition = [
    ['Vigotas treliçadas', 'un', total.vigotas, 'Quantidade baseada na largura e no intereixo.'],
    [parametros.enchimento || total.tipoEnchimento || 'Isopor (EPS)', 'peças', total.pecasEnchimento ?? total.isopor, 'Representa peças de enchimento.'],
    ['Concreto para capa', 'm³', brNumber(total.concreto), `Capa informada: ${brNumber(parametros.capaConcreto, 0)} cm.`],
    ['Malha POP', 'painéis', brNumber(total.malha), 'Item calculado para a laje.'],
  ];

  async function handleGeneratePdf() {
    setIsGeneratingPdf(true);
    try {
      await generateOrcamentoPdf({ cliente, lajes, calculos, total, parametros });
    } catch (error) {
      alert(`Não foi possível gerar o PDF: ${error.message}`);
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  async function handleFinalize() {
    const saved = await saveOrcamento();
    if (saved) setIsPreviewModalOpen(true);
  }

  return (
    <section className="previewPage prototypePreview">
      <div className="card previewIntro">
        <div>
          <small>Etapa 3 • Prévia</small>
          <h2>Resultado do orçamento</h2>
          <p>Revise os quantitativos, ambientes e valores antes de finalizar e gerar o PDF.</p>
        </div>
        <button className="secondary" onClick={editOrcamento}>Editar dados</button>
      </div>

      <div className="resultMetrics">
        <div>
          <span>Área total</span>
          <strong>{brNumber(total.area)} m²</strong>
          <p>Soma das lajes/ambientes adicionados.</p>
        </div>
        <div>
          <span>Concreto da capa</span>
          <strong>{brNumber(total.concreto)} m³</strong>
          <p>Valor visual baseado na capa informada.</p>
        </div>
        <div className="featured">
          <span>Total do orçamento</span>
          <strong>{money(total.valor)}</strong>
          <p>Soma da laje + materiais extras.</p>
        </div>
      </div>

      <section className="card compositionCard">
        <div className="sectionEyebrow">Composição visual</div>
        <h2>Itens do orçamento</h2>
        <div className="compositionTable">
          <div className="compositionHead">
            <span>Item</span><span>Unidade</span><span>Qtde / volume</span><span>Observação / subtotal (extras)</span>
          </div>
          {composition.map(([item, unit, quantity, observation]) => (
            <div className="compositionRow" key={item}>
              <strong>{item}</strong><span>{unit}</span><span>{quantity}</span><span>{observation}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card addedSlabs">
        <div className="sectionEyebrow">Ambientes</div>
        <h2>Lajes adicionadas</h2>
        <div className="slabList">
          {lajes.map((laje, index) => {
            const calc = calculos[index] || {};
            return (
              <article key={`${laje.ambiente}-${index}`}>
                <div>
                  <strong>{laje.ambiente || `Ambiente ${index + 1}`}</strong>
                  <span>{brNumber(laje.comprimento)} m × {brNumber(laje.largura)} m • {laje.quantidade || 1} un • {brNumber(calc.areaTotal)} m²</span>
                  <span>Vão livre: {brNumber(laje.vao)} m • Vigotas: {laje.sentido}</span>
                </div>
                <span className="slabType">{laje.irregular ? `${parametros.tipoLaje} irregular` : parametros.tipoLaje}</span>
              </article>
            );
          })}
        </div>
      </section>

      <div className="finalizeBar">
        <button className="primary" onClick={handleFinalize} disabled={isSaving}>
          {isSaving ? 'Finalizando...' : 'Finalizar Orçamento'}
        </button>
      </div>

      <OrcamentoPreviewModal
        open={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onGeneratePdf={handleGeneratePdf}
        isGeneratingPdf={isGeneratingPdf}
        cliente={cliente}
        lajes={lajes}
        calculos={calculos}
        total={total}
        parametros={parametros}
      />
    </section>
  );
}
