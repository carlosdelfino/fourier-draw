/**
 * Coração desenhado por epicycles — a curva paramétrica clássica é amostrada
 * e expandida em coeficientes complexos de Fourier (método de
 * tokyo-s/FourierDrawings).
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

import { epicyclesFromPath } from '../epicycles.js';

const heartSampler = (t) => {
  const a = 2 * Math.PI * t;
  return {
    x: 16 * Math.pow(Math.sin(a), 3),
    y: 13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a),
  };
};

export default {
  id: 'epicycle-heart',
  name: 'Coração (epicycles)',
  latex:
    'z(t)=\\sum_{n}C_n\\,e^{2\\pi i n t},\\quad ' +
    'z(t)=16\\sin^3(2\\pi t)+i\\,\\big(13\\cos(2\\pi t)-5\\cos(4\\pi t)-2\\cos(6\\pi t)-\\cos(8\\pi t)\\big)',
  description:
    'Coração paramétrico expandido em círculos de Fourier — réplica do ' +
    'pipeline SVG→DFT de tokyo-s/FourierDrawings.',
  get epicycles() { return (this._epicycles ||= epicyclesFromPath(heartSampler, 2501)); },
  defaultN: 12,
};
