export function toApiOrcamento(record) {
  return {
    numeroOrcamento: record.numeroOrcamento,
    dataHoraCadastro: record.createdAt,
    nomeCliente: record.cliente.nome,
    telefoneCliente: record.cliente.telefone,
    enderecoObra: [record.cliente.endereco, record.cliente.cidade].filter(Boolean).join(' - '),
    tipoObra: 'Residencial',
    observacoes: '',
    formaEntrega: 'WhatsApp',
    status: record.status === 'Rascunho' ? 'Pendente' : record.status,
    freteIncluso: Number(record.total.frete || 0) > 0,
    valorTotal: record.total.valor,
    observacoesEntrega: '',
    parametros: record.parametros,
    cliente: record.cliente,
    total: record.total,
    itens: record.lajes.map((laje, index) => {
      const calc = record.calculos[index];
      return {
        descricaoAmbiente: laje.ambiente,
        comprimento: Number(laje.comprimento || 0),
        largura: Number(laje.largura || 0),
        ladoMenor: Number(laje.ladoMenor || 0),
        irregular: Boolean(laje.irregular),
        tipoLaje: record.parametros.tipoLaje,
        reforco: Number(record.parametros.reforco || 0) > 0,
        quantidade: Number(laje.quantidade || 1),
        sentido: laje.sentido,
        qtdVigotas: calc.vigotas,
        qtdLajotas: calc.pecasEnchimento ?? calc.isopor,
        qtdCimento: calc.concreto,
        qtdAco: calc.malha,
        valorMateriais: calc.valorMateriais,
        valorFrete: index === 0 ? record.total.frete : 0,
        valorSubtotal: calc.valorSubtotal,
        observacoesTecnicas: calc.observacao,
        medidasProgressivas: calc.medidasProgressivas,
      };
    }),
  };
}

export function fromApiOrcamento(apiRecord) {
  if (apiRecord?.cliente && apiRecord?.lajes && apiRecord?.total) return apiRecord;

  return {
    id: apiRecord.id ?? apiRecord.idOrcamento ?? apiRecord.numeroOrcamento,
    numeroOrcamento: apiRecord.numeroOrcamento,
    createdAt: apiRecord.dataHoraCadastro ?? apiRecord.createdAt ?? new Date().toISOString(),
    status: apiRecord.status ?? 'Pendente',
    cliente: apiRecord.cliente ?? {
      nome: apiRecord.nomeCliente ?? '',
      telefone: apiRecord.telefoneCliente ?? '',
      cidade: apiRecord.cidade ?? '',
      endereco: apiRecord.enderecoObra ?? '',
    },
    lajes: apiRecord.lajes ?? apiRecord.itens ?? [],
    parametros: apiRecord.parametros ?? {},
    calculos: apiRecord.calculos ?? [],
    total: apiRecord.total ?? {
      area: 0,
      concreto: 0,
      isopor: 0,
      pecasEnchimento: 0,
      tipoEnchimento: apiRecord.parametros?.enchimento ?? 'Isopor (EPS)',
      malha: 0,
      vigotas: 0,
      valor: Number(apiRecord.valorTotal || 0),
    },
  };
}

export function toApiMaterial(material) {
  return {
    id: material.id,
    material: material.nome,
    nome: material.nome,
    unidade: material.unidade,
    valorUnitario: Number(material.preco || 0),
    preco: Number(material.preco || 0),
    categoria: material.categoria,
    imagem: material.imagem || null,
    ativo: true,
  };
}

export function fromApiMaterial(material) {
  return {
    id: material.id ?? material.idParametro ?? material.id_material ?? crypto.randomUUID?.() ?? Date.now(),
    nome: material.nome ?? material.material ?? '',
    unidade: material.unidade ?? 'un',
    preco: Number(material.preco ?? material.valorUnitario ?? 0),
    categoria: material.categoria ?? 'Padrão',
    imagem: material.imagem ?? null,
    ativo: material.ativo !== false,
  };
}
