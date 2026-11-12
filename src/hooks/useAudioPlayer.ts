import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Controla a reprodução dos megas garantindo UM áudio por vez.
 * Se o arquivo não existir ou falhar, o id entra em `failedIds`
 * e a interface mostra "Áudio indisponível" sem quebrar.
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

  const markFailed = useCallback((id: string) => {
    setFailedIds((current) => (current.includes(id) ? current : [...current, id]))
    setPlayingId((current) => (current === id ? null : current))
  }, [])

  const start = useCallback(
    (audio: HTMLAudioElement, id: string) => {
      setPlayingId(id)
      audio.play().catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        markFailed(id)
      })
    },
    [markFailed],
  )

  const toggle = useCallback(
    (id: string, src: string) => {
      const current = audioRef.current
      if (current && currentIdRef.current === id) {
        if (current.paused) start(current, id)
        else {
          current.pause()
          setPlayingId(null)
        }
        return
      }

      current?.pause()
      const audio = new Audio(src)
      audio.preload = 'none'
      audio.addEventListener('ended', () => setPlayingId((c) => (c === id ? null : c)))
      audio.addEventListener('error', () => markFailed(id))
      audioRef.current = audio
      currentIdRef.current = id
      start(audio, id)
    },
    [markFailed, start],
  )

  return { playingId, failedIds, toggle }
}
