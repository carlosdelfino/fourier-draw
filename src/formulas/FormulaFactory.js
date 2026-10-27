/**
 * Factory e Registry das fórmulas de Fourier renderizáveis.
 *
 * Implementa o padrão Factory + Registry (GoF). Dois tipos de fórmula são
 * suportados:
 *
 * 1. **Par paramétrico** (imagem de referência): definida pelas funções de
 *    coeficientes a_k, b_k, c_k, d_k das somas parciais
 *      x_N(t) = Σ_{k=1..N} (a_k cos kt + b_k sin kt)
 *      y_N(t) = Σ_{k=1..N} (c_k cos kt + d_k sin kt)
 *
 * 2. **Epicycles** (método de tokyo-s/FourierDrawings e @fourier.tracks):
 *    definida por `epicycles`, uma lista de termos {freq, amp, phase}
 *    obtidos da expansão complexa z(t) = Σ C_n e^{2π i n t} de um caminho
 *    fechado.
 *
 * Cada preset vive em seu próprio arquivo em `src/formulas/presets/` —
 * veja `presets/index.js` para registrar novos.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module formulas/FormulaFactory
 */

import presets from './presets/index.js';
import { evaluateEpicycles } from './epicycles.js';

/**
 * @typedef {Object} FourierFormula
 * @property {string} id          Identificador único da fórmula.
 * @property {string} name        Nome amigável exibido no seletor.
 * @property {string} latex       Fonte LaTeX exibida via MathJax.
 * @property {string} description Descrição curta da figura produzida.
 * @property {(k:number)=>number} [a] Coeficiente a_k de x(t) (par paramétrico).
 * @property {(k:number)=>number} [b] Coeficiente b_k de x(t).
 * @property {(k:number)=>number} [c] Coeficiente c_k de y(t).
 * @property {(k:number)=>number} [d] Coeficiente d_k de y(t).
 * @property {import('./epicycles.js').EpicycleTerm[]} [epicycles]
 *        Termos de círculos encadeados (fórmulas do tipo epicycle).
 * @property {number}   [defaultN] Número de harmônicos/círculos sugerido.
 * @property {boolean}  [custom]   Verdadeiro se criada pelo usuário.
 */

/**
 * Indica se a fórmula usa a representação por epicycles.
 * @param {FourierFormula} formula
 * @returns {boolean}
 */
export function isEpicycleFormula(formula) {
  return Array.isArray(formula.epicycles);
}

/**
 * Avalia a curva paramétrica da fórmula no instante t usando N termos.
 *
 * @param {FourierFormula} formula Fórmula a avaliar.
 * @param {number} t               Parâmetro temporal (0..2π).
 * @param {number} N               Número de termos da soma parcial.
 * @returns {{x:number, y:number}} Ponto da curva.
 */
export function evaluateFormula(formula, t, N) {
  if (isEpicycleFormula(formula)) {
    return evaluateEpicycles(formula.epicycles, t / (2 * Math.PI), N);
  }
  let x = 0;
  let y = 0;
  for (let k = 1; k <= N; k++) {
    const kt = k * t;
    const cos = Math.cos(kt);
    const sin = Math.sin(kt);
    x += formula.a(k) * cos + formula.b(k) * sin;
    y += formula.c(k) * cos + formula.d(k) * sin;
  }
  return { x, y };
}

/**
 * Erro de aproximação de uma fórmula epicycle com N termos, estimado como
 * 1 − (energia dos termos usados / energia total), no mesmo espírito do
 * "approximation error" exibido por @fourier.tracks.
 *
 * @param {FourierFormula} formula Fórmula epicycle.
 * @param {number} N               Número de termos usados.
 * @returns {number|null} Erro relativo em [0,1] ou null se não aplicável.
 */
export function approximationError(formula, N) {
  if (!isEpicycleFormula(formula)) return null;
  const energy = formula.epicycles.map((t) => t.amp * t.amp);
  const total = energy.reduce((s, e) => s + e, 0);
  const used = energy.slice(0, Math.min(N, energy.length)).reduce((s, e) => s + e, 0);
  return total > 0 ? Math.max(0, 1 - used / total) : 0;
}

/* ------------------------------------------------------------------ */
/* Factory / Registry (Singleton)                                      */
/* ------------------------------------------------------------------ */

const registry = new Map(presets.map((f) => [f.id, f]));

/**
 * Fábrica de fórmulas de Fourier.
 *
 * Uso:
 *   const formula = FormulaFactory.create('square-wave');
 *   const custom  = FormulaFactory.createCustom({...});
 */
export const FormulaFactory = {
  /**
   * Recupera uma fórmula registrada pelo id.
   * @param {string} id Identificador da fórmula.
   * @returns {FourierFormula} a fórmula.
   * @throws {Error} se o id não estiver registrado.
   */
  create(id) {
    const f = registry.get(id);
    if (!f) throw new Error(`Fórmula não registrada: ${id}`);
    return f;
  },

  /**
   * Cria e registra uma fórmula personalizada a partir de funções de
   * coeficientes já compiladas.
   * @param {Omit<FourierFormula,'custom'>} def Definição da fórmula.
   * @returns {FourierFormula} a fórmula registrada.
   */
  createCustom(def) {
    const formula = { ...def, custom: true };
    registry.set(formula.id, formula);
    return formula;
  },

  /**
   * Remove uma fórmula personalizada do registro.
   * @param {string} id Identificador da fórmula.
   */
  remove(id) {
    const f = registry.get(id);
    if (f?.custom) registry.delete(id);
  },

  /**
   * Lista todas as fórmulas registradas (presets primeiro, depois customs).
   * @returns {FourierFormula[]}
   */
  list() {
    return [...registry.values()];
  },
};
