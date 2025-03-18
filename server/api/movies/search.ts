import { fetchTMDBData } from '~/server/utils/tmdb';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const searchQuery = query.q || '';
    const page = query.page || 1;

    if (!searchQuery) return { error: "Search query is required" };

    return await fetchTMDBData('/search/movie', { query: searchQuery, page });
});
