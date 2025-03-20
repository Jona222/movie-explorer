import {fetchTMDBData} from '~/server/utils/tmdb';

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const page = query.page || 1;

    return await fetchTMDBData('/movie/popular', {page});
});
