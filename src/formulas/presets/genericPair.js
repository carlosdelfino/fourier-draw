/**
 * Fórmula da imagem de referência: par paramétrico genérico de Fourier,
 * renderizado via epicycles.
 *
 *   x_N(t) = Σ_{k=1..N} (a_k cos kt + b_k sin kt)
 *   y_N(t) = Σ_{k=1..N} (c_k cos kt + d_k sin kt)
 *
 * Cada harmônico k vira dois círculos (frequências +k e −k) pela conversão
 * C_{±k} = ((a_k ± d_k) + i(c_k ∓ b_k))/2 — ver epicyclesFromCoefficients.
 *
 * Coeficientes: a_k = c_k = 1/k², b_k = (-1)^k/k, d_k = (-1)^(k+1)/k.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

import { epicyclesFromCoefficients } from '../epicycles.js';

const a = (k) => 1 / (k * k);
const b = (k) => Math.pow(-1, k) / k;
const c = (k) => 1 / (k * k);
const d = (k) => Math.pow(-1, k + 1) / k;

export default {
  id: 'generic-pair',
  name: 'Fórmula da imagem — par paramétrico',
  latex:
    'x_N(t)=\\sum_{k=1}^{N}\\left(a_k\\cos kt+b_k\\sin kt\\right),\\quad ' +
    'y_N(t)=\\sum_{k=1}^{N}\\left(c_k\\cos kt+d_k\\sin kt\\right)',
  description:
    'Exatamente o par de equações da imagem de referência, desenhado por ' +
    'epicycles: cada k gera dois círculos (±k). Coeficientes a_k = c_k = 1/k², ' +
    'b_k = (-1)^k/k e d_k = (-1)^(k+1)/k geram um laço decorativo.',
  epicycles: epicyclesFromCoefficients(a, b, c, d, 2500),
  defaultN: 30,
};
