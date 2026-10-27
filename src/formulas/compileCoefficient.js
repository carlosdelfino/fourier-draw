/**
 * Compila expressões matemáticas (mathjs) em `k` para funções de coeficientes.
 *
 * Aceita a sintaxe usual do mathjs (`1/k`, `(-1)^k`, `sin(pi k)`, etc.) e
 * retorna `(k:number)=>number`. Expressões inválidas lançam erro com mensagem
 * legível para o usuário.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module formulas/compileCoefficient
 */

import { compile } from 'mathjs';

/**
 * Compila uma expressão em `k` numa função de coeficiente.
 * @param {string} expr Expressão mathjs (ex.: `(-1)^k / k`). Vazio ⇒ 0.
 * @returns {(k:number)=>number}
 * @throws {Error} com mensagem sanitizada se a expressão for inválida.
 */
export function compileCoefficient(expr) {
  const src = (expr ?? '').trim();
  if (!src) return () => 0;
  try {
    const fn = compile(src);
    return (k) => {
      const v = fn.evaluate({ k, pi: Math.PI });
      const n = typeof v === 'number' ? v : Number(v);
      return Number.isFinite(n) ? n : 0;
    };
  } catch (err) {
    throw new Error(`Expressão inválida "${src}": ${err.message}`);
  }
}
