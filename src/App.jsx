/**
 * Aplicação principal do Fourier Draw.
 *
 * Permite selecionar fórmulas de Fourier pré-definidas (via FormulaFactory),
 * criar fórmulas personalizadas em LaTeX + expressões mathjs (persistidas no
 * navegador) e visualizar a curva paramétrica resultante.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module App
 */

import { useEffect, useMemo, useState } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { FormulaFactory } from './formulas/FormulaFactory.js';
import { compileCoefficient } from './formulas/compileCoefficient.js';
import { epicyclesFromCoefficients } from './formulas/epicycles.js';
import {
  loadStoredFormulas,
  removeStoredFormula,
} from './storage/formulaStorage.js';
import FourierCanvas from './components/FourierCanvas.jsx';
import CustomFormulaEditor from './components/CustomFormulaEditor.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import { approximationError } from './formulas/FormulaFactory.js';
import './styles.css';

const mathjaxConfig = {
  tex: { inlineMath: [['\\(', '\\)'], ['$', '$']] },
};

export default function App() {
  const [selectedId, setSelectedId] = useState('generic-pair');
  const [harmonics, setHarmonics] = useState(30);
  const [animate, setAnimate] = useState(true);
  const [tab, setTab] = useState('select'); // 'select' | 'custom' | 'about'
  const [, setVersion] = useState(0); // força re-render após registrar fórmulas

  // Re-registra fórmulas salvas na sessão ao iniciar.
  useEffect(() => {
    for (const s of loadStoredFormulas()) {
      try {
        FormulaFactory.createCustom({
          id: s.id,
          name: s.name,
          latex: s.latex,
          description: s.description,
          defaultN: s.defaultN,
          epicycles: epicyclesFromCoefficients(
            compileCoefficient(s.a),
            compileCoefficient(s.b),
            compileCoefficient(s.c),
            compileCoefficient(s.d),
            2500,
          ),
        });
      } catch (err) {
        console.warn('Fórmula salva inválida ignorada:', s.id, err.message);
      }
    }
    setVersion((v) => v + 1);
  }, []);

  const formulas = FormulaFactory.list();
  const formula = useMemo(() => {
    try {
      return FormulaFactory.create(selectedId);
    } catch {
      return formulas[0];
    }
  }, [selectedId, formulas]);

  const selectFormula = (id) => {
    setSelectedId(id);
    try {
      setHarmonics(FormulaFactory.create(id).defaultN ?? 20);
    } catch {
      /* mantém N atual */
    }
  };

  const handleDelete = (id) => {
    FormulaFactory.remove(id);
    removeStoredFormula(id);
    if (selectedId === id) selectFormula('generic-pair');
    setVersion((v) => v + 1);
  };

  return (
    <MathJaxContext config={mathjaxConfig} version={3}>
      <div className="app">
        <header className="site-header">
          <h1>Fourier Draw</h1>
          <p className="subtitle">
            Desenhos com somas parciais de séries de Fourier
          </p>
        </header>

        <main>
          <nav className="tabs" role="tablist">
            <button
              role="tab"
              aria-selected={tab === 'select'}
              className={tab === 'select' ? 'tab active' : 'tab'}
              onClick={() => setTab('select')}
            >
              Escolher gráfico
            </button>
            <button
              role="tab"
              aria-selected={tab === 'custom'}
              className={tab === 'custom' ? 'tab active' : 'tab'}
              onClick={() => setTab('custom')}
            >
              Nova fórmula (LaTeX)
            </button>
            <button
              role="tab"
              aria-selected={tab === 'about'}
              className={tab === 'about' ? 'tab active' : 'tab'}
              onClick={() => setTab('about')}
            >
              Sobre o projeto
            </button>
          </nav>

          {/* Painéis ficam montados (ocultos via CSS) para evitar erros de
              typesetting do MathJax ao desmontar durante a renderização. */}
          <section className={tab === 'select' ? 'panel' : 'panel hidden'}>
              <label className="field">
                Fórmula
                <select value={formula.id} onChange={(e) => selectFormula(e.target.value)}>
                  {formulas.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.custom ? '★ ' : ''}{f.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="formula-display">
                <MathJax dynamic>{`\\[${formula.latex}\\]`}</MathJax>
                <p className="description">{formula.description}</p>
                {approximationError(formula, harmonics) !== null && (
                  <p className="approx-error">
                    Erro de aproximação ≈{' '}
                    {(approximationError(formula, harmonics) * 100).toFixed(2)}%
                    <small> (parcela da energia fora dos {harmonics} círculos usados)</small>
                  </p>
                )}
              </div>

              <div className="controls">
                <label className="field">
                  Harmônicos N = <strong>{harmonics}</strong>
                  <input
                    type="range"
                    min="1"
                    max="5000"
                    value={harmonics}
                    onChange={(e) => setHarmonics(Number(e.target.value))}
                  />
                  <input
                    className="harmonics-number"
                    type="number"
                    min="1"
                    max="5000"
                    value={harmonics}
                    onChange={(e) =>
                      setHarmonics(Math.max(1, Math.min(5000, Number(e.target.value) || 1)))
                    }
                  />
                </label>
                <label className="field checkbox">
                  <input
                    type="checkbox"
                    checked={animate}
                    onChange={(e) => setAnimate(e.target.checked)}
                  />
                  Animar traçado
                </label>
                {formula.custom && (
                  <button className="danger" onClick={() => handleDelete(formula.id)}>
                    Remover fórmula
                  </button>
                )}
              </div>
            </section>

          <section className={tab === 'custom' ? 'panel' : 'panel hidden'}>
              <CustomFormulaEditor
                onSaved={(f) => {
                  setVersion((v) => v + 1);
                  selectFormula(f.id);
                  setTab('select');
                }}
              />
            </section>

          <section className={tab === 'about' ? 'panel' : 'panel hidden'}>
            <About />
          </section>

          <section className={tab === 'about' ? 'canvas-wrap hidden' : 'canvas-wrap'}>
            <FourierCanvas formula={formula} harmonics={harmonics} animate={animate} />
          </section>
        </main>

        <Footer />
      </div>
    </MathJaxContext>
  );
}
