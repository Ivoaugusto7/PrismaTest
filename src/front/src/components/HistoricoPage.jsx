import { useState } from 'react';
import { brNumber, money } from '../lib/formatters.js';
import { generateOrcamentoPdf } from '../services/pdfService.js';
import { OrcamentoPreviewModal } from './OrcamentoPreviewModal.jsx';

export function HistoricoPage({ historico, newOrcamento }) {
  const [filter, setFilter] = useState('');
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [generatingPdfId, setGeneratingPdfId] = useState(null);

  const filtered = historico.filter((item) => {
    const haystack = [
      item.numeroOrcamento,
      item.cliente?.nome,
      item.cliente?.cidade,
      item.status,
      item.createdAt ? new Date(item.createdAt).toLocaleDateString('pt-BR') : '',
    ].join(' ').toLowerCase();
    return haystack.includes(filter.trim().toLowerCase());
  });

  function canGeneratePdf(item) {
    return Boolean(item?.cliente && item?.lajes?.length && item?.calculos?.length && item?.total && item?.parametros);
  }

  async function handleGeneratePdf(item) {
    if (!canGeneratePdf(item)) return;
    setGeneratingPdfId(item.id);
    try {
      await generateOrcamentoPdf({
        cliente: item.cliente,
        lajes: item.lajes,
        calculos: item.calculos,
        total: item.total,
        parametros: item.parametros,
        numeroOrcamento: item.numeroOrcamento,
      });
    } finally {
      setGeneratingPdfId(null);
    }
  }

  return (
    <section className="historyPage prototypeHistory">
      <div className="card historyIntro">
        <div>
          <small>Consulta</small>
          <h2>Histórico de orçamentos</h2>
          <p>Orçamentos registrados na base centralizada da Casa Lajes.</p>
        </div>
        <button className="primary" onClick={newOrcamento}>Novo orçamento</button>
      </div>

      <section className="card historyCards">
        <label className="historyFilter">
          <span>Filtrar por número, cliente, cidade, status ou data</span>
          <input value={filter} onChange={(event) => setFilter(event.target.value)} placeholder="Digite para filtrar" />
        </label>

        {filtered.length === 0 && (
          <div className="emptyState">
            <strong>Nenhum orçamento encontrado.</strong>
            <span>Gere e finalize um orçamento para que ele apareça aqui.</span>
          </div>
        )}

        {filtered.map((item) => (
          <article key={item.id}>
            <button className="historyCardMain" onClick={() => canGeneratePdf(item) && setSelectedPreview(item)}>
              <strong>{item.numeroOrcamento || 'Sem número'} • {item.cliente?.nome || 'Cliente não informado'}</strong>
              <span>
                {item.cliente?.cidade || 'Cidade não informada'} • {item.lajes?.length || 0} laje{item.lajes?.length === 1 ? '' : 's'} • {brNumber(item.total?.area)} m² • {money(item.total?.valor)}
              </span>
            </button>
            <span className="badge success">{item.status || 'Pendente'}</span>
            <button className="secondary small" onClick={() => setSelectedPreview(item)} disabled={!canGeneratePdf(item)}>Prévia</button>
          </article>
        ))}
      </section>

      {selectedPreview && (
        <OrcamentoPreviewModal
          open
          onClose={() => setSelectedPreview(null)}
          onGeneratePdf={() => handleGeneratePdf(selectedPreview)}
          isGeneratingPdf={generatingPdfId === selectedPreview.id}
          cliente={selectedPreview.cliente}
          lajes={selectedPreview.lajes}
          calculos={selectedPreview.calculos}
          total={selectedPreview.total}
          parametros={selectedPreview.parametros}
          numeroOrcamento={selectedPreview.numeroOrcamento}
        />
      )}
    </section>
  );
}
