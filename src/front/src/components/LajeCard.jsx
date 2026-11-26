import { initialLaje } from '../constants/defaults.js';
import { brNumber, parseNumber } from '../lib/formatters.js';
import { formatDecimal, formatInteger } from '../lib/inputMasks.js';
import { Field } from './Field.jsx';

export function LajeCard({ lajes, setLajes }) {
  function update(index, field, value) {
    setLajes((current) => current.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  }

  function formatMeasure(index, field, digits = 2) {
    setLajes((current) => current.map((item, i) => (i === index ? { ...item, [field]: formatDecimal(item[field], digits) } : item)));
  }

  function addLaje() {
    setLajes((current) => [
      ...current,
      { ...initialLaje, ambiente: `Ambiente ${current.length + 1}` },
    ]);
  }

  function removeLaje(index) {
    setLajes((current) => current.length === 1 ? current : current.filter((_, i) => i !== index));
  }

  return (
    <section className="card lajeCard">
      <div className="cardHeader">
        <div>
          <small>Entrada de medidas</small>
          <h2>Dimensões da laje</h2>
        </div>
        <button className="secondary" onClick={addLaje}>+ Adicionar ambiente</button>
      </div>

      {lajes.map((laje, index) => (
        <div className="lajeBlock" key={index}>
          <div className="formGrid three">
            <Field label="Ambiente / cômodo" required>
              <input value={laje.ambiente} onChange={(e) => update(index, 'ambiente', e.target.value)} required aria-invalid={!String(laje.ambiente || '').trim()} />
            </Field>
            <Field label="Comprimento (m)" required error={parseNumber(laje.comprimento) <= 0 ? 'Maior que zero.' : ''}>
              <input inputMode="decimal" value={laje.comprimento} aria-invalid={parseNumber(laje.comprimento) <= 0} onChange={(e) => update(index, 'comprimento', e.target.value)} onBlur={() => formatMeasure(index, 'comprimento')} placeholder="0,00" />
            </Field>
            <Field label="Largura (m)" required error={parseNumber(laje.largura) <= 0 ? 'Maior que zero.' : ''}>
              <input inputMode="decimal" value={laje.largura} aria-invalid={parseNumber(laje.largura) <= 0} onChange={(e) => update(index, 'largura', e.target.value)} onBlur={() => formatMeasure(index, 'largura')} placeholder="0,00" />
            </Field>
            <Field label="Quantidade de lajes">
              <input inputMode="numeric" value={laje.quantidade} onChange={(e) => update(index, 'quantidade', e.target.value)} onBlur={() => update(index, 'quantidade', formatInteger(laje.quantidade, 1))} />
            </Field>
            <Field label="Vão livre (m)">
              <input inputMode="decimal" value={laje.vao} onChange={(e) => update(index, 'vao', e.target.value)} onBlur={() => formatMeasure(index, 'vao')} placeholder="0,00" />
            </Field>
            <Field label="Sentido das vigotas">
              <select value={laje.sentido} onChange={(e) => update(index, 'sentido', e.target.value)}>
                <option>Menor vão</option>
                <option>Maior vão</option>
              </select>
            </Field>
          </div>

          <label className="checkLine irregularToggle">
            <input type="checkbox" checked={laje.irregular} onChange={(e) => update(index, 'irregular', e.target.checked)} />
            <span>
              <strong>Laje irregular</strong>
              <small>Marque quando as larguras opostas forem diferentes.</small>
            </span>
          </label>

          {laje.irregular && (
            <div className="formGrid two compact">
              <Field label="Largura menor (m)" required error={parseNumber(laje.ladoMenor) <= 0 || parseNumber(laje.ladoMenor) >= parseNumber(laje.largura) ? 'Menor que a largura maior.' : ''}>
                <input inputMode="decimal" value={laje.ladoMenor} aria-invalid={parseNumber(laje.ladoMenor) <= 0 || parseNumber(laje.ladoMenor) >= parseNumber(laje.largura)} onChange={(e) => update(index, 'ladoMenor', e.target.value)} onBlur={() => formatMeasure(index, 'ladoMenor')} placeholder="0,00" />
              </Field>
              <div className="hintBox">
                Área pela média: (largura maior + largura menor) / 2 × comprimento.
              </div>
            </div>
          )}

          <article className="environmentCard">
            <div>
              <strong>{laje.ambiente || `Ambiente ${index + 1}`}</strong>
              <span>{brNumber(parseNumber(laje.comprimento))} m × {brNumber(parseNumber(laje.largura))} m • {laje.quantidade || 1} un</span>
              <span>{laje.irregular ? `Formato irregular • largura menor: ${brNumber(parseNumber(laje.ladoMenor))} m` : 'Formato regular'}</span>
              <span>Vão livre: {brNumber(parseNumber(laje.vao))} m • Vigotas: {laje.sentido}</span>
            </div>
            <button className="danger" onClick={() => removeLaje(index)} disabled={lajes.length === 1}>Remover</button>
          </article>
        </div>
      ))}
    </section>
  );
}
