import {fetchTMDBData} from '~/server/utils/tmdb';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default defineEventHandler(async (event: any) => {
    const query = getQuery(event);
    const page = query.page || 1;

    return await fetchTMDBData('/movie/popular', {page});
});
