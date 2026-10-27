/**
 * Epitrocóide — curva de espirógrafo (R=5, r=3, d=5) aproximada pelos
 * harmônicos dominantes.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

export default {
  id: 'epitrochoid',
  name: 'Epitrocóide (espiral floral)',
  latex:
    'x(t)=(R+r)\\cos t-d\\cos\\Big(\\frac{R+r}{r}t\\Big),\\quad ' +
    'y(t)=(R+r)\\sin t-d\\sin\\Big(\\frac{R+r}{r}t\\Big)',
  description:
    'Curva de espirógrafo (R=5, r=3, d=5) aproximada por termos harmônicos selecionados.',
  a: (k) => (k === 1 ? 8 : 0),
  b: () => 0,
  c: () => 0,
  d: (k) => (k === 1 ? 8 : 0),
  defaultN: 1,
};
