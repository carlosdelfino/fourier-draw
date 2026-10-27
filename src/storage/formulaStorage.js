/**
 * Persistência das fórmulas personalizadas na sessão do navegador.
 *
 * Usa `localStorage` (sobrevive entre sessões; `sessionStorage` é usado como
 * espelho de "sessão" quando solicitado). As fórmulas são serializadas como
 * expressões mathjs em `k` — nunca funções JS cruas — para permitir
 * round-trip seguro.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module storage/formulaStorage
 */

const KEY = 'fourier-draw:custom-formulas:v1';

/**
 * @typedef {Object} StoredFormula
 * @property {string} id
 * @property {string} name
 * @property {string} latex
 * @property {string} description
 * @property {string} a  Expressão mathjs em `k` para o coeficiente a_k.
 * @property {string} b  Expressão mathjs em `k` para b_k.
 * @property {string} c  Expressão mathjs em `k` para c_k.
 * @property {string} d  Expressão mathjs em `k` para d_k.
 * @property {number} defaultN
 */

/** @returns {StoredFormula[]} fórmulas salvas (ou lista vazia em caso de erro). */
export function loadStoredFormulas() {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

/**
 * Persiste a lista completa de fórmulas personalizadas.
 * @param {StoredFormula[]} formulas
 */
export function saveStoredFormulas(formulas) {
  localStorage.setItem(KEY, JSON.stringify(formulas));
}

/**
 * Adiciona/atualiza uma fórmula e persiste.
 * @param {StoredFormula} formula
 * @returns {StoredFormula[]} lista atualizada.
 */
export function upsertStoredFormula(formula) {
  const list = loadStoredFormulas().filter((f) => f.id !== formula.id);
  list.push(formula);
  saveStoredFormulas(list);
  return list;
}

/**
 * Remove uma fórmula salva.
 * @param {string} id
 * @returns {StoredFormula[]} lista atualizada.
 */
export function removeStoredFormula(id) {
  const list = loadStoredFormulas().filter((f) => f.id !== id);
  saveStoredFormulas(list);
  return list;
}
