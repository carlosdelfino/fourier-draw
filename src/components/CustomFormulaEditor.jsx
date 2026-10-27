/**
 * Editor de fórmulas personalizadas: LaTeX para exibição (MathJax) e
 * expressões mathjs em `k` para os coeficientes a_k, b_k, c_k, d_k.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module components/CustomFormulaEditor
 */

import { useMemo, useState } from 'react';
import { MathJax } from 'better-react-mathjax';
import { compileCoefficient } from '../formulas/compileCoefficient.js';
import { FormulaFactory } from '../formulas/FormulaFactory.js';
import { upsertStoredFormula } from '../storage/formulaStorage.js';

const EMPTY = { name: '', latex: '', a: '', b: '', c: '', d: '', description: '', defaultN: 20 };

/**
 * @param {Object} props
 * @param {(formula:object)=>void} props.onSaved Chamado após salvar/registrar.
 */
export default function CustomFormulaEditor({ onSaved }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setOk(false);
  };

  const previewLatex = useMemo(() => {
    const base = form.latex.trim();
    return base || 'x_N(t)=\\sum_{k=1}^{N}\\left(a_k\\cos kt+b_k\\sin kt\\right)';
  }, [form.latex]);

  const handleSave = (e) => {
    e.preventDefault();
    setError(null);
    try {
      const fns = {
        a: compileCoefficient(form.a),
        b: compileCoefficient(form.b),
        c: compileCoefficient(form.c),
        d: compileCoefficient(form.d),
      };
      const id = `custom-${Date.now().toString(36)}`;
      const formula = FormulaFactory.createCustom({
        id,
        name: form.name || 'Fórmula personalizada',
        latex: form.latex || previewLatex,
        description: form.description || 'Criada pelo usuário.',
        defaultN: Number(form.defaultN) || 20,
        ...fns,
      });
      upsertStoredFormula({
        id,
        name: formula.name,
        latex: formula.latex,
        description: formula.description,
        a: form.a, b: form.b, c: form.c, d: form.d,
        defaultN: formula.defaultN,
      });
      setOk(true);
      setForm(EMPTY);
      onSaved?.(formula);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="formula-editor" onSubmit={handleSave}>
      <h3>Testar nova fórmula</h3>
      <label>
        Nome
        <input value={form.name} onChange={set('name')} placeholder="Minha curva" />
      </label>
      <label>
        Fórmula em LaTeX (exibição)
        <textarea
          rows={2}
          value={form.latex}
          onChange={set('latex')}
          placeholder={'x_N(t)=\\sum_{k=1}^{N} a_k\\cos kt + b_k\\sin kt'}
        />
      </label>
      <div className="latex-preview" aria-live="polite">
        <MathJax dynamic>{`\\[${previewLatex}\\]`}</MathJax>
      </div>
      <fieldset>
        <legend>Coeficientes (expressões em <code>k</code>, sintaxe mathjs)</legend>
        <div className="coef-grid">
          {['a', 'b', 'c', 'd'].map((coef) => (
            <label key={coef}>
              {coef}_k
              <input
                value={form[coef]}
                onChange={set(coef)}
                placeholder={coef === 'a' ? '1/k^2' : '(-1)^k/k'}
              />
            </label>
          ))}
        </div>
        <label>
          Harmônicos (N)
          <input type="number" min="1" max="5000" value={form.defaultN} onChange={set('defaultN')} />
        </label>
      </fieldset>
      <label>
        Descrição
        <input value={form.description} onChange={set('description')} placeholder="O que esta fórmula desenha?" />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      {ok && <p className="form-ok">Fórmula salva na sessão do navegador.</p>}
      <button type="submit">Salvar e desenhar</button>
      <p className="hint">
        Gostou do resultado? Envie sua fórmula via{' '}
        <a href="https://github.com/carlosdelfino/fourier-draw/issues" target="_blank" rel="noreferrer">
          issue no repositório
        </a>{' '}
        para incluí-la como preset.
      </p>
    </form>
  );
}
