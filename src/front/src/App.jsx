import { useEffect, useState } from 'react';
import { ClienteCard } from './components/ClienteCard.jsx';
import { HistoricoPage } from './components/HistoricoPage.jsx';
import { LajeCard } from './components/LajeCard.jsx';
import { MateriaisPage } from './components/MateriaisPage.jsx';
import { MaterialCatalogPage } from './components/MaterialCatalogPage.jsx';
import { MaterialsGrid } from './components/MaterialsGrid.jsx';
import { ParametrosCard } from './components/ParametrosCard.jsx';
import { PreviewPage } from './components/PreviewPage.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { StatusStrip } from './components/StatusStrip.jsx';
import { SummaryCard } from './components/SummaryCard.jsx';
import { initialCliente, initialLaje, initialParametros } from './constants/defaults.js';
import { validateOrcamento } from './lib/validators.js';
import { getPersistenceMode, listOrcamentos, createOrcamento, clearOrcamentos, calcularOrcamento } from './services/orcamentosRepository.js';
import { listMateriais, createMaterial, bulkCreateMateriais, deleteMaterial, updateMaterial } from './services/materiaisRepository.js';

function createId(prefix) {
  const random = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${random}`;
}

function createNumeroOrcamento() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replaceAll('-', '');
  const time = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`.padStart(6, '0');
  return `ORC-${date}-${time}`;
}

const emptyTotal = {
  area: 0,
  concreto: 0,
  isopor: 0,
  pecasEnchimento: 0,
  tipoEnchimento: 'Isopor (EPS)',
  malha: 0,
  vigotas: 0,
  materiais: 0,
  frete: 0,
  reforco: 0,
  valor: 0,
  quantidadeLajes: 0,
};

function emptyCalculation() {
  return {
    areaTotal: 0,
    concreto: 0,
    isopor: 0,
    pecasEnchimento: 0,
    tipoEnchimento: 'Isopor (EPS)',
    malha: 0,
    vigotas: 0,
    valorMateriais: 0,
    valorSubtotal: 0,
    observacao: '',
    medidasProgressivas: [],
  };
}

