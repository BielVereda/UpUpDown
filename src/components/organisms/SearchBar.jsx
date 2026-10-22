import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Search, X, Gamepad2 } from 'lucide-react'
import { gamesData } from '@/data/gamesData'
import { useAppStore } from '@/store/useAppStore'
import { searchGames } from './searchGames'

// Máximo de jogos mostrados na lista (a lista rola se passar da altura)
const MAX_RESULTS = 10

/** Título com as letras pesquisadas em destaque */
function HighlightedTitle({ title, start, end }) {
    return (
        <>
            {title.slice(0, start)}
            <span className="font-bold text-[#00F0FF]">{title.slice(start, end)}</span>
            {title.slice(end)}
        </>
    )
}

/** Capa do jogo (com ícone de reserva se não houver imagem ou ela falhar) */
function Cover({ game }) {
    const [failed, setFailed] = useState(false)

    return (
        <div className="flex h-14 w-10 shrink-0 items-center justify-center overflow-hidden rounded bg-black/40">
            {game.coverUrl && !failed ? (
                <img
                    src={game.coverUrl}
                    alt=""
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-cover"
                />
            ) : (
                <Gamepad2 size={18} className="text-ink-muted" aria-hidden="true" />
            )}
        </div>
    )
}

/**
 * Barra de pesquisa com lista de jogos (capa + título + gênero/ano).
 *
 * Props (mesma API da SearchBar antiga, então é só trocar o import):
 *   value / onChange  → texto controlado de fora (ex.: store.search). Opcional.
 *   onSubmit(query)   → chamado ao apertar Enter sem escolher um item com as setas
 *                       (ex.: ir para /catalogo filtrado). Opcional.
 *   onSelect(game)    → chamado depois de abrir um jogo da lista. Opcional.
 */
export default function SearchBar({
    value,
    onChange,
    onSubmit,
    onSelect,
    className = '',
    placeholder = 'Buscar jogo...'
}) {
    // ⚠️ AJUSTE AQUI se a ação do seu store tiver outro nome:
    // é a função que define `selectedGame` e faz o GameModal abrir.
    const openGame = useAppStore((s) => s.openGame)

    const listId = useId()
    const rootRef = useRef(null)
    const listRef = useRef(null)

    // Texto: controlado de fora (value/onChange) ou interno
    const isControlled = value !== undefined
    const [innerQuery, setInnerQuery] = useState('')
    const query = isControlled ? value : innerQuery

    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(0)
    const [keyboardNav, setKeyboardNav] = useState(false) // usou as setas?

    const updateQuery = (next) => {
        if (!isControlled) setInnerQuery(next)
        onChange?.(next)
    }

    const results = useMemo(() => searchGames(query, gamesData, MAX_RESULTS), [query])
    const hasQuery = query.trim().length > 0
    const showList = open && hasQuery
    const activeIndex = Math.max(0, Math.min(active, results.length - 1))

    // Fecha a lista ao clicar fora
    useEffect(() => {
        const handleOutside = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handleOutside)
        return () => document.removeEventListener('mousedown', handleOutside)
    }, [])

    // Mantém o item ativo visível ao navegar com as setas
    useEffect(() => {
        if (!showList) return
        listRef.current
            ?.querySelector('[data-active="true"]')
            ?.scrollIntoView({ block: 'nearest' })
    }, [activeIndex, showList])

    const select = (game) => {
        setOpen(false)
        updateQuery('')
        if (typeof openGame === 'function') {
            openGame(game)
        } else {
            console.error('[SearchBar] useAppStore não tem a ação "openGame" — ajuste o nome em SearchBar.jsx')
        }
        onSelect?.(game)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setOpen(false)
            return
        }

        if (e.key === 'Enter') {
            e.preventDefault()
            const hasResults = showList && results.length > 0
            // Item escolhido com as setas (ou sem onSubmit) → abre o jogo
            if (hasResults && (keyboardNav || !onSubmit)) {
                select(results[activeIndex].game)
            } else if (onSubmit && hasQuery) {
                // Senão → "buscar" (ex.: ir para o catálogo filtrado)
                setOpen(false)
                onSubmit(query)
            }
            return
        }

        if (!results.length) return

        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
            setKeyboardNav(true)
            setActive((activeIndex + 1) % results.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setOpen(true)
            setKeyboardNav(true)
            setActive((activeIndex - 1 + results.length) % results.length)
        }
    }

    // A lista abre ancorada à direita (a barra fica no canto direito da Navbar)
    const dropdownPosition = 'absolute right-0 top-full z-50 mt-2 w-[min(24rem,calc(100vw-2rem))]'

    return (
        <div ref={rootRef} className={`relative ${className}`}>
            {/* Campo de busca */}
            <div className="flex items-center gap-2 rounded-md border border-neon-cyan/50 bg-bg-soft px-3 py-2 transition-colors focus-within:border-neon-cyan focus-within:shadow-neon-cyan">
                <Search size={16} className="shrink-0 text-ink-muted" aria-hidden="true" />
                <input
                    type="text"
                    role="combobox"
                    aria-expanded={showList}
                    aria-controls={listId}
                    aria-autocomplete="list"
                    aria-activedescendant={showList && results.length ? `${listId}-${activeIndex}` : undefined}
                    autoComplete="off"
                    spellCheck={false}
                    value={query}
                    placeholder={placeholder}
                    onChange={(e) => {
                        updateQuery(e.target.value)
                        setActive(0)
                        setKeyboardNav(false)
                        setOpen(true)
                    }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={handleKeyDown}
                    className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => { updateQuery(''); setOpen(false) }}
                        aria-label="Limpar busca"
                        className="shrink-0 text-ink-muted transition-colors hover:text-neon-magenta"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {/* Lista de resultados */}
            {showList && (
                results.length === 0 ? (
                    <div
                        role="status"
                        className={`${dropdownPosition} rounded-lg border border-neon-cyan/60 bg-bg-soft px-4 py-3 text-sm text-ink-muted shadow-neon-cyan`}
                    >
                        Nenhum jogo encontrado
                    </div>
                ) : (
                    <ul
                        id={listId}
                        ref={listRef}
                        role="listbox"
                        className={`${dropdownPosition} max-h-96 overflow-y-auto rounded-lg border border-neon-cyan/60 bg-bg-soft py-1 shadow-neon-cyan`}
                    >
                        {results.map(({ game, start, end }, i) => (
                            <li
                                key={game.id}
                                id={`${listId}-${i}`}
                                role="option"
                                aria-selected={i === activeIndex}
                                data-active={i === activeIndex}
                                onMouseDown={(e) => e.preventDefault()} // mantém o foco no campo
                                onClick={() => select(game)}
                                onMouseEnter={() => setActive(i)}
                                className={`flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors ${i === activeIndex ? 'bg-neon-cyan/10' : ''
                                    }`}
                            >
                                <Cover game={game} />
                                <div className="min-w-0">
                                    <p className="truncate text-sm text-ink">
                                        <HighlightedTitle title={game.title} start={start} end={end} />
                                    </p>
                                    {(game.genre || game.year) && (
                                        <p className="truncate text-[11px] text-ink-muted">
                                            {[game.genre, game.year].filter(Boolean).join(' · ')}
                                        </p>
                                    )}
                                    {game.system && (
                                        <p className="truncate text-[10px] text-ink-muted/70">{game.system}</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            )}
        </div>
    )
}