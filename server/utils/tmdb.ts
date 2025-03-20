export const getTMDBConfig = () => {
    const config = useRuntimeConfig();
    return {
        BASE_URL: config.public.tmdbBaseUrl,
        API_KEY: config.public.tmdbApiKey,
    };
};

export const fetchTMDBData = async (endpoint: string, params = {}) => {
    const {BASE_URL, API_KEY} = getTMDBConfig();

    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append("api_key", API_KEY);
    url.searchParams.append("language", "en-US");

    Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value as string));

    try {
        const response = await fetch(url.toString());
        return await response.json();
    } catch (error) {
        console.error("Error fetching data from TMDB:", error);
        return {error: "Failed to fetch data"};
    }
};
