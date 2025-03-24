<template>
  <div>
    <div
        class="border rounded-lg overflow-hidden relative group transition-transform duration-300 transform hover:scale-110">
      <NuxtLink :to="`/movie/${movie.id}`" class="block shadow-lg">
        <img
            :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`"
            :alt="movie.title"
            class="w-full h-80 object-cover"
        >
      </NuxtLink>

      <div class="flex justify-between items-start w-full p-4">
        <div class="flex flex-col items-start w-2/3">
          <h2 class="font-bold text-lg line-clamp-2">{{ movie.title }}</h2>
          <p class="text-gray-500">⭐ {{ movie.vote_average?.toFixed(1) }}</p>
        </div>

        <div class="flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
              class="px-2 py-1 text-sm rounded-lg mb-2"
              :class="isFavorite ? 'bg-red-300 dark:bg-red-600 text-white shadow-lg shadow-red-500/50' : 'bg-gray-200 dark:bg-gray-500 text-white'"
              @click.prevent="toggleFavorite"
          >
            <Icon name="favorites"/>
          </button>
          <button
              class="px-2 py-1 text-sm rounded-lg"
              :class="isInWatchlist ? 'bg-blue-300 dark:bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'bg-gray-200 dark:bg-gray-500 text-white'"
              @click.prevent="toggleWatchlist"
          >
            <Icon name="bookmark"/>
          </button>
        </div>
      </div>
    </div>
    <LoginPrompt v-if="showLoginPrompt" @close="showLoginPrompt = false"/>
  </div>
</template>

<script setup lang="ts">
import {defineProps, computed, ref} from 'vue';
import {useFavoritesStore} from '~/stores/favorites';
import {useWatchlistStore} from '~/stores/watchlist';
import {useAuth} from '~/composables/useAuth'
import LoginPrompt from '~/components/LoginPrompt.vue'
import type {Movie} from "~/types/movie";


const showLoginPrompt = ref(false)
const {user} = useAuth()
const props = defineProps<{ movie: Movie }>();

const favoritesStore = useFavoritesStore();
const watchlistStore = useWatchlistStore();

const isFavorite = computed(() => favoritesStore.isFavorite(props.movie.id));
const isInWatchlist = computed(() => watchlistStore.isInWatchlist(props.movie.id));

const toggleFavorite = () => {
  if (!user.value) {
    showLoginPrompt.value = true
    return
  }

  if (isFavorite.value) {
    favoritesStore.removeFavorite(props.movie.id)
  } else {
    favoritesStore.addFavorite(props.movie)
  }
}

const toggleWatchlist = () => {
  if (!user.value) {
    showLoginPrompt.value = true
    return
  }

  if (isInWatchlist.value) {
    watchlistStore.removeFromWatchlist(props.movie.id)
  } else {
    watchlistStore.addToWatchlist({movie: props.movie})
  }
}

</script>
