<template>
  <div class="container mx-auto px-4 py-10 overflow-hidden">
    <h1 class="flex items-center justify-center gap-2 text-3xl font-bold text-center">
      <Icon name="favorites"/>
      {{ t('favoritesPage.title') }}
    </h1>

    <div v-if="!user" class="text-center text-gray-400 mt-6 text-lg">
      <p class="flex items-center justify-center gap-2">
        <Icon name="lock"/>
        {{ t('favoritesPage.loginNotice') }}
      </p>
    </div>

    <div v-else>
      <div v-if="favoritesStore.favorites.length === 0" class="text-center text-gray-400 mt-6">
        {{ t('favoritesPage.empty') }}
      </div>

      <div class="flex flex-col gap-6 mt-6">
        <div
            v-for="movie in favoritesStore.favorites"
            :key="movie.id"
            class="flex items-center bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 transition-all duration-300 ease-in-out"
            :class="removingMovie === movie.id ? 'translate-x-20 opacity-0' : ''"
        >
          <NuxtLink :to="`/movie/${movie.id}`" class="w-32 h-48 flex-shrink-0">
            <img
                :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
                :alt="movie.title"
                class="w-full h-full object-cover rounded-lg"
            >
          </NuxtLink>

          <div class="flex-1 px-6">
            <h2 class="font-bold text-xl text-white">{{ movie.title }}</h2>
            <p class="text-gray-400 text-sm mt-1 line-clamp-2">{{ movie.overview }}</p>
            <p class="text-yellow-400 mt-2">⭐ {{ movie.vote_average.toFixed(1) }}</p>
          </div>

          <button
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              @click="removeFromFavorites(movie.id)"
          >
            {{ t('favoritesPage.remove') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, nextTick} from 'vue';
import {useFavoritesStore} from '~/stores/favorites';
import {useHead} from 'nuxt/app';
import {useAuth} from '~/composables/useAuth'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const {user} = useAuth()
const favoritesStore = useFavoritesStore();
const removingMovie = ref<number | null>(null);
useHead({
  title: "Favorites - Movie Explorer",
  meta: [
    {name: "description", content: "Your saved movies and TV shows in Favorites."},
    {property: "og:title", content: "Favorites - Movie Explorer"},
    {property: "og:description", content: "Your saved movies and TV shows in Favorites."},
    {property: "og:type", content: "website"}
  ]
});
const removeFromFavorites = (movieId: number) => {
  removingMovie.value = movieId;

  setTimeout(() => {
    favoritesStore.removeFavorite(movieId);
    removingMovie.value = null;
    nextTick();
  }, 300);
};
</script>
