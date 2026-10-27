/**
 * Página "Sobre" do Fourier Draw: origem das fórmulas, propósito do projeto
 * e créditos de desenvolvimento.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module components/About
 */
export default function About() {
  return (
    <article className="about">
      <h2>Sobre o projeto</h2>
      <p>
        <strong>Fourier Draw</strong> é uma página interativa que desenha
        figuras usando somas parciais de séries de Fourier — os famosos
        "desenhos por círculos" (epicycles) popularizados em vídeos e
        repositórios pela internet.
      </p>

      <h3>Por que este projeto existe</h3>
      <p>
        A proposta é tripla: <em>estudar as capacidades da ferramenta Devin</em>{' '}
        (agente de engenharia de software da Cognition, usado para desenvolver
        todo este projeto), <em>treinar arquitetura de software</em> — a factory
        de fórmulas foi pensada para ser expansível, com cada fórmula em seu
        próprio arquivo — e <em>se divertir um pouco com as possibilidades da
        matemática</em>.
      </p>

      <h3>Origem das fórmulas</h3>
      <ul>
        <li>
          <strong>Par paramétrico da imagem de referência</strong> — o par de
          equações{' '}
          <code>x_N(t) = Σ (a_k cos kt + b_k sin kt)</code> e{' '}
          <code>y_N(t) = Σ (c_k cos kt + d_k sin kt)</code>, que circula em
          redes sociais em vídeos de desenhos por Fourier, em especial no
          perfil{' '}
          <a href="https://www.tiktok.com/@fourier.tracks" target="_blank" rel="noreferrer">
            @fourier.tracks (TikTok)
          </a>
          , cujos vídeos mostram retratos e carros de F1 desenhados por
          círculos encadeados com "approximation error" decaindo conforme N
          cresce.
        </li>
        <li>
          <strong>Epicycles</strong> — a expansão complexa{' '}
          <code>z(t) = Σ C_n e^(2πint)</code> com{' '}
          <code>C_n = ∫ z(t) e^(-2πint) dt</code> calculada por DFT sobre um
          caminho fechado, método implementado em{' '}
          <a href="https://github.com/tokyo-s/FourierDrawings" target="_blank" rel="noreferrer">
            tokyo-s/FourierDrawings
          </a>{' '}
          (SVG → coeficientes → círculos) e em{' '}
          <a href="https://github.com/notnotharsh/fourier-drawing" target="_blank" rel="noreferrer">
            notnotharsh/fourier-drawing
          </a>
          .
        </li>
        <li>
          <strong>Séries clássicas</strong> — onda quadrada e dente de serra,
          exemplos canônicos de análise de Fourier.
        </li>
        <li>
          <strong>Curvas paramétricas</strong> — coração, Lissajous e
          epitrocóide, escritas como coeficientes de Fourier explícitos.
        </li>
      </ul>

      <h3>Como contribuir</h3>
      <p>
        Testou uma fórmula que gerou um desenho bacana? Abra uma{' '}
        <a href="https://github.com/carlosdelfino/fourier-draw/issues" target="_blank" rel="noreferrer">
          issue no repositório
        </a>{' '}
        com os coeficientes (ou o LaTeX) e ela pode virar preset para todos.
      </p>

      <h3>Desenvolvimento</h3>
      <p>
        Todo o código foi produzido pelo{' '}
        <a href="https://devin.ai" target="_blank" rel="noreferrer">Devin</a>,
        agente de engenharia de software da Cognition, sob direção de Carlos
        Delfino — parte do estudo das capacidades da ferramenta mencionado
        acima.
      </p>
    </article>
  );
}
