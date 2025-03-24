// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default defineEventHandler(async (event: any) => {
    const {page} = getQuery(event);
    const category = event.context.params?.category;

    if (!category) {
        // eslint-disable-next-line no-console
        console.error("Missing category parameter in API request.");
        return {error: "Invalid category request"};
    }

    const categoryMap: Record<string, string> = {
        popular: "movie/popular",
        trending: "trending/movie/week",
        nowPlaying: "movie/now_playing",
        upcoming: "movie/upcoming",
        topRated: "movie/top_rated",
    };

    const tmdbEndpoint = categoryMap[category];

    if (!tmdbEndpoint) {
        // eslint-disable-next-line no-console
        console.error(`Invalid category: ${category}`);
        return {error: `Invalid category: ${category}`};
    }

    try {
        const data = await fetchTMDBData(`/${tmdbEndpoint}?page=${page || 1}`);
        return {
            results: data.results || [],
            total_pages: data.total_pages || 3,
        };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error fetching ${category}:`, error);
        return {error: `Failed to fetch ${category} movies`};
    }


});
