export default defineEventHandler(async () => {
    try {
        const data = await fetchTMDBData('/genre/movie/list');
        if (!data.genres) {
            console.error("No genres found in API response.");
            return {genres: []};
        }

        return {genres: data.genres};
    } catch (error) {
        console.error("Error fetching genres:", error);
        return {error: "Failed to fetch genres"};
    }
});
