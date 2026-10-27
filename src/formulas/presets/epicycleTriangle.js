/**
 * Triângulo desenhado por epicycles (método de tokyo-s/FourierDrawings).
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

import { epicyclesFromPath, polygonSampler } from '../epicycles.js';

export default {
  id: 'epicycle-triangle',
  name: 'Triângulo (epicycles)',
  latex:
    'z(t)=\\sum_{n}C_n\\,e^{2\\pi i n t},\\qquad ' +
    'C_n=\\int_0^1 z(t)\\,e^{-2\\pi i n t}\\,dt',
  description:
    'Perímetro de um triângulo equilátero reconstruído por círculos encadeados.',
  epicycles: epicyclesFromPath(polygonSampler(3), 32),
  defaultN: 16,
};
