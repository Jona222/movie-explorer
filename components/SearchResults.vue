<template>
  <div>
    <h2 class="flex items-center gap-2 text-2xl font-bold my-4">
      <Icon name="search"/>
      {{ t('search.title') }}
    </h2>

    <div v-if="isLoading" class="text-center my-6">
      <span class="text-xl">{{ t('search.loading') }}</span>
    </div>

    <div v-if="movies.length === 0 && !isLoading" class="text-center my-6">
      <span class="flex items-center gap-2 text-xl text-gray-500">
        {{ t('search.noResults') }}
        <Icon name="sad"/></span>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie"/>
    </div>

    <div ref="loadTrigger" class="h-10"/>
  </div>
</template>
<script setup lang="ts">
import {ref, defineProps, onMounted, watch} from 'vue';
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const props = withDefaults(defineProps<{
  searchQuery?: string
  selectedGenre?: string
  selectedYear?: string
  selectedSort?: string
}>(), {
  searchQuery: '',
  selectedGenre: '',
  selectedYear: '',
  selectedSort: '',
})


const movies = ref([]);
const isLoading = ref(false);
const searchPage = ref(1);
const totalPages = ref(1);
const loadTrigger = ref(null);
let observer: IntersectionObserver | null = null;

const fetchMovies = async () => {
  if (isLoading.value || searchPage.value > totalPages.value) return;

  isLoading.value = true;
  let endpoint = '';

  if (props.searchQuery?.trim()) {
    endpoint = `/api/movies/search?q=${encodeURIComponent(props.searchQuery)}&page=${searchPage.value}`;
  } else {
    endpoint = `/api/movies/discover?page=${searchPage.value}`;
  }

  if (props.selectedGenre) endpoint += `&with_genres=${encodeURIComponent(props.selectedGenre)}`;
  if (props.selectedYear) endpoint += `&primary_release_year=${props.selectedYear}`;
  if (!props.searchQuery && props.selectedSort) endpoint += `&sort_by=${encodeURIComponent(props.selectedSort)}`;

  try {
    const data = await $fetch(endpoint);
    if (data) {
      movies.value = searchPage.value === 1 ? data.results : [...movies.value, ...data.results];
      totalPages.value = data.total_pages;
    }
  } finally {
    isLoading.value = false;
  }
};

const setupObserver = async () => {
  await nextTick();
  if (!loadTrigger.value) return;

  observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && searchPage.value < totalPages.value) {
          searchPage.value++;
          fetchMovies();
        }
      },
      {threshold: 1.0}
  );

  observer.observe(loadTrigger.value);
};

watch(
    () => [props.searchQuery, props.selectedGenre, props.selectedYear],
    ([newQuery]) => {
      if (newQuery?.trim()) {
        movies.value = [];
        searchPage.value = 1;
        fetchMovies();
      }
    },
    {deep: true}
);

onMounted(() => {
  fetchMovies();
  setupObserver();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});

</script>

