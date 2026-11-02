import { useState } from 'react'

const megas = Array.from({ length: 6 }, (_, index) => ({
  number: String(index + 1).padStart(2, '0'),
  accent: index % 3,
}))

const products = [
  { amount: '01', label: 'mega', price: 'R$ 5' },
  { amount: '10', label: 'megas', price: 'R$ 40', featured: true },
  { amount: '20', label: 'megas', price: 'R$ 70' },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function PlayIcon({ paused = false }: { paused?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {paused ? <path d="M8 6v12M16 6v12" /> : <path d="m9 6 9 6-9 6Z" />}
    </svg>
  )
}

function LogoMark() {
  return (
    <div className="logo-mark" aria-label="Espaço reservado para o logotipo original">
      <span>AS</span>
      <small>logo original</small>
    </div>
  )
}

function AudioWave({ active = false }: { active?: boolean }) {
  return (
    <div className={`audio-wave ${active ? 'is-active' : ''}`} aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <i key={i} style={{ '--i': i } as React.CSSProperties} />
      ))}
    </div>
  )
}

export default function App() {
  const [playing, setPlaying] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedPack, setSelectedPack] = useState('10')
  const [selectedMegas, setSelectedMegas] = useState<string[]>([])

  const toggleMega = (number: string) => {
    setSelectedMegas((current) =>
      current.includes(number) ? current.filter((item) => item !== number) : [...current, number],
    )
  }

  return (
    <main>
      <div className="grain" />
      <header className="topbar">
        <LogoMark />
        <nav className={menuOpen ? 'is-open' : ''} aria-label="Navegação principal">
          <a href="#megas">Megas</a>
          <a href="#loja">Loja</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
        <a className="header-cta" href="#pedido">
          Fazer pedido <ArrowIcon />
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero">
        <div className="hero-grid" />
        <div className="particles" aria-hidden="true">
          {Array.from({ length: 22 }, (_, i) => <i key={i} />)}
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
        <div className="hero-title">
          <span className="outline">ARTHUR</span>
          <span>SC</span>
        </div>
        <div className="hero-bottom">
          <p className="hero-tagline">O peso do Mega Funk<br />tem nome.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#megas">
              Explorar os megas <ArrowIcon />
            </a>
            <a className="button button-ghost" href="#pedido">
              Encomendar o meu
            </a>
          </div>
          <div className="scroll-cue">
            <span>Role para sentir</span>
            <i />
          </div>
        </div>
        <div className="hero-side">Mega Funk / Underground Digital / 2025</div>
      </section>

      <section className="marquee" aria-label="Arthur SC, Mega Funk">
        <div>
          ARTHUR SC <b>✦</b> MEGA FUNK <b>✦</b> GRAVE SEM LIMITE <b>✦</b>&nbsp;
          ARTHUR SC <b>✦</b> MEGA FUNK <b>✦</b> GRAVE SEM LIMITE <b>✦</b>
        </div>
      </section>

      <section className="section megas-section" id="megas">
        <div className="section-heading">
          <div>
            <span className="eyebrow">[ 01 — Acervo sonoro ]</span>
            <h2>ESCUTE OS<br /><em>MEGAS</em></h2>
          </div>
          <p>Seleção oficial do produtor. Insira aqui as capas e os áudios originais de Arthur SC.</p>
        </div>

        <div className="mega-grid">
          {megas.map((mega, index) => (
            <article className={`mega-card accent-${mega.accent}`} key={mega.number}>
              <div className="cover-art">
                <span className="cover-index">AS/{mega.number}</span>
                <div className="cover-ring" />
                <strong>ARTHUR<br />SC</strong>
                <small>ÁREA PARA<br />CAPA ORIGINAL</small>
              </div>
              <div className="track-meta">
                <div>
                  <span>Título original pendente</span>
                  <small>Slot de áudio {mega.number}</small>
                </div>
                <button
                  className="play-button"
                  onClick={() => setPlaying(playing === index ? null : index)}
                  aria-label={playing === index ? `Pausar Mega ${mega.number}` : `Ouvir Mega ${mega.number}`}
                >
                  <PlayIcon paused={playing === index} />
                </button>
              </div>
              <AudioWave active={playing === index} />
              <div className="track-links">
                <span>Áudio de prévia</span>
                <a className="youtube-link" href="#conteudo-pendente">
                  Link do YouTube <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section store-section" id="loja">
        <div className="store-intro">
          <span className="eyebrow">[ 02 — Packs ]</span>
          <h2>MAIS GRAVE.<br />MELHOR <em>PREÇO.</em></h2>
          <p>Escolha seu pack e leve a assinatura de Arthur SC para o seu som.</p>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <article className={`product-card ${product.featured ? 'featured' : ''}`} key={product.amount}>
              <div className="product-count">
                <strong>{product.amount}</strong>
                <span>{product.label}</span>
              </div>
              <div className="product-price">
                <small>Valor do pacote</small>
                <strong>{product.price}</strong>
              </div>
              <a href="#pedido" aria-label={`Escolher pacote de ${product.amount} ${product.label}`}>
                <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="order-section" id="pedido">
        <div className="order-copy">
          <span className="eyebrow">[ 03 — Exclusivo ]</span>
          <h2>SEU MEGA.<br /><span>DO SEU JEITO.</span></h2>
          <p>Descreva a sua ideia. Este formulário é uma demonstração visual e não realiza envios.</p>
          <div className="order-stamp">100%<br /><span>Personalizado</span></div>
        </div>
        <form className="order-form" onSubmit={(event) => event.preventDefault()}>
          <fieldset className="pack-selector">
            <legend>01 / Escolha o pacote</legend>
            <div>
              {products.map((product) => (
                <label className={selectedPack === product.amount ? 'is-selected' : ''} key={product.amount}>
                  <input
                    type="radio"
                    name="pack"
                    value={product.amount}
                    checked={selectedPack === product.amount}
                    onChange={() => setSelectedPack(product.amount)}
                  />
                  <span>{Number(product.amount)} {product.label}</span>
                  <strong>{product.price}</strong>
                </label>
              ))}
            </div>
          </fieldset>
          <label>
            <span>02 / Seu nome</span>
            <input type="text" placeholder="Como podemos te chamar?" />
          </label>
          <label>
            <span>03 / Seu WhatsApp</span>
            <input type="tel" placeholder="(00) 00000-0000" />
          </label>
          <fieldset className="mega-selector">
            <legend>04 / Músicas desejadas</legend>
            <div>
              {megas.map((mega) => (
                <label className={selectedMegas.includes(mega.number) ? 'is-selected' : ''} key={mega.number}>
                  <input
                    type="checkbox"
                    checked={selectedMegas.includes(mega.number)}
                    onChange={() => toggleMega(mega.number)}
                  />
                  <span>Slot {mega.number}</span>
                </label>
              ))}
            </div>
            <small>Os títulos reais substituirão os slots após aprovação.</small>
          </fieldset>
          <label>
            <span>05 / Frase de introdução</span>
            <input type="text" placeholder="Digite a frase que deve abrir o mega" />
          </label>
          <label>
            <span>06 / Observações</span>
            <textarea placeholder="Referências, ordem das músicas, prazo ou outros detalhes" rows={3} />
          </label>
          <div className="form-footer">
            <span>* A mensagem será apenas preparada. Nenhum envio automático.</span>
            <button type="submit">
              Preparar mensagem <ArrowIcon />
            </button>
          </div>
        </form>
      </section>

      <section className="section story-section" id="sobre">
        <div className="story-art">
          <div className="portrait-placeholder">
            <span>FOTO<br />OFICIAL</span>
            <small>Espaço reservado</small>
          </div>
          <div className="vertical-word">UNDERGROUND</div>
        </div>
        <div className="story-copy">
          <span className="eyebrow">[ 04 — O artista ]</span>
          <h2>DO SUL PARA<br />AS <em>PISTAS.</em></h2>
          <p className="bio-placeholder">
            Espaço reservado para a história oficial de Arthur SC. O conteúdo biográfico será inserido após aprovação do artista.
          </p>
          <blockquote>
            “Depoimento autorizado do artista será inserido neste espaço.”
            <cite>— Arthur SC</cite>
          </blockquote>
        </div>
      </section>

      <footer id="contato">
        <div className="footer-top">
          <p>O grave não para.</p>
          <h2>VEM PRO<br /><span>MEGA.</span></h2>
        </div>
        <div className="social-row">
          <span>Siga e escute</span>
          <a href="#instagram">Instagram <ArrowIcon /></a>
          <a href="#youtube">YouTube <ArrowIcon /></a>
          <a href="#spotify">Spotify <ArrowIcon /></a>
          <a href="#soundcloud">SoundCloud <ArrowIcon /></a>
        </div>
        <div className="footer-bottom">
          <LogoMark />
          <span>© 2025 Arthur SC — Protótipo visual</span>
          <span>Independente por essência.</span>
        </div>
      </footer>
    </main>
  )
}
