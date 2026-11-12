import { useEffect, useState } from 'react'
import { ArrowIcon, InstagramIcon, YoutubeIcon } from './components/Icons'
import LogoMark from './components/LogoMark'
import MegaCard from './components/MegaCard'
import OrderForm from './components/OrderForm'
import { defaultPackId, formatPrice, megas, packs, siteConfig } from './config/site'
import { useAudioPlayer } from './hooks/useAudioPlayer'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedPack, setSelectedPack] = useState(defaultPackId)
  const { playingId, failedIds, toggle } = useAudioPlayer()
  const { about } = siteConfig

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <LogoMark />
        <nav id="menu-principal" className={menuOpen ? 'is-open' : ''} aria-label="Navegação principal">
          <a href="#megas" onClick={closeMenu}>Megas</a>
          <a href="#loja" onClick={closeMenu}>Loja</a>
          <a href="#sobre" onClick={closeMenu}>Sobre</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
        </nav>
        <a className="header-cta" href="#pedido" onClick={closeMenu}>
          Fazer pedido <ArrowIcon />
        </a>
        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
        >
          <span />
          <span />
        </button>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-grid" />
          <div className="particles" aria-hidden="true">
            {Array.from({ length: 22 }, (_, i) => (
              <i key={i} />
            ))}
          </div>
          <div className="sound-sculpture" aria-hidden="true">
            <div className="orb-core" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="sculpture-glow" />
          </div>

          <div className="hero-kicker">
            <span>Produtor independente</span>
            <span>Santa Catarina · BR</span>
          </div>
          <h1 className="hero-title">
            <span className="outline">ARTHUR</span>
            <span>SC</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-tagline">
              O peso do Mega Funk
              <br />
              tem nome.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#megas">
                Explorar os megas <ArrowIcon />
              </a>
              <a className="button button-ghost" href="#pedido">
                Encomendar o meu
              </a>
            </div>
            <div className="scroll-cue" aria-hidden="true">
              <span>Role para sentir</span>
              <i />
            </div>
          </div>
          <div className="hero-side">Mega Funk / Underground Digital</div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div>
            ARTHUR SC <b>✦</b> MEGA FUNK <b>✦</b> GRAVE SEM LIMITE <b>✦</b>&nbsp; ARTHUR SC <b>✦</b> MEGA FUNK{' '}
            <b>✦</b> GRAVE SEM LIMITE <b>✦</b>
          </div>
        </div>

        <section className="section megas-section" id="megas">
          <div className="section-heading">
            <div>
              <span className="eyebrow">[ 01 — Acervo sonoro ]</span>
              <h2>
                ESCUTE OS
                <br />
                <em>MEGAS</em>
              </h2>
            </div>
            <p>Demonstrações dos megas do Arthur SC. Ouça e veja como o seu pode ficar.</p>
          </div>

          <div className="mega-grid">
            {megas.map((mega, index) => (
              <MegaCard
                key={mega.id}
                mega={mega}
                index={index}
                isPlaying={playingId === mega.id}
                isFailed={failedIds.includes(mega.id)}
                onToggle={toggle}
              />
            ))}
          </div>
        </section>

        <section className="section store-section" id="loja">
          <div className="store-intro">
            <span className="eyebrow">[ 02 — Packs ]</span>
            <h2>
              MAIS GRAVE.
              <br />
              MELHOR <em>PREÇO.</em>
            </h2>
            <p>Escolha seu pack e leve a assinatura de Arthur SC para o seu som.</p>
          </div>
          <div className="product-list">
            {packs.map((pack) => (
              <article className={`product-card ${pack.featured ? 'featured' : ''}`} key={pack.id}>
                <div className="product-count">
                  <strong>{String(pack.amount).padStart(2, '0')}</strong>
                  <span>{pack.label}</span>
                </div>
                <div className="product-price">
                  <small>Valor do pacote</small>
                  <strong>{formatPrice(pack.price)}</strong>
                </div>
                <a
                  href="#pedido"
                  onClick={() => setSelectedPack(pack.id)}
                  aria-label={`Escolher pacote de ${pack.amount} ${pack.label}`}
                >
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="order-section" id="pedido">
          <div className="order-copy">
            <span className="eyebrow">[ 03 — Exclusivo ]</span>
            <h2>
              SEU MEGA.
              <br />
              <span>DO SEU JEITO.</span>
            </h2>
            <p>
              Escolha o pacote e informe seu nome e WhatsApp. Você revisa a mensagem e envia direto para o Arthur, e
              lá vocês combinam todos os detalhes do seu mega.
            </p>
            <div className="order-stamp">
              100%
              <br />
              <span>Personalizado</span>
            </div>
          </div>
          <OrderForm selectedPack={selectedPack} onPackChange={setSelectedPack} />
        </section>

        <section className="section story-section" id="sobre">
          <div className="story-art">
            {siteConfig.portrait ? (
              <img className="portrait-photo" src={siteConfig.portrait} alt="Foto oficial de Arthur SC" />
            ) : (
              <div className="portrait-placeholder">
                <span>
                  FOTO
                  <br />
                  OFICIAL
                </span>
                <small>Em breve</small>
              </div>
            )}
            <div className="vertical-word" aria-hidden="true">UNDERGROUND</div>
          </div>
          <div className="story-copy">
            <span className="eyebrow">[ 04 — O artista ]</span>
            <h2>
              DO SUL PARA
              <br />
              AS <em>PISTAS.</em>
            </h2>
            <p className="bio-placeholder">{about.bio ?? 'A história oficial de Arthur SC chega em breve.'}</p>
            {about.quote && (
              <blockquote>
                “{about.quote.text}”<cite>— {about.quote.author}</cite>
              </blockquote>
            )}
          </div>
        </section>
      </main>

      <footer id="contato">
        <div className="footer-top">
          <p>O grave não para.</p>
          <h2>
            VEM PRO
            <br />
            <span>MEGA.</span>
          </h2>
        </div>
        <div className="social-row">
          <span>Siga e escute</span>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do Arthur SC (abre em nova aba)"
          >
            Instagram <InstagramIcon />
          </a>
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube do Arthur SC (abre em nova aba)"
          >
            YouTube <YoutubeIcon />
          </a>
        </div>
        <div className="footer-bottom">
          <LogoMark />
          <span>© {new Date().getFullYear()} Arthur SC</span>
          <span>Independente por essência.</span>
        </div>
      </footer>
    </>
  )
}
