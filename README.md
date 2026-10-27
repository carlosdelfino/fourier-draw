![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Fourier%20Draw&fontSize=36&fontAlignY=35&animation=twinkling)

![visitors](https://visitor-badge.laobi.icu/badge?page_id=carlosdelfino.fourier-draw.readme)
[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
![Language: Portuguese](https://img.shields.io/badge/Language-Portuguese-brightgreen.svg)
![Status](https://img.shields.io/badge/Status-Ongoing-yellow)
[![GitHub Issues](https://img.shields.io/github/issues/carlosdelfino/fourier-draw)](https://github.com/carlosdelfino/fourier-draw/issues)

# Fourier Draw

Página em React que desenha curvas paramétricas a partir de somas parciais de
séries de Fourier:

```
x_N(t) = Σ_{k=1..N} (a_k cos kt + b_k sin kt)
y_N(t) = Σ_{k=1..N} (c_k cos kt + d_k sin kt)
```

Inspirada nos desenhos matemáticos de FT/FFT populares na internet (ex.:
[notnotharsh/fourier-drawing](https://github.com/notnotharsh/fourier-drawing) e
[tokyo-s/FourierDrawings](https://github.com/tokyo-s/FourierDrawings)).

## Recursos

- **Factory de fórmulas** (`src/formulas/FormulaFactory.js`): registro
  expansível de fórmulas (padrão Factory + Registry). Presets incluem onda
  quadrada, dente de serra, par paramétrico genérico, coração, Lissajous e
  epitrocóide.
- **Seletor de gráfico** com slider de harmônicos `N` e animação do traçado.
- **Editor de fórmulas em LaTeX** renderizado via MathJax
  (`better-react-mathjax`) — preview ao vivo.
- **Coeficientes personalizados**: expressões em `k` avaliadas com `mathjs`
  (`a_k`, `b_k`, `c_k`, `d_k`).
- **Persistência local**: fórmulas testadas ficam gravadas no
  `localStorage`/`sessionStorage` do navegador.
- **Colaboração**: novas fórmulas podem ser enviadas via
  [issues do repositório](https://github.com/carlosdelfino/fourier-draw/issues)
  para virarem presets.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:5173/fourier-draw/
npm run build    # gera dist/
npm run preview  # serve o build localmente
```

Requer Node.js ≥ 20 (ver `.nvmrc` / `engines` no `package.json`).

## Arquitetura

```
src/
  formulas/FormulaFactory.js      Factory + Registry das fórmulas
  formulas/compileCoefficient.js  Compila expressões mathjs em coeficientes
  storage/formulaStorage.js       Persistência em localStorage
  components/FourierCanvas.jsx    Canvas com auto-escala e animação
  components/CustomFormulaEditor.jsx  Editor LaTeX + coeficientes
  components/Footer.jsx           Contato e links
  App.jsx                         Orquestração (MathJaxContext, abas)
```

Para adicionar um novo preset em código, basta registrar um objeto
`{id, name, latex, description, a, b, c, d, defaultN}` na lista `presets` da
factory — os componentes não precisam mudar.

## Deploy

O workflow `.github/workflows/deploy.yml` publica `dist/` no GitHub Pages a
cada push em `main` (Configure o repositório em *Settings → Pages → Source:
GitHub Actions*).

## Segurança e privacidade

- Nenhum dado sai do navegador: fórmulas ficam no `localStorage` local.
- Expressões personalizadas são avaliadas pelo parser do `mathjs` (sem `eval`).
- Nenhuma autenticação é necessária; página pública e estática.

## Licença

GNU General Public License v3 — ver [LICENSE](LICENSE).

## Changelog

| Data | Versão | Descrição |
|---|---|---|
| 2026-10-27 | 0.1.0 | Versão inicial: factory de fórmulas, editor LaTeX/MathJax, canvas animado, persistência local e deploy via GitHub Actions |

![footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer&animation=twinkling)
