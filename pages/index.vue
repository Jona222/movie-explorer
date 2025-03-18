<template>
  <div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold text-center my-6">🎬 Movie Explorer</h1>

    <div class="flex justify-center mb-6">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Search movies..."
          class="px-4 py-2 border rounded-lg w-1/2"
      />
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <NuxtLink
          v-for="movie in movies"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="border rounded-lg overflow-hidden shadow-lg"
      >
        <img
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            :alt="movie.title"
            class="w-full h-80 object-cover"
        />
        <div class="p-4">
          <h2 class="font-bold text-lg">{{ movie.title }}</h2>
          <p class="text-gray-500">⭐ {{ movie.vote_average.toFixed(1) }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const movies = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const searchQuery = ref('');

const loadMovies = async () => {
  if (!searchQuery.value) {
    const { data } = await useFetch(`/api/movies/popular?page=${currentPage.value}`);
    if (data.value) {
      movies.value = data.value.results;
      totalPages.value = data.value.total_pages;
    }
  } else {
    const { data } = await useFetch(`/api/movies/search?q=${searchQuery.value}&page=1`);
    if (data.value) {
      movies.value = data.value.results;
      totalPages.value = data.value.total_pages;
    }
  }
};

watch([searchQuery, currentPage], loadMovies);

loadMovies();
</script>

