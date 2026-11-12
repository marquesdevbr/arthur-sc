import { formatPrice, type Pack } from '../config/site'

export const onlyDigits = (value: string) => value.replace(/\D/g, '')

/** Número do Arthur válido: 55 + DDD (2 dígitos) + 8 ou 9 dígitos. */
export const isWhatsAppConfigured = (number: string) => /^55[1-9]\d{9,10}$/.test(number)

/** Telefone brasileiro do cliente: DDD + 8 ou 9 dígitos. */
export const isValidPhone = (value: string) => /^[1-9]\d{9,10}$/.test(onlyDigits(value))

export function formatPhone(value: string) {
  const d = onlyDigits(value).slice(0, 11)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

type OrderData = { pack: Pack; name: string; phone: string }

export function buildOrderMessage({ pack, name, phone }: OrderData) {
  const cleanName = name.replace(/[*_~]/g, '').replace(/\s+/g, ' ').trim()
  return [
    'Olá, Arthur! Quero encomendar um mega personalizado.',
    '',
    `*Pacote:* ${pack.amount} ${pack.label} — ${formatPrice(pack.price)}`,
    `*Nome:* ${cleanName}`,
    `*WhatsApp:* ${formatPhone(phone)}`,
    '',
    'Aguardo seu retorno para combinarmos os detalhes.',
  ].join('\n')
}

export const contactMessage = 'Olá, Arthur! Vim pelo site e gostaria de falar com você.'

export const buildWhatsAppUrl = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`
