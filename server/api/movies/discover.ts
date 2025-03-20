import {fetchTMDBData} from '~/server/utils/tmdb';

export default defineEventHandler(async (event) => {
    const {genre, year, page = 1, sort_by = 'popularity.desc'} = getQuery(event);

    let url = `/discover/movie?page=${page}&sort_by=${encodeURIComponent(sort_by)}`;

    if (genre) {
        url += `&with_genres=${encodeURIComponent(genre)}`;
    }

    if (year) {
        url += `&primary_release_year=${year}`;
    }

    try {
        const data = await fetchTMDBData(url);
        return {
            results: data.results || [],
            total_pages: data.total_pages || 1,
        };
    } catch (error) {
        console.error("Error fetching discovered movies:", error);
        return {error: "Failed to fetch movies"};
    }
});
