import {fetchTMDBData} from '~/server/utils/tmdb';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const movieId = query.movieId;

    if (!movieId) return {error: "Movie ID is required"};

    return await fetchTMDBData(`/movie/${movieId}/watch/providers`);
});
