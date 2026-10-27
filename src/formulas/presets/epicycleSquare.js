/**
 * Quadrado desenhado por epicycles (método de tokyo-s/FourierDrawings).
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

import { epicyclesFromPath, polygonSampler } from '../epicycles.js';

export default {
  id: 'epicycle-square',
  name: 'Quadrado (epicycles)',
  latex:
    'z(t)=\\sum_{n}C_n\\,e^{2\\pi i n t},\\qquad ' +
    'C_n=\\int_0^1 z(t)\\,e^{-2\\pi i n t}\\,dt',
  description:
    'Perímetro de um quadrado reconstruído pela soma de círculos — ' +
    'equivalente à série de Fourier de um caminho poligonal.',
  epicycles: epicyclesFromPath(polygonSampler(4), 32),
  defaultN: 16,
};
