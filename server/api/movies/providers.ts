import {fetchTMDBData} from '~/server/utils/tmdb';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default defineEventHandler(async (event: any) => {
    const query = getQuery(event);
    const movieId = query.movieId;

    if (!movieId) return {error: "Tmdb ID is required"};

    return await fetchTMDBData(`/movie/${movieId}/watch/providers`);
});
