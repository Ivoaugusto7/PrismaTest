export const STORAGE_KEYS = {
  orcamentos: 'prolaje-orcamentos',
  materiais: 'prolaje-materiais',
};

export const initialCliente = {
  nome: '',
  telefone: '',
  cidade: '',
  endereco: '',
};

export const initialLaje = {
  ambiente: 'Ambiente 1',
  comprimento: 0,
  largura: 0,
  ladoMenor: 0,
  quantidade: 1,
  vao: 0,
  irregular: false,
  sentido: 'Menor vão',
};

export const initialParametros = {
  tipoLaje: 'TR8',
  enchimento: 'Isopor (EPS)',
  altura: 'H8 + capa',
  capaConcreto: 4,
  intereixo: 42,
  consumoEnchimentoM2: 2.4,
  sobrecarga: 'Residencial padrão',
  perdaTecnica: 5,
  precoM2: 79.9,
  valorFrete: 0,
  reforco: 0,
};

export const defaultMaterials = [];
