import { brNumber } from '../lib/formatters.js';

export function MaterialsGrid({ total, parametros }) {
  const enchimento = parametros?.enchimento || total.tipoEnchimento || 'Isopor (EPS)';
  const quantidadeEnchimento = total.pecasEnchimento ?? total.isopor;
  const consumo = parametros?.consumoEnchimentoM2 || (enchimento === 'Tijolo' ? 11 : 2.4);
  const cards = [
    ['▥', 'Vigotas treliçadas', `${total.vigotas} unidades estimadas por vão e intereixo.`],
    ['▦', enchimento, `${quantidadeEnchimento} peças estimadas pelo padrão ${brNumber(consumo)} un/m².`],
    ['◼', 'Concreto para capa', `${brNumber(total.concreto)} m³ estimados pela área e capa.`],
    ['⌗', 'Malha e ferragem', `${brNumber(total.malha)} malha(s), considerando área / 6 m².`],
  ];

  return (
    <section className="card materialsOutput">
      <div className="cardHeader">
        <div>
          <small>Saída esperada</small>
          <h2>Materiais previstos no orçamento</h2>
        </div>
      </div>
      <div className="materialGrid">
        {cards.map(([icon, title, text]) => (
          <article key={title}>
            <span className="materialIcon">{icon}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
