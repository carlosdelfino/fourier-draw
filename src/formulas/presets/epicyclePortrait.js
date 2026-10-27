/**
 * Retrato estilizado por epicycles — homenagem aos vídeos de @fourier.tracks
 * (rosto com N=4 e N=16, "approximation error").
 *
 * Silhueta poligonal simplificada de um rosto de perfil amostrada como
 * caminho fechado e expandida em coeficientes complexos de Fourier.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 */

import { epicyclesFromPath } from '../epicycles.js';

/**
 * Contorno simplificado de um busto/rosto (visto de frente), normalizado.
 */
const OUTLINE = [
  [0.0, 1.0], [0.35, 0.95], [0.55, 0.8], [0.62, 0.6], [0.6, 0.4],
  [0.68, 0.32], [0.6, 0.25], [0.62, 0.12], [0.5, 0.05], [0.42, -0.05],
  [0.5, -0.2], [0.8, -0.45], [1.0, -0.6], [0.6, -0.7], [0.2, -0.72],
  [0.0, -0.7], [-0.2, -0.72], [-0.6, -0.7], [-1.0, -0.6], [-0.8, -0.45],
  [-0.5, -0.2], [-0.42, -0.05], [-0.5, 0.05], [-0.62, 0.12], [-0.6, 0.25],
  [-0.68, 0.32], [-0.6, 0.4], [-0.62, 0.6], [-0.55, 0.8], [-0.35, 0.95],
  [0.0, 1.0],
];

const portraitSampler = (t) => {
  const n = OUTLINE.length - 1;
  const seg = Math.min(Math.floor(t * n), n - 1);
  const local = t * n - seg;
  const p0 = OUTLINE[seg];
  const p1 = OUTLINE[seg + 1];
  return { x: p0[0] + (p1[0] - p0[0]) * local, y: p0[1] + (p1[1] - p0[1]) * local };
};

export default {
  id: 'epicycle-portrait',
  name: 'Retrato (epicycles)',
  latex:
    'z(t)=\\sum_{n}C_n\\,e^{2\\pi i n t},\\qquad ' +
    'C_n=\\int_0^1 z(t)\\,e^{-2\\pi i n t}\\,dt',
  description:
    'Silhueta de rosto por círculos encadeados, como nos vídeos de ' +
    '@fourier.tracks — teste N=4 e N=16 para comparar o erro de aproximação.',
  epicycles: epicyclesFromPath(portraitSampler, 40),
  defaultN: 16,
};
