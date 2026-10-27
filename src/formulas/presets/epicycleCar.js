/**
 * Silhueta de carro desenhada por epicycles — homenagem aos vídeos de
 * @fourier.tracks (F1 com N=1, erro 74.53%).
 *
 * O contorno é uma silhueta estilizada de carro de corrida amostrada como
 * caminho fechado e expandida em coeficientes complexos de Fourier.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

import { epicyclesFromPath } from '../epicycles.js';

/**
 * Silhueta poligonal simplificada de um carro de corrida visto de lado.
 * Coordenadas normalizadas (x → frente, y → cima), caminho fechado.
 */
const OUTLINE = [
  [-1.0, 0.1], [-0.95, 0.35], [-0.7, 0.35], [-0.6, 0.55], [-0.3, 0.6],
  [-0.1, 0.85], [0.15, 0.85], [0.35, 0.6], [0.7, 0.55], [0.85, 0.4],
  [1.0, 0.35], [1.0, 0.1], [0.75, 0.0], [0.55, 0.12], [0.4, 0.0],
  [-0.3, 0.0], [-0.5, 0.12], [-0.7, 0.0], [-1.0, 0.1],
];

const carSampler = (t) => {
  const n = OUTLINE.length - 1;
  const seg = Math.min(Math.floor(t * n), n - 1);
  const local = t * n - seg;
  const p0 = OUTLINE[seg];
  const p1 = OUTLINE[seg + 1];
  return { x: p0[0] + (p1[0] - p0[0]) * local, y: p0[1] + (p1[1] - p0[1]) * local };
};

export default {
  id: 'epicycle-car',
  name: 'Carro de corrida (epicycles)',
  latex:
    'z(t)=\\sum_{n}C_n\\,e^{2\\pi i n t},\\qquad ' +
    'C_n=\\int_0^1 z(t)\\,e^{-2\\pi i n t}\\,dt',
  description:
    'Silhueta de carro de corrida por círculos encadeados, como nos vídeos ' +
    'de @fourier.tracks — aumente N para reduzir o erro de aproximação.',
  get epicycles() { return (this._epicycles ||= epicyclesFromPath(carSampler, 2501)); },
  defaultN: 20,
};
