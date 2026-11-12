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

  social: {
    // CONFIRMAR: este é o link da publicação enviada pelo cliente.
    // O perfil provável é https://www.instagram.com/dj.arthur_sc/
    instagram: 'https://www.instagram.com/p/DY25Mh2xkR1/',
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
export const megas: Mega[] = [
  { id: '01' },
  { id: '02' },
  { id: '03' },
  { id: '04' },
  { id: '05' },
  { id: '06' },
]

export const formatPrice = (value: number) => `R$ ${value}`
