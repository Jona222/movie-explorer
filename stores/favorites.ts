import {defineStore} from 'pinia';

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: [] as any[],
    }),
    getters: {
        isFavorite: (state) => (id: number) => state.favorites.some((movie) => movie.id === id),
    },
    actions: {
        addFavorite(movie: any) {
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
