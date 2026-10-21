import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({
      // busca global
      search: '',
      setSearch: (search) => set({ search }),

      // favoritos
      favorites: [],
      toggleFavorite: (id) =>
        set({
          favorites: get().favorites.includes(id)
            ? get().favorites.filter((f) => f !== id)
            : [...get().favorites, id],
        }),

      // jogo aberto no modal
      selectedGame: null,
      openGame: (game) => set({ selectedGame: game }),
      closeGame: () => set({ selectedGame: null }),
    }),
    {
      name: 'uud-store',
      partialize: (s) => ({ favorites: s.favorites }),
    }
  )
)
