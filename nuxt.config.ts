import { resolve } from "path";

export default defineNuxtConfig({
  alias: {
    "@": resolve(__dirname, "/")
  },

  devtools: { enabled: true },
  modules: ['@pinia/nuxt', "@nuxtjs/tailwindcss"],
  css: ['~/assets/main.scss'],
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.NUXT_API_KEY,
      tmdbBaseUrl: process.env.NUXT_API_BASE_URL,
      FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY
    }
  },

  compatibilityDate: "2025-03-18"
})