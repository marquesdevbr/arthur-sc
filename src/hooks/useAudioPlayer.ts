import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Controla a reprodução dos megas garantindo UM áudio por vez.
 *
 * - Se o arquivo não carregar (404, formato inválido, rede), o id entra em
 *   `failedIds` e o card mostra "Áudio indisponível". Um novo clique tenta de novo.
 * - Se o navegador apenas bloquear a reprodução (NotAllowedError), não é falha
 *   do arquivo: o botão volta ao normal.
 * - O motivo exato aparece no console do navegador (F12) para facilitar o diagnóstico.
 */
export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const currentIdRef = useRef<string | null>(null)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [failedIds, setFailedIds] = useState<string[]>([])

  useEffect(
    () => () => {
      audioRef.current?.pause()
      audioRef.current = null
    },
    [],
  )

  const markFailed = useCallback((id: string, src: string, reason: string) => {
    console.warn(`[Arthur SC] Não foi possível tocar o áudio ${id} (${src}): ${reason}`)
    setFailedIds((current) => (current.includes(id) ? current : [...current, id]))
    setPlayingId((current) => (current === id ? null : current))
    if (currentIdRef.current === id) {
      audioRef.current?.pause()
      audioRef.current = null
      currentIdRef.current = null
    }
  }, [])

  const start = useCallback(
    (audio: HTMLAudioElement, id: string, src: string) => {
      setPlayingId(id)
      audio.play().catch((error: unknown) => {
        const name = error instanceof DOMException ? error.name : 'erro desconhecido'
        if (name === 'AbortError') return
        if (name === 'NotAllowedError') {
          console.warn(`[Arthur SC] O navegador bloqueou a reprodução do áudio ${id} (${src}).`)
          setPlayingId((current) => (current === id ? null : current))
          return
        }
        markFailed(id, src, name)
      })
    },
    [markFailed],
  )

  const toggle = useCallback(
    (id: string, src: string) => {
      const current = audioRef.current
      if (current && currentIdRef.current === id) {
        if (current.paused) start(current, id, src)
        else {
          current.pause()
          setPlayingId(null)
        }
        return
      }

      current?.pause()
      setFailedIds((list) => list.filter((item) => item !== id))
      const audio = new Audio(src)
      audio.preload = 'none'
      audio.addEventListener('ended', () => setPlayingId((c) => (c === id ? null : c)))
      audio.addEventListener('error', () => markFailed(id, src, `MediaError ${audio.error?.code ?? '?'}`))
      audioRef.current = audio
      currentIdRef.current = id
      start(audio, id, src)
    },
    [markFailed, start],
  )

  return { playingId, failedIds, toggle }
}
