import type { Mega } from '../config/site'
import AudioWave from './AudioWave'
import { ArrowIcon, PlayIcon } from './Icons'

type Props = {
  mega: Mega
  index: number
  isPlaying: boolean
  isFailed: boolean
  onToggle: (id: string, src: string) => void
}

export default function MegaCard({ mega, index, isPlaying, isFailed, onToggle }: Props) {
  const label = mega.title ?? `Mega ${mega.id}`
  const canPlay = Boolean(mega.audio) && !isFailed
  const status = isFailed
    ? 'Áudio indisponível'
    : !mega.audio
      ? 'Prévia em breve'
      : isPlaying
        ? 'Tocando agora'
        : 'Prévia de áudio'

  return (
    <article className={`mega-card accent-${index % 3}`}>
      <div className="cover-art">
        <span className="cover-index">AS/{mega.id}</span>
        {mega.cover ? (
          <img src={mega.cover} alt={`Capa de ${label}`} loading="lazy" />
        ) : (
          <>
            <div className="cover-ring" />
            <strong>
              ARTHUR
              <br />
              SC
            </strong>
          </>
        )}
      </div>
      <div className="track-meta">
        <div>
          <span>{label}</span>
          <small>{mega.title ? `Mega ${mega.id}` : 'Título em breve'}</small>
        </div>
        <button
          type="button"
          className="play-button"
          disabled={!canPlay}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? `Pausar ${label}` : `Ouvir ${label}`}
          onClick={() => mega.audio && onToggle(mega.id, mega.audio)}
        >
          <PlayIcon paused={isPlaying} />
        </button>
      </div>
      <AudioWave active={isPlaying} />
      <div className="track-links">
        <span role="status">{status}</span>
        {mega.youtube ? (
          <a className="youtube-link" href={mega.youtube} target="_blank" rel="noopener noreferrer">
            Ver no YouTube <ArrowIcon />
          </a>
        ) : (
          <span className="youtube-link is-pending">YouTube em breve</span>
        )}
      </div>
    </article>
  )
}
