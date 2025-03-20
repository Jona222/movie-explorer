export default defineEventHandler(async (event) => {
    const {page} = getQuery(event);
    const category = event.context.params?.category;

    if (!category) {
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
        console.error(`Error fetching ${category}:`, error);
        return {error: `Failed to fetch ${category} movies`};
    }


});
