<template>
  <div>
    <div v-if="movie" class="relative bg-gray-900 text-white min-h-screen">
      <div
          class="absolute inset-0 bg-cover bg-center opacity-30"
          :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})` }"/>

      <div class="container mx-auto px-4 relative z-10 py-10">
        <div class="flex flex-col md:flex-row gap-10">
          <img
              :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
              :alt="movie.title"
              class="w-full md:w-1/3 rounded-lg shadow-lg"
          >
          <div class="flex-1">
            <h1 class="text-4xl font-bold">{{ movie.title }}</h1>
            <p class="text-gray-400 text-lg mt-2">{{ movie.overview }}</p>

            <div class="flex gap-4 mt-4">
            <span class="bg-yellow-800 text-black px-3 py-1 rounded-lg dark:text-white">⭐ {{
                movie.vote_average?.toFixed(1)
              }}</span>
              <span
                  v-for="genre in movie.genres" :key="genre.id"
                  class="text-black bg-gray-400 dark:text-white dark:bg-gray-800 px-3 py-1 rounded-lg">
              {{ genre.name }}
            </span>
            </div>

            <div class="mt-6">
              <h2 class="text-xl font-bold">{{ t('details.director') }}: {{ director }}</h2>
              <h2 class="text-xl font-bold mt-2"> {{ t('details.cast') }}:</h2>
              <ul class="flex gap-4 mt-2">
                <li v-for="actor in cast" :key="actor.id" class="text-sm flex flex-col items-center justify-center ">
                  <img
                      v-if="actor.profile_path"
                      :src="`https://image.tmdb.org/t/p/w185/${actor.profile_path}`"
                      :alt="actor.name"
                      class="w-13 h-16 rounded-full"
                  >
                  <p>{{ actor.name }}</p>
                </li>
              </ul>
            </div>

            <div v-if="trailerKey" class="mt-6">
              <h2 class="text-xl font-bold"> {{ t('details.trailer') }}:</h2>
              <iframe
                  class="w-full md:w-2/3 h-64 rounded-lg shadow-lg mt-2"
                  :src="`https://www.youtube.com/embed/${trailerKey}`"
                  frameborder="0"
                  allowfullscreen
              />
            </div>

            <div class="mt-6 flex gap-4">
              <button
                  class="flex items-center gap-2 px-4 py-2 rounded-lg"
                  :class="isFavorite ? 'text-black bg-red-300 dark:bg-red-500 dark:text-white' : 'bg-gray-700'"
                  @click="toggleFavorite"
              >
                <Icon name="favorites"/>
                {{ isFavorite ? t('details.removeFromFavorites') : t('details.addToFavorites') }}
              </button>
              <button
                  class="flex items-center gap-2 px-4 py-2 rounded-lg"
                  :class="isInWatchlist ? 'text-black bg-blue-300 dark:bg-blue-500 dark:text-white' : 'bg-gray-700'"
                  @click="toggleWatchlist"
              >
                <Icon name="bookmark"/>
                {{ isInWatchlist ? t('details.removeFromWatchlist') : t('details.addToWatchlist') }}
              </button>
              <button
                  class="text-black bg-green-300 dark:bg-green-500 dark:text-white px-4 py-2 rounded-lg"
                  @click="shareMovie">🔗
                {{ t('details.share') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <LoginPrompt v-if="showLoginPrompt" @close="showLoginPrompt = false"/>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useRoute} from 'vue-router';
import {useAsyncData, useHead} from 'nuxt/app';
import {useFavoritesStore} from '~/stores/favorites';
import {useWatchlistStore} from '~/stores/watchlist';
import {useAuth} from '~/composables/useAuth'
import LoginPrompt from '~/components/LoginPrompt.vue'
import {useI18n} from 'vue-i18n'

definePageMeta({
  layout: 'default',
  lazy: true,
});

const {t} = useI18n()

const showLoginPrompt = ref(false)
const {user} = useAuth()
const route = useRoute();
const favoritesStore = useFavoritesStore();
const watchlistStore = useWatchlistStore();

const {data: movie} = await useAsyncData(`movie-${route.params.id}`, () =>
    $fetch(`/api/movies/details?movieId=${route.params.id}`)
);

const cast = computed(() => movie.value?.credits?.cast.slice(0, 5) || []);
const director = computed(() => movie.value?.credits?.crew.find((p) => p.job === 'Director')?.name || 'Unknown');
const trailerKey = computed(() => movie.value?.videos?.results.find((v) => v.type === 'Trailer')?.key || '');
const isFavorite = computed(() => movie.value && favoritesStore.isFavorite(movie.value.id));
const isInWatchlist = computed(() => movie.value && watchlistStore.isInWatchlist(movie.value.id));

useHead({
  title: computed(() => movie.value ? `${movie.value.title} - Movie Explorer` : 'Loading...'),
  meta: [
    {name: 'description', content: computed(() => movie.value?.overview || 'Tmdb details page')},
    {property: 'og:title', content: computed(() => movie.value?.title || 'Movie Explorer')},
    {property: 'og:description', content: computed(() => movie.value?.overview || 'Tmdb details page')},
    {property: 'og:image', content: computed(() => `https://image.tmdb.org/t/p/w500/${movie.value?.poster_path}`)},
  ],
});

const toggleFavorite = () => {
  if (!user.value) {
    showLoginPrompt.value = true
    return
  }

  if (!movie.value) return;
  if (isFavorite.value) {
    favoritesStore.removeFavorite(movie.value.id)
  } else {
    favoritesStore.addFavorite(movie.value)
  }

};

const toggleWatchlist = () => {
  if (!user.value) {
    showLoginPrompt.value = true
    return
  }
  if (!movie.value) return;
  if (isInWatchlist.value) {
    watchlistStore.removeFromWatchlist(movie.value.id)
  } else {
    watchlistStore.addToWatchlist({movie: movie.value})
  }

}

const shareMovie = () => {
  if (!movie.value) return;
  const shareData = {
    title: movie.value.title,
    text: `Check out this movie: ${movie.value.title}`,
    url: window.location.href,
  };
  if (navigator.share) {
    navigator.share(shareData).catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
    })
  } else {
    alert('Sharing not supported.')
  }
};
</script>
