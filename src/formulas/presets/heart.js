/**
 * Coração — curva clássica escrita como coeficientes de Fourier explícitos.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

export default {
  id: 'heart',
  name: 'Coração',
  latex:
    'x(t)=16\\sin^3 t,\\quad y(t)=13\\cos t-5\\cos 2t-2\\cos 3t-\\cos 4t',
  description:
    'Curva de coração clássica — representada como coeficientes de Fourier explícitos.',
  a: () => 0,
  b: (k) => (k === 1 ? 16 : 0),
  c: (k) => (k === 1 ? 13 : k === 2 ? -5 : k === 3 ? -2 : k === 4 ? -1 : 0),
  d: () => 0,
  defaultN: 4,
};
