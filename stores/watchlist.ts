import {defineStore} from 'pinia';

export const useWatchlistStore = defineStore('watchlist', {
    state: () => ({
        watchlist: [] as any[],
    }),
    getters: {
        isInWatchlist: (state) => (id: number) => state.watchlist.some((movie) => movie.id === id),
    },
    actions: {
        addToWatchlist(movie: any) {
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
