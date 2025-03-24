<template>
  <div>
    <div
        v-for="(categoryData, category) in movieCategories"
        :key="category"
    >
      <h2 class="text-2xl font-bold my-4 flex items-center gap-2">
        <Icon :name="categoryNames[category]?.icon"/>
        {{ categoryNames[category]?.label }}
      </h2>
      <div v-if="categoryData.movies.length === 0 && !categoryData.loading" class="text-center text-gray-500">
        {{ t('categorySection.empty') }}
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <MovieCard v-for="movie in  categoryData.movies" :key="movie.id" :movie="movie"/>
      </div>

      <div class="flex justify-center mt-6">
        <button
            class="px-4 py-2 bg-gray-700 text-white rounded-lg mx-2"
            :disabled="categoryData.loading || categoryData.page >= categoryData.totalPages"
            @click="loadMore(category)"
        >
          {{ categoryData.loading ?  t('categorySection.loading') : t('categorySection.loadMore') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from 'vue-i18n'
import type {Movie} from "~/types/movie";

const {t} = useI18n()
const categoryNames = computed(() => ({
  popular: {
    label: t('categories.popular'),
    icon: 'popular',
  },
  trending: {
    label: t('categories.trending'),
    icon: 'trending',
  },
  nowPlaying: {
    label: t('categories.nowPlaying'),
    icon: 'nowPlaying',
  },
  upcoming: {
    label: t('categories.upcoming'),
    icon: 'upcoming',
  },
  topRated: {
    label: t('categories.topRated'),
    icon: 'topRated',
  },
}))


const categories = ["popular", "trending", "nowPlaying", "upcoming", "topRated"];

const movieCategories = ref<Record<string, { movies: Movie[], page: number, totalPages: number, loading: boolean }>>(
    Object.fromEntries(categories.map(category => [category, {movies: [], page: 1, totalPages: 1, loading: false}]))
);

const categoryAsyncData = Object.fromEntries(
    categories.map(category => [
      category,
      useAsyncData(category, () => $fetch(`/api/movies/${category}?page=1`))
    ])
);

categories.forEach(category => {
  watchEffect(() => {
    const {data, pending} = categoryAsyncData[category];

    if (data.value) {
      movieCategories.value[category].movies = data.value.results || [];
      movieCategories.value[category].totalPages = data.value.total_pages || 1;
    }

    movieCategories.value[category].loading = pending.value;
  });
});

const loadMore = async (category: string) => {
  if (movieCategories.value[category].loading) return;

  movieCategories.value[category].loading = true;
  const nextPage = movieCategories.value[category].page;

  const {data} = await useAsyncData(`${category}-${nextPage}`, () =>
      $fetch(`/api/movies/${category}?page=${nextPage}`)
  );

  if (data.value) {
    movieCategories.value[category].movies.push(...data.value.results);
    movieCategories.value[category].page += 1;
    movieCategories.value[category].totalPages = data.value.total_pages;
  }
  await nextTick();
  movieCategories.value[category].loading = false;
};
</script>

