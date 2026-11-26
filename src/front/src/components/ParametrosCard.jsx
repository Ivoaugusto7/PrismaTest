import { Field } from './Field.jsx';
import { ENCHIMENTOS, getEnchimento, getIntereixo, getTipoLaje, TIPOS_LAJE } from '../constants/lajes.js';
import { parseNumber } from '../lib/formatters.js';
import { formatDecimal, formatInteger } from '../lib/inputMasks.js';

export function ParametrosCard({ parametros, setParametros }) {
  function update(field, value) {
    setParametros((current) => ({ ...current, [field]: value }));
  }

  function formatParam(field, digits = 2) {
    setParametros((current) => ({ ...current, [field]: formatDecimal(current[field], digits) }));
  }

  function updateTipoLaje(value) {
    const tipo = getTipoLaje(value);
    setParametros((current) => ({
      ...current,
      tipoLaje: value,
      altura: tipo.altura,
      intereixo: getIntereixo(value, current.enchimento),
    }));
  }

  function updateEnchimento(value) {
    const enchimento = getEnchimento(value);
    setParametros((current) => ({
      ...current,
      enchimento: value,
      consumoEnchimentoM2: enchimento.consumoM2,
      intereixo: getIntereixo(current.tipoLaje, value),
    }));
  }

  return (
    <section className="card parametrosCard">
      <div className="cardHeader">
        <div>
          <small>Configuração</small>
          <h2>Parâmetros de cálculo</h2>
        </div>
      </div>
      <div className="formStack">
        <Field label="Tipo de laje">
          <select value={parametros.tipoLaje} onChange={(e) => updateTipoLaje(e.target.value)}>
            {TIPOS_LAJE.map((tipo) => <option key={tipo.value} value={tipo.value}>{tipo.label}</option>)}
          </select>
        </Field>
        <Field label="Enchimento">
          <select value={parametros.enchimento} onChange={(e) => updateEnchimento(e.target.value)}>
            {ENCHIMENTOS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </Field>
        <Field label="Altura total">
          <select value={parametros.altura} onChange={(e) => update('altura', e.target.value)}>
            <option>H8 + capa</option>
            <option>H10 + capa</option>
            <option>H12 + capa</option>
            <option>H16 + capa</option>
          </select>
        </Field>
        <Field label="Capa de concreto (cm)" required error={parseNumber(parametros.capaConcreto) <= 0 ? 'Maior que zero.' : ''}>
          <input inputMode="decimal" value={parametros.capaConcreto} aria-invalid={parseNumber(parametros.capaConcreto) <= 0} onChange={(e) => update('capaConcreto', e.target.value)} onBlur={() => formatParam('capaConcreto', 1)} />
        </Field>
        <Field label="Intereixo (cm)" required error={parseNumber(parametros.intereixo) <= 0 ? 'Maior que zero.' : ''}>
          <input inputMode="numeric" value={parametros.intereixo} aria-invalid={parseNumber(parametros.intereixo) <= 0} onChange={(e) => update('intereixo', e.target.value)} onBlur={() => update('intereixo', formatInteger(parametros.intereixo, 1))} />
        </Field>
        <Field label="Consumo do enchimento (peças/m²)" required error={parseNumber(parametros.consumoEnchimentoM2) <= 0 ? 'Maior que zero.' : ''}>
          <input inputMode="decimal" value={parametros.consumoEnchimentoM2} aria-invalid={parseNumber(parametros.consumoEnchimentoM2) <= 0} onChange={(e) => update('consumoEnchimentoM2', e.target.value)} onBlur={() => formatParam('consumoEnchimentoM2', 1)} />
        </Field>
        <Field label="Sobrecarga de uso">
          <select value={parametros.sobrecarga} onChange={(e) => update('sobrecarga', e.target.value)}>
            <option>Residencial padrão</option>
            <option>Comercial leve</option>
          </select>
        </Field>
        <Field label="Perda técnica (%)" error={parseNumber(parametros.perdaTecnica) < 0 ? 'Não pode ser negativa.' : ''}>
          <input inputMode="decimal" value={parametros.perdaTecnica} aria-invalid={parseNumber(parametros.perdaTecnica) < 0} onChange={(e) => update('perdaTecnica', e.target.value)} onBlur={() => formatParam('perdaTecnica', 1)} />
        </Field>
        <Field label="Preço visual por m²" error={parseNumber(parametros.precoM2) < 0 ? 'Não pode ser negativo.' : ''}>
          <input inputMode="decimal" value={parametros.precoM2} aria-invalid={parseNumber(parametros.precoM2) < 0} onChange={(e) => update('precoM2', e.target.value)} onBlur={() => formatParam('precoM2')} />
        </Field>
        <Field label="Frete" error={parseNumber(parametros.valorFrete) < 0 ? 'Não pode ser negativo.' : ''}>
          <input inputMode="decimal" value={parametros.valorFrete} aria-invalid={parseNumber(parametros.valorFrete) < 0} onChange={(e) => update('valorFrete', e.target.value)} onBlur={() => formatParam('valorFrete')} />
        </Field>
        <Field label="Reforço / adicional" error={parseNumber(parametros.reforco) < 0 ? 'Não pode ser negativo.' : ''}>
          <input inputMode="decimal" value={parametros.reforco} aria-invalid={parseNumber(parametros.reforco) < 0} onChange={(e) => update('reforco', e.target.value)} onBlur={() => formatParam('reforco')} />
        </Field>
      </div>
    </section>
  );
}
