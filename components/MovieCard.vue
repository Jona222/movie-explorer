<template>
  <div class="border rounded-lg overflow-hidden relative group transition-transform duration-300 transform hover:scale-110">
    <NuxtLink :to="`/movie/${movie.id}`" class="block shadow-lg">
      <img
          :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`"
          :alt="movie.title"
          class="w-full h-80 object-cover"
      />
    </NuxtLink>

    <div class="flex justify-between items-start w-full p-4">
      <div class="flex flex-col items-start w-2/3">
        <h2 class="font-bold text-lg line-clamp-2">{{ movie.title }}</h2>
        <p class="text-gray-500">⭐ {{ movie.vote_average?.toFixed(1) }}</p>
      </div>

      <div class="flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
            @click.prevent="toggleFavorite"
            class="px-2 py-1 text-sm rounded-lg mb-2"
            :class="isFavorite ? 'bg-red-300 dark:bg-red-600 text-white shadow-lg shadow-red-500/50' : 'bg-gray-200 dark:bg-gray-500 text-white'"
        >
          <Icon name="favorites" />
        </button>

        <button
            @click.prevent="toggleWatchlist"
            class="px-2 py-1 text-sm rounded-lg"
            :class="isInWatchlist ? 'bg-blue-300 dark:bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'bg-gray-200 dark:bg-gray-500 text-white'"
        >
          <Icon name="bookmark" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useFavoritesStore } from '~/stores/favorites';
import { useWatchlistStore } from '~/stores/watchlist';

const props = defineProps<{ movie: any }>();

const favoritesStore = useFavoritesStore();
const watchlistStore = useWatchlistStore();

const isFavorite = computed(() => favoritesStore.isFavorite(props.movie.id));
const isInWatchlist = computed(() => watchlistStore.isInWatchlist(props.movie.id));

const toggleFavorite = () => {
  isFavorite.value
      ? favoritesStore.removeFavorite(props.movie.id)
      : favoritesStore.addFavorite(props.movie);
};

const toggleWatchlist = () => {
  isInWatchlist.value
      ? watchlistStore.removeFromWatchlist(props.movie.id)
      : watchlistStore.addToWatchlist(props.movie);
};
</script>
