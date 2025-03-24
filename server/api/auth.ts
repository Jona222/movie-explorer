export default defineEventHandler(async () => {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.NUXT_ACCESS_TOKEN}`,
        },
    };

    try {
        const response = await fetch(`${process.env.NUXT_API_BASE_URL}/authentication`, options);
        const data = await response.json();
        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Failed to fetch data`, error)
    }
});
