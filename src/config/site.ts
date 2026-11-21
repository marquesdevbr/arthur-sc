/**
 * CONFIGURAÇÃO CENTRAL DO SITE ARTHUR SC
 * ---------------------------------------------------------------
 * Tudo que muda com frequência ou depende de informação do Arthur
 * fica neste arquivo. Os componentes não precisam ser editados.
 */

export type Pack = {
  id: string
  amount: number
  label: string
  price: number
  featured?: boolean
}

export type Mega = {
  id: string
  /** Título oficial. Enquanto estiver vazio, o card mostra "Mega 01", "Mega 02"... */
  title?: string
  /** Capa quadrada. Coloque o arquivo em public/covers/ e use, por ex.: '/covers/mega-01.jpg' */
  cover?: string
  /** Áudio de prévia. Coloque o arquivo em public/audio/ e use, por ex.: '/audio/mega-01.mp3' */
  audio?: string
  /** Link completo do vídeo no YouTube */
  youtube?: string
}

type SiteConfig = {
  name: string
  whatsappNumber: string
  social: { instagram: string; youtube: string }
  logo?: string
  portrait?: string
  about: { bio?: string; quote?: { text: string; author: string } }
}

export const siteConfig: SiteConfig = {
  name: 'Arthur SC',

  /**
   * PENDENTE: WhatsApp oficial do Arthur para receber os pedidos.
   * Formato: só dígitos, com 55 + DDD + número. Exemplo: '5548999999999'.
   * Enquanto estiver vazio (ou inválido), o formulário de pedido fica
   * bloqueado e exibe "em breve" para o visitante.
   */
  whatsappNumber: '',

  /** OPCIONAL: e-mail de contato. Se preenchido, aparece no rodapé. */

  social: {
    instagram: 'https://www.instagram.com/dj.arthur_sc/',
    youtube: 'https://www.youtube.com/@Dj.Arthur_Sc',
  },

  /** PENDENTE: logo oficial. Coloque em public/ e use, por ex.: '/logo.svg'. Vazio = marca provisória "AS". */
  logo: undefined,

  /** PENDENTE: foto oficial. Coloque em public/ e use, por ex.: '/arthur.jpg'. */
  portrait: undefined,

  about: {
    /** PENDENTE: texto de apresentação fornecido pelo Arthur. */
    bio: undefined,
    /** PENDENTE: depoimento/frase autorizada. Se ficar vazio, o bloco não aparece. */
    quote: undefined,
  },
}

/** Pacotes de megas personalizados. Preços em reais (inteiros). */
export const packs: Pack[] = [
  { id: '1', amount: 1, label: 'mega', price: 5 },
  { id: '10', amount: 10, label: 'megas', price: 40, featured: true },
  { id: '20', amount: 20, label: 'megas', price: 70 },
]

export const defaultPackId = (packs.find((pack) => pack.featured) ?? packs[0]).id

/** Os 6 megas de demonstração exibidos no site. Preencha title/cover/audio/youtube conforme o Arthur enviar. */
/** Os 4 megas de demonstração exibidos no site. Para incluir áudio de prévia, preencha `audio` (ex.: '/audio/mega-01.mp3'). */
export const megas: Mega[] = [
  { id: '01', title: 'Rua do Ouro', youtube: 'https://youtu.be/W4NrobPf3Hc' },
  { id: '02', title: 'Água Rosa', youtube: 'https://youtu.be/tJui30AD9qA' },
  { id: '03', title: 'Fumaça do Ice', youtube: 'https://youtu.be/h0DwxMHddus' },
  { id: '04', title: 'Geme Baixo', youtube: 'https://youtu.be/D9bLX5Ej_WA' },
]

export const formatPrice = (value: number) => `R$ ${value}`
