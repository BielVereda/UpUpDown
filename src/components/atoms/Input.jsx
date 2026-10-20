export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full bg-bg border border-white/15 rounded-md px-3 py-2 text-sm text-ink placeholder:text-ink-muted
        focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all ${className}`}
      {...props}
    />
  )
}
