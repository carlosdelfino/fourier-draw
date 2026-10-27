/**
 * Lissajous 3:2 — figura com razão de frequências 3:2.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

export default {
  id: 'lissajous-3-2',
  name: 'Lissajous 3:2',
  latex: 'x(t)=\\sin(3t+\\tfrac{\\pi}{2}),\\quad y(t)=\\sin(2t)',
  description: 'Figura de Lissajous com razão de frequências 3:2.',
  a: (k) => (k === 3 ? 1 : 0),
  b: () => 0,
  c: () => 0,
  d: (k) => (k === 2 ? 1 : 0),
  defaultN: 3,
};
