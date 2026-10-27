/**
 * Índice dos presets de fórmulas de Fourier.
 *
 * Para adicionar uma nova fórmula preset: crie um arquivo neste diretório
 * exportando `default` um objeto FourierFormula e importe-o aqui.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module formulas/presets
 */

import genericPair from './genericPair.js';
import squareWave from './squareWave.js';
import sawtooth from './sawtooth.js';
import heart from './heart.js';
import epitrochoid from './epitrochoid.js';
import lissajous from './lissajous.js';
import epicycleStar from './epicycleStar.js';
import epicycleSquare from './epicycleSquare.js';
import epicycleTriangle from './epicycleTriangle.js';
import epicycleHeart from './epicycleHeart.js';
import epicyclePortrait from './epicyclePortrait.js';
import epicycleCar from './epicycleCar.js';

export default [
  genericPair,
  squareWave,
  sawtooth,
  heart,
  epitrochoid,
  lissajous,
  epicycleStar,
  epicycleSquare,
  epicycleTriangle,
  epicycleHeart,
  epicyclePortrait,
  epicycleCar,
];