function App() {
  const [active, setActive] = useState('orcamento');
  const [draftNumero, setDraftNumero] = useState(() => createNumeroOrcamento());
  const [cliente, setCliente] = useState(initialCliente);
  const [lajes, setLajes] = useState([initialLaje]);
  const [parametros, setParametros] = useState(initialParametros);
  const [historico, setHistorico] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState({});
  const [toast, setToast] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [persistenceMode, setPersistenceMode] = useState(getPersistenceMode());
  const [serverPreview, setServerPreview] = useState(null);

  const calculos = serverPreview?.calculos ?? lajes.map(emptyCalculation);
  const baseTotal = serverPreview?.total ?? { ...emptyTotal, quantidadeLajes: lajes.reduce((sum, item) => sum + Number(item.quantidade || 1), 0) };
  const extras = Object.values(selectedMaterials).map((item) => ({ ...item, orcamentoNumero: draftNumero }));
  const extrasValue = extras.reduce((sum, item) => sum + Number(item.preco || 0) * Number(item.quantidade || 1), 0);
  const total = {
    ...baseTotal,
    materiais: Number(baseTotal.materiais || 0) + extrasValue,
    extras: extrasValue,
    valor: Number(baseTotal.valor || 0) + extrasValue,
    materiaisExtras: extras,
  };

  useEffect(() => {
    setServerPreview(null);
  }, [lajes, parametros]);

  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const [orcamentosResult, materiaisResult] = await Promise.all([
          listOrcamentos(),
          listMateriais(),
        ]);
        setHistorico(orcamentosResult.data);
        setMaterials(materiaisResult.data);
        setPersistenceMode(orcamentosResult.source === 'api' || materiaisResult.source === 'api' ? 'api' : getPersistenceMode());
      } catch (error) {
        notify(`Não foi possível carregar os dados: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, []);

  function notify(message) {
    setToast(message);
    setTimeout(() => setToast(''), 3200);
  }

  function validateAndShowFirstError() {
    const errors = validateOrcamento(cliente, lajes, parametros);
    if (errors.length > 0) {
      notify(errors[0]);
      return false;
    }
    return true;
  }

  function clearForm() {
    setDraftNumero(createNumeroOrcamento());
    setCliente(initialCliente);
    setLajes([initialLaje]);
    setParametros(initialParametros);
    setSelectedMaterials({});
    notify('Formulário limpo.');
  }

  async function openPreview() {
    if (!validateAndShowFirstError()) return;
    setIsLoading(true);
    try {
      const result = await calcularOrcamento(lajes, parametros);
      setServerPreview(result.data);
      setActive('previa');
    } catch (error) {
      notify(`Erro ao calcular orçamento: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  function openMaterialsForCurrentBudget() {
    if (!draftNumero) {
      notify('Inicie um orçamento antes de adicionar materiais.');
      setActive('orcamento');
      return;
    }
    setActive('materiais-extras');
  }

  function handleNavigate(target) {
    if (target === 'previa') {
      void openPreview();
      return;
    }
    setActive(target);
  }

  async function saveOrcamento() {
    if (!validateAndShowFirstError()) return false;

    const record = {
      id: createId('orc'),
      numeroOrcamento: draftNumero,
      createdAt: new Date().toISOString(),
      status: 'Rascunho',
      cliente,
      lajes,
      parametros,
      calculos,
      total,
    };

    setIsSaving(true);
    try {
      const result = await createOrcamento(record);
      setHistorico((current) => [result.data, ...current.filter((item) => item.id !== result.data.id)]);
      setPersistenceMode(result.source === 'api' ? 'api' : getPersistenceMode());
      notify(result.source === 'api' ? 'Orçamento salvo na API.' : 'Orçamento salvo localmente.');
      setDraftNumero(createNumeroOrcamento());
      setSelectedMaterials({});
      return true;
    } catch (error) {
      notify(`Erro ao salvar orçamento: ${error.message}`);
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleClearHistory() {
    if (!confirm('Deseja limpar todo o histórico?')) return;
    setIsLoading(true);
    try {
      const result = await clearOrcamentos();
      setHistorico([]);
      setPersistenceMode(result.source === 'api' ? 'api' : getPersistenceMode());
      notify(result.source === 'api' ? 'Histórico removido da API.' : 'Histórico local removido.');
    } catch (error) {
      notify(`Erro ao limpar histórico: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddMaterial(material) {
    setIsLoading(true);
    try {
      const result = await createMaterial(material);
      setMaterials((current) => [...current, result.data]);
      setPersistenceMode(result.source === 'api' ? 'api' : getPersistenceMode());
      notify(result.source === 'api' ? 'Material salvo na API.' : 'Material salvo localmente.');
    } catch (error) {
      notify(`Erro ao salvar material: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleImportMaterials(imported) {
    setIsLoading(true);
    try {
      const result = await bulkCreateMateriais(imported);
      setMaterials((current) => [...current, ...result.data]);
      setPersistenceMode(result.source === 'api' ? 'api' : getPersistenceMode());
      notify(`${result.data.length} material(is) importado(s).`);
    } catch (error) {
      notify(`Erro ao importar materiais: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveMaterial(id) {
    setIsLoading(true);
    try {
      const result = await deleteMaterial(id);
      setMaterials((current) => current.filter((item) => String(item.id) !== String(id)));
      setPersistenceMode(result.source === 'api' ? 'api' : getPersistenceMode());
      notify(result.source === 'api' ? 'Material removido da API.' : 'Material removido localmente.');
    } catch (error) {
      notify(`Erro ao remover material: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateMaterial(id, material) {
    setIsLoading(true);
    try {
      const result = await updateMaterial(id, material);
      setMaterials((current) => current.map((item) => String(item.id) === String(id) ? result.data : item));
      notify('Material atualizado na API.');
    } catch (error) {
      notify(`Erro ao atualizar material: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="appShell">
      <Sidebar active={active} onNavigate={handleNavigate} />
      <main className="content">
        <header className="topbar">
          <div>
            <small>TAPN • Sistema Web Centralizado</small>
            <h1>Orçamento de lajes pré-moldadas</h1>
          </div>
          {active === 'orcamento' && (
            <div className="topActions semanticTopActions" aria-label="Ações do orçamento">
              <button className="semanticIconButton" onClick={clearForm} type="button" title="Limpar formulário">
                <span aria-hidden="true">🧹</span>
                <strong>Limpar</strong>
              </button>
              <button className="semanticIconButton" onClick={openMaterialsForCurrentBudget} type="button" title="Adicionar materiais extras">
                <span aria-hidden="true">➕</span>
                <strong>Materiais</strong>
              </button>
              <button className="semanticIconButton primaryIconButton" onClick={openPreview} disabled={isLoading} type="button" title="Calcular prévia">
                <span aria-hidden="true">🧮</span>
                <strong>{isLoading ? 'Calculando...' : 'Calcular prévia'}</strong>
              </button>
            </div>
          )}
        </header>

        {active === 'orcamento' && (
          <>
            <StatusStrip />
            <div className="gridMain">
              <ClienteCard cliente={cliente} setCliente={setCliente} />
              <SummaryCard total={total} />
            </div>
            <div className="gridMain bottomGrid">
              <LajeCard lajes={lajes} setLajes={setLajes} />
              <ParametrosCard parametros={parametros} setParametros={setParametros} />
            </div>
            <MaterialsGrid total={total} parametros={parametros} />
          </>
        )}

        {active === 'previa' && (
          <PreviewPage cliente={cliente} lajes={lajes} calculos={calculos} total={total} parametros={parametros} saveOrcamento={saveOrcamento} isSaving={isSaving} editOrcamento={() => setActive('orcamento')} />
        )}

        {active === 'historico' && (
          <HistoricoPage historico={historico} clearHistory={handleClearHistory} isLoading={isLoading} newOrcamento={() => setActive('orcamento')} />
        )}

        {active === 'materiais-extras' && (
          <MaterialCatalogPage
            orcamentoNumero={draftNumero}
            cliente={cliente}
            lajes={lajes}
            total={total}
            materials={materials}
            selected={selectedMaterials}
            setSelected={setSelectedMaterials}
            backToBudget={() => setActive('orcamento')}
            openManagement={() => setActive('materiais-cadastro')}
          />
        )}

        {active === 'materiais-cadastro' && (
          <MateriaisPage materials={materials} addMaterial={handleAddMaterial} importMaterials={handleImportMaterials} updateMaterial={handleUpdateMaterial} removeMaterial={handleRemoveMaterial} isLoading={isLoading} />
        )}
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;
