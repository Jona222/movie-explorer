export default defineNuxtConfig({
    pages: true,
    components: {
        dirs: [
            {path: '~/components', extensions: ['vue'], lazy: true}
        ]
    },
    devtools: {enabled: true},
    modules: ['@nuxtjs/i18n', '@pinia/nuxt', "@nuxtjs/tailwindcss"],
    runtimeConfig: {
        public: {
            tmdbApiKey: process.env.API_KEY,
            tmdbBaseUrl: process.env.API_BASE_URL,
            firebaseApiKey: process.env.FIREBASE_API_KEY,
            firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
            firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
            firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            firebaseAppId: process.env.FIREBASE_APP_ID,
            firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID
        }
    },

    i18n: {
        vueI18n: './i18n.config.ts',
        experimental: {
            bundle: {
                optimizeTranslationDirective: false
            }
        }
    },
    compatibilityDate: "2025-03-18"
})
