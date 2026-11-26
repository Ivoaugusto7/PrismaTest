import { Field } from './Field.jsx';
import { formatPhone, isValidPhone } from '../lib/inputMasks.js';

export function ClienteCard({ cliente, setCliente }) {
  function update(field, value) {
    setCliente((current) => ({ ...current, [field]: value }));
  }

  return (
    <section className="card clientCard">
      <div className="cardHeader">
        <div>
          <small>Cadastro</small>
          <h2>Dados do cliente</h2>
        </div>
        <span className="badge success">Obrigatório</span>
      </div>
      <div className="formGrid two">
        <Field label="Cliente">
          <input value={cliente.nome} onChange={(e) => update('nome', e.target.value)} placeholder="Nome do cliente" required />
        </Field>
        <Field label="Telefone" error={!isValidPhone(cliente.telefone) ? 'Use DDD + número.' : ''}>
          <input
            value={cliente.telefone}
            inputMode="tel"
            maxLength={15}
            aria-invalid={!isValidPhone(cliente.telefone)}
            onChange={(e) => update('telefone', formatPhone(e.target.value))}
            placeholder="(31) 99999-9999"
          />
        </Field>
        <Field label="Cidade">
          <input value={cliente.cidade} onChange={(e) => update('cidade', e.target.value)} placeholder="Cidade" required />
        </Field>
        <Field label="Endereço da obra">
          <input value={cliente.endereco} onChange={(e) => update('endereco', e.target.value)} placeholder="Rua, número e bairro" />
        </Field>
      </div>
    </section>
  );
}
