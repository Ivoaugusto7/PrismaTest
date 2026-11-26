import { useMemo, useState } from 'react';
import { money, parseNumber } from '../lib/formatters.js';
import { exportMateriaisExcel } from '../services/excelService.js';
import { resizeMaterialImage } from '../lib/image.js';

const emptyMaterial = { nome: '', unidade: 'un', preco: '', categoria: '', imagem: null };

function normalizeMaterial(material) {
  return {
    ...material,
    nome: material.nome.trim(),
    unidade: material.unidade.trim() || 'un',
    categoria: material.categoria.trim() || 'Padrão',
    preco: parseNumber(material.preco),
  };
}

export function MateriaisPage({
  materials,
  addMaterial,
  importMaterials,
  updateMaterial,
  removeMaterial,
  isLoading,
}) {
  const [form, setForm] = useState(emptyMaterial);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const totalCadastrado = useMemo(
    () => materials.reduce((sum, material) => sum + parseNumber(material.preco), 0),
    [materials],
  );

  function validate(material) {
    if (!material.nome) return 'Informe o nome do material.';
    if (material.preco < 0) return 'O preço não pode ser negativo.';
    return '';
  }

  async function submitMaterial() {
    const material = normalizeMaterial(form);
    const validationError = validate(material);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    if (editingId !== null) {
      await updateMaterial(editingId, material);
    } else {
      await addMaterial(material);
    }
    setForm(emptyMaterial);
    setEditingId(null);
  }

  async function handleImage(event) {
    const [file] = event.target.files || [];
    if (!file) return;
    try {
      const imagem = await resizeMaterialImage(file);
      setForm((current) => ({ ...current, imagem }));
      setError('');
    } catch (imageError) {
      setError(imageError.message);
    } finally {
      event.target.value = '';
    }
  }

  function startEditing(material) {
    setEditingId(material.id);
    setForm({
      nome: material.nome,
      unidade: material.unidade,
      preco: material.preco,
      categoria: material.categoria,
      imagem: material.imagem || null,
    });
    setError('');
  }

  async function handleImport() {
    const imported = draft.split('\n').map((row) => {
      const [nome = '', unidade = 'un', preco = '0', categoria = 'Importado'] = row.split(';').map((value) => value.trim());
      return normalizeMaterial({ nome, unidade, preco, categoria });
    }).filter((item) => item.nome && item.preco >= 0);

    if (!imported.length) {
      setError('Nenhum material válido. Use: Nome;Unidade;Preço;Categoria');
      return;
    }
    await importMaterials(imported);
    setDraft('');
    setError('');
  }

  async function handleExport() {
    setIsExporting(true);
    try {
      await exportMateriaisExcel(materials);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section className="materialsPage materialManagement">
      <div className="card materialsIntro">
        <div>
          <small>Configuração centralizada</small>
          <h2>Cadastro e lista de materiais</h2>
          <p>Gerencie materiais e preços vigentes utilizados pela operação da Casa Lajes.</p>
        </div>
        <button className="secondary" onClick={handleExport} disabled={isExporting || !materials.length}>
          {isExporting ? 'Exportando...' : 'Exportar Excel'}
        </button>
      </div>

      <div className="materialStats">
        <div><span>Materiais ativos</span><strong>{materials.length}</strong></div>
        <div><span>Soma dos valores unitários</span><strong>{money(totalCadastrado)}</strong></div>
        <div><span>Origem dos dados</span><strong>API REST / PostgreSQL</strong></div>
      </div>

      {error && <div className="inlineAlert">{error}</div>}

      <div className="gridTwo">
        <section className="card">
          <div className="cardHeader">
            <div><small>{editingId !== null ? 'Edição' : 'Cadastro'}</small><h2>{editingId !== null ? 'Editar material' : 'Novo material'}</h2></div>
          </div>
          <div className="formGrid two">
            <label className="field"><span>Material</span><input value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} /></label>
            <label className="field"><span>Unidade</span><input value={form.unidade} onChange={(event) => setForm({ ...form, unidade: event.target.value })} /></label>
            <label className="field"><span>Preço unitário</span><input type="number" min="0" step="0.01" value={form.preco} onChange={(event) => setForm({ ...form, preco: event.target.value })} /></label>
            <label className="field"><span>Categoria</span><input value={form.categoria} onChange={(event) => setForm({ ...form, categoria: event.target.value })} /></label>
          </div>
          <div className="materialImageEditor">
            <div className="materialImagePreview">
              {form.imagem ? <img src={form.imagem} alt="Prévia do material" /> : <span>Sem imagem</span>}
            </div>
            <div>
              <label className="secondary uploadButton">
                Enviar imagem
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImage} />
              </label>
              {form.imagem && <button className="danger small" onClick={() => setForm({ ...form, imagem: null })}>Remover imagem</button>}
              <p className="note">PNG, JPEG ou WebP. A imagem é otimizada antes do envio.</p>
            </div>
          </div>
          <div className="rowActions formActions">
            <button className="primary" onClick={submitMaterial} disabled={isLoading}>{editingId !== null ? 'Salvar alterações' : 'Cadastrar material'}</button>
            {editingId !== null && <button className="secondary" onClick={() => { setEditingId(null); setForm(emptyMaterial); }}>Cancelar</button>}
          </div>
        </section>

        <section className="card">
          <div className="cardHeader"><div><small>Importação</small><h2>Importar lista</h2></div></div>
          <p className="note">Uma linha por material: Nome;Unidade;Preço;Categoria</p>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder={'EPS / isopor;un;12,50;Enchimento\nMalha POP;un;89,90;Ferragem'} />
          <button className="secondary" onClick={handleImport} disabled={isLoading}>Importar materiais</button>
        </section>
      </div>

      <section className="card materialList">
        <div className="cardHeader">
          <div><small>Consulta</small><h2>Materiais cadastrados</h2></div>
          <span className="badge dark">{materials.length} registro{materials.length === 1 ? '' : 's'}</span>
        </div>
        {materials.length === 0 ? (
          <div className="emptyState"><strong>Nenhum material cadastrado.</strong><span>Cadastre ou importe materiais para iniciar a tabela centralizada.</span></div>
        ) : (
          <div className="tableWrap">
            <table>
              <thead><tr><th>Imagem</th><th>Material</th><th>Unidade</th><th>Preço</th><th>Categoria</th><th>Ações</th></tr></thead>
              <tbody>
                {materials.map((material) => (
                  <tr key={material.id}>
                    <td><div className="materialThumb">{material.imagem ? <img src={material.imagem} alt="" /> : <span>◇</span>}</div></td>
                    <td><strong>{material.nome}</strong></td>
                    <td>{material.unidade}</td>
                    <td>{money(material.preco)}</td>
                    <td>{material.categoria}</td>
                    <td>
                      <div className="rowActions">
                        <button className="secondary small" onClick={() => startEditing(material)}>Editar</button>
                        <button className="danger small" onClick={() => removeMaterial(material.id)} disabled={isLoading}>Remover</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
}
