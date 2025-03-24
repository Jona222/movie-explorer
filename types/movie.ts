export interface Genre {
    id: number
    name: string
}

export interface CreditPerson {
    id: number
    name: string
    job?: string
    profile_path?: string
}

export interface Video {
    key: string
    name: string
    site: string
    type: string
}

export interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    genres: Genre[]
    credits: {
        cast: CreditPerson[]
        crew: CreditPerson[]
    }
    videos: {
        results: Video[]
    }
}

