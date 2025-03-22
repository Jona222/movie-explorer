<template>
  <div class="container mx-auto px-4 py-10 overflow-hidden">
    <h1 class="flex items-center justify-center gap-2 text-3xl font-bold text-center">
      <Icon name="watchlist" />
      My Watchlist
    </h1>

    <div v-if="!user" class="text-center text-gray-400 mt-6 text-lg">
      <p class="flex items-center justify-center gap-2">
        <Icon name="lock" />
        You must be logged in to view and manage your watchlist.
      </p>
    </div>

    <div v-else>
      <div v-if="watchlistStore.watchlist.length === 0" class="text-center text-gray-400 mt-6">
        No movies in Watchlist yet.
      </div>

      <div class="flex flex-col gap-6 mt-6">
        <div
            v-for="movie in watchlistStore.watchlist"
            :key="movie.id"
            class="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 transition-all duration-300 ease-in-out"
            :class="removingMovie === movie.id ? 'translate-x-20 opacity-0' : ''"
        >
          <NuxtLink :to="`/movie/${movie.id}`" class="w-32 h-48 flex-shrink-0">
            <img
                :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                :alt="movie.title"
                class="w-full h-full object-cover rounded-lg"
            />
          </NuxtLink>

          <div class="flex-1 px-6">
            <h2 class="font-bold text-xl text-white">{{ movie.title }}</h2>
            <p class="text-gray-400 text-sm mt-1 line-clamp-2">{{ movie.overview }}</p>
            <p class="text-yellow-400 mt-2">⭐ {{ movie.vote_average.toFixed(1) }}</p>

            <div v-if="watchProviders[movie.id]" class="mt-2 flex items-center gap-2">
              <span class="text-gray-300">Available on:</span>
              <img
                  v-for="provider in watchProviders[movie.id]"
                  :key="provider.provider_id"
                  :src="`https://image.tmdb.org/t/p/w45/${provider.logo_path}`"
                  :alt="provider.provider_name"
                  class="w-8 h-8 rounded-md"
              />
            </div>
          </div>

          <button
              @click="removeFromWatchlist(movie.id)"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, nextTick, onMounted} from 'vue';
import {useWatchlistStore} from '~/stores/watchlist';
import {useHead} from '#imports';
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()

const watchlistStore = useWatchlistStore();
const removingMovie = ref<number | null>(null);
const watchProviders = ref<Record<number, any>>({});

const fetchWatchProviders = async () => {
  for (const movie of watchlistStore.watchlist) {
    try {
      const response = await $fetch(`/api/movies/providers?movieId=${movie.id}`);

      const firstCountryWithProviders = Object.values(response?.results || {}).find(
          (country: any) => country.flatrate || country.buy || country.rent
      );

      watchProviders.value[movie.id] = firstCountryWithProviders?.flatrate ||
          firstCountryWithProviders?.buy ||
          firstCountryWithProviders?.rent || null;
    } catch (error) {
      console.error(`Error fetching providers for movie ${movie.id}:`, error);
      watchProviders.value[movie.id] = null;
    }
  }
};
useHead({
  title: "Watchlist - Movie Explorer",
  meta: [
    {name: "description", content: "Your saved movies and TV shows in Watchlist."},
    {property: "og:title", content: "Watchlist - Movie Explorer"},
    {property: "og:description", content: "Your saved movies and TV shows in Watchlist."},
    {property: "og:type", content: "website"}
  ]
});

const removeFromWatchlist = (movieId: number) => {
  removingMovie.value = movieId;

  setTimeout(() => {
    watchlistStore.removeFromWatchlist(movieId);
    removingMovie.value = null;
    nextTick();
  }, 300);
};


onMounted(() => {
  fetchWatchProviders();
});
</script>


