import { useMemo, useState } from 'react';
import { money } from '../lib/formatters.js';

export function MaterialCatalogPage({
  orcamentoNumero,
  cliente,
  lajes,
  total: budgetTotal,
  materials,
  selected,
  setSelected,
  backToBudget,
  openManagement,
}) {
  const [quantities, setQuantities] = useState({});
  const activeMaterials = materials.filter((material) => material.ativo !== false);
  const selectedItems = Object.values(selected);
  const total = useMemo(
    () => selectedItems.reduce((sum, item) => sum + item.preco * item.quantidade, 0),
    [selectedItems],
  );

  if (!orcamentoNumero) {
    return (
      <section className="materialsPage materialsCatalogPage">
        <div className="card emptyState">
          <strong>Materiais extras precisam de um orçamento em contexto.</strong>
          <span>Volte para Novo orçamento e use o botão Materiais no canto superior direito.</span>
          <button className="primary" onClick={backToBudget}>Ir para Novo orçamento</button>
        </div>
      </section>
    );
  }

  function quantityFor(id) {
    return Math.max(1, Number(quantities[id] || 1));
  }

  function changeQuantity(id, delta) {
    const nextQuantity = Math.max(1, quantityFor(id) + delta);
    setQuantities((current) => ({
      ...current,
      [id]: nextQuantity,
    }));
    setSelected((current) => current[id]
      ? { ...current, [id]: { ...current[id], quantidade: nextQuantity } }
      : current);
  }

  function toggle(material) {
    setSelected((current) => {
      const next = { ...current };
      if (next[material.id]) {
        delete next[material.id];
      } else {
        next[material.id] = { ...material, quantidade: quantityFor(material.id), orcamentoNumero };
      }
      return next;
    });
  }

  return (
    <section className="materialsPage materialsCatalogPage">
      <div className="card materialsIntro">
        <div>
          <small>Extras • Pedido complementar</small>
          <h2>Adicionar materiais ao pedido</h2>
          <p>Selecione materiais cadastrados e ajuste as quantidades antes de confirmar para o orçamento atual.</p>
        </div>
        <div className="previewActions">
          <button className="secondary" onClick={backToBudget}>Voltar ao orçamento</button>
          <button className="primary" onClick={backToBudget}>Confirmar seleção</button>
        </div>
      </div>

      <div className="budgetContextCard">
        <div>
          <span>Orçamento atual</span>
          <strong>{orcamentoNumero}</strong>
        </div>
        <div>
          <span>Cliente</span>
          <strong>{cliente?.nome || 'Cliente ainda não informado'}</strong>
        </div>
        <div>
          <span>Ambientes</span>
          <strong>{lajes.length} {lajes.length === 1 ? 'ambiente' : 'ambientes'}</strong>
        </div>
        <div>
          <span>Área calculada</span>
          <strong>{budgetTotal?.area ? `${budgetTotal.area.toLocaleString('pt-BR')} m²` : 'Calcule a prévia'}</strong>
        </div>
      </div>

      <div className="extrasSummary">
        <div><span>Total dos materiais extras</span><strong>{money(total)}</strong></div>
        <div><span>Itens selecionados para {orcamentoNumero}</span><strong>{selectedItems.length} {selectedItems.length === 1 ? 'item' : 'itens'}</strong></div>
      </div>

      {activeMaterials.length === 0 ? (
        <div className="card emptyState">
          <strong>Nenhum material cadastrado.</strong>
          <span>Cadastre o catálogo para disponibilizar sugestões no orçamento.</span>
          <button className="primary" onClick={openManagement}>Cadastrar materiais</button>
        </div>
      ) : (
        <div className="productGrid">
          {activeMaterials.map((material) => {
            const isSelected = Boolean(selected[material.id]);
            return (
              <article className={`productCard ${isSelected ? 'selected' : ''}`} key={material.id}>
                <div className="productImage">
                  {material.imagem
                    ? <img src={material.imagem} alt={material.nome} />
                    : <span aria-hidden="true">◇</span>}
                </div>
                <div className="productDetails">
                  <small>{material.categoria}</small>
                  <strong>{material.nome}</strong>
                  <b>{money(material.preco)}</b>
                  <span>por {material.unidade}</span>
                </div>
                <div className="productActions">
                  <div className="quantityControl">
                    <button aria-label={`Diminuir ${material.nome}`} onClick={() => changeQuantity(material.id, -1)}>−</button>
                    <strong>{quantityFor(material.id)}</strong>
                    <button aria-label={`Aumentar ${material.nome}`} onClick={() => changeQuantity(material.id, 1)}>+</button>
                  </div>
                  <button className={isSelected ? 'selectedAction' : ''} onClick={() => toggle(material)}>
                    {isSelected ? '✓ Adicionado' : '+ Adicionar'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selectedItems.length > 0 && (
        <aside className="selectedMaterialsPanel" aria-label="Materiais selecionados para o orçamento">
          <div>
            <small>Selecionados para</small>
            <strong>{orcamentoNumero}</strong>
          </div>
          <ul>
            {selectedItems.map((item) => (
              <li key={item.id}>
                <span>{item.nome}</span>
                <strong>{item.quantidade} × {money(item.preco)}</strong>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </section>
  );
}
