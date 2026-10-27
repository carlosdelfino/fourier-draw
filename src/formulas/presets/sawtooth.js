/**
 * Dente de serra — série de Fourier da função rampa periódica.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

export default {
  id: 'sawtooth',
  name: 'Dente de Serra',
  latex:
    'x_N(t)=\\sum_{k=1}^{N}\\frac{2(-1)^{k+1}}{\\pi k}\\sin(kt),\\quad y_N(t)=0',
  description: 'Série de Fourier da função dente de serra.',
  a: () => 0,
  b: (k) => (2 * Math.pow(-1, k + 1)) / (Math.PI * k),
  c: () => 0,
  d: () => 0,
  defaultN: 25,
};
