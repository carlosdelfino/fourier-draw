/**
 * Estrela de 5 pontas desenhada por epicycles (método de tokyo-s/FourierDrawings).
 *
 * O contorno da estrela é amostrado como caminho fechado z(t) e seus
 * coeficientes complexos C_n = ∫ z(t)e^{-2πint} dt viram círculos encadeados.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

import { epicyclesFromPath, starSampler } from '../epicycles.js';

export default {
  id: 'epicycle-star',
  name: 'Estrela (epicycles)',
  latex:
    'z(t)=\\sum_{n}C_n\\,e^{2\\pi i n t},\\qquad ' +
    'C_n=\\int_0^1 z(t)\\,e^{-2\\pi i n t}\\,dt',
  description:
    'Estrela de 5 pontas reconstruída por círculos encadeados — mesmo método ' +
    'de tokyo-s/FourierDrawings (DFT do caminho SVG).',
  epicycles: epicyclesFromPath(starSampler(5, 0.42), 32),
  defaultN: 24,
};
