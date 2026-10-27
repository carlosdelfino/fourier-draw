/**
 * Onda quadrada — série de Fourier clássica com apenas harmônicos ímpares.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

export default {
  id: 'square-wave',
  name: 'Onda Quadrada',
  latex:
    'x_N(t)=\\sum_{k=1}^{N}\\frac{4}{\\pi(2k-1)}\\sin\\big((2k-1)t\\big),\\quad y_N(t)=0',
  description:
    'Série de Fourier clássica da onda quadrada — apenas harmônicos ímpares em x.',
  a: () => 0,
  b: (k) => (k % 2 === 1 ? 4 / (Math.PI * k) : 0),
  c: () => 0,
  d: () => 0,
  defaultN: 20,
};
