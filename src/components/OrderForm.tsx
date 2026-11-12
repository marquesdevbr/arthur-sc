import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowIcon } from './Icons'
import { formatPrice, packs, siteConfig } from '../config/site'
import {
  buildOrderMessage,
  buildWhatsAppUrl,
  formatPhone,
  isValidPhone,
  isWhatsAppConfigured,
} from '../lib/whatsapp'

type Props = {
  selectedPack: string
  onPackChange: (id: string) => void
}

type Errors = { name?: string; phone?: string }

export default function OrderForm({ selectedPack, onPackChange }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const ready = isWhatsAppConfigured(siteConfig.whatsappNumber)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!ready) return

    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Informe seu nome.'
    if (!isValidPhone(phone)) next.phone = 'Informe um WhatsApp válido, com DDD.'
    setErrors(next)
    if (next.name || next.phone) {
      setWhatsappUrl(null)
      ;(next.name ? nameRef : phoneRef).current?.focus()
      return
    }

    const pack = packs.find((item) => item.id === selectedPack)
    if (!pack) return
    const url = buildWhatsAppUrl(siteConfig.whatsappNumber, buildOrderMessage({ pack, name, phone }))
    setWhatsappUrl(url)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <form className="order-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="pack-selector">
        <legend>01 / Escolha o pacote</legend>
        <div>
          {packs.map((pack) => (
            <label className={selectedPack === pack.id ? 'is-selected' : ''} key={pack.id}>
              <input
                type="radio"
                name="pack"
                value={pack.id}
                checked={selectedPack === pack.id}
                onChange={() => onPackChange(pack.id)}
              />
              <span>
                {pack.amount} {pack.label}
              </span>
              <strong>{formatPrice(pack.price)}</strong>
            </label>
          ))}
        </div>
      </fieldset>

      <label>
        <span>02 / Seu nome</span>
        <input
          ref={nameRef}
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          value={name}
          maxLength={80}
          disabled={!ready}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'erro-nome' : undefined}
          onChange={(event) => setName(event.target.value)}
        />
        {errors.name && (
          <small id="erro-nome" className="field-error" role="alert">
            {errors.name}
          </small>
        )}
      </label>

      <label>
        <span>03 / Seu WhatsApp</span>
        <input
          ref={phoneRef}
          type="tel"
          name="phone"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(00) 00000-0000"
          value={phone}
          disabled={!ready}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'erro-whatsapp' : undefined}
          onChange={(event) => setPhone(formatPhone(event.target.value))}
        />
        {errors.phone && (
          <small id="erro-whatsapp" className="field-error" role="alert">
            {errors.phone}
          </small>
        )}
      </label>

      <div className="form-footer">
        <span role="status">
          {!ready
            ? 'Encomendas pelo WhatsApp disponíveis em breve.'
            : whatsappUrl
              ? (
                  <>
                    Mensagem pronta. Não abriu?{' '}
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      Abrir WhatsApp
                    </a>
                  </>
                )
              : 'Você revisa a mensagem e envia pelo seu próprio WhatsApp.'}
        </span>
        <button type="submit" disabled={!ready}>
          Preparar mensagem <ArrowIcon />
        </button>
      </div>
    </form>
  )
}
