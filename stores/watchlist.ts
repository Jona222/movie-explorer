import {defineStore} from 'pinia';
import type { Movie } from '~/types/movie'

export const useWatchlistStore = defineStore('watchlist', {
    state: () => ({
        watchlist: [] as Movie[],
    }),
    getters: {
        isInWatchlist: (state) => (id: number) => state.watchlist.some((movie) => movie.id === id),
    },
    actions: {
        addToWatchlist({movie}: { movie: Movie }) {
            if (!this.isInWatchlist(movie.id)) {
                this.watchlist.push(movie);
            }
        },
        removeFromWatchlist(id: number) {
            this.watchlist = this.watchlist.filter((movie) => movie.id !== id);
        },
    },
    persist: true,
});
