/**
 * Fórmula da imagem de referência: par paramétrico genérico de Fourier.
 *
 *   x_N(t) = Σ_{k=1..N} (a_k cos kt + b_k sin kt)
 *   y_N(t) = Σ_{k=1..N} (c_k cos kt + d_k sin kt)
 *
 * Coeficientes escolhidos: a_k = c_k = 1/k², b_k = (-1)^k/k,
 * d_k = (-1)^(k+1)/k — produzem um laço decorativo.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

export default {
  id: 'generic-pair',
  name: 'Fórmula da imagem — par paramétrico',
  latex:
    'x_N(t)=\\sum_{k=1}^{N}\\left(a_k\\cos kt+b_k\\sin kt\\right),\\quad ' +
    'y_N(t)=\\sum_{k=1}^{N}\\left(c_k\\cos kt+d_k\\sin kt\\right)',
  description:
    'Exatamente o par de equações da imagem de referência. Coeficientes ' +
    'a_k = c_k = 1/k², b_k = (-1)^k/k e d_k = (-1)^(k+1)/k geram um laço decorativo.',
  a: (k) => 1 / (k * k),
  b: (k) => Math.pow(-1, k) / k,
  c: (k) => 1 / (k * k),
  d: (k) => Math.pow(-1, k + 1) / k,
  defaultN: 30,
};
