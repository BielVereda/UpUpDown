import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

export default function FileDropzone({ onFile, accept }) {
  const inputRef = useRef(null)
  const [drag, setDrag] = useState(false)

  const pick = () => inputRef.current?.click()

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={pick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && pick()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDrag(false)
        const file = e.dataTransfer.files?.[0]
        if (file) onFile(file)
      }}
      className={`flex flex-col items-center justify-center gap-3 text-center cursor-pointer rounded-xl border-2 border-dashed
        px-6 py-14 transition-all duration-300
        ${drag ? 'border-neon-green bg-neon-green/10 shadow-neon-green' : 'border-neon-cyan/60 hover:border-neon-cyan hover:shadow-neon-cyan'}`}
    >
      <UploadCloud size={44} className={drag ? 'text-neon-green' : 'text-neon-cyan'} />
      <p className="font-pixel text-xs text-ink leading-relaxed">Arraste seu arquivo aqui</p>
      <p className="text-sm text-ink-muted">ou clique para selecionar do seu computador</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
