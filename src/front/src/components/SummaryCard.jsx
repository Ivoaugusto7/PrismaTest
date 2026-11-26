import { brNumber, money } from '../lib/formatters.js';

export function SummaryCard({ total }) {
  return (
    <section className="card summaryCard">
      <div className="cardHeader">
        <div>
          <small>Resumo rápido</small>
          <h2>Prévia acumulada</h2>
        </div>
      </div>
      <div className="metrics">
        <div><span>Área total</span><strong>{brNumber(total.area)} m²</strong></div>
        <div><span>Concreto estimado</span><strong>{brNumber(total.concreto)} m³</strong></div>
        <div><span>Valor visual</span><strong>{money(total.valor)}</strong></div>
      </div>
      <p className="noteLight">Valores calculados com os parâmetros vigentes da operação.</p>
    </section>
  );
}
