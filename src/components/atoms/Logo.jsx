import { Link } from 'react-router-dom'

export const LOGO_SRC = '/images/icons/logotipo.png'

export default function Logo({ size = 'md' }) {
  const h = size === 'lg' ? 'h-48 md:h-72' : 'h-12 md:h-14'
  return (
    <Link to="/" aria-label="Up, Up & Down! — início" className="shrink-0">
      <img
        src={LOGO_SRC}
        alt="Up, Up & Down!"
        className={`${h} w-auto object-contain drop-shadow-[0_0_10px_rgba(255,0,234,.6)]`}
      />
    </Link>
  )
}
