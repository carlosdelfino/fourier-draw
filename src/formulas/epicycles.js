/**
 * Cálculo de coeficientes de Fourier complexos (epicycles) para caminhos
 * fechados, replicando o método de tokyo-s/FourierDrawings:
 *
 *   C_n = ∫_0^1 z(t) e^{-2π i n t} dt
 *
 * Cada coeficiente vira um círculo de raio |C_n|, frequência `n` e fase
 * inicial arg(C_n). A curva é reconstruída por z(t) = Σ C_n e^{2π i n t}.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module formulas/epicycles
 */

/**
 * @typedef {Object} EpicycleTerm
 * @property {number} freq  Frequência inteira n (pode ser negativa ou 0).
 * @property {number} amp   Raio do círculo (|C_n|).
 * @property {number} phase Fase inicial (arg C_n), em radianos.
 */

const INTEGRATION_SAMPLES = 1024;

/**
 * Calcula os coeficientes de Fourier complexos de um caminho fechado.
 * Replica `complex_integrate` de tokyo-s (quadratura fixa) usando a regra do
 * retângulo, suficiente para caminhos suaves/polinomiais.
 *
 * @param {(t:number)=>{x:number,y:number}} sampler Ponto do caminho em t∈[0,1).
 * @param {number} count Número de frequências positivas a calcular
 *                       (0..count-1 e negativas -1..-(count-1)).
 * @returns {EpicycleTerm[]} Termos ordenados por amplitude decrescente.
 */
export function epicyclesFromPath(sampler, count = 32) {
  const terms = [];
  const freqs = [0];
  for (let n = 1; n < count; n++) {
    freqs.push(n, -n);
  }
  for (const n of freqs) {
    let re = 0;
    let im = 0;
    for (let j = 0; j < INTEGRATION_SAMPLES; j++) {
      const t = j / INTEGRATION_SAMPLES;
      const p = sampler(t);
      const ang = -2 * Math.PI * n * t;
      re += p.x * Math.cos(ang) - p.y * Math.sin(ang);
      im += p.x * Math.sin(ang) + p.y * Math.cos(ang);
    }
    re /= INTEGRATION_SAMPLES;
    im /= INTEGRATION_SAMPLES;
    terms.push({ freq: n, amp: Math.hypot(re, im), phase: Math.atan2(im, re) });
  }
  return terms.sort((a, b) => b.amp - a.amp);
}

/**
 * Avalia a reconstrução z(t) = Σ C_n e^{2π i n t} usando os N primeiros
 * termos (mais energéticos).
 *
 * @param {EpicycleTerm[]} terms Termos (já ordenados por amplitude).
 * @param {number} t01           Parâmetro normalizado em [0, 1).
 * @param {number} N             Número de termos (círculos) usados.
 * @returns {{x:number, y:number}}
 */
export function evaluateEpicycles(terms, t01, N) {
  let x = 0;
  let y = 0;
  const limit = Math.min(N, terms.length);
  for (let i = 0; i < limit; i++) {
    const { freq, amp, phase } = terms[i];
    const ang = 2 * Math.PI * freq * t01 + phase;
    x += amp * Math.cos(ang);
    y += amp * Math.sin(ang);
  }
  return { x, y };
}

/**
 * Retorna a cadeia de círculos (centros, raios e pontas) no instante t,
 * para desenhar os epicycles como nos vídeos de @fourier.tracks.
 *
 * @param {EpicycleTerm[]} terms Termos ordenados por amplitude.
 * @param {number} t01           Parâmetro normalizado em [0, 1).
 * @param {number} N             Número de círculos usados.
 * @returns {Array<{cx:number, cy:number, r:number, tx:number, ty:number}>}
 *          Centro, raio e ponta de cada círculo (a ponta do último é a curva).
 */
export function epicycleChain(terms, t01, N) {
  const chain = [];
  let cx = 0;
  let cy = 0;
  const limit = Math.min(N, terms.length);
  for (let i = 0; i < limit; i++) {
    const { freq, amp, phase } = terms[i];
    const ang = 2 * Math.PI * freq * t01 + phase;
    const tx = cx + amp * Math.cos(ang);
    const ty = cy + amp * Math.sin(ang);
    chain.push({ cx, cy, r: amp, tx, ty });
    cx = tx;
    cy = ty;
  }
  return chain;
}

/**
 * Sampler de um polígono regular com `sides` vértices (perímetro unitário).
 * @param {number} sides   Número de lados.
 * @param {number} rotation Rotação inicial em radianos.
 * @returns {(t:number)=>{x:number,y:number}}
 */
export function polygonSampler(sides, rotation = -Math.PI / 2) {
  const verts = [];
  for (let i = 0; i < sides; i++) {
    const a = rotation + (2 * Math.PI * i) / sides;
    verts.push({ x: Math.cos(a), y: Math.sin(a) });
  }
  return (t) => {
    const seg = Math.min(Math.floor(t * sides), sides - 1);
    const local = t * sides - seg;
    const p0 = verts[seg];
    const p1 = verts[(seg + 1) % sides];
    return { x: p0.x + (p1.x - p0.x) * local, y: p0.y + (p1.y - p0.y) * local };
  };
}

/**
 * Sampler de estrela de `points` pontas (polígono {points/2}).
 * @param {number} points Pontas da estrela.
 * @param {number} innerRatio Razão raio interno/externo.
 * @returns {(t:number)=>{x:number,y:number}}
 */
export function starSampler(points = 5, innerRatio = 0.42) {
  const verts = [];
  for (let i = 0; i < points * 2; i++) {
    const a = -Math.PI / 2 + (Math.PI * i) / points;
    const r = i % 2 === 0 ? 1 : innerRatio;
    verts.push({ x: r * Math.cos(a), y: r * Math.sin(a) });
  }
  const n = verts.length;
  return (t) => {
    const seg = Math.min(Math.floor(t * n), n - 1);
    const local = t * n - seg;
    const p0 = verts[seg];
    const p1 = verts[(seg + 1) % n];
    return { x: p0.x + (p1.x - p0.x) * local, y: p0.y + (p1.y - p0.y) * local };
  };
}
