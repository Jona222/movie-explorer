export default defineEventHandler(async () => {
    try {
        const data = await fetchTMDBData('/genre/movie/list');
        if (!data.genres) {
            // eslint-disable-next-line no-console
            console.error("No genres found in API response.");
            return {genres: []};
        }

        return {genres: data.genres};
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching genres:", error);
        return {error: "Failed to fetch genres"};
    }
});
