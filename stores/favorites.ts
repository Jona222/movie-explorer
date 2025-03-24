import {defineStore} from 'pinia';
import type { Movie } from '~/types/movie'

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: [] as Movie[],
    }),
    getters: {
        isFavorite: (state) => (id: number) => state.favorites.some((movie) => movie.id === id),
    },
    actions: {
        addFavorite(movie: Movie) {
            if (!this.isFavorite(movie.id)) {
                this.favorites.push(movie);
            }
        },
        removeFavorite(id: number) {
            this.favorites = this.favorites.filter((movie) => movie.id !== id);
        },
    },
    persist: true,
});
