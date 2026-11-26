export function Sidebar({ active, onNavigate }) {
  const items = [
    ['orcamento', '🧾', 'Novo orçamento'],
    ['historico', '🕘', 'Histórico'],
    ['materiais-cadastro', '📦', 'Materiais cadastrados'],
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark">
          <img src="/prolaje-mark.png" alt="Símbolo Casa e Lajes" />
        </div>
        <div>
          <strong>Casa e Lajes</strong>
          <span>Orçamento Responsivo</span>
        </div>
      </div>

      <nav className="menu">
        {items.map(([id, icon, label]) => (
          <button key={id} className={`menuItem ${active === id ? 'active' : ''}`} onClick={() => onNavigate(id)}>
            <span aria-hidden="true">{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
