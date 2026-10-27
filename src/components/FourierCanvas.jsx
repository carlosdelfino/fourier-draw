/**
 * Canvas que desenha a curva paramétrica de Fourier com animação de traçado.
 *
 * Renderiza o caminho completo da soma parcial x_N(t), y_N(t) para t ∈ [0, 2π)
 * e anima um "cursor" percorrendo a curva, estilo os desenhos de epicycles.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module components/FourierCanvas
 */

import { useEffect, useRef } from 'react';
import { evaluateFormula, isEpicycleFormula } from '../formulas/FormulaFactory.js';
import { epicycleChain } from '../formulas/epicycles.js';

const SAMPLES = 720;

/**
 * @param {Object} props
 * @param {import('../formulas/FormulaFactory.js').FourierFormula} props.formula
 * @param {number} props.harmonics Número de termos da soma parcial.
 * @param {boolean} props.animate  Se o cursor animado deve ser exibido.
 */
export default function FourierCanvas({ formula, harmonics, animate }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ t: 0, raf: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    // Amostra a curva e calcula bounding box para auto-escala.
    const pts = [];
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i <= SAMPLES; i++) {
      const t = (i / SAMPLES) * 2 * Math.PI;
      const p = evaluateFormula(formula, t, harmonics);
      pts.push(p);
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    const scale = 0.8 * Math.min(W / rangeX, H / rangeY);
    const toPx = (p) => ({
      x: W / 2 + (p.x - (minX + maxX) / 2) * scale,
      y: H / 2 - (p.y - (minY + maxY) / 2) * scale,
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // grade leve
      ctx.strokeStyle = '#e9e0d3';
      ctx.lineWidth = 1;
      for (let gx = 0; gx <= W; gx += W / 10) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy <= H; gy += H / 10) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      // curva completa
      ctx.strokeStyle = '#526841';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      pts.forEach((p, i) => {
        const q = toPx(p);
        if (i === 0) ctx.moveTo(q.x, q.y);
        else ctx.lineTo(q.x, q.y);
      });
      ctx.stroke();

      // trecho percorrido pelo cursor
      const st = stateRef.current;
      const idx = Math.floor((st.t / (2 * Math.PI)) * SAMPLES);
      ctx.strokeStyle = '#ed5919';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      for (let i = 0; i <= idx; i++) {
        const q = toPx(pts[i]);
        if (i === 0) ctx.moveTo(q.x, q.y);
        else ctx.lineTo(q.x, q.y);
      }
      ctx.stroke();

      // cadeia de epicycles no instante atual (estilo @fourier.tracks)
      const t01 = stateRef.current.t / (2 * Math.PI);
      if (isEpicycleFormula(formula)) {
        // Desenha no máximo MAX_DRAWN_CIRCLES círculos por frame — desenhar
        // milhares de arcos a cada frame degradaria a animação.
        const MAX_DRAWN_CIRCLES = 400;
        const chain = epicycleChain(
          formula.epicycles,
          t01,
          Math.min(harmonics, MAX_DRAWN_CIRCLES),
        );
        ctx.strokeStyle = '#bcb09c';
        ctx.lineWidth = 1;
        for (const c of chain) {
          const cpx = toPx({ x: c.cx, y: c.cy });
          const tpx = toPx({ x: c.tx, y: c.ty });
          ctx.beginPath();
          ctx.arc(cpx.x, cpx.y, c.r * scale, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cpx.x, cpx.y);
          ctx.lineTo(tpx.x, tpx.y);
          ctx.stroke();
        }
      }

      // cursor
      const cur = toPx(pts[Math.min(idx, SAMPLES)]);
      ctx.fillStyle = '#ed5919';
      ctx.beginPath();
      ctx.arc(cur.x, cur.y, 6, 0, 2 * Math.PI);
      ctx.fill();
    };

    const step = () => {
      const st = stateRef.current;
      st.t = (st.t + 0.012) % (2 * Math.PI);
      draw();
      if (animate) st.raf = requestAnimationFrame(step);
    };

    draw();
    if (animate) stateRef.current.raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(stateRef.current.raf);
  }, [formula, harmonics, animate]);

  return <canvas ref={canvasRef} className="fourier-canvas" aria-label="Gráfico da curva de Fourier" />;
}
