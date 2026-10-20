export default function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer
        ${checked ? 'border-neon-green shadow-neon-green' : 'border-white/30'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-300
          ${checked ? 'translate-x-5 bg-neon-green' : 'bg-ink-muted'}`}
      />
    </button>
  )
}
