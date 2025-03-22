export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            title: 'Movie Explorer',
            home: 'Home',
            favorites: 'Favorites',
            watchlist: 'Watchlist',
            login: 'Login with Google',
            logout: 'Logout',
            eng: 'English',
            me: 'Montenegrin',
            genres: 'All Genres',
            years: 'All years',
            loading: 'Loading...',
            loadingGenres: 'Loading genres...',
            errorLoadingGenres: 'Error loading genres...',
            search: {
                search: 'Search movies...',
                title: "Search Results",
                loading: "Loading movies...",
                noResults: "No movies found"
            },
            categories: {
                popular: "Popular Movies",
                trending: "Trending Movies",
                nowPlaying: "Streaming Now",
                upcoming: "Upcoming Movies",
                topRated: "Top Rated Movies"
            },
            categorySection: {
                empty: "No movies available in this category.",
                loadMore: "Load More",
                loading: "Loading..."
            },
            loadMore: 'Load more',
            details: {
                director: "Director",
                cast: "Cast",
                trailer: "Trailer",
                addToFavorites: "Add to Favorites",
                removeFromFavorites: "Remove from Favorites",
                addToWatchlist: "Add to Watchlist",
                removeFromWatchlist: "Remove from Watchlist",
                share: "Share",
                unknown: "Unknown",
            },
            favoritesPage: {
                title: "My Favorite Movies",
                loginNotice: "You must be logged in to view and manage your favorite movies.",
                empty: "No favorite movies added yet.",
                remove: "Remove"
            },
            watchlistPage: {
                title: "My Watchlist",
                loginNotice: "You must be logged in to view and manage your watchlist.",
                empty: "No movies in Watchlist yet.",
                remove: "Remove",
                availableOn: "Available on"
            },
            loginPrompt: {
                title: "Please log in",
                description: "You must be logged in to add movies to your list.",
                login: "Login",
                cancel: "Cancel"
            }
        },
        me: {
            title: 'Movie Explorer',
            home: 'Početna',
            favorites: 'Omiljeni',
            watchlist: 'Gledanje kasnije',
            login: 'Google prijava',
            logout: 'Odjavi se',
            eng: 'Engleski',
            me: 'Crnogorski',
            genres: 'Svi žanrovi',
            years: 'Sve godine',
            loading: 'Učitavanje...',
            loadingGenres: 'Učitavanje žanrova...',
            errorLoadingGenres: 'Greška prilikom učitavanja žanrova...',
            search: {
                search: 'Pretraga filmova...',
                title: "Rezultati pretrage",
                loading: "Učitavanje filmova...",
                noResults: "Nijedan film nije pronađen"
            },
            categories: {
                popular: "Popularni filmovi",
                trending: "Trending filmovi",
                nowPlaying: "Na repertoaru",
                upcoming: "Uskoro stižu",
                topRated: "Najbolje ocijenjeni"
            },
            categorySection: {
                empty: "Nema filmova u ovoj kategoriji.",
                loadMore: "Učitaj još",
                loading: "Učitavanje..."
            },
            loadMore: 'Učitaj još',
            details: {
                director: "Režiser",
                cast: "Glumačka postava",
                trailer: "Trejler",
                addToFavorites: "Dodaj u omiljene",
                removeFromFavorites: "Ukloni iz omiljenih",
                addToWatchlist: "Dodaj na listu za gledanje",
                removeFromWatchlist: "Ukloni sa liste za gledanje",
                share: "Podijeli",
                unknown: "Nepoznato",
            },
            favoritesPage: {
                title: "Moji omiljeni filmovi",
                loginNotice: "Morate biti prijavljeni da biste vidjeli i upravljali omiljenim filmovima.",
                empty: "Još uvijek nema omiljenih filmova.",
                remove: "Ukloni"
            },
            watchlistPage: {
                title: "Lista za gledanje",
                loginNotice: "Morate biti prijavljeni da biste vidjeli i upravljali listom za gledanje.",
                empty: "Lista za gledanje je prazna.",
                remove: "Ukloni",
                availableOn: "Dostupno na"
            },
            loginPrompt: {
                title: "Prijavite se",
                description: "Morate biti prijavljeni da biste dodali filmove na svoju listu.",
                login: "Prijava",
                cancel: "Otkaži"
            }
        }
    }
}))
