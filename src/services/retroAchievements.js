const MEDIA = 'https://retroachievements.org'

export const CONSOLES = {
  'Mega Drive': 1, N64: 2, SNES: 3,
  'Game Boy Advance': 5, 'PlayStation 1': 12, Arcade: 27,
}

const get = async (endpoint, params = {}) => {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`/ra/${endpoint}?${qs}`)
  if (!res.ok) throw new Error(`RA API ${res.status}`)
  return res.json()
}

export const getGameList = async (system) => {
  const list = await get('API_GetGameList.php', { i: CONSOLES[system], f: 1 })
  return list.slice(0, 30).map((g) => ({
    id: String(g.ID),
    title: g.Title,
    system,
    coverUrl: MEDIA + g.ImageIcon,
    achievements: g.NumAchievements,
  }))
}

export const getGameDetails = async (id, system) => {
  const g = await get('API_GetGameExtended.php', { i: id })
  return {
    id: String(g.ID),
    title: g.Title,
    system,
    genre: g.Genre || 'Ação',
    year: Number(g.Released?.slice(0, 4)) || null,
    developer: g.Developer || '—',
    coverUrl: g.ImageBoxArt ? MEDIA + g.ImageBoxArt : MEDIA + g.ImageIcon,
    screenshots: [g.ImageTitle, g.ImageIngame].filter(Boolean).map((i) => MEDIA + i),
    achievements: g.NumAchievements ?? 0,
    description: g.Description || '',
    downloadUrl: `https://retroachievements.org/game/${g.ID}`,
  }
}
