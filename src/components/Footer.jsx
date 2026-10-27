/**
 * Rodapé com informações de contato de Carlos Delfino.
 *
 * Author:  Carlos Delfino
 * Email:   consultoria@carlosdelfino.eti.br
 * WhatsApp: +55 (85) 98520-5490
 *
 * @module components/Footer
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-gradient" />
      <div className="footer-content">
        <p className="footer-brand">Fourier Draw</p>
        <p>
          Desenvolvido por <strong>Carlos Delfino</strong> ·{' '}
          <a href="mailto:consultoria@carlosdelfino.eti.br">consultoria@carlosdelfino.eti.br</a> ·{' '}
          <a href="https://wa.me/5585985205490" target="_blank" rel="noreferrer">
            WhatsApp +55 (85) 98520-5490
          </a>
        </p>
        <p className="footer-links">
          <a href="https://carlosdelfino.eti.br" target="_blank" rel="noreferrer">carlosdelfino.eti.br</a>
          {' · '}
          <a href="https://github.com/CarlosDelfino" target="_blank" rel="noreferrer">GitHub</a>
          {' · '}
          <a href="https://linkedin.com/in/CarlosDelfino" target="_blank" rel="noreferrer">LinkedIn</a>
          {' · '}
          <a href="https://github.com/carlosdelfino/fourier-draw/issues" target="_blank" rel="noreferrer">
            Enviar fórmula via issue
          </a>
        </p>
        <p className="footer-license">Licença GPLv3 — veja LICENSE no repositório.</p>
      </div>
    </footer>
  );
}
