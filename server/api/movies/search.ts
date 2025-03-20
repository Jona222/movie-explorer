export default defineEventHandler(async (event) => {
    const {q, page = 1} = getQuery(event);

    if (!q) {
        return {results: [], total_pages: 1};
    }

    let url = `/search/movie?query=${encodeURIComponent(q)}&page=${page}`;
    try {
        const data = await fetchTMDBData(url);
        return {
            results: data.results || [],
            total_pages: data.total_pages || 1,
        };
    } catch (error) {
        console.error("Error fetching search results:", error);
        return {error: "Failed to fetch movies"};
    }
});
