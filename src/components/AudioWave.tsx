import type { CSSProperties } from 'react'

export default function AudioWave({ active = false }: { active?: boolean }) {
  return (
    <div className={`audio-wave ${active ? 'is-active' : ''}`} aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => (
        <i key={i} style={{ '--i': i, '--h': i % 5 } as CSSProperties} />
      ))}
    </div>
  )
}
