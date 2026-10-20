export default function FilterSelect({ label, value, onChange, options, allLabel = 'Todos' }) {
  return (
    <label className="block space-y-1.5">
      <span className="font-pixel text-[10px] text-neon-yellow">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-bg border border-white/15 rounded-md px-3 py-2 text-sm text-ink cursor-pointer
          focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan"
      >
        <option value="">{allLabel}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}
