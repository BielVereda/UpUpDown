/**
 * Busca de jogos por título.
 *
 * Ordem dos resultados:
 *   1º  títulos que COMEÇAM com o texto digitado
 *   2º  títulos em que alguma palavra (depois da primeira) começa com o texto
 *   3º  títulos que CONTÊM o texto em qualquer outra parte
 * Dentro de cada grupo: mais popular primeiro, depois ordem alfabética.
 *
 * A busca ignora maiúsculas/minúsculas, acentos e pontuação:
 * "pokemon" encontra "Pokémon", "mario luigi" encontra "Mario & Luigi".
 */

/**
 * Normaliza o texto (minúsculas, sem acento, pontuação vira espaço, espaços colapsados)
 * e devolve também `map`, que liga cada caractere normalizado ao índice no texto original
 * (usado para destacar as letras certas no título).
 */
function foldWithMap(str) {
    const chars = String(str ?? '').split('')
    let text = ''
    const map = []

    for (let i = 0; i < chars.length; i++) {
        const base = chars[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        const ch = /^[\p{L}\p{N}]$/u.test(base) ? base : ' '
        // ignora espaços no começo e espaços repetidos
        if (ch === ' ' && (text === '' || text.endsWith(' '))) continue
        text += ch
        map.push(i)
    }

    // remove espaço sobrando no final
    if (text.endsWith(' ')) {
        text = text.slice(0, -1)
        map.pop()
    }

    return { text, map }
}

// Normaliza os títulos uma única vez por lista de jogos
const indexCache = new WeakMap()

function getIndex(games) {
    let index = indexCache.get(games)
    if (!index) {
        index = games.map((game) => ({ game, ...foldWithMap(game.title) }))
        indexCache.set(games, index)
    }
    return index
}

/**
 * @param {string} query  texto digitado
 * @param {Array}  games  lista de jogos (precisa de `title`; usa `popularity` se existir)
 * @param {number} limit  máximo de resultados
 * @returns {Array<{ game, tier, start, end }>}  `start`/`end` = trecho do título original a destacar
 */
export function searchGames(query, games, limit = 10) {
    const { text: q } = foldWithMap(query)
    if (!q) return []

    const results = []

    for (const { game, text, map } of getIndex(games)) {
        const firstPos = text.indexOf(q)
        if (firstPos === -1) continue

        // procura a primeira ocorrência que começa uma palavra
        let wordPos = -1
        for (let p = firstPos; p !== -1; p = text.indexOf(q, p + 1)) {
            if (p === 0 || text[p - 1] === ' ') {
                wordPos = p
                break
            }
        }

        let tier
        let pos
        if (wordPos === 0) {
            tier = 0
            pos = 0
        } else if (wordPos > 0) {
            tier = 1
            pos = wordPos
        } else {
            tier = 2
            pos = firstPos
        }

        results.push({
            game,
            tier,
            pos,
            start: map[pos],
            end: map[pos + q.length - 1] + 1
        })
    }

    results.sort(
        (a, b) =>
            a.tier - b.tier ||
            (b.game.popularity ?? 0) - (a.game.popularity ?? 0) ||
            a.game.title.localeCompare(b.game.title)
    )

    return results.slice(0, limit)
}